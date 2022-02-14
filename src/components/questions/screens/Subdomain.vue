<template>
  <div>
    <div class="question-loader" v-if="apiStop">
      <div>
        <img src="../../../assets/images/dual-ring.svg" alt width="50" />
      </div>
    </div>
    <question-frame :frameContent="frameContent">
      <template v-slot:content>
        <div class="question-form">
          <div class="question-form-info">
            <div
              class="q-title which-of-question"
              v-html="frameContent.text"
              :name="frameContent.unique_name"
            ></div>
            <div class="study-what-form">
              <div class="form-input-block">
                <input
                  name="tags-select-mode"
                  spellcheck="flase"
                  v-model="domain"
                  class="selectMode"
                  placeholder="Select discipline"
                />
                <!-- <select v-model="domain">
                  <option value="-1" disabled>Select discipline</option>
                  <option
                    v-for="(item,index) in domain_list"
                    :value="item.subdomain_id"
                    :key="index"
                  >{{item.subdomain_name}}</option>
                </select>-->
              </div>
            </div>
          </div>
        </div>
      </template>
    </question-frame>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import questionFrame from "../ui/QuestionFrame.vue";
import Tagify from "@yaireo/tagify";

export default {
  data() {
    return {
      apiStop: false,
      load: false,
      subDomainList: [
        { subdomain_id: 1, subdomain_name: "Computer Science" },
        { subdomain_id: 2, subdomain_name: "Electronics and Communications" },
        { subdomain_id: 3, subdomain_name: "Mechanical" }
      ],
      frameContent: {
        questionClass: "",
        questionIllImg: "domain-anim.svg",
        questionHelpText: [
          "Did you know computer science is a compitative discipline for MS in USA.",
          "You are in the crossroads now, choose wisely!"
        ],
        previousQuestion: "which-of-these-are-you",
        noPrevious: false,
        noNext: false,
        nextQuestion: "where-all-would-you-apply",
        user_progress: "20",
        text: "What discipline are you looking to do your Masters’ degree in?"
      }
    };
  },
  components: {
    questionFrame
  },
  computed: {
    ...mapGetters([
      "getIsFreeScreens",
      "getDomainDetails",
      "getDomainList",
      "getQuestionsList",
      "getDomainId",
      "getQsSubmited"
    ]),
    domain_list: {
      get() {
        return this.getDomainList;
      },
      set(value) {}
    },
    domain: {
      get() {
        // return this.getDomainDetails.subdomain_id;
        return this.getDomainDetails.subdomain_name;
      },
      set(value) {
        let payload = {};
        var vm = this;
        if (value < 0) {
          payload = {
            subdomain_id: value,
            subdomain_name: ""
          };
        } else {
          payload = {
            subdomain_id: value,
            subdomain_name: this.subDomainList.filter(
              item => item.subdomain_id == value
            )[0].subdomain_name
          };
        }
        //vm.resetDDLs(value);
        localStorage.setItem("subdomain_id", value);
        this.$store.dispatch("updateSubDomain", payload);
      }
    }
  },
  watch: {
    async getDomainId(value) {
      if (value < 0) {
        return;
      }
      this.apiStop = true;

      this.$store.dispatch("clearDomainDependents"); //clearing the vuex data of dependencies

      /**
       * univesity call
       */

      let university_programs = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/program-university-list/" +
          value
      );

      if (university_programs.status === "success") {
        university_programs = university_programs.message.program_university;
        this.$store.dispatch("updateSpecificDropDownData", {
          type: "universities",
          university_programs
        });
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; ` + `Something is wrong! Please try again.`
        });
        return false;
      }

      /**
       * program call
       */

      let program_list = await this.$util.get(
        this.$util.questionsEntryPoint + "/v1/master-data/program-list/" + value
      );

      if (program_list.status === "success") {
        program_list = program_list.message.program_list;
        this.$store.dispatch("updateSpecificDropDownData", {
          type: "programs",
          program_list
        });
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; ` + `Something is wrong! Please try again.`
        });
        return false;
      }

      /**
       * Country call
       */

      let country_list = await this.$util.get(
        this.$util.questionsEntryPoint + "/v1/master-data/countries/" + value
      );

      if (country_list.status === "success") {
        country_list = country_list.message.country;
        this.$store.dispatch("updateSpecificDropDownData", {
          type: "country",
          country_list
        });
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; ` + `Something is wrong! Please try again.`
        });
        return false;
      }

      this.apiStop = false;
    }
  },
  async mounted() {
    if (!this.getQuestionsList.questions) {
      this.$store.dispatch("updateRedirectTriggred", true);
      this.$router.push({ name: "questions" });
      return false;
    }

    if (this.getQsSubmited) {
      this.$router.push({ name: "user-dashboard" });
      return false;
    }

    let result = await this.$util.getQuestionText(
      "discipline-for-your-masters",
      this.getQuestionsList
    );

    if (result.status) {
      this.frameContent.id = result.id;
      this.frameContent.text = result.text;
      this.frameContent.unique_name = result.unique_name;

      var vm = this;

      var input = document.querySelector("input[name=tags-select-mode]");
      var tagify = new Tagify(input, {
        mode: "select",
        whitelist: vm.getDomainList,
        enforceWhitelist: true,
        blacklist: ["foo", "bar"],
        keepInvalidTags: true, // do not auto-remove invalid tags
        dropdown: {
          // closeOnSelect: false
        }
      });

      // if (vm.getDomainDetails.subdomain_id > 0) {
      //   tagify.addTags({ id: vm.getDomainDetails.subdomain_id });
      // }
      // bind events
      tagify.on("add", function(e) {
        let option = e.detail.data;
        let data = { subdomain_id: option.id, subdomain_name: option.value };
        let value = option.id;

        //vm.resetDDLs(value);
        localStorage.setItem("subdomain_id", value);
        vm.$store.dispatch("updateSubDomain", data);
      });
      tagify.on("remove", function(e) {
        let option = e.detail.data;
        vm.$store.dispatch("updateSubDomain", {
          subdomain_id: -1,
          subdomain_name: ""
        });
      });
    } else {
      this.$swal({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 4000,
        type: "error",
        html: `&nbsp Something is wrong. Please reload the page.`
      });
    }
  }
};
</script>