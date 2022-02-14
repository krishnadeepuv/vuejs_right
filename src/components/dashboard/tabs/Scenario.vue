<template>
  <div>
    <div class="question-loader" v-if="scenarioLoader">
      <div>
        <img src="../../../assets/images/dual-ring.svg" alt width="50" />
      </div>
    </div>
    <div class="db_content">
      <div class="db_box_main">
        <ul>
          <li @click="filter('red')">
            <i class="top-amb"></i>
            <div>
              {{this.amb_count}}
              <p style="color:#f54e5b">Ambitious</p>
            </div>
          </li>
          <li @click="filter('yellow')">
            <i class="top-mod"></i>
            <div>
              {{this.mod_count}}
              <p style="color:#fac44a">Moderate</p>
            </div>
          </li>
          <li @click="filter('green')">
            <i class="top-safe"></i>
            <div>
              {{this.safe_count}}
              <p style="color:#5cd039">Safe</p>
            </div>
          </li>
          <li @click="filter('short')">
            <i></i>
            <div>
              {{(getScenarioById(getActiveScenario)).shortListedPrograms.length}}
              <p>Shortlist</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="prolist-tab">
        <div class="factor_filter">
          <a
            v-if="getIsPaidUser"
            href="#"
            class="show-factors"
            @click.prevent="openFactors();updateTriggerFactors(true)"
          >Change Factor</a>
        </div>
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#ListTab" data-toggle="tab" @click.prevent="isRecommended=false" class>
              My List
              <span>({{scenarioObject.user_programs.length}})</span>
            </a>
          </li>
          <li class>
            <a
              href="#RecommendedTab"
              data-toggle="tab"
              @click.prevent="isRecommended=true"
              id="recom"
              class
            >
              Recommended List
              <span>({{scenarioObject.recommended_programs.length}})</span>
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="ListTab">
            <div class="db_pro_list">
              <div v-if="isUserListEmpty" class="no-programs">
                <!-- <img
                src="../../../assets/images/select-shortlist.png"
                alt
                style="width: 26%;!important"
                />-->
                <p style="text-align: center;">
                  <span style="width: 300px;">
                    Shucks. Looks like you hadn’t provided your own list. That’s
                    <br />okay! You can check
                    out our
                    <span
                      style="color: #fa7b50;"
                    >recommended</span> list!
                  </span>
                </p>
              </div>
              <program-list v-else :classify="false" changeId="user_list"></program-list>
            </div>
          </div>
          <div class="tab-pane" id="RecommendedTab">
            <div v-if="scenarioObject.recommended_programs.length>0">
              <programList changeId="grad_list" v-show="isRecommended" :classify="true"></programList>
            </div>
            <div v-else>
              <div class="no-programs">
                <img src="../../../assets/images/box-image.png" alt style="width: 16%;!important" />
                <p style="text-align: center;margin-top:50px">
                  <span style="width: 300px;">
                    Sorry, no recommendations. Care to
                    <span
                      @click="openFactors();updateTriggerFactors(true)"
                      style="color: #fa7b50;cursor:pointer"
                    >change factors</span>?
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="loadMap">
        <div v-if="getIsPaidUser" class="sec_hdr2">World Map</div>
        <!-- <div class="chart_map"></div> -->
        <world-bubble v-if="getIsPaidUser && refreshMap" :classify="isRecommended"></world-bubble>
      </template>
    </div>
  </div>
</template>

<script>
import programList from "../ProgramList.vue";
import appFooter from "../layout/Footer.vue";
// import worldBubble from "../WorldBubble.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      currentScenario: {},
      // openFactors: false,
      isRecommended: false,
      chkChallange: true,
      chkFair: true,
      chkLikely: true,
      scenarioLoader: false,
      isUserListEmpty: false,
      isGradListEmpty: false,
      refreshMap: true,
      isDesktop: true,
      loadMap: false,
      utilityTemplate: [
        {
          type: "accreditation",
          name: "Accreditation",
          value: 0,
          userValue: 0
        },
        {
          type: "alumni",
          name: "Alumni",
          value: 0,
          userValue: 0
        },
        {
          type: "facultyQuality",
          name: "Faculty Quality",
          value: 0,
          userValue: 0
        },
        {
          type: "fame",
          name: "Reputation",
          value: 0,
          userValue: 0
        },
        {
          type: "learning",
          name: "Learning",
          value: 0,
          userValue: 0
        },
        {
          type: "research",
          name: "Research",
          value: 0,
          userValue: 0
        },
        {
          type: "indiansInTheCommunity",
          name: "Indians in the Community",
          value: 0,
          userValue: 0
        },
        {
          type: "earnings",
          name: "Earnings",
          value: 0,
          userValue: 0
        },
        {
          type: "safety",
          name: "Safety",
          value: 0,
          userValue: 0
        },
        {
          type: "easeOfSettling",
          name: "Ease of Settling",
          value: 0,
          userValue: 0
        },
        {
          type: "ROED",
          name: "Value for money",
          value: 0,
          userValue: 0
        },
        {
          type: "importanceToMicroField",
          name: "Importance to Micro field",
          value: 0,
          userValue: 0
        }
      ],
      utilityFactors: [],
      scores: {},
      showTofel: true,
      degreeDetails: {},
      showGPA_label: "",
      amb_count: 0,
      mod_count: 0,
      safe_count: 0
    };
  },
  watch: {
    chkChallange(value) {
      // this.classifyList({ value, class: "ch" });
      this.animateAndSegrigate();
      this.checkEmpty();
    },
    chkFair(value) {
      // this.classifyList({ value, class: "fr" });
      this.animateAndSegrigate();
      this.checkEmpty();
    },
    chkLikely(value) {
      // this.classifyList({ value, class: "lk" });
      this.animateAndSegrigate();
      this.checkEmpty();
    },
    scenarioObject(value) {
      if (value.user_programs.length <= 0) {
        this.isUserListEmpty = true;
      }
    },
    getSaveScenarioClicked(value) {
      if (value) {
        this.saveAsNewScenario();
      }
    },
    getActiveScenario(value) {
      this.refreshMap = false;
      setTimeout(() => {
        this.refreshMap = true;
      }, 500);
      this.dataPoints();
    }
  },
  computed: {
    ...mapGetters([
      "getChallengeFilter",
      "getFairFilter",
      "getLikelyFilter",
      "getShowSaveScenario",
      "getScenarioIds",
      "getScenarioById",
      "getActiveScenario",
      "getIsPaidUser",
      "getSaveScenarioClicked"
    ])
  },
  methods: {
    ...mapActions(["updateTriggerFactors", "updateShowSaveScenario"]),
    classifyList(data) {
      $("ul.list-unstyled li").removeClass("is-animated");
      if (data.value) {
        $("ul.list-unstyled li." + data.class).show();
      } else {
        $("ul.list-unstyled li." + data.class).hide();
      }
      $("ul.list-unstyled li").addClass("is-animated");
    },
    animateAndSegrigate() {},
    filter(type) {
      if (type === "short") {
        this.$store.dispatch("updateRefTriggred", false);
        $("ul#sideNav li.active").removeClass("active");
        $("ul#sideNav li a").removeClass("active");
        $("li#moreTab a").removeClass("active");
        $("#shortlistTab" + " a").addClass("active");
        this.$store.dispatch("updateActiveTab", "shortlist");

        window.scroll({
          top: 0,
          left: 0
          // behavior: "smooth"
        });

        if (this.$util.mobileAndTabletCheck()) {
          this.$store.dispatch("updateSideMenuToggles", true);
        }
      } else {
        this.isRecommended = true;
        $("#recom").trigger("click");
        this.$store.dispatch("updateFilterMode", type);
      }
    },
    async mapScenarioData(scenarioData) {
      return new Promise((resolve, reject) => {
        scenarioData.forEach((element, index) => {
          element.recommended_programs = element.recommended_programs.sort(
            (a, b) =>
              parseFloat(a.admission_chance) - parseFloat(b.admission_chance)
          );
          element.user_programs = element.user_programs.sort(
            (a, b) =>
              parseFloat(a.admission_chance) - parseFloat(b.admission_chance)
          );
          element.filters = element.filters[0];
          element.filters.programs_intrested = {
            name: "Programs",
            selectedList: element.filters.programs_intrested.map(item => {
              return { id: item.id, value: item.program };
            })
          };
          element.filters.area_of_interest = {
            name: "Specialization",
            selectedList: element.filters.area_of_interest.map(item => {
              return { id: item.id, value: item.specialization };
            })
          };
          element.filters.country = {
            name: "Country",
            selectedList: element.filters.country.map(item => {
              return { id: item.id, value: item.name };
            })
          };
          element.shortListedPrograms = [];
          element.shortListCount = 0;
        });
        resolve(scenarioData);
      });
    },
    async saveAsNewScenario() {
      this.$store.dispatch("updateSaveScenarioClicked", false);
      if (this.getScenarioIds.length >= 4) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          type: "error",
          html: `&nbsp; Cannot add more scenarios.`
        });
        return false;
      }
      this.scenarioLoader = true;
      let response = await this.$util.post(
        this.$util.dashboardEntryPoint + "/v1/dashboard/scenario/save-as-new",
        {
          user_id: localStorage.getItem("user_id"),
          scenario_id: this.getScenarioById(this.getActiveScenario).scenario_id
        }
      );
      if (response.status === "success") {
        let scenarioList = [response.message];
        let scenarioData = await this.mapScenarioData(scenarioList);
        this.$store.dispatch("updateScenarioList", scenarioData[0]);
        this.scenarioLoader = false;

        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          type: "success",
          html: `&nbsp; A copy of current scenario is created`
        });
        this.$store.dispatch("updateShowSaveScenario", false);
        //window.location.reload();
        $(".switch-scnr").trigger("click");
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          type: "error",
          html: `&nbsp; Did we mess up? Give it another try.`
        });
      }
    },
    checkEmpty() {
      if (!this.chkChallange && !this.chkFair && !this.chkLikely) {
        this.isGradListEmpty = true;
      }
    },
    openFactors() {
      document.body.classList += " no-scroll";
    },
    dataPoints() {
      this.amb_count = 0;
      this.mod_count = 0;
      this.safe_count = 0;
      let scenario = this.getScenarioById(this.getActiveScenario);

      let cfl = scenario.filters.challenge_fair_likely;
      let list = scenario.recommended_programs;
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (parseFloat(element.admission_chance) <= cfl.challenge.to) {
          this.amb_count++;
        } else if (
          parseFloat(element.admission_chance) <= cfl.fair.to &&
          parseFloat(element.admission_chance) > cfl.fair.from
        ) {
          this.mod_count++;
        } else if (parseFloat(element.admission_chance) > cfl.likely.from) {
          this.safe_count++;
        }
      }
    }
  },

  props: ["scenarioObject"],
  components: {
    appFooter,
    programList,
    worldBubble: () =>
      import(/* webpackChunkName:"worldMap" */ "../WorldBubble.vue")
  },
  async created() {
    let current_url = document.location.href;
    if (!current_url.includes("scenario")) {
      current_url = location.origin + "/dashboard/scenario";
      window.history.pushState({ path: current_url }, "", current_url);
    }
    if (this.scenarioObject.user_programs.length <= 0) {
      this.isUserListEmpty = true;
    }

    this.isDesktop = !this.$util.mobileAndTabletCheck();
    this.dataPoints();
    var vm = this;
    setTimeout(() => {
      vm.loadMap = true;
    }, 500);
  },
  beforeDestroy() {
    this.$store.dispatch("updateFilterMode", "");
  }
};
</script>


<style scoped>
.list-enter,
.list-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.tool-info {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 6px;
  display: block;
}
</style>