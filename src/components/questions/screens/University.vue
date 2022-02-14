<template>
  <question-frame :frameContent="frameContent">
    <template v-slot:content>
      <div class="question-form">
        <div class="question-form-info">
          <div class="q-title" v-html="frameContent.text" :name="frameContent.unique_name"></div>

          <div class="study-what-form">
            <div class="form-input-block">
              <label for>Select Universities</label>
              <auto-complete inputName="university" placeholderText="Select" class="tags_outside"></auto-complete>
            </div>
          </div>
        </div>
      </div>
    </template>
  </question-frame>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import questionFrame from "../ui/QuestionFrame.vue";
import autoComplete from "../ui/InputAutoComplete.vue";
import Tagify from "@yaireo/tagify";

export default {
  data() {
    return {
      load: true,
      frameContent: {
        questionClass: "",
        questionIllImg: "university-anim.svg",
        questionHelpText: [
          "If you choose universities now you will get the probablity metrics for free (for the choosen unis)!",
          "You can search with university abbreviations"
        ],
        previousQuestion: "discipline-for-your-masters",
        noPrevious: false,
        noNext: false,
        nextQuestion: "what-do-you-want-to-study",
        user_progress: "30",
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
    ...mapActions(["updateUniversityAction"])
  },
  computed: {
    ...mapGetters(["getQuestionsList", "getQsSubmited"])
  },
  beforeCreate() {
    //this.$store.dispatch("updateLoading", true);
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
      "where-all-would-you-apply",
      this.getQuestionsList
    );

    if (result.status) {
      this.frameContent.id = result.id;
      this.frameContent.text = result.text;
      this.frameContent.unique_name = result.unique_name;
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