<template>
  <question-frame v-if="load" :frameContent="frameContent">
    <template v-slot:content>
      <div class="question-form">
        <div class="question-form-info">
          <div
            :id="frameContent.id"
            :name="frameContent.unique_name"
            v-html="frameContent.text"
            class="q-title which-of-question"
          >
            How important are these factors?
            <span>(You can select more then one)</span>
          </div>
        </div>
        <div class="chart_center">
          <div class="factor-data">
            <div class="factor-chart">
              <div id="chart-block">
                <div id="myChart"></div>
              </div>

              <div class="priority-lbl">
                <span class>
                  <i></i>Faculty
                </span>
                <span class="research-lbl">
                  <i></i>Research
                </span>
                <span class="indianess-lbl">
                  <i></i>Indian-ness
                </span>
                <span class="value-lbl">
                  <i></i>Money
                </span>
                <span class="alumni-lbl">
                  <i></i>Alumni
                </span>

                <span class="abroad-lbl">
                  <i></i>Abroad
                </span>
                <span class="reputation-lbl">
                  <i></i>Reputation
                </span>
                <span class="earnings-lbl">
                  <i></i>Earnings
                </span>

                <span class="learning-lbl">
                  <i></i>Learning
                </span>

                <span class="performance-lbl">
                  <i></i>Performance
                </span>
                <span class="safety-lbl">
                  <i></i>Safety
                </span>
                <span class="accreditation-lbl">
                  <i></i>Accreditation
                </span>
              </div>
            </div>
            <div v-if="!isMobile" class="factor-range">
              <ul>
                <li v-for="(item,index) in userPriorityData" :key="index">
                  <prioritySlider :dataObject="item"></prioritySlider>
                </li>
              </ul>
            </div>
            <div
              class="add-value rsp-content"
              :class="{'add-pulse':pulse}"
              @click.prevent="pulse=false"
            >
              <a href="#addValue" @click.prevent="showSliders=true">+</a>
            </div>
          </div>
        </div>
        <div v-if="isMobile">
          <div class="add-priority-range" :class="{'select-show':showSliders}">
            <div class="content">
              <div class="priority-hdr-bar">
                <a href="#" class="cnl" @click.prevent="showSliders=false">Cancel</a>
                <a href="#" @click.prevent="showSliders=false" class="sb-link">Submit</a>
              </div>
              <div class="factorslider">
                <div class="factor-range">
                  <ul>
                    <li v-for="(item,index) in userPriorityData" :key="index">
                      <p>{{item.description}}</p>
                      <prioritySlider :dataObject="item"></prioritySlider>
                    </li>
                  </ul>
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
import { mapGetters } from "vuex";
import prioritySlider from "../ui/PrioritySlider.vue";
import questionFrame from "../ui/QuestionFrame.vue";
import chartjs from "chart.js";

export default {
  data() {
    return {
      selecedCount: 0,
      progressedWidth: 0,
      userPriorityData: [],
      currentScore: 0,
      showSliders: false,
      pulse: true,
      enableProgressBar: false,
      quoteText: "",
      load: false,
      frameContent: {
        questionClass: "imp-factors",
        questionIllImg: "segmentation-animate.svg",
        questionHelpText: [
          "Did you know universities have indian communities and associations",
          "You can set a priority scores for the aspects that you expect from your dream univesity and know your chances",
          "‘100’ means very important and ‘0’ means that you don’t care about it"
        ],
        previousQuestion: "what-are-your-country-preferences",
        noPrevious: false,
        noNext: false,
        nextQuestion: "what-are-your-scores",
        user_progress: "60",
        isMobile: false
      }
    };
  },
  props: ["dataObject", "questionText"],
  methods: {
    updateUserInput(event) {
      var progress = 0;
      this.enableProgressBar = true;
      /** new flow */
      /*if (this.getIsPaidUser) progress = 4.16666666667;
      else progress = 16.6666666667;*/
      progress = 4.16666666667;
      var grandParent = event.target.parentElement.parentElement;
      if (
        !grandParent.disabled &&
        this.selecedCount < this.dataObject.mandatorySelections
      ) {
        this.progressedWidth += progress;
        if (event.target.classList[0] == "primary") {
          grandParent.className += " flip";
          grandParent.className += " reduce";
          grandParent.nextElementSibling.classList.remove("hide");
          grandParent.nextElementSibling.className += " increase";
        } else {
          grandParent.className += " flip";
          grandParent.disabled = true;
        }

        this.selecedCount++;
        /** new flow */
        // this.getIsPaidUser &&
        if (this.selecedCount >= 24) {
          this.$store.dispatch("updateAllSelected", true);
        }
        /** new flow */
        // if (!this.getIsPaidUser && this.selecedCount >= 6) {
        //   this.$store.dispatch("updateAllSelected", true);
        // }
        this.$store.dispatch("updateMostImportant", {
          sId: event.target.id,
          isChecked: event.target.checked,
          type: event.target.name,
          user: this.dataObject.type,
          score: this.currentScore
        });
        // console.log({
        //   sId: event.target.id,
        //   isChecked: event.target.checked,
        //   type: event.target.name,
        //   user: this.dataObject.type,
        //   score: this.currentScore
        // });

        this.currentScore--;
      }
    },
    reset(event) {
      /** new flow */
      /* this.$store.dispatch(
        "resetPriorities",
        this.getIsPaidUser ? "mostImportantListPaid" : "mostImportantList"
      );*/
      this.enableProgressBar = false;
      this.$store.dispatch("resetPriorities", "mostImportantListPaid");
      this.$store.dispatch("updateAllSelected", false);
      this.progressedWidth = 0;
      this.selecedCount = 0;
      var listItems = $("#priorityList li");
      for (let li of listItems) {
        li.disabled = false;
        var divs = li.querySelectorAll("div.priority-item");
        var count = 0;

        for (let element of divs) {
          count++;
          if (count == 1) {
            $(element).removeClass("flip");
            $(element).removeClass("reduce");
          } else if (count == 2) {
            $(element).addClass("hide");
            $(element).removeClass("flip");
            $(element).removeClass("increase");
            $(element).prop("disabled", false);
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      "getIsPaidUser",
      "getMostImportantListPaid",
      "getMostImportantList",
      "getUserName",
      "getQuestionsList",
      "getQsSubmited"
    ])
  },
  watch: {
    getUserName(value) {
      this.quoteText =
        `<span style="color:#fa7b50">` +
        (localStorage.getItem("user_name")
          ? localStorage.getItem("user_name")
          : value) +
        `</span>, you are you and your dreams are you-nique to you. Let me get a picture of what you’re seeking.`;
    }
  },
  components: {
    // questionQuote,
    prioritySlider,
    questionFrame
  },
  created() {
    /** new flow */
    /*if (this.getIsPaidUser) {*/
    this.userPriorityData = this.getMostImportantListPaid;
    this.isMobile = this.$util.mobileAndTabletCheck();

    /*} else this.userPriorityData = this.getMostImportantList;*/
    // this.currentScore = this.dataObject.mandatorySelections;
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
      "most-important-thing-for-you",
      this.getQuestionsList
    );

    if (result.status) {
      this.frameContent.id = result.id;
      this.frameContent.text = result.text;
      this.frameContent.unique_name = result.unique_name;
      this.load = true;

      setTimeout(() => {
        this.$util.renderChart(this.getMostImportantListPaid);
      }, 200);
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