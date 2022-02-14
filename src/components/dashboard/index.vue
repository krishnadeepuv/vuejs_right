<template>
  <div>
    <!-- <div
      v-if="!loadComponent"
      name="Pulling recommendations for you..."
      class="loader loader-animation"
    >
      <img src="../../assets/images/loading-anim1.svg" />
    </div>-->
    <div v-if="!loadComponent" class="question-loader">
      <div>
        <img src="../../assets/images/dual-ring.svg" alt width="50" />
      </div>
    </div>
    <div v-if="loadComponent">
      <div class="menu-fade" @click.prevent="expandToggle()"></div>
      <a
        href="#nav"
        class="nav__toggle rsp-content"
        role="button"
        aria-expanded="false"
        aria-controls="menu"
        id="mobileSlideNav"
        @click.prevent="expandToggle()"
      >
        <svg
          class="menuicon"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 50 50"
        >
          <title>Toggle Menu</title>
          <g>
            <line class="menuicon__bar" x1="13" y1="16.5" x2="23" y2="16.5" />
            <line class="menuicon__bar" x1="13" y1="24.5" x2="37" y2="24.5" />
            <line class="menuicon__bar" x1="13" y1="24.5" x2="37" y2="24.5" />
            <line class="menuicon__bar" x1="13" y1="24.5" x2="30" y2="24.5" />
            <line class="menuicon__bar" x1="13" y1="32.5" x2="37" y2="32.5" />
            <circle class="menuicon__circle" r="23" cx="25" cy="25" />
          </g>
        </svg>
      </a>
      <div class="mbl-top-bar rsp-content">
        <img src="../../assets/images/gr_logo_icon.png" alt width="35" />
      </div>

      <div class="select-db">
        <a href="#" class="push-arrow rsp-hide" id="pushMenu" @click.prevent="expandToggle()">
          <img src="../../assets/images/pushmenu-arrow.png" alt="Push Menu Arrow" />
        </a>
        <vertical-nav></vertical-nav>
        <div class="db_main">
          <horizontalNav></horizontalNav>
          <scenarioTab v-if="getActiveTab==='scenario'" :scenarioObject="scenario"></scenarioTab>
          <search-tab v-if="getActiveTab==='search'"></search-tab>
          <more-tab v-if="getActiveTab==='more'"></more-tab>
          <data-play v-if="getActiveTab==='data_play'"></data-play>
          <shortList :dataObject="scenario.shortListedPrograms" v-if="getActiveTab ==='shortlist'"></shortList>
          <app-footer></app-footer>
        </div>

        <!-- program details -->

        <div class="slideRightWindow" :class="{show:expandProgram}" id="proDtl-full">
          <div class="slide-fade" @click.prevent="resetProgramDetails()"></div>
          <div class="slideRight_content">
            <a href="#" class="close_popup" @click.prevent="resetProgramDetails()">
              <img src="../../assets/images/popup-close.svg" alt />
            </a>
            <div class="hdr">Program Details</div>
            <div class="pro-dtl-full">
              <div class="pro-dtl-oflow">
                <div class="db_pro_card p-relative">
                  <div class="pro_dtl_main">
                    <div class="apply-ddline">
                      {{activeProgram.application_deadline}}
                      <span>Application Deadline</span>
                    </div>
                    <div class="univ_img">
                      <img src="../../assets/images/university-img.png" alt />
                    </div>
                    <div class="univ_dtl">
                      <h2>{{activeProgram.university_name}}</h2>
                      <p>{{activeProgram.city + ", " + (activeProgram.state?(activeProgram.state + ", "):"") + activeProgram.country}}</p>
                      <span>{{activeProgram.degree +", "+activeProgram.program_name}}</span>
                    </div>
                  </div>
                  <div class="mac-value">
                    <div>
                      <span>Match to Expectations</span>
                      <p>{{parseFloat(activeProgram.match_to_expectation).toFixed(1)+" %"}}</p>
                    </div>
                    <div class="admission">
                      <span>Admission Chances</span>
                      <p>{{parseFloat(activeProgram.admission_chance).toFixed(1)+" %"}}</p>
                    </div>
                    <div>
                      <span>Cost of Attendance</span>
                      <p>
                        <i class="rupee">₹</i>
                        {{' '+(activeProgram.cost_of_attendance / 100000).toFixed(2) + ' L'}}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-if="false" class="db_pro_card">
                  <b>Fund Options</b>
                  <div class="mac-value">
                    <div>
                      <span>Lenders Available</span>
                      <p>58.2</p>
                    </div>
                    <div class="admission">
                      <span>Interest Rate</span>
                      <p>9.5-13%</p>
                    </div>
                    <div>
                      <span>Loan Probability</span>
                      <p>52%</p>
                    </div>
                  </div>
                </div>
                <div class="db_priority_range">
                  <b>Program Metrics</b>
                  <ul>
                    <priority-bar
                      v-for="(item,index) in utilityFactors"
                      :key="index"
                      :value="item.value"
                      :head="item.name"
                      :userValue="item.userValue"
                    ></priority-bar>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- unlock -->
        <div class="slideRightWindow" :class="{show:getUnlockTriggers}" id="UnlockProgram">
          <div class="slideFade" @click="removeScroll();updateUnlockTriggers(false)"></div>
          <div class="content">
            <div class="hdr bg-white">
              <!-- <img
              class="close-window"
              src="../../assets/images/close.svg"
              @click="removeScroll();updateUnlockTriggers(false)"
              alt
              width="20"
              />-->
              Unlock Program
            </div>
            <div class="update-scnr-name">
              <div class="unlock-pro-opt">
                <!-- bg-ref -->
                <div class>
                  <div class="opt by-ref">
                    <div class="refer-img">
                      <!-- <img src="../../assets/images/refer-friend-trans.png" /> -->
                    </div>
                    <span>Give us one, consider it done.</span>
                    <p>
                      Refer 1 friend of yours who is
                      planning to go for a Master’s abroad. Once we verify their
                      identity, we will unlock the platform for you free of charge!
                    </p>
                    <a
                      @click.prevent="copyToClipBoard(referalURL)"
                      style="cursor:pointer"
                      class="waves-effect waves-light"
                    >Refer Now</a>
                    <i
                      v-if="copied"
                      style="    font-size: 12px;
                                height: 20px;
                                text-align: left;
                                padding-top: 7px;
                                position: absolute;
                                bottom: 43px;"
                    >✔ Copied to clipboard</i>
                  </div>
                </div>
                <!-- <div class="sep-or">
                <span>Or</span>
                </div>-->
                <div v-if="false" class="opt by-pay">
                  <span>Let's make higher education great again.</span>
                  <p>
                    "Pay
                    <i class="rupee">₹</i>3850 to get a full year's access to our proprietary, intelligent recommendation
                    engine."
                  </p>
                  <a class="waves-effect waves-light" @click.prevent="triggerPayment()">Buy Plan</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- request call back -->
        <div class="slideRightWindow" :class="{show:getSupportPopUp}" id="RequestCallWindow">
          <div class="slideFade" @click="removeScroll();triggerSupportPopUp(false)"></div>
          <div class="content">
            <div class="hdr">
              <!-- <img
              src="../../assets/images/close.svg"
              alt
              width="20"
              class="close-window"
              @click="removeScroll();triggerSupportPopUp(false)"
              />-->
              Contact Us
            </div>
            <div class="d-flex align-items-center justify-content-center flex-column">
              <div class="support-container">
                <div class="sp-call-img">
                  <!-- <img src="../../assets/images/support-contact.jpg" width height alt /> -->
                </div>
                <h3>Contact Us</h3>

                <p>+91 8684994017</p>
                <div class="or">Or</div>

                <div class="req-call">
                  <input type="number" v-model="mobileNumber" placeholder="Phone Number" />
                  <button @click.prevent="callbackRequest()">Request for Callback</button>
                  <p>Bear with us. You will get a call back in 48 hrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ref pannel -->
        <div class="slideRightWindow" id="refPanel" style="right: -500px;">
          <div class="refer-panel">
            <div class="hdr">
              <!-- <img
              src="../../assets/images/right-chevron.svg"
              @click="removeScroll();updateRefTriggred(false)"
              style="cursor:pointer"
              class="refer-back"
              alt
              width="20"
              />-->
              <div class="ref-hdr">Refer your Friends</div>
            </div>
            <div class="refer-contents">
              <div class="refer-three-img">
                <!-- <img src="../../assets/images/refer-friend.png" alt /> -->
              </div>
              <div class="ref-orng-block">
                <h2>Give us one, consider it done.</h2>
                <p>
                  Refer 1 friend of yours who is
                  planning to go for a Master’s abroad. Once we verify their
                  identity, we will unlock the platform for you free of charge!
                </p>
                <div class="refer-input">
                  <button type="button" @click="updateShowRefOptions(true)" class="btn">Refer Now</button>
                </div>
                <div class="refer-input cust-hide">
                  <input
                    type="text"
                    id="refInput"
                    :value="referalURL"
                    @click="copyToClipBoard()"
                    readonly
                    style="text-align: left;color:gray;"
                  />
                  <!-- <img
                  @click.prevent="copyToClipBoard()"
                  width="30px"
                  style="cursor:pointer;margin-left:-7%"
                  src="../../assets/images/copy.svg"
                  alt
                  />-->
                </div>
                <!-- <i
                v-show="copied"
                style="font-size: 12px;
                display: inline-block; height:20px;
                text-align: left;
                padding-top: 7px;"
                v-html="'✔ Copied to clipboard'"
                ></i>-->
              </div>
            </div>
          </div>
        </div>
        <!-- apply factors -->
        <div class="slideRightWindow" :class="{show:getTriggerFactors}" id="ChangeFactor">
          <div class="slide-fade" @click="updateTriggerFactors(false)"></div>
          <div class="slideRight_content">
            <a href="#" class="close_popup" @click.prevent="updateTriggerFactors(false)">
              <img src="../../assets/images/popup-close.svg" alt />
            </a>
            <div class="hdr">Change Scenario Factors</div>
            <scenario-factors></scenario-factors>
            <div v-if="factorsApplied" class="fltr-btn">
              <img
                src="../../assets/images/scenario_loading.svg"
                style="padding-left: 44%;padding-top:3.5%"
                alt="loading...."
              />
              <!-- <p
                style="color: rgb(250, 123, 80);text-align: center;margin-top: -26px;font-size: 15px;font-style: italic;"
              >Applying factors...</p>-->
            </div>
            <div v-else @click.prevent="applyFactors()" class="factors-action">
              <button type="button">Apply Factors</button>
            </div>
          </div>
        </div>

        <!-- final shortlist -->

        <div class="slideRightWindow" id="ShowShortlist" :class="{show:getSideBarTriggers}">
          <div class="slide-fade" @click="updateSideBarTriggers(false)"></div>
          <div class="slideRight_content">
            <a href="#" class="close_popup" @click.prevent="updateSideBarTriggers(false)">
              <img src="../../assets/images/popup-close.svg" alt />
            </a>
            <div class="hdr">Final shortlist</div>
            <final-shortlist v-if="getSideBarTriggers"></final-shortlist>
          </div>
        </div>
        <ref-help></ref-help>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import horizontalNav from "./layout/HorizontalNav.vue";
import verticalNav from "./layout/VerticalNav.vue";
import scenarioTab from "./tabs/Scenario.vue";
import priorityBar from "./ui/PriorityBars.vue";
import searchTab from "./tabs/Search.vue";
import finalShortlist from "./FinalShortlist.vue";
import moreTab from "./tabs/More.vue";
import scenarioFactors from "./ScenarioFactors.vue";
import validator from "../../assets/js/validate-answers.js";
import dataPlay from "./tabs/DataPlayground.vue";
import refHelp from "./ui/ReferHelp.vue";
import appFooter from "./layout/Footer.vue";
import shortList from "./tabs/ShortList.vue";
export default {
  data() {
    return {
      showLock: true,
      mobileNumber: "",
      showPageLoading: false,
      showSaveasLoader: false,
      scenario: {},
      shortList: [],
      shortListCount: 0,
      vSliderMax: 0,
      vSliderMin: 0,
      scenarioName: "",
      expandProgram: false,
      isPaidUser: false,
      loadComponent: false,
      activeTab: "scenario",
      activeProgram: {
        program_id: 0,
        university_id: 0,
        program_name: "N/A",
        university_name: "N/A",
        match_to_expectation: 0,
        admission_chance: 0,
        cost_of_attendance: 0,
        value_for_money: 0,
        estimated_loan: 0,
        application_deadline: "N/A",
        is_user_selected: true,
        degree_duration: "N/A",
        showButton: false
      },
      programTemplate: {
        program_id: 0,
        university_id: 0,
        program_name: "N/A",
        university_name: "N/A",
        match_to_expectation: 0,
        admission_chance: 0,
        cost_of_attendance: 0,
        value_for_money: 0,
        estimated_loan: 0,
        application_deadline: "N/A",
        is_user_selected: true,
        degree_duration: "N/A",
        showButton: false
      },
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
      referalURL: "",
      copied: false,
      showFinalList: true,
      savingFinalList: false,
      isMoreTrigger: false,
      factorsApplied: false
    };
  },
  computed: {
    ...mapGetters([
      "getShowProgramDetails",
      "getActiveProgram",
      "getSideBarTriggers",
      "getActiveScenario",
      "getScenarioIds",
      "getScenarioById",
      "getActiveTab",
      "getSearchData",
      "getUnlockTriggers",
      "getSupportPopUp",
      "getRefTriggred",
      "getFinalShortListTriggers",
      "getTriggerFactors",
      "getPlaygroundData",
      "getSideMenuToggles"
    ])
  },
  methods: {
    ...mapActions([
      "updateSideBarTriggers",
      "updateUnlockTriggers",
      "triggerSupportPopUp",
      "updateRefTriggred",
      "updateTriggerFinalShortList",
      "updateTriggerFactors",
      "updateTriggerPayment",
      "updateShowRefOptions"
    ]),
    triggerPayment() {
      /*this.$router.push({ name: "selectPlan" });*/
      this.$store.dispatch("updateTriggerPayment", true);
    },
    resetProgramDetails() {
      this.expandProgram = false;
      this.$store.dispatch("updateShowProgramDetails", false);
      this.$store.dispatch("updateActiveProgram", 0);
      $("body").removeClass("no-scroll");
    },
    removeScroll() {
      $("body").removeClass("no-scroll");
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
    updateName(value) {
      if (value.trim().length <= 0) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; Scenario name cannot be empty`
        });
        return false;
      }
      let scenarioWithSameName = this.getScenarioIds.filter(item => {
        if (!(this.getActiveScenario == item.scenarioId)) {
          return item.name.toLowerCase().trim() == value.toLowerCase().trim();
        }
      });
      if (scenarioWithSameName.length > 0) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; Scenario name should be unique`
        });
        return false;
      }
      this.$util.put(
        this.$util.dashboardEntryPoint + "/v1/dashboard/scenario-name",
        {
          user_id: localStorage.getItem("user_id"),
          scenario_id: this.getScenarioById(this.getActiveScenario).scenario_id,
          name: value
        }
      );
      this.$store.dispatch("updateScenarioName", {
        value: value,
        scenarioId: this.getActiveScenario
      });
    },
    removeFromShortlist(data) {
      let payload = {
        programId: data.id.replace("SLDL", ""),
        scenarioId: this.getActiveScenario,
        type: "remove"
      };

      this.$store.dispatch("updateShortlistByScenarioId", payload);
    },
    removeAnchor(event) {
      let id = event.target.parentElement.id;
      this.removeFromShortlist({ id });
    },
    resetShortListPop() {
      this.$store.dispatch("updateSideBarTriggers", false);
      this.isMoreTrigger = false;
      this.showFinalList = false;
      this.$store.dispatch("updateTriggerFinalShortList", false);
    },
    copyToClipBoard(copiableText) {
      var copyText = document.getElementById("refInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.copied = true;
      var vm = this;
      setTimeout(() => {
        vm.copied = false;
      }, 1000);
      this.$store.dispatch("updateShowRefOptions", true);
    },
    async saveShortList() {
      // this.showAddScenario = false;
      let payload = [];
      this.scenario.shortListedPrograms.forEach(element => {
        payload.push(element.program_id);
      });
      if (payload.length <= 0) {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; ` + `Please shortlist first`
        });
        return false;
      }
      let activeScenario = this.getScenarioById(this.getActiveScenario);
      this.savingFinalList = true;
      let result = await this.$util.put(
        this.$util.dashboardEntryPoint + "/v1/dashboard/final-shortlist",
        {
          user_id: localStorage.getItem("user_id"),
          scenario_id: activeScenario.scenario_id,
          program_ids: payload,
          username: localStorage.getItem("user_name")
        }
      );
      this.savingFinalList = false;
      if (result.status == "success") {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          html: `&nbsp; ` + result.message
        });
        this.showFinalList = true;
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; ` + "Did we mess up? Give it another try."
        });
        return false;
      }
    },
    async callbackRequest() {
      this.infoMessage = "";
      this.mobileClass = "";
      this.showMessage = false;
      if (/^\d{10}$/.test(parseInt(this.mobileNumber))) {
        let response = await this.$util.post(
          this.$util.assistanceEntryPoint + "/v1/request-callback",
          {
            user_id: localStorage.getItem("user_id"),
            phone: "+91" + this.mobileNumber
          }
        );
        if (response.status === "success") {
          this.$store.dispatch("triggerSupportPopUp", false);
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            html: `&nbsp; ` + response.message
          });
        } else {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "error",
            html: `&nbsp; Did we mess up? Give it another try.`
          });
        }
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; Oh no! Try using an Indian mobile.`
        });
      }
    },
    async applyFactors() {
      this.factorsApplied = true;
      //console.log(this.scenario);
      this.$store.dispatch("updateShowSaveScenario", false);
      let data = Object.assign(
        {},
        this.getScenarioById(this.getActiveScenario).filters
      );
      let modifiedData = [];
      let errorReport = "";
      for (const key of Object.keys(data)) {
        if (key == "scores") {
          modifiedData.push({
            data: data[key],
            uniques_name: "what-are-your-scores"
          });
        } else if (key == "work_experience") {
          modifiedData.push({
            data: data[key],
            uniques_name: "work-experience"
          });
        } else if (key == "match_to_expectation_threshold") {
          modifiedData.push({ data: data[key], uniques_name: "match-to-exp" });
        } else if (key == "maximum_cost_of_attendance") {
          modifiedData.push({
            data: data[key],
            uniques_name: "maximum-cost-of-attendance-dboard"
          });
        } else if (key == "programs_intrested") {
          modifiedData.push({
            data: { programs: data[key].selectedList },
            uniques_name: "what-do-you-want-to-study"
          });
        }
      }
      let count = 0;
      for (let index = 0; index < modifiedData.length; index++) {
        const element = modifiedData[index];
        errorReport = validator.validate(element.data, element.uniques_name);
        if (errorReport.status == "error") {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "error",
            html: `&nbsp; ` + errorReport.message
          });
          break;
        }
        count++;
      }
      if (count == 5) {
        this.factorsApplied = true;
        let factors = {};
        factors.area_of_interest = data.area_of_interest.selectedList.map(
          item => {
            return { id: item.id, specialization: item.value };
          }
        );
        factors.country = data.country.selectedList.map(item => {
          return { id: item.id, name: item.value };
        });
        factors.programs_intrested = data.programs_intrested.selectedList.map(
          item => {
            return { id: item.id, program: item.value };
          }
        );
        factors.match_to_expectation_threshold =
          data.match_to_expectation_threshold;
        factors.maximum_cost_of_attendance = data.maximum_cost_of_attendance;
        factors.challenge_fair_likely = data.challenge_fair_likely;
        factors.work_experience = data.work_experience;
        factors.savings = data.savings;
        factors.scores = data.scores;
        let gre = await factors.scores.gre;
        for (const key of Object.keys(gre)) {
          gre[key] = parseInt(gre[key]);
        }
        let ielts = await factors.scores.ielts;
        for (const key of Object.keys(ielts)) {
          ielts[key] = parseFloat(ielts[key]);
        }

        let toefl = await factors.scores.toefl;
        for (const key of Object.keys(toefl)) {
          toefl[key] = parseInt(toefl[key]);
        }
        factors.scores.gre.total = parseInt(gre.quant) + parseInt(gre.verbal);
        factors.scores.ielts.total = (
          (parseFloat(ielts.learning) +
            parseFloat(ielts.reading) +
            parseFloat(ielts.writing) +
            parseFloat(ielts.speaking)) /
          4
        ).toFixed(1);
        factors.scores.toefl.total =
          parseInt(toefl.learning) +
          parseInt(toefl.reading) +
          parseInt(toefl.writing) +
          parseInt(toefl.speaking);
        factors.scores = {
          gre: factors.scores.gre,
          ielts: factors.scores.ielts,
          toefl: factors.scores.toefl
        };
        let response = await this.$util.put(
          this.$util.dashboardEntryPoint +
            "/v1/dashboard/scenario/apply-factors",
          {
            user_id: localStorage.getItem("user_id"),
            subdomain_id: this.getScenarioById(this.getActiveScenario)
              .subdomain_id,
            scenario_id: this.getScenarioById(this.getActiveScenario)
              .scenario_id,
            factors
          }
        );
        if (response.status === "success") {
          let scenarioList = [response.message];
          let scenarioData = await this.mapScenarioData(scenarioList);
          this.$store.dispatch("mapUpdatedScenarioData", scenarioData[0]);
          this.scenario = scenarioData[0];
          this.showAddScenario = true;
          this.factorsApplied = false;
          this.$store.dispatch("updateTriggerFactors", false);
          this.removeScroll();
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 6000,
            type: "success",
            html: `&nbsp; Factors applied successfully. You can click on "Save as new scenario" to save the changes in new scenario`
          });

          this.$store.dispatch("updateShowSaveScenario", true);
        } else {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            type: "error",
            html: `&nbsp; Did we mess up? Give it another try.`
          });
          this.factorsApplied = false;
          return false;
        }
      }
      this.factorsApplied = false;
    },
    resetDashBoard() {
      this.$store.dispatch("updateSideBarTriggers", false);
      this.$store.dispatch("updateTriggerFinalShortList", false);
      this.$store.dispatch("updateActiveTab", "scenario");
      $("#scenarioTab").addClass("active");
      $("#searchTab a,#data_playTab a,#moreTab a,shortlistTab a").removeClass(
        "active"
      );
    },
    expandToggle() {
      $("body").toggleClass("menu-open");
    },
    activateTab(tab, loading) {
      this.$store.dispatch("updateRefTriggred", false);
      if (loading) {
        setTimeout(() => {
          $("ul#sideNav li.active").removeClass("active");
          $("ul#sideNav li a").removeClass("active");
          $("li#moreTab a").removeClass("active");
          $("#" + tab + "Tab" + " a").addClass("active");
        }, 500);
      } else {
        $("ul#sideNav li.active").removeClass("active");
        $("ul#sideNav li a").removeClass("active");
        $("li#moreTab a").removeClass("active");
        $("#" + tab + "Tab" + " a").addClass("active");
      }

      this.$store.dispatch("updateActiveTab", tab);

      window.scroll({
        top: 0,
        left: 0
        // behavior: "smooth"
      });

      if (this.$util.mobileAndTabletCheck()) {
        this.$store.dispatch("updateSideMenuToggles", true);
      }
    }
  },
  components: {
    horizontalNav,
    verticalNav,
    scenarioTab,
    priorityBar,
    searchTab,
    finalShortlist,
    moreTab,
    scenarioFactors,
    dataPlay,
    refHelp,
    appFooter,
    shortList
  },
  watch: {
    getShowProgramDetails(value) {
      if (value) {
        this.expandProgram = value;
      }
    },
    getActiveProgram(value) {
      let program = {};
      if (value) {
        program = this.scenario.user_programs.filter(
          item => item.program_id === value
        )[0];
        if (!program) {
          program = this.scenario.recommended_programs.filter(
            item => item.program_id === value
          )[0];
        }
        if (!program) {
          program = this.getSearchData.filter(
            item => item.program_id === value
          )[0];
        }
        if (!program) {
          program = this.getPlaygroundData.filter(
            item => item.program_id === value
          )[0];
        }

        if (program) {
          this.activeProgram = program;
        } else {
          this.activeProgram = this.programTemplate;
        }
      } else {
        this.activeProgram = this.programTemplate;
      }
      if (Object.entries(program).length > 0) {
        if (String(program.program_id).length > 1) {
          for (const key of Object.keys(program.utility)) {
            this.utilityTemplate.filter(item => item.type === key)[0].value = (
              program.utility[key] * 10
            ).toFixed(1);
            this.utilityTemplate.filter(
              item => item.type === key
            )[0].userValue = this.scenario.filters.utility[key].toFixed(1);
          }
          let sortedList = Object.assign([], this.utilityTemplate);
          sortedList = sortedList
            .sort((a, b) => parseFloat(a.value) - parseFloat(b.value))
            .reverse();
          //.splice(0, 5);
          this.utilityFactors = sortedList;
        }
      }
    },
    getActiveScenario(value) {
      this.scenario = this.getScenarioById(value);
    },
    getFinalShortListTriggers(value) {
      if (value) {
        this.$store.dispatch("updateSideBarTriggers", true);
        this.showFinalList = true;
        this.isMoreTrigger = true;
      }
    },
    getRefTriggred(value) {
      if (value) {
        $("#refPanel").css("right", "0");
        document.getElementById("content-more").style.marginRight = "500px";
        document.getElementById("fadediv").style.visibility = "visible";
      } else {
        $("#refPanel").css("right", "-500px");
        document.getElementById("content-more").style.marginRight = "0";
        document.getElementById("fadediv").style.visibility = "hidden";
      }
    },
    getSideMenuToggles(value) {
      if (value) {
        this.expandToggle();
        this.$store.dispatch("updateSideMenuToggles", false);
      }
    },
    $route(to, from) {
      if (to.path.includes("scenario")) {
        this.activateTab("scenario", false);
      } else if (to.path.includes("search")) {
        this.activateTab("search", false);
      } else if (to.path.includes("shortlist")) {
        this.activateTab("shortlist", false);
      } else if (to.path.includes("data-")) {
        this.activateTab("data_play", false);
      } else if (to.path.includes("more")) {
        this.activateTab("more", false);
      }
    }
  },
  beforeCreate() {
    if (!localStorage.getItem("user_id")) {
      localStorage.setItem("previousUrl", "/");
      localStorage.setItem("currentUrl", "/");
      this.$swal({
        type: "info",
        text: "Please login to access dashboard."
      });
      window.location = this.$util.ssoURL;
    }
  },
  async created() {
    if (localStorage.getItem("user_id")) {
      if (this.getActiveScenario <= 0) {
        let userStatus = await this.$util.get(
          this.$util.paymentEntryPoint +
            "/v1/user/" +
            localStorage.getItem("user_id") +
            "/order-status"
        );
        this.isPaidUser = userStatus.message === "paid" ? true : false;
        this.$store.dispatch("updateIsPaidUser", this.isPaidUser);
        let response = await this.$util.get(
          this.$util.dashboardEntryPoint +
            "/v1/dashboard/" +
            localStorage.getItem("user_id") +
            "/scenario"
        );
        if (response.status === "success") {
          if (response.message.scenarios.length == 0) {
            this.$router.push({ name: "questions" });
            this.$swal({
              type: "info",
              html:
                "Please answer all the questions and <b>submit</b> your responses to access the dashboard."
            });
            return false;
          }
        }
        // if (this.isPaidUser) {
        //   this.showLock = false;
        // }
        let scenarioData;
        if (response.status === "success") {
          scenarioData = await this.mapScenarioData(response.message.scenarios);
          this.$store.dispatch("mapScenarioData", scenarioData);
          this.scenario = scenarioData[0];
          this.$store.dispatch("updateActiveScenario", scenarioData[0]._id);
        } else {
          localStorage.setItem("previousUrl", "/");
          localStorage.setItem("currentUrl", "/");
          // this.$router.push({ name: "home" });
          window.location = this.$util.homeURL;
          this.$swal({
            type: "error",
            text: "Unable to access the dashboard. Please try again."
          });
          return false;
        }
      } else {
        let userStatus = await this.$util.get(
          this.$util.paymentEntryPoint +
            "/v1/user/" +
            localStorage.getItem("user_id") +
            "/order-status"
        );
        this.isPaidUser = userStatus.message === "paid" ? true : false;
        // if (this.isPaidUser) {
        //   this.showLock = false;
        // }
        this.$store.dispatch(
          "updateIsPaidUser",
          userStatus.message === "paid" ? true : false
        );
        this.scenario = this.getScenarioById(this.getActiveScenario);
      }
      let localShortList = JSON.parse(localStorage.getItem("shortList"));

      if (localShortList) {
        this.scenario.shortListedPrograms = localShortList.filter(
          item => item.scenario_id == this.scenario._id
        ).length
          ? localShortList.filter(
              item => item.scenario_id == this.scenario._id
            )[0].shortList
          : [];
        this.shortlistCount = this.scenario.shortListedPrograms.length;

        this.scenario.shortListCount = this.scenario.shortListedPrograms.length;

        this.getScenarioIds.forEach(element => {
          if (
            localShortList.filter(
              item => item.scenario_id == element.scenarioId
            ).length <= 0
          ) {
            let item = {
              scenario_id: element.scenarioId,
              shortList: []
            };
            localShortList.push(item);
          }
        });
        localStorage.setItem("shortList", JSON.stringify(localShortList));
      } else {
        let shortList = [];
        this.getScenarioIds.forEach(element => {
          let item = {
            scenario_id: element.scenarioId,
            shortList: []
          };
          shortList.push(item);
        });
        localStorage.setItem("shortList", JSON.stringify(shortList));
      }
    }
    this.$util.freshChatInIt();
    this.loadComponent = true;
    if (document.location.href.includes("search")) {
      this.activateTab("search", true);
    } else if (document.location.href.includes("shortlist")) {
      this.activateTab("shortlist", true);
    } else if (document.location.href.includes("data-")) {
      this.activateTab("data_play", true);
    } else if (document.location.href.includes("more")) {
      this.activateTab("more", true);
    } else {
      this.$store.dispatch("updateActiveTab", "scenario");
    }
    this.referalURL =
      window.location.origin + "?referral=" + localStorage.getItem("ref_token");
    if (localStorage.getItem("shortlistFired")) {
      this.$store.dispatch("updateActiveTab", "more");

      this.$store.dispatch("updateTriggerFinalShortList", true);
      setTimeout(() => {
        $("#moreTab a").addClass("active");
        $("#scenarioTab a").removeClass("active");
        $("#searchTab a").removeClass("active");
        $("body").addClass("no-scroll");
      }, 500);
      localStorage.removeItem("shortlistFired");
    }

    $("body").addClass("db_page");
  },
  beforeDestroy() {
    $("body").removeClass("db_page");
    $("body").removeClass("menu-open");
  }
};
</script>


<style scoped>
.legend-scale {
  margin: 0 0px 0 0px;
  margin-bottom: 5px;
  padding: 0;
  float: left;
  list-style: none;
  display: flex;

  width: 80%;
  flex-wrap: wrap;
}
.legend-labels span {
  display: inline;
  float: left;
  height: 16px;
  width: 3px;
  margin-right: 5px;
  margin-left: 0;
}

.legend-labels {
  margin-right: 20px;
}

.legend-labels i {
  background: #ececec;
  width: 20px;
  height: 20px;
  display: inline-flex;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-family: times new roman;
  font-weight: 700;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.26);
  margin: 0 5px;
}
</style>