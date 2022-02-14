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
          >Have you published any research papers?</div>

          <div class="research-paper-form">
            <div class="research-inputs">
              <div class="form-input">
                <label for>International Journal</label>
                <input type="number" onclick="this.focus();this.select()" v-model="international" />
              </div>
              <div class="form-input">
                <label for>National Journal</label>
                <input type="number" onclick="this.focus();this.select()" v-model="national" />
              </div>
              <div class="form-input">
                <label for>Regional Journal</label>
                <input type="number" onclick="this.focus();this.select()" v-model="regional" />
              </div>
              <div class="form-input">
                <label for>College Journal</label>
                <input type="number" onclick="this.focus();this.select()" v-model="college" />
              </div>
              <div class="form-input">
                <label for>Others</label>
                <input type="number" onclick="this.focus();this.select()" v-model="others" />
              </div>
            </div>
            <div class="form-input-block">
              <label for>Research paper url</label>
              <!-- <select id="researchLinks" multiple></select> -->

              <input name="url" placeholder="Enter Url" class="inline-tags" />
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
import questionFrame from "../../questions/ui/QuestionFrame.vue";
import Tagify from "@yaireo/tagify";

export default {
  //name: "researchDetails",
  data() {
    return {
      researchScreen: {
        quoteText: `Research papers increase your chances of being accepted, especially to research-focused programs.If you haven’t published any, that’s okay too. It certainly didn’t stop this guy <a href="https://www.google.com/search?q=paul+lockhart" target="_blank">(Paul Lockhart)</a>.`,
        headerNeeded: false,
        isScreenActive: false
      },
      userResearchDetails: {
        international: 0,
        national: 0,
        college: 0,
        others: 0
      },
      load: false,
      frameContent: {
        questionClass: "",
        questionIllImg: "research-anim.svg",
        questionHelpText: [
          "Research papers increase your chances of being accepted into research-focused programs",
          "Research papers gives better odds at finding a Research assistant position which might wave your tuition fee off"
        ],
        previousQuestion: "your-bachelor-degree",
        noPrevious: false,
        noNext: false,
        nextQuestion: "actionPlan",
        user_progress: "100",
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
      "getUserResearchDetails",
      "getIsFlashBackPage",
      "getRenderAutocomplete",
      "getQuestionsList",
      "getQsSubmited"
    ]),
    international: {
      get() {
        return this.getUserResearchDetails.international;
      },
      set(value) {
        var payload = {
          type: "international",
          detail: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.commit("updateUserResearchDetails", payload);
      }
    },
    national: {
      get() {
        return this.getUserResearchDetails.national;
      },
      set(value) {
        var payload = {
          type: "national",
          detail: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.commit("updateUserResearchDetails", payload);
      }
    },
    college: {
      get() {
        return this.getUserResearchDetails.college;
      },
      set(value) {
        var payload = {
          type: "college",
          detail: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.commit("updateUserResearchDetails", payload);
      }
    },
    regional: {
      get() {
        return this.getUserResearchDetails.regional;
      },
      set(value) {
        var payload = {
          type: "regional",
          detail: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.commit("updateUserResearchDetails", payload);
      }
    },
    others: {
      get() {
        return this.getUserResearchDetails.others;
      },
      set(value) {
        var payload = {
          type: "others",
          detail: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.commit("updateUserResearchDetails", payload);
      }
    }
  },
  methods: {
    ...mapActions(["updateUserResearchDetails"])
  },
  created() {
    this.userResearchDetails = this.getUserResearchDetails;
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
      "you-published-any-research",
      this.getQuestionsList
    );

    if (result.status) {
      this.frameContent.id = result.id;
      this.frameContent.text = result.text;
      this.frameContent.unique_name = result.unique_name;
      this.load = true;
      var prePoppulate = this.getUserResearchDetails.researchLinks;

      var input = document.querySelector("input[name=url]");

      // initialize Tagify on the above input node reference
      new Tagify(input);

      // $("#researchLinks")
      //   .select2({
      //     width: 570,
      //     tags: true,
      //     data: prePoppulate,
      //     language: {
      //       noResults: function() {
      //         return "";
      //       }
      //     }
      //   })
      //   .val(prePoppulate)
      //   .trigger("change");
      // $(".select2-search__field").css("text-align", "left");
      // $("#researchLinks").on("select2:select", function(e) {
      //   vm.$store.dispatch("updateUserResearchDetails", {
      //     type: "link",
      //     detail: e.params.data.text
      //   });
      // });
      // $("#researchLinks").on("select2:unselect", function(e) {
      //   vm.$store.dispatch("updateUserResearchDetails", {
      //     type: "linkRemove",
      //     detail: e.params.data.text
      //   });
      // });
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

<style scoped>
</style>