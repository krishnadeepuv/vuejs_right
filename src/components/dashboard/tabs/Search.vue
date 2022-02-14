<template>
  <div class="db_content">
    <div v-if="getIsPaidUser">
      <div class="search-top">
        <input
          type="search"
          id="inputSearch"
          style="text-align: left;"
          v-model="searchKey"
          autofocus
          placeholder="Search College, Programs, University etc.,"
        />
      </div>
      <div v-if="!searchKey" class="search-list-container">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card bg-none">
              <div class="search-empty-results">
                <img src="../../../assets/images/start-search.svg" width height alt="Start Search" />
                <p style="font-size: 16px;">
                  Hello! Try
                  <span>searching</span> for a university/program above. If you like it, you can
                  then add it to your
                  shortlist!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="emptyResults" class="search-empty-results">
          <img style="widht:900px" src="../../../assets/images/no-data-anim.svg" alt />
          <p style="font-size: 16px;">
            Jeepers! We don't seem to have that in our database. Try again
            with a different program,
            maybe?
          </p>
        </div>
        <div v-else>
          <img v-if="resultLoading" class="magImg" src="../../../assets/images/magnify.svg" alt />
          <div v-else class="admi_uni_list" style="margin-top :40px">
            <div v-for="(item,index) in searchResults" :key="index" class="db_pro_item amb_pro">
              <div class="db_pro_card">
                <div class="pro_dtl_main">
                  <div class="apply-ddline">
                    {{item.application_deadline}}
                    <span>Application Deadline</span>
                  </div>
                  <div class="univ_img">
                    <img src="../../../assets/images/university-img.png" alt />
                  </div>
                  <div class="univ_dtl">
                    <h2>{{item.university_name}}</h2>
                    <p>{{item.city + ", " + (item.state?(item.state + ", "):"") + item.country}}</p>
                    <span>{{item.degree+", "+item.program_name}}</span>
                  </div>
                </div>
                <div class="mac-value">
                  <div>
                    <span>Match to Expectations</span>
                    <p>{{(parseFloat(item.match_to_expectation) ? parseFloat(item.match_to_expectation).toFixed(1) : 0)}} %</p>
                  </div>
                  <div class="admission">
                    <span>Admission Chances</span>
                    <p>{{(parseFloat(item.admission_chance) ? parseFloat(item.admission_chance).toFixed(1) : 0)}} %</p>
                  </div>
                  <div>
                    <span>Cost of Attendance</span>
                    <p>
                      <i class="rupee">₹</i>
                      {{(((parseFloat(item.cost_of_attendance) ? item.cost_of_attendance : 0) / 100000).toFixed(2))}} L
                    </p>
                  </div>
                </div>
                <div class="db_pro_action">
                  <button
                    type="button"
                    class="white"
                    :name="item.program_id"
                    @click.prevent="updateShortlistByScenarioId({id:$event.target.name,type:'add'})"
                  >Add to Shortlist</button>
                  <button
                    type="button"
                    class="view-dtl-btn"
                    :id="item.program_id"
                    @click.prevent="showDetails($event.target.id)"
                  >View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else style>
      <div class="search-top">
        <input
          type="search"
          id="inputSearch"
          style="text-align: left;"
          placeholder="Search College, Programs, University etc.,"
        />
      </div>
      <div class="row" v-if="isMobile">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card bg-none">
            <div class="search-empty">
              <img
                src="../../../assets/images/get-prime.png"
                style="width:75% !important"
                height
                alt="Go Premium..."
              />
              <p style="font-size: 16px;">
                <span style="color:gray;font-size: 20px;font-weight:400">
                  <i
                    @click="openMore()"
                    style="color:rgb(250, 123, 80);cursor:pointer;font-style: inherit;"
                  >Refer</i> to Unlock
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card bg-none">
            <div class="data-empty" style=" width: 420px;">
              <img src="../../../assets/images/get-prime.png" alt="Go Premium..." />
              <span style="color:gray;font-size: 20px;font-weight:400">
                <i
                  @click="openMore()"
                  style="color:rgb(250, 123, 80);cursor:pointer;font-style: inherit;"
                >Refer</i> to Unlock
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import programList from "../ProgramList.vue";
import pageFooter from "../layout/Footer.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      searchKey: "",
      searchResults: [],
      emptyResults: false,
      resultLoading: false,
      scenario: {},
      isMobile: false
    };
  },
  watch: {
    getActiveScenario(value) {
      this.searchResults = [];
      this.searchKey = "";
    }
  },
  components: {
    programList,
    pageFooter
  },
  computed: {
    ...mapGetters(["getScenarioById", "getActiveScenario", "getIsPaidUser"])
  },
  methods: {
    ...mapActions(["updateUnlockTriggers"]),
    async search() {
      if (this.searchKey.length >= 3) {
        this.resultLoading = true;
        let response = await this.$util.get(
          this.$util.dashboardEntryPoint +
            "/v1/dashboard/" +
            localStorage.getItem("user_id") +
            "/" +
            this.getScenarioById(this.getActiveScenario).scenario_id +
            "/search?term=" +
            this.searchKey
        );
        this.resultLoading = false;
        if (response.status === "success") {
          this.searchResults = response.message;
          this.$store.dispatch("updateSearchData", response.message);
          // this.showSearchLoading = false;
          if (this.searchResults.length > 0) {
            this.emptyResults = false;
          } else {
            this.emptyResults = true;
            this.$swal({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000,
              type: "error",
              html: `&nbsp; Sorry. We couldn’t find this among world’s top 500 universities.`
            });
            // $(".search-dropdown").removeClass("open");
            // $(".search-bar").removeClass("search-open");
          }
        } else {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "error",
            html: `&nbsp; Search failed.`
          });
          return false;
        }
      } else {
        if (this.searchKey.length > 0 && this.searchKey.length <= 2) {
          this.resultLoading = false;
          this.emptyResults = true;
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "error",
            html: `&nbsp; Search key should be greater than "two" characters.`
          });
        }
        // this.showSearchLoading = false;
        // $(".search-dropdown").removeClass("open");
        // $(".search-bar").removeClass("search-open");
      }
    },
    triggerPayment() {
      /*this.$router.push({ name: "selectPlan" });*/
      this.$store.dispatch("updateTriggerPayment", true);
    },
    showDetails(id) {
      this.$store.dispatch("updateShowProgramDetails", true);
      this.$store.dispatch("updateActiveProgram", id);
      $("body").addClass("no-scroll");
    },
    updateShortlistByScenarioId(data) {
      var payload = {};
      if (data.type === "add") {
        if (this.validate(data.id)) {
          // this.animateToCart();
          payload = {
            type: "add",
            scenarioId: this.getActiveScenario,
            programId: data.id
          };
          this.shortlistCount++;
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            html: `&nbsp; Shortlisted successfully!`
          });
        } else {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "warning",
            html: `&nbsp; You already shortlisted the program!`
          });
          return false;
        }
      } else {
        payload = {
          programId: data.id,
          scenarioId: this.getActiveScenario,
          type: "remove"
        };
        this.shortlistCount--;
      }
      this.$store.dispatch("updateShortlistByScenarioId", payload);
    },
    validate(program_id) {
      let shortListedPrograms = this.scenario.shortListedPrograms;
      let program = shortListedPrograms.filter(
        item => item.program_id == program_id
      );
      if (program.length > 0) return false;
      else return true;
    },
    openMore() {
      this.$store.dispatch("updateActiveTab", "more");
      $("#moreTab a").addClass("active");
      $("ul#sideNav")
        .find("li")
        .each(function() {
          $(this)
            .children()
            .removeClass("active");
        });
      // $("#scenarioTab a").removeClass("active");
      $("#searchTab a").removeClass("active");
      if (this.$util.mobileAndTabletCheck()) {
        localStorage.setItem("openRef", true);
      }
    }
  },
  created() {
    let current_url = document.location.href;
    if (!current_url.includes("search")) {
      current_url = location.origin + "/dashboard/search";
      window.history.pushState({ path: current_url }, "", current_url);
    }
    this.isMobile = this.$util.mobileAndTabletCheck();
  },
  mounted() {
    this.scenario = this.getScenarioById(this.getActiveScenario);
    var vm = this;
    if (this.getIsPaidUser) {
      $("#inputSearch").focus();
    }

    $("#inputSearch").on("input", () => {
      console.log(22);

      $("#inputSearch").trigger("keyup");
    });
    $("#inputSearch").keyup(
      delay(function(e) {
        // vm.resultLoading = true;
        // vm.emptyResults = false;
        vm.search(this.value);
      }, 500)
    );
    $("#inputSearch").on("keyup input", () => {
      vm.resultLoading = true;
      vm.emptyResults = false;
    });
  }
};
function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      callback.apply(context, args);
    }, ms || 0);
  };
}
</script>

