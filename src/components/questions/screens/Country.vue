<template>
  <question-frame v-if="load" :frameContent="frameContent">
    <template v-slot:content>
      <div class="question-form">
        <div class="question-form-info">
          <div
            class="q-title"
            v-html="frameContent.text"
            :name="frameContent.unique_name"
          >What do you want to study?</div>

          <div class="study-what-form">
            <div class="form-input-block">
              <label for>Country</label>
              <auto-complete inputName="country" placeholderText="Search"></auto-complete>
            </div>
          </div>
        </div>
      </div>
    </template>
  </question-frame>
</template>

<script>
import questionFrame from "../ui/QuestionFrame.vue";
import autoComplete from "../ui/InputAutoComplete";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      load: true,
      frameContent: {
        questionClass: "",
        questionIllImg: "country-anim.svg",
        questionHelpText: [
          "We currently cover programs from United States of America, Australia, Canada, Germany and Sweden.",
          "Did you know some countries provide free education if you are proficient in thier mother tongue."
        ],
        previousQuestion: "what-do-you-want-to-study",
        noPrevious: false,
        noNext: false,
        nextQuestion: "most-important-thing-for-you",
        user_progress: "50",
        id: "",
        text: "",
        unique_name: ""
      }
    };
  },
  components: {
    questionFrame,
    autoComplete
  },
  computed: {
    ...mapGetters(["getQuestionsList", "getQsSubmited"])
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
      "what-are-your-country-preferences",
      this.getQuestionsList
    );

    if (result.status) {
      this.frameContent.id = result.id;
      this.frameContent.text = result.text;
      this.frameContent.unique_name = result.unique_name;
      this.load = true;
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