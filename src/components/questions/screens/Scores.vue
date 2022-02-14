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
          ></div>

          <div class="research-paper-form">
            <label class="greLbl">GRE</label>
            <div class="scores-inputs">
              <div class="form-input">
                <label for>Quant</label>
                <input
                  type="number"
                  charLimit="3"
                  onclick="this.focus();this.select()"
                  name="Quant"
                  v-model="quant"
                />
              </div>
              <div class="form-input">
                <label for>Verbal</label>
                <input
                  type="number"
                  name="Verbal"
                  onclick="this.focus();this.select()"
                  charLimit="3"
                  v-model="verbal"
                />
              </div>
              <div class="form-input">
                <label for>AWA</label>
                <input
                  type="number"
                  name="AWA"
                  onclick="this.focus();this.select()"
                  charLimit="3"
                  v-model="AWA"
                />
              </div>
            </div>

            <div class="switch switch--horizontal">
              <div class="switch-gre">
                <input
                  id="radio-toefl"
                  type="radio"
                  value="toefl"
                  name="second-switch"
                  v-model="englishExam"
                  checked="checked"
                />
                <label for="radio-toefl">TOEFL</label>
                <input
                  id="radio-ielts"
                  type="radio"
                  value="ielts"
                  v-model="englishExam"
                  name="second-switch"
                />
                <label for="radio-ielts">IELTS</label>
                <span class="toggle-outside">
                  <span class="toggle-inside"></span>
                </span>
              </div>
            </div>
            <!-- <form action>
              <label class="radio-inline">
                <input type="radio" value="toefl" v-model="englishExam" checked />TOEFL
              </label>
              <label class="radio-inline">
                <input type="radio" value="ielts" v-model="englishExam" />IELTS
              </label>
            </form>-->

            <div v-if="englishExam === 'toefl'" class="research-paper-form">
              <div class="scores-inputs">
                <div class="form-input">
                  <label for>Listening</label>
                  <input type="number" onclick="this.focus();this.select()" v-model="tlistening" />
                </div>
                <div class="form-input">
                  <label for>Reading</label>
                  <input type="number" onclick="this.focus();this.select()" v-model="treading" />
                </div>
                <div class="form-input">
                  <label for>Writing</label>
                  <input type="number" onclick="this.focus();this.select()" v-model="twriting" />
                </div>
                <div class="form-input">
                  <label for>Speaking</label>
                  <input type="number" onclick="this.focus();this.select()" v-model="tspeaking" />
                </div>
              </div>
            </div>
            <div v-else class="research-paper-form">
              <div class="scores-inputs">
                <div class="form-input">
                  <label for>Listening</label>
                  <input type="number" onclick="this.focus();this.select()" v-model="elistening" />
                </div>
                <div class="form-input">
                  <label for>Reading</label>
                  <input type="number" onclick="this.focus();this.select()" v-model="ereading" />
                </div>
                <div class="form-input">
                  <label for>Writing</label>
                  <input
                    type="number"
                    onclick="this.focus();this.select()"
                    value="0"
                    v-model="ewriting"
                  />
                </div>
                <div class="form-input">
                  <label for>Speaking</label>
                  <input
                    type="number"
                    onclick="this.focus();this.select()"
                    value="0"
                    v-model="espeaking"
                  />
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
import validator from "../../../assets/js/validate-answers.js";
import questionFrame from "../ui/QuestionFrame.vue";
export default {
  //name: "premiumScores",
  data() {
    return {
      scoresScreen: {
        quoteText: `You might’ve given a few exams, or you might be planning to. How much do you think you’ll be scoring?`,
        headerNeeded: false,
        isScreenActive: false
      },
      englishExam: "toefl",
      load: false,
      frameContent: {
        questionClass: "",
        questionIllImg: "score-anim.svg",
        questionHelpText: [
          "Did you know universities have their own GRE and IELTS/TOEFL cutoffs",
          "Better score gives you better odds to get into your dream university",
          "Did you know Univesities check subject wise scores when the shortlist applications?"
        ],
        previousQuestion: "most-important-thing-for-you",
        noPrevious: false,
        noNext: false,
        nextQuestion: "work-experience",
        user_progress: "70"
      }
    };
  },
  components: {
    questionFrame
  },
  methods: {
    ...mapActions(["updateExamScores"]),
    fireError(message) {
      this.$swal({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        type: "error",
        html: message

        //footer: "Why do I have this issue?"
      });
    },
    check(type) {
      if (type === "Quant") {
        if (this.getScores.gre.quant < 130 || this.getScores.gre.quant > 170) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: GRE - " +
              type +
              ". Acceptable range: 130 - 170"
          );
          return false;
        }
      } else if (type === "Verbal") {
        if (
          this.getScores.gre.verbal < 130 ||
          this.getScores.gre.verbal > 170
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: GRE - " +
              type +
              ". Acceptable range: 130 - 170"
          );
          return false;
        }
      } else if (type === "AWA") {
        if (this.getScores.gre.AWA < 0 || this.getScores.gre.AWA > 6) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: GRE - " +
              type +
              ". Acceptable range: 0 - 6"
            //footer: "Why do I have this issue?"
          );
          return false;
        } else if (this.getScores.gre.AWA % 0.5 != 0) {
          this.fireError(
            `&nbsp; ` + "Invalid input: GRE - AWA. Should be multiples of 0.5"
          );

          return false;
        }
      } else if (type === "treading") {
        if (
          this.getScores.tofel.reading < 1 ||
          this.getScores.tofel.reading > 30
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: TOFEL - Reading. Acceptable range: 1 - 30"
          );
          return false;
        }
      } else if (type === "tlistening") {
        if (
          this.getScores.tofel.listening < 1 ||
          this.getScores.tofel.listening > 30
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: TOFEL - Listening. Acceptable range: 1 - 30"
          );

          return false;
        }
      } else if (type === "tspeaking") {
        if (
          this.getScores.tofel.speaking < 1 ||
          this.getScores.tofel.speaking > 30
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: TOFEL - Speaking. Acceptable range: 1 - 30"
          );

          return false;
        }
      } else if (type === "twriting") {
        if (
          this.getScores.tofel.speaking < 1 ||
          this.getScores.tofel.speaking > 30
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: TOFEL - Writing. Acceptable range: 1 - 30"
          );

          return false;
        }
      } else if (type === "ereading") {
        if (
          this.getScores.ielts.reading < 1 ||
          this.getScores.ielts.reading > 9
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: IELTS - Reading. Acceptable range: 1 - 9"
          );

          return false;
        }
      } else if (type === "elistening") {
        if (
          this.getScores.ielts.listening < 1 ||
          this.getScores.ielts.listening > 9
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: IELTS - Listening. Acceptable range: 1 - 9"
          );

          return false;
        }
      } else if (type === "espeaking") {
        if (
          this.getScores.ielts.speaking < 1 ||
          this.getScores.ielts.speaking > 9
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: IELTS - Speaking. Acceptable range: 1 - 9"
          );
          return false;
        }
      } else if (type === "ewriting") {
        if (
          this.getScores.ielts.writing < 1 ||
          this.getScores.ielts.writing > 9
        ) {
          this.fireError(
            `&nbsp; ` +
              "Invalid input: IELTS - Writing. Acceptable range: 1 - 9"
          );
          return false;
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      "getQuestionsList",
      "getScores",
      "getIsFlashBackPage",
      "getQsSubmited"
    ]),
    //gre
    /* #region Some region */
    quant: {
      get() {
        return this.getScores.gre.quant;
      },
      set(value) {
        var payload = {
          exam: "gre",
          subject: "quant",
          score: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    verbal: {
      get() {
        return this.getScores.gre.verbal;
      },
      set(value) {
        var payload = {
          exam: "gre",
          subject: "verbal",
          score: parseInt(value) ? parseInt(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    AWA: {
      get() {
        return this.getScores.gre.AWA;
      },
      set(value) {
        var payload = {
          exam: "gre",
          subject: "AWA",
          score: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    /* #endregion */
    //ielts
    /** */
    ereading: {
      get() {
        return this.getScores.ielts.reading;
      },
      set(value) {
        var payload = {
          exam: "ielts",
          subject: "reading",
          score: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    elistening: {
      get() {
        return this.getScores.ielts.listening;
      },
      set(value) {
        var payload = {
          exam: "ielts",
          subject: "listening",
          score: parseFloat(value)
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    espeaking: {
      get() {
        return this.getScores.ielts.speaking;
      },
      set(value) {
        var payload = {
          exam: "ielts",
          subject: "speaking",
          score: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    ewriting: {
      get() {
        return this.getScores.ielts.writing;
      },
      set(value) {
        var payload = {
          exam: "ielts",
          subject: "writing",
          score: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    // tofel

    treading: {
      get() {
        return this.getScores.tofel.reading;
      },
      set(value) {
        var payload = {
          exam: "tofel",
          subject: "reading",
          score: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    tlistening: {
      get() {
        return this.getScores.tofel.listening;
      },
      set(value) {
        var payload = {
          exam: "tofel",
          subject: "listening",
          score: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    tspeaking: {
      get() {
        return this.getScores.tofel.speaking;
      },
      set(value) {
        var payload = {
          exam: "tofel",
          subject: "speaking",
          score: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
    },
    twriting: {
      get() {
        return this.getScores.tofel.writing;
      },
      set(value) {
        var payload = {
          exam: "tofel",
          subject: "writing",
          score: parseFloat(value) ? parseFloat(value) : 0
        };
        this.$store.commit("updateExamScores", payload);
      }
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
      "what-are-your-scores",
      this.getQuestionsList
    );

    if (result.status) {
      this.frameContent.id = result.id;
      this.frameContent.text = result.text;
      this.frameContent.unique_name = result.unique_name;
      this.load = true;
      $(
        "#Quant,#Verbal,#AWA,#treading,#tlistening,#tspeaking,#twriting,#ereading,#elistening,#espeaking,#ewriting"
      ).on("blur", event => {
        vm.check(event.target.id);
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

<style scoped>
.scoreHelp {
  color: #ffa701;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
}
.greLbl {
  font-size: 18px;
  line-height: 25px;
  display: inline-block;
  width: 45px;
  margin: 0;
  opacity: 1;
  cursor: default;
  color: #5b5b76;
  font-weight: 500;
  transition: opacity 0.25s ease;
  margin-bottom: 1rem;
}
</style>