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

          <div class="study-what-form q-scroll">
            <div class="form-input-block">
              <label for>Select Program(s)</label>
              <auto-complete inputName="programs" placeholderText="Search"></auto-complete>
            </div>
            <div class="form-input-block" v-if="conditionalShow()">
              <label for>Select Specialization(s)</label>
              <auto-complete inputName="specialization" placeholderText="Search"></auto-complete>
            </div>
          </div>
        </div>
      </div>
    </template>
  </question-frame>
</template>

<script>
import questionFrame from "../ui/QuestionFrame.vue";
import autoComplete from "../ui/InputAutoComplete.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      load: true,
      frameContent: {
        questionClass: "",
        questionIllImg: "program-anim.svg",
        questionHelpText: [
          "Some programs require degree completion within fewer years of initial enrollment."
        ],
        previousQuestion: "where-all-would-you-apply",
        noPrevious: false,
        noNext: false,
        nextQuestion: "what-are-your-country-preferences",
        user_progress: "40",
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
  methods: {
    conditionalShow() {
      let show = true;
      if (this.getDomainId > 1) {
        show = false;
      }
      return show;
    }
  },
  computed: {
    ...mapGetters(["getQuestionsList", "getDomainId", "getQsSubmited"])
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
      "what-do-you-want-to-study",
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