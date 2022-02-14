<template>
  <question-frame :frameContent="frameContent">
    <template v-slot:content>
      <div class="question-form">
        <div class="question-form-info">
          <div
            class="q-title which-of-question"
            :id="frameContent.id"
            :name="frameContent.unique_name"
            v-html="frameContent.text"
          >Let’s talk about your Bachelor’s degree</div>
          <div class="q-scroll">
            <div class="form-input-block">
              <label for>University/ College</label>
              <!-- <select class="js-example-basic-single" id="bcolleges" v-model="institution">
              <option value="-1">Select University / College</option>
              <option
                v-for="(item,index) in college_list"
                :value="item.college_id"
                :key="index"
              >{{item.college_name}}</option>
              </select>-->
              <input
                name="tags-select-mode"
                spellcheck="flase"
                v-model="institution"
                class="selectMode"
                placeholder="Search"
              />
            </div>
            <div class="form-input-block">
              <label for>Degree/ Programme</label>
              <input
                name="tags-select-mode-program"
                spellcheck="flase"
                v-model="program"
                class="selectMode"
                placeholder="Search"
              />
              <!-- <select v-model="program">
              <option value="-1">Degree / Programme</option>
              <option v-for="(item,index) in pd_list" :value="item.code" :key="index">{{item.name}}</option>
              </select>-->
            </div>
            <div class="degree-score">
              <div class="score-block">
                <label for>Your Score</label>
                <div class="score-increment">
                  <div class="input-group number-spinner">
                    <span class="input-group-btn">
                      <button
                        class="btn btn-default minus"
                        @click.prevent="updateHelper('your_score',false)"
                        data-dir="dwn"
                      >
                        <span class></span>
                      </button>
                    </span>
                    <input
                      type="number"
                      onclick="this.focus();this.select()"
                      class="form-control text-center"
                      v-model="your_score"
                    />
                    <span class="input-group-btn">
                      <button
                        class="btn btn-default plus"
                        @click.prevent="updateHelper('your_score',true)"
                        data-dir="up"
                      >
                        <span class></span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="score-block">
                <label for>Max in Batch</label>
                <div class="score-increment">
                  <div class="input-group number-spinner">
                    <span class="input-group-btn">
                      <button
                        class="btn btn-default minus"
                        @click.prevent="updateHelper('max_score',false)"
                        data-dir="dwn"
                      >
                        <span class></span>
                      </button>
                    </span>
                    <input
                      type="number"
                      onclick="this.focus();this.select()"
                      class="form-control text-center"
                      v-model="max_score"
                    />
                    <span class="input-group-btn">
                      <button
                        class="btn btn-default plus"
                        @click.prevent="updateHelper('max_score',true)"
                        data-dir="up"
                      >
                        <span class></span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </question-frame>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import select2 from "select2";
import questionFrame from "../ui/QuestionFrame.vue";
import Tagify from "@yaireo/tagify";

export default {
  // name: "degreeDetails",
  data() {
    return {
      degreeDetails: {
        institution: "",
        program: "",
        your_score: "",
        max_score: "",
        scoreType: "score"
      },
      edBackGround: {
        quoteText: `Your college, degree and past academic performance can affect your chances of getting an acceptance.`,
        headerNeeded: false,
        isScreenActive: false
      },
      program_list: [
        { pd_id: 1, pd_name: "B.Tech" },
        { pd_id: 2, pd_name: "B.E" },
        { pd_id: 3, pd_name: "M.Tech" }
      ],
      load: false,
      frameContent: {
        questionClass: "",
        questionIllImg: "question-select-degree.svg",
        questionHelpText: [
          "Bachelor's degree from better institution gives better chances at pushing out the competition",
          "Better score in core subjects gives better odds",
          "Your college, degree and past academic performance can affect your chances of getting an acceptance."
        ],
        previousQuestion: "work-experience",
        noPrevious: false,
        noNext: false,
        nextQuestion: "you-published-any-research",
        user_progress: "90",
        text: "",
        id: ""
      }
    };
  },
  components: {
    questionFrame
  },
  computed: {
    ...mapGetters([
      "getDegreeDetails",
      "getCollegeList",
      "getProgramDegreeList",
      "getRenderAutocomplete",
      "getQuestionsList",
      "getQsSubmited"
    ]),
    institution: {
      get() {
        return this.getDegreeDetails.instName;
      },
      set(value) {}
    },
    program: {
      get() {
        // return this.getDegreeDetails.program;
        return this.getDegreeDetails.degreeName;
      },
      set(value) {}
    },
    your_score: {
      get() {
        return this.getDegreeDetails.your_score;
      },
      set(value) {
        var payload = {
          whichDetail: "your_score",
          detail: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateDegreeDetails", payload);
      }
    },
    max_score: {
      get() {
        return this.getDegreeDetails.max_score;
      },
      set(value) {
        var payload = {
          whichDetail: "max_score",
          detail: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateDegreeDetails", payload);
      }
    },
    college_list: {
      get() {
        return this.getCollegeList;
      },
      set(value) {}
    },
    pd_list: {
      get() {
        return this.getProgramDegreeList;
      },
      set(value) {}
    }
  },
  methods: {
    ...mapActions(["updateDegreeDetails"]),
    updateHelper(type, action) {
      let value = parseFloat(this.getDegreeDetails[type]);
      let data = {
        whichDetail: type,
        detail: action ? ++value : value ? --value : value
      };
      this.$store.dispatch("updateDegreeDetails", data);
    }
  },
  async mounted() {
    var vm = this;

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
      "your-bachelor-degree",
      this.getQuestionsList
    );

    if (result.status) {
      this.frameContent.id = result.id;
      this.frameContent.text = result.text;
      this.frameContent.unique_name = result.unique_name;
      this.load = true;
      var vm = this;

      /**
       * university selection
       */

      // this.inst_name = this.getDegreeDetails.instName;

      var input = document.querySelector("input[name=tags-select-mode]");

      var tagify = new Tagify(input, {
        mode: "select",
        whitelist: vm.getCollegeList,
        enforceWhitelist: true,
        blacklist: ["foo", "bar"],
        keepInvalidTags: true, // do not auto-remove invalid tags
        dropdown: {
          // closeOnSelect: false
          maxItems: Infinity
        },
        delimiters: ":"
      });

      tagify.on("add", function(e) {
        let option = e.detail.data;

        vm.$store.commit("updateDegreeDetails", {
          whichDetail: "institution",
          detail: option.id
        });
        vm.$store.commit("updateDegreeDetails", {
          whichDetail: "instName",
          detail: option.value
        });
      });
      tagify.on("remove", function(e) {
        vm.$store.commit("updateDegreeDetails", {
          whichDetail: "institution",
          detail: -1
        });
        vm.$store.commit("updateDegreeDetails", {
          whichDetail: "instName",
          detail: ""
        });
      });

      // tagify.on("blur", function() {
      //   vm.inst_name = "";
      //   $(".tagify__input").innerHTML = vm.getDegreeDetails.instName;
      // });

      /**
       * end university selection
       */

      /**
       * program
       */

      // this.inst_name = this.getDegreeDetails.instName;

      var input = document.querySelector(
        "input[name=tags-select-mode-program]"
      );

      var tagify = new Tagify(input, {
        mode: "select",
        whitelist: vm.pd_list,
        enforceWhitelist: true,
        blacklist: ["foo", "bar"],
        keepInvalidTags: true, // do not auto-remove invalid tags
        dropdown: {
          // closeOnSelect: false
          maxItems: Infinity
        },
        delimiters: ":"
      });

      tagify.on("add", function(e) {
        let option = e.detail.data;

        vm.$store.commit("updateDegreeDetails", {
          whichDetail: "program",
          detail: option.id
        });
        vm.$store.commit("updateDegreeDetails", {
          whichDetail: "degreeName",
          detail: option.value
        });
      });
      tagify.on("remove", function(e) {
        vm.$store.commit("updateDegreeDetails", {
          whichDetail: "program",
          detail: -1
        });
        vm.$store.commit("updateDegreeDetails", {
          whichDetail: "degreeName",
          detail: ""
        });
      });

      // tagify.on("blur", function() {
      //   vm.inst_name = "";
      //   $(".tagify__input").innerHTML = vm.getDegreeDetails.instName;
      // });

      /**
       * end program selection
       */
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

<style>
</style>
