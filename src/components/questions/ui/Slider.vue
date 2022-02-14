<template>
  <div class="carousel-control-main" :data="numberOfScreens">
    <a class="left carousel-control" :href="dataTarget" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <ol class="carousel-indicators">
      <li
        :data-target="dataTarget"
        v-for="(item,index) in numberOfScreens"
        :data-slide-to="item-1"
        class="disable-indicators"
        :class="{active: item==1?true:false}"
        name="some"
        :key="index"
      ></li>
    </ol>
    <a
      class="carousel-control-next waves-effect waves-light"
      id="slideNext"
      :href="dataTarget"
      @click.prevent="slideNext()"
      style="height: 42px;"
    >
      <!--  -->
      <span v-if="!showNextLoading">Next</span>
      <img
        v-else
        style="height: 32px;margin-top: -5px;"
        src="../../../assets/images/roller-loading.svg"
      />
    </a>
    <!-- v-if="!isBudgetPage" -->
    <!-- data-slide="next" -->
    <!-- <router-link
      class="carousel-control-next waves-effect waves-light"
      v-else
      :to="{ name: 'allset'}"
    >Next</router-link>-->
    <a class="right carousel-control" :href="dataTarget" @click.prevent="slideNext()">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
    <!-- data-slide="next" -->
    <!-- v-if="!isBudgetPage" -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import validator from "../../../assets/js/validate-answers.js";
export default {
  data() {
    return {
      isBudgetPage: false,
      currentId: "",
      showNextLoading: false
    };
  },
  /**history */
  watch: {
    $route(to, from) {
      // console.log(to);
    }
  },
  /**history */
  props: ["numberOfScreens", "dataTarget"],
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
      "getUserName"
    ])
  },
  methods: {
    validate(userInput, question_unique_name) {
      /** Name screen */
      if (question_unique_name === "and-you-are") {
        if (userInput.length <= 0) {
          return {
            status: "error",
            message: "Please enter a valid input."
          };
        } else if (!/^[A-Za-z ]+$/.test(userInput)) {
          return {
            status: "error",
            message: "Numbers and special characters are not allowed."
          };
        }
      } else if (question_unique_name === "which-of-these-are-you") {
        /** Current status screen */
        if (userInput.length <= 0) {
          return {
            status: "error",
            message: "At least one to be selected"
          };
        }
      } else if (question_unique_name === "what-do-you-want-to-study") {
        /** universities screen */
        if (userInput.programs.length <= 0) {
          return {
            status: "error",
            message: "At least one to be selected"
          };
        }
      } else if (question_unique_name === "what-are-your-scores") {
        /** Scores screen */
        if (userInput.gre.quant < 130 || userInput.gre.quant > 170) {
          return {
            status: "error",
            message: "Invalid input: GRE-quant"
          };
        } else if (userInput.gre.verbal < 130 || userInput.gre.verbal > 170) {
          return {
            status: "error",
            message: "Invalid input: GRE-verbal"
          };
        } else if (userInput.gre.AWA < 0 || userInput.gre.AWA > 6) {
          return {
            status: "error",
            message: "Invalid input: GRE-AWA"
          };
        } else if (userInput.gre.AWA % 0.5 != 0) {
          return {
            status: "error",
            message: "Invalid input: GRE-AWA"
          };
        }

        let ieltsInput = 0;
        let tofelInput = 0;
        for (const key of Object.keys(userInput.ielts)) {
          if (key === "total") continue;
          ieltsInput += userInput.ielts[key] ? userInput.ielts[key] : 0;
          tofelInput += userInput.tofel[key] ? userInput.tofel[key] : 0;
        }

        if (ieltsInput == 0 && tofelInput == 0) {
          return {
            status: "error",
            message: "Atleast one should be opted - TOFEL/IELTS"
          };
        }
        if (ieltsInput == 0) {
          for (const key of Object.keys(userInput.tofel)) {
            if (key === "total") continue;
            if (userInput.tofel[key] < 1 || userInput.tofel[key] > 30) {
              return {
                status: "error",
                message: "Invalid input: TOFEL-" + key
              };
            }
            // console.log(key, obj[key]);
          }
        }

        if (tofelInput == 0) {
          for (let key of Object.keys(userInput.ielts)) {
            if (key === "total") continue;
            if (userInput.ielts[key] < 0.5 || userInput.ielts[key] > 9) {
              return {
                status: "error",
                message: "Invalid input: IELTS-" + key
              };
            } else if (userInput.ielts[key] % 0.5 != 0) {
              return {
                status: "error",
                message: "Invalid input: IELTS-" + key
              };
            }
          }
        }
      } else if (question_unique_name === "most-important-thing-for-you") {
        /** priority screens */
        if (this.getIsPaidUser) {
          //  return {
          //     status: "error",
          //     message: "Invalid input: IELTS-" + key
          //   };
        }
      } else if (question_unique_name === "your-bachelor-degree") {
        /** bachelor screen */
        /* else if (question_unique_name === "work-experience") {
        if (userInput === "") {
          return {
            status: "error",
            message: "Invalid input"
          };
        }
      }*/
        if (userInput.institution == "-1") {
          return {
            status: "error",
            message: "At least one to be selected - Institution"
          };
        }
      } else if (question_unique_name == "you-published-any-research") {
        /** research screen */
        for (const key of Object.keys(userInput)) {
          if (userInput[key] < 0 || userInput[key] > 20) {
            return {
              status: "error",
              message: "Invalied input - " + userInput[key]
            };
          }
        }
      } else if (question_unique_name == "maximum-cost-of-attendance") {
        /** budget screen */
        if (userInput["budget"] < 0 || userInput["budget"] > 30000000) {
          return {
            status: "error",
            message: "Invalied input - Budget cannot be more than 3 Cr"
          };
        }
      } else {
        return {
          status: "all-good"
        };
      }
      return {
        status: "all-good"
      };
    },
    async slideNext() {
      //validate
      this.currentId = $("div.active").find("h3")[0].id;
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
      if (this.isBudgetPage) {
        this.$router.push({ name: "allset" });
      }
      $(".carousel").carousel("next");
    }
  },
  mounted() {
    var vm = this;
    $(function() {
      vm.currentId = $("div.active").find("h3")[0].id;
      $(".carousel").carousel(vm.getActiveSlideIndex);
      if (vm.getUserName) {
        vm.slideNext();
      }
      // console.log($("#" + vm.currentId).attr("name"));
    });
    $(".carousel").carousel({
      interval: false,
      wrap: false
    });
    $(".carousel").on("slide.bs.carousel", function(event) {
      var slide = 0;
      vm.currentId = event.relatedTarget.querySelectorAll("h3")[0].id;

      /*var slideFrom = $(this).find(".active.item h3");
      //.index();
      console.log(slideFrom);*/
      var slideTo = $(event.relatedTarget).index();
      vm.$store.dispatch("updateActiveSlideIndex", slideTo);
      // console.log("from:" + slideTo);

      /**history */
      let currentScreen = $("#" + vm.currentId).attr("name");
      // console.log(currentScreen);

      vm.$router.push({
        name: "questions-screen",
        params: { questionName: currentScreen }
      });
      /**history */

      /** new flow */
      /*if (vm.getIsPaidUser)*/
      slide = event.relatedTarget.querySelectorAll("div.pq-research-paper");
      /*else slide = event.relatedTarget.querySelectorAll("div.fq-budget");*/

      if (slide.length > 0) vm.isBudgetPage = true;
      else vm.isBudgetPage = false;
    });
  }
};
</script>

<style scoped>
.disable-indicators {
  pointer-events: none;
}
</style>
