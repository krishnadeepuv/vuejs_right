<template>
  <div>
    <div class="question-loader" v-if="apiLoad">
      <div>
        <img src="../../../assets/images/dual-ring.svg" alt width="50" />
      </div>
    </div>
    <div
      v-if="!getScenarioById(getActiveScenario).shortListedPrograms.length"
      class="db_content"
    >
      <div class="shortlist-empty" style>
        <img src="../../../assets/images/empty-list.svg" width="75%" alt />
        <p align="center" style="font-size:16px;margin-top:15px">
          Jinkies! There don't seem to be any programs
          <br />here. Why not
          <a href="#" style="color:#fa7b50" @click.prevent="resetDashBoard()"
            >add</a
          >
          a few to start with?
        </p>
      </div>
    </div>

    <div v-else class="db_content">
      <div class="pg-sub-hdr">
        <h3>Shortlist Programs</h3>
        <button
          type="button"
          class="show-slist mobile-hide"
          @click.prevent="saveShortList()"
        >
          Save as final list
        </button>
      </div>
      <div class="admi_uni_list">
        <div
          v-for="(item, index) in getScenarioById(getActiveScenario)
            .shortListedPrograms"
          :key="index"
          class="db_pro_item amb_pro"
        >
          <div class="db_pro_card">
            <div class="pro_dtl_main">
              <div class="apply-ddline">
                {{ item.application_deadline }}
                <span>Application Deadline</span>
              </div>
              <div class="univ_img">
                <img src="../../../assets/images/university-img.png" alt />
              </div>
              <div class="univ_dtl">
                <h2>{{ item.university_name }}</h2>
                <p>
                  {{
                    item.city +
                      ", " +
                      (item.state ? item.state + ", " : "") +
                      item.country
                  }}
                </p>
                <span>{{ item.degree + ", " + item.program_name }}</span>
              </div>
            </div>

            <div class="db_pro_action">
              <button
                type="button"
                class="white"
                :id="item.program_id"
                @click="
                  removeFromShortlist({ id: $event.target.id, type: 'remove' })
                "
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        style="display:none;width: 100%;"
        class="show-slist mobile-show"
        @click.prevent="saveShortList()"
      >
        Save as final list
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      apiLoad: false,
    };
  },
  computed: {
    ...mapGetters(["getActiveScenario", "getScenarioById"]),
  },
  methods: {
    removeFromShortlist(data) {
      let payload = {
        programId: data.id,
        scenarioId: this.getActiveScenario,
        type: "remove",
      };
      this.$store.dispatch("updateShortlistByScenarioId", payload);
    },
    async saveShortList() {
      // this.showAddScenario = false;
      let payload = [];
      this.getScenarioById(this.getActiveScenario).shortListedPrograms.forEach(
        (element) => {
          payload.push(element.program_id);
        }
      );
      if (payload.length <= 0) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; ` + `Please shortlist first`,
        });
        return false;
      }
      let activeScenario = this.getScenarioById(this.getActiveScenario);
      this.apiLoad = true;
      let result = await this.$util.put(
        this.$util.dashboardEntryPoint + "/v1/dashboard/final-shortlist",
        {
          user_id: localStorage.getItem("user_id"),
          scenario_id: activeScenario.scenario_id,
          program_ids: payload,
          username: localStorage.getItem("user_name"),
        }
      );
      this.apiLoad = false;
      if (result.status == "success") {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          html: `&nbsp; ` + result.message,
        });
        this.showFinalList = true;
        this.$store.dispatch("updateSideBarTriggers", true);
        $("body").addClass("no-scroll");
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; ` + "Did we mess up? Give it another try.",
        });
        return false;
      }
    },
    resetDashBoard() {
      this.$store.dispatch("updateSideBarTriggers", false);
      this.$store.dispatch("updateTriggerFinalShortList", false);
      this.$store.dispatch("updateActiveTab", "scenario");
      $("#scenarioTab a").addClass("active");
      $("#searchTab a,#data_playTab a,#moreTab a,#shortlistTab a").removeClass(
        "active"
      );
    },
  },
  created() {
    let current_url = document.location.href;
    if (!current_url.includes("shortlist")) {
      current_url = location.origin + "/dashboard/shortlist";
      window.history.pushState({ path: current_url }, "", current_url);
    }
  },
};
</script>
