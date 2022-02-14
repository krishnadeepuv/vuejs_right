<template>
  <div>
    <div v-if="submitClicked" class="question-loader">
      <div>
        <img src="../../../assets/images/dual-ring.svg" alt width="50" />
      </div>
    </div>
    <div class="select-questions">
      <div class="logo-select">
        <img src="../../../assets/images/select-logo.png" alt width="200" />
      </div>

      <a href="#" class="exit-question" @click.prevent="redirect()">Save and Exit</a>
      <div class="questions-block">
        <div class="gr-logo-btm">
          <img src="../../../assets/images/gr-logo.png" alt width="170" />
        </div>
        <div id="carousel" class="carousel slide carousel-fade" data-ride="carousel">
          <!-- Carousel items -->
          <div class>
            <div class="active item">
              <div class="question-item" :class="frameContent.questionClass">
                <div class="question-catgory-info">
                  <img
                    :src="require(`../../../assets/images/`+ frameContent.questionIllImg)"
                    alt
                    width="290"
                    style="height:60%"
                  />
                  <div style="height:40%;">
                    <vue-typed-js
                      :strings="frameContent.questionHelpText"
                      :typeSpeed="50"
                      :backSpeed="10"
                      :backDelay="1000"
                      :loop="true"
                      :showCursor="false"
                    >
                      <div class="question-tag-info typing" style="min-height:60px"></div>
                    </vue-typed-js>
                  </div>
                </div>
                <slot name="content"></slot>
              </div>
            </div>
          </div>
          <div class="nav-question">
            <div class="nav-sec">
              <router-link
                :to="{name:frameContent.previousQuestion}"
                class="q-prev"
                :class="{'not-active-left':frameContent.noPrevious}"
                aria-disabled="true"
              ></router-link>
              <i v-if="!showNextLoading" style="font-style:normal;">
                <a
                  href="#"
                  class="q-next"
                  v-if="frameContent.unique_name != 'you-published-any-research'"
                  :class="{'not-active-right':frameContent.noNext}"
                  :to="{name:frameContent.nextQuestion}"
                  @click.prevent="slideNext()"
                ></a>
                <button v-else style="float: right;" @click="slideNext()">Submit</button>
              </i>

              <img
                v-else
                src="../../../assets/images/dual-ring.svg"
                style="float:right;width:59px"
                alt
              />
              <div class="q-process">
                <div class="bar">
                  <span
                    class="fill question-progress-bar"
                    :style="{'--barWidth': frameContent.user_progress+'%'}"
                  ></span>
                </div>
                {{(isMobile && (frameContent.user_progress=="100"))? "" :frameContent.user_progress+" %"}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validator from "../../../assets/js/validate-answers.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isBudgetPage: false,
      currentId: "",
      showNextLoading: false,
      submitClicked: false,
      isMobile: false
    };
  },
  props: ["frameContent"],
  computed: {
    ...mapGetters([
      "getIsPaidUser",
      "getAnswerById",
      "getUserPrioritys",
      "getAnonymousResponse",
      "getFreeUserPrioritys",
      "getAllSelected",
      "getActiveSlideIndex",
      "getMostImportantListPaid",
      "getUserName",
      "getQuestionsList"
    ])
  },
  methods: {
    async slideNext() {
      //validate
      this.currentId = this.frameContent.id;
      var data = this.getAnswerById(this.currentId);

      if (data.question_unique_name.includes("important")) {
        //if (data.answer.length == 0) {
        /*if (this.getIsPaidUser) {*/
        data.answer = {
          actual_priorities: this.getMostImportantListPaid.map(item => {
            return { type: item.type, score: item.score };
          }),
          formulated_priorities: this.getUserPrioritys
          //};
          /*} else {
            data.answer = {
              actual_priorities: this.getFreeUserPrioritys,
              formulated_priorities: this.formulatePaidPriorities(
                this.getFreeUserPrioritys,
                "free"
              )
            };
          }*/
        };
      }

      let errorReport = validator.validate(
        data.answer,
        data.question_unique_name
      );
      if (errorReport.status == "error") {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; ` + errorReport.message
          //footer: "Why do I have this issue?"
        });
        return false;
      }
      if (data.question_unique_name.includes("scores")) {
        let gre = data.answer.gre;
        let ielts = data.answer.ielts;
        let tofel = data.answer.tofel;
        data.answer.gre.total = gre.quant + gre.verbal;
        data.answer.ielts.total = (
          (ielts.listening + ielts.reading + ielts.writing + ielts.speaking) /
          4
        ).toFixed(1);
        data.answer.tofel.total =
          tofel.listening + tofel.reading + tofel.writing + tofel.speaking;
      }
      var userID = localStorage.getItem("user_id");

      if (this.frameContent.unique_name === "you-published-any-research") {
        let response = await this.finalClick();
        if (!response.status) {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 4000,
            type: "error",
            html: `&nbsp;` + response.message
          });
          this.$router.push({ name: response.redirect_url });
          return false;
        }
      }

      if (userID) {
        this.showNextLoading = true;
        var result = await this.$util.put(
          this.$util.questionsEntryPoint + "/v1/student-input",
          {
            user_id: userID,
            question_id: data.question_id,
            question_unique_name: data.question_unique_name,
            answer: data.answer
          }
        );
        this.showNextLoading = false;
        if (result.status === "error") {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "error",
            html: `&nbsp;` + `Did we mess up? Give it another try.`
          });
          return false;
        } else {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            html: `&nbsp;` + "Saved"
          });
        }
      } else {
        let anmData = this.getAnonymousResponse;
        anmData.push({
          user_id: "",
          question_id: data.question_id,
          question_unique_name: data.question_unique_name,
          //is_active: true,
          answer: data.answer
        });
        localStorage.setItem("anonymousResponse", JSON.stringify(anmData));
        this.$store.dispatch("updateAnonymousResponse", anmData);
        if (this.isBudgetPage) {
          this.$router.push({ name: "signup" });
          this.$swal({
            type: "info",
            text: "Please signup to store your responses."
          });
          return false;
        }
      }
      /*if (this.isBudgetPage) {
        this.$router.push({ name: "allset" });
      }*/

      if (this.frameContent.unique_name === "you-published-any-research") {
        this.submitClicked = true;
        let response = await this.$util.post(
          this.$util.questionsEntryPoint + "/v1/student-input/submit-response",
          { user_id: localStorage.getItem("user_id") }
        );
        this.submitClicked = false;
        if (response.status === "success") {
          localStorage.removeItem("shortList");
          localStorage.setItem("trigger_tutorial", true);
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            html: `&nbsp; ` + response.message
          });
          this.$store.dispatch("updateQsSubmited", true);
          this.$router.push({ name: "actionPlan" });
        } else {
          submitInput = false;
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "error",
            html: `&nbsp; Did we mess up? Give it another try.`
          });
          return false;
        }
      } else {
        this.$router.push({ name: this.frameContent.nextQuestion });
      }
    },
    async finalClick() {
      var vm = this;
      return new Promise((resolve, reject) => {
        let resp_obj = {
          status: true,
          redirect_url: "",
          message: ""
        };
        for (
          let index = 0;
          index < vm.getQuestionsList.questions.length;
          index++
        ) {
          const element = vm.getQuestionsList.questions[index];
          let data = vm.getAnswerById(element._id);

          if (data.question_unique_name.includes("important")) {
            data.answer = {
              actual_priorities: vm.getMostImportantListPaid.map(item => {
                return { type: item.type, score: item.score };
              }),
              formulated_priorities: vm.getUserPrioritys
            };
          }

          let errorReport = validator.validate(
            data.answer,
            data.question_unique_name
          );
          if (errorReport.status == "error") {
            resp_obj.status = false;
            resp_obj.redirect_url = data.question_unique_name;
            resp_obj.message = errorReport.message;
            break;
          }
        }
        console.log(resp_obj);

        resolve(resp_obj);
      });

      this.currentId = this.frameContent.id;
      var data = this.getAnswerById(this.currentId);
    },
    redirect() {
      window.location.href = this.$util.homeURL;
    }
  },
  created() {
    this.isMobile = this.$util.mobileAndTabletCheck();
  }
};
</script>

<style>
.not-active-left {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
  border: 1px solid #d9d9d9;
  background: url("../../../assets/images/left-arrow-ash.svg") no-repeat #fff
    center;
}
.not-active-right {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
  background: url("../../../assets/images/right-arrow-ash.svg") no-repeat #fff
    center;
}
.question-progress-bar {
  width: var(--barWidth);
}
</style>