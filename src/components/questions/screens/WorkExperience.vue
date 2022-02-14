<template>
  <question-frame v-if="load" :frameContent="frameContent">
    <template v-slot:content>
      <div class="question-form">
        <div class="question-form-info">
          <div
            :id="frameContent.id"
            v-html="frameContent.text"
            :name="frameContent.unique_name"
            class="q-title which-of-question"
          >
            Work experience, as on today?
            <span>Please exclude internships/projects that ware done at college</span>
          </div>

          <div class="exp-score d-flex q-scroll">
            <div class="score-block">
              <label for>Total</label>
              <div class="score-increment">
                <div class="input-group number-spinner">
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default minus"
                      @click.prevent="updateHelper('total', false)"
                      data-dir="dwn"
                    >
                      <span class></span>
                    </button>
                  </span>
                  <input
                    type="number"
                    onclick="this.focus();this.select()"
                    v-model="workExp"
                    class="form-control text-center"
                    value="1"
                  />
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default plus"
                      @click.prevent="updateHelper('total', true)"
                      data-dir="up"
                    >
                      <span class></span>
                    </button>
                  </span>
                </div>
                <div class="exp-duration">Month(s)</div>
              </div>
            </div>
            <div class="score-block">
              <label for>Research Related</label>
              <div class="score-increment">
                <div class="input-group number-spinner">
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default minus"
                      @click.prevent="updateHelper('research', false)"
                      data-dir="dwn"
                    >
                      <span class></span>
                    </button>
                  </span>
                  <input
                    type="number"
                    onclick="this.focus();this.select()"
                    v-model="researchExp"
                    class="form-control text-center"
                    value="1"
                  />
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default plus"
                      @click.prevent="updateHelper('research', true)"
                      data-dir="up"
                    >
                      <span class></span>
                    </button>
                  </span>
                </div>
                <div class="exp-duration">Month(s)</div>
              </div>
            </div>
            <div class="score-block">
              <label for>Program Related</label>
              <div class="score-increment">
                <div class="input-group number-spinner">
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default minus"
                      @click.prevent="updateHelper('program', false)"
                      data-dir="dwn"
                    >
                      <span class></span>
                    </button>
                  </span>
                  <input
                    type="number"
                    onclick="this.focus();this.select()"
                    v-model="programExp"
                    class="form-control text-center"
                    value="1"
                  />
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default plus"
                      @click.prevent="updateHelper('program', true)"
                      data-dir="up"
                    >
                      <span class></span>
                    </button>
                  </span>
                </div>
                <div class="exp-duration">Month(s)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </question-frame>

  <!-- <progress-input
          type="number"
          v-model="workExp"
          :data="workExp"
          :helpClass="workScreen.helpClass"
          :helpText="workScreen.helpText"
        >
          <template v-slot:label v-if="!getIsFreeScreens">
            <div class="experience-rel-text">Total</div>
          </template>
  </progress-input>-->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import questionFrame from "../ui/QuestionFrame.vue";

export default {
  //name: "workExp",
  data() {
    return {
      experience: {
        research: 0,
        work: 0
      },
      load: false,
      frameContent: {
        questionClass: "work-exp",
        questionIllImg: "work-anim.svg",
        questionHelpText: [
          "Work experience plays a vital role in the admission pool"
        ],
        previousQuestion: "what-are-your-scores",
        noPrevious: false,
        noNext: false,
        nextQuestion: "your-bachelor-degree",
        user_progress: "80"
      }
    };
  },
  components: {
    questionFrame
  },
  computed: {
    ...mapGetters([
      "getQuestionsList",
      "getWorkExperience",
      "getIsFreeScreens",
      "getUserName",
      "getQsSubmited"
    ]),
    workExp: {
      get() {
        return this.getWorkExperience.total;
      },
      set(value) {
        var payload = {
          type: "total",
          value: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.dispatch("updateWorkExperienceQ", payload);
      }
    },
    researchExp: {
      get() {
        return this.getWorkExperience.research;
      },
      set(value) {
        var payload = {
          type: "research",
          value: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.dispatch("updateWorkExperienceQ", payload);
      }
    },
    programExp: {
      get() {
        return this.getWorkExperience.program;
      },
      set(value) {
        var payload = {
          type: "program",
          value: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.dispatch("updateWorkExperienceQ", payload);
      }
    },
    user_name: {
      get() {
        return this.getUserName;
      },
      set(value) {}
    }
  },
  methods: {
    ...mapActions(["updateWorkExperienceQ"]),
    updateHelper(type, action) {
      let value = parseInt(this.getWorkExperience[type]);
      let data = {
        type,
        value: action ? ++value : value ? --value : value
      };
      this.$store.dispatch("updateWorkExperienceQ", data);
    }
  },
  async created() {
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
      "work-experience",
      this.getQuestionsList
    );

    if (result.status) {
      this.frameContent.id = result.id;
      this.frameContent.text = result.text;
      this.frameContent.unique_name = result.unique_name;
      this.load = true;
      this.experience = this.getWorkExperience;
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
    // this.userName = localStorage.getItem("user_name");
  }
};
</script>

<style>
</style>
