<template>
  <div>
    <!-- <div name="Warming Up..." class="loader loader-animation">
      <img src="../../assets/images/loading-anim1.svg" />
    </div>-->
    <div class="question-loader">
      <div>
        <img src="../../assets/images/dual-ring.svg" alt width="50" />
      </div>
    </div>
  </div>
</template>

<script>
// import freeQuestions from "./free/";
// import premiumQuestions from "./premium/";
import { mapGetters } from "vuex";
// import Simplebar from "simplebar";
// import questionsIntermittent from "./intermittent/";
export default {
  data() {
    return {
      isUserPaid: false,
      loadPage: false,
      questionsList: [],
      userName: "",
      questionCount: 0,
      screensOrder: [
        "which-of-these-are-you",
        "discipline-for-your-masters",
        "where-all-would-you-apply",
        "what-do-you-want-to-study",
        "what-are-your-country-preferences",
        "most-important-thing-for-you",
        "what-are-your-scores",
        "work-experience",
        "your-bachelor-degree",
        "you-published-any-research"
      ]
    };
  },
  computed: {
    ...mapGetters(["getIsPaidUser", "getredirectTriggred", "getDomainId"])
  },
  methods: {
    error() {
      this.loadPage = false;
      this.$swal({
        type: "error",
        text: "Something went wrong. Please try again."
      });
      return false;
    },
    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },
    getQuestionText(questionName) {
      if (this.questionsList.questions) {
        let questionData = this.questionsList.questions.filter(item => {
          return item.unique_name == questionName;
        })[0];

        return {
          id: questionData._id,
          text: questionData.text,
          unique_name: questionName
          //unique_name: item.unique_name
        };
      } else return { text: "Error" };
    },
    async mapQuestionIds(questionsList) {
      return new Promise((resolve, reject) => {
        questionsList.questions.forEach(element => {
          this.$store.dispatch("updateQuestionScreens", {
            question_unique_name: element.unique_name,
            id: element._id
          });
        });
        resolve(questionsList);
      });
    },
    async mapAnswers(payload) {
      return new Promise((resolve, reject) => {
        payload.forEach(element => {
          this.$store.dispatch("mapQuestionScreensWithAnswers", {
            id: element.question_id,
            answer: element.answer
          });
        });
        resolve(payload);
      });
    },
    async mapFormulatedPriorities(data) {
      return new Promise((resolve, reject) => {
        data.forEach(element => {
          let payload = {
            type: element.type,
            value: element.score,
            user: "paid"
          };
          this.$store.dispatch("updateMostImportant", payload);
        });
        resolve(data);
      });
    }
  },
  async created() {
    /** new flow */
    /*let userStatus = await this.$util.get(
      this.$util.paymentEntryPoint+"/v1/user/" + localStorage.getItem("user_id") + "/order-status"
    );
    this.user_status = userStatus.message === "paid" ? true : false;*/

    let subdomain_id = 1;
    let userStatus = { status: "success", message: "paid" };
    let query_info = this.$route.path.slice(1).split("/");

    try {
      if (window.location.href.includes("referral")) {
        window.localStorage.clear();
        let token = this.$util.getQueryStringValue("referral");
        console.log(this.$util.signupURL);

        window.location.href =
          this.$util.signupURL + "?message=referral&token=" + token;
        return false;
      }

      if (this.$util.getQueryStringValue("token")) {
        this.$store.dispatch("resetAuth");
        this.$store.dispatch("resetDashboard");
        this.$store.dispatch("resetQuestionState");
        let auth = this.parseJwt(this.$util.getQueryStringValue("token"));
        localStorage.setItem("token", this.$util.getQueryStringValue("token"));
        localStorage.setItem("user_id", auth.sub);
        localStorage.setItem(
          "user_name",
          auth.name.charAt(0).toUpperCase() + auth.name.slice(1)
        );
        localStorage.setItem(
          "ref_token",
          this.$util.getQueryStringValue("ref_token")
        );

        let response = await this.$util.get(
          this.$util.dashboardEntryPoint +
            "/v1/dashboard/" +
            localStorage.getItem("user_id") +
            "/scenario"
        );
        if (response.status === "success") {
          if (response.message.scenarios.length > 0) {
            this.$router.push({ name: "user-dashboard" });
            return false;
          }
        }

        // userStatus = await this.$util.get(
        //   this.$util.paymentEntryPoint +
        //     "/v1/user/" +
        //     localStorage.getItem("user_id") +
        //     "/order-status"
        //);
      } else if (localStorage.getItem("user_id")) {
        let response = await this.$util.get(
          this.$util.dashboardEntryPoint +
            "/v1/dashboard/" +
            localStorage.getItem("user_id") +
            "/scenario"
        );
        if (response.status === "success") {
          if (response.message.scenarios.length > 0) {
            this.$router.push({ name: "user-dashboard" });
            return false;
          }
        }

        // userStatus = await this.$util.get(
        //   this.$util.paymentEntryPoint +
        //     "/v1/user/" +
        //     localStorage.getItem("user_id") +
        //     "/order-status"
        //);
      } else {
        window.location.href = this.$util.ssoURL + "/?message=loginFirst";
        return false;
      }

      if (!this.getDomainId || this.getDomainId < 1) {
        if (localStorage.getItem("user_id")) {
          let ansResponse = await this.$util.get(
            this.$util.questionsEntryPoint +
              "/v1/student-input/" +
              localStorage.getItem("user_id") +
              "/" +
              (userStatus.message === "paid" ? "paid" : "free")
          );
          let domain_ans = ansResponse.message.filter(
            item => item.question_unique_name === "discipline-for-your-masters"
          )[0];
          if (domain_ans) {
            subdomain_id =
              domain_ans.answer.subdomain_id > 0
                ? domain_ans.answer.subdomain_id
                : 1;
          }
        } else {
          subdomain_id = localStorage.getItem("subdomain_id")
            ? localStorage.getItem("subdomain_id")
            : 1;
        }
      } else {
        subdomain_id = this.getDomainId;
      }

      //**Get Universities */
      let university_programs = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/program-university-list/" +
          subdomain_id
      );
      if (university_programs.status === "success") {
        university_programs = university_programs.message.program_university;
      } else {
        return this.error();
      }

      //**Get Programs */
      let program_list = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/program-list/" +
          subdomain_id
      );
      if (program_list.status === "success") {
        program_list = program_list.message.program_list;
      } else {
        return this.error();
      }

      /** Specialization */

      let special_list = await this.$util.get(
        this.$util.questionsEntryPoint + "/v1/master-data/specialization/" + 1
      );
      if (special_list.status === "success") {
        if (subdomain_id <= 1) {
          special_list = special_list.message.specialization;
        } else {
          special_list = [];
        }
      } else {
        return this.error();
      }

      //**Get Countries */
      let country_list = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/countries/" +
          subdomain_id
      );
      if (country_list.status === "success") {
        country_list = country_list.message.country;
      } else {
        return this.error();
      }

      //**Get Colleges for degreedetails */
      let college_list = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/bachelor/college-list/" +
          subdomain_id
      );
      if (college_list.status === "success") {
        college_list = college_list.message.bachelor_college.sort((a, b) => {
          if (a.college_name > b.college_name) {
            return 1;
          } else {
            return -1;
          }
        });
        /*let _other = college_list.filter(
        item => item.college_name === "Other"
      )[0];

      college_list = college_list.filter(item => item.college_name != "Other");
      college_list.push(_other);*/
      } else {
        return this.error();
      }

      //**Get program/degree for degreedetails */
      let pd_list = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/bachelor/college-program-list/" +
          subdomain_id
      );
      if (pd_list.status === "success") {
        pd_list = pd_list.message.bachelor_programs;
      } else {
        return this.error();
      }

      //**Get subdomain */
      let subdomain_list = [
        {
          subdomain_id: 1,
          subdomain_name: "Computer Science and Engineering"
        },
        {
          subdomain_id: 2,
          subdomain_name: "Electronics and Communications Engineering"
        },
        { subdomain_id: 3, subdomain_name: "Mechanical Engineering" }
      ];
      /* let subdomain_list = await this.$util.get(
      this.$util.questionsEntryPoint + "/v1/master-data/subdomains"
    );
    if (subdomain_list.status === "success") {
      subdomain_list = subdomain_list.message.subdomains;
    } else {
      return this.error();
    }*/

      this.$store.dispatch("updateDropDownData", {
        university_programs,
        program_list,
        special_list,
        country_list,
        college_list,
        pd_list,
        subdomain_list
      });

      let payload = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/questions/" +
          (userStatus.message ? "paid" : "free")
      );
      if (payload.status == "error") {
        this.$swal({
          type: "error",
          text: payload.message
        });
        return false;
      }
      this.questionsList = payload.message;

      this.questionCount = payload.message.questions.length;
      await this.$store.dispatch("updateQuestionsList", payload.message);
      await this.mapQuestionIds(payload.message);

      let ansResponse = { status: "", message: [] };
      if (localStorage.getItem("user_id")) {
        ansResponse = await this.$util.get(
          this.$util.questionsEntryPoint +
            "/v1/student-input/" +
            localStorage.getItem("user_id") +
            "/" +
            (userStatus.message ? "paid" : "free")
        );
      } else {
        /** revert this if commented */
        if (localStorage.getItem("anonymousResponse")) {
          ansResponse.status = "success";
          ansResponse.message = JSON.parse(
            localStorage.getItem("anonymousResponse")
          );
        }
      }
      if (ansResponse.status === "success") {
        this.$store.dispatch("updateAnswersList", ansResponse.message);
      } else {
        this.$store.dispatch("updateAnswersList", []);
      }

      let preFilled = ansResponse.message;
      // console.log(preFilled);
      let priData = [];
      if (preFilled.length > 0) {
        await this.mapAnswers(preFilled);

        priData = preFilled.filter(
          item => item.question_unique_name == "most-important-thing-for-you"
        );
        if (priData.length > 0) {
          if (priData[0].answer.actual_priorities) {
            priData = priData[0].answer.actual_priorities;
            await this.mapFormulatedPriorities(priData);
          }
        }
        if (localStorage.getItem("routed_from")) {
          let from = localStorage.getItem("routed_from");
          if (this.getredirectTriggred) {
            this.$store.dispatch("updateRedirectTriggred", false);
            if (from.includes("questions/")) {
              this.$router.go(-1);
              return false;
            }
          }
        }

        this.$router.push({
          name: this.screensOrder[
            preFilled.length >= this.questionsList.questions.length
              ? preFilled.length - 1
              : preFilled.length
          ]
        });
      } else {
        if (localStorage.getItem("routed_from")) {
          let from = localStorage.getItem("routed_from");
          if (this.getredirectTriggred) {
            this.$store.dispatch("updateRedirectTriggred", false);
            if (from.includes("questions/")) {
              this.$router.go(-1);
              return false;
            }
          }
        }
        this.$router.push({ name: "which-of-these-are-you" });
      }
      this.$store.dispatch("updateIsPaidUser", userStatus.message);
    } catch (error) {
      this.$swal({
        type: "error",
        text: JSON.stringify(error)
      });
    }
  }
};
</script>

<style>
</style>
