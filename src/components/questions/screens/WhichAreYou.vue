<template>
  <question-frame v-if="load" :frameContent="frameContent">
    <template v-slot:content>
      <div class="question-form">
        <div class="question-form-info">
          <div
            class="q-title which-of-question"
            v-html="frameContent.text"
            :name="frameContent.unique_name"
          >
            Which of these are you?
            <span>(You can select more then one)</span>
          </div>
          <div class="which-of-box">
            <ul>
              <li v-for="(option,index) in options" :key="index">
                <label :class="{'active':option.isChecked}">
                  <input
                    :id="option.id"
                    type="checkbox"
                    :value="option.optionDescription"
                    :checked="option.isChecked"
                    @click="updateUserStatus({sId:$event.target.id,isChecked:$event.target.checked,event:$event})"
                    class="chooseoption"
                  />
                  <div :class="option.class"></div>
                  <span>{{option.optionDescription}}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </question-frame>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import questionFrame from "../ui/QuestionFrame.vue";
export default {
  data() {
    return {
      frameContent: {
        questionClass: "",
        questionIllImg: "question-select-option.svg",
        questionHelpText: [
          "Did you know TOEFL is the most accepted english proficiency test in USA",
          "IELTS is widely accepted in Europe and Australia"
        ],
        previousQuestion: "",
        noPrevious: true,
        noNext: false,
        nextQuestion: "discipline-for-your-masters",
        user_progress: "10"
      },
      load: false
    };
  },
  computed: {
    ...mapGetters(["getUserStatus", "getQuestionsList", "getQsSubmited"]),
    options: {
      get() {
        return this.getUserStatus;
      },
      set(value) {
        // console.log(value);
      }
    }
  },
  props: ["dataObject"],
  components: {
    questionFrame
  },
  methods: {
    ...mapActions(["updateUserStatus"])
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
      "which-of-these-are-you",
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

    //adding and removing styles on selection
    /*$(".chooseoption").change(function() {
      if ($(this).is(":checked")) {
        $(this)
          .parent()
          .addClass("checked");
      } else {
        $(this)
          .parent()
          .removeClass("checked");
      }
    });*/
  }
};
</script>