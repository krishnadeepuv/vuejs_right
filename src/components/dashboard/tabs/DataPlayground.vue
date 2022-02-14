<template>
  <div>
    <div v-if="loading" class="search-list-container" style="height:999px">
      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card bg-none">
            <div class="data-empty" style="900px!important">
              <img src="../../../assets/images/data-table-loading.png" alt="loading..." />
              <p>loading....</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="db_content">
      <div class="data-play-title">
        <h2>Data Playground</h2>
        <p>Welcome to the Data playground! This is where you can play with multiple program filters, and export the data to a CSV. Pretty neat, isn’t it?</p>
      </div>
      <div v-if="!getIsPaidUser" class="dataPlay-empty">
        <span style="color:#fa7b50;cursor:pointer;" @click="openMore()">Refer</span> to Unlock
      </div>
      <div v-if="getIsPaidUser">
        <div class="dplay-filter">
          <input
            type="serach"
            v-model="searchKey"
            class="dplay-serach-input"
            placeholder="Search College, Programs, University etc.,"
          />
          <div class="data_factor_filter">
            <a href="#" @click.prevent="toggleSlider(true)" class="show-factors">Filter Programs by</a>
          </div>
        </div>
        <div class="dplay-search">
          <button type="button" class="exp-csv" @click.prevent="exportCSV()">Export CSV</button>
        </div>

        <div class="dplay_tbl">
          <div class="table-sorter-wrapper table-responsive">
            <table id="data_tbl" class="display" width="100%"></table>
          </div>
          <div class="pagination-sec">
            <div class="dplay-pagination">
              {{tableInfo}}
              <div class>
                <a href="#" @click.prevent="previousAction()" class="pg-prev"></a>
                <a href="#" @click.prevent="nextAction()" class="pg-next"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!getIsPaidUser">
        <img src="../../../assets/images/get-access-blur.png" style="width:100%" alt />
      </div>
    </div>
    <div class="slideRightWindow" :class="{show:toggleFilters}" id="ChangeFactor">
      <div class="slide-fade" @click="toggleSlider(false)"></div>
      <div class="slideRight_content">
        <a href="#" class="close_popup" @click.prevent="toggleSlider(false)">
          <img src="../../../assets/images/popup-close.svg" alt />
        </a>
        <div class="hdr">Filter Programs by</div>
        <div class="fltr-pro-item">
          <ul>
            <li>
              <span class="fltr-lbl">Admission Chance</span>
              <div class="fltr-inputs">
                <div class="custom-radio-actions">
                  <input type="radio" v-model="admissionFilter" name="adm" id="adm_gthan" value="1" />
                  <label class="pointer" for="adm_gthan">Is greater than</label>
                  <input type="radio" v-model="admissionFilter" name="adm" id="adm_lthan" value="0" />
                  <label class="pointer" for="adm_lthan">Is lesser than</label>
                </div>
                <div class="fltr-input">
                  <input type="number" v-model="admissionMax" placeholder="0 to 100" />
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">Match to Expectation</span>
              <div class="fltr-inputs">
                <div class="custom-radio-actions">
                  <input type="radio" name="match" v-model="matchFilter" id="match_gthan" value="1" />
                  <label class="pointer" for="match_gthan">Is greater than</label>
                  <input type="radio" name="match" id="match_lthan" v-model="matchFilter" value="0" />
                  <label class="pointer" for="match_lthan">Is lesser than</label>
                </div>
                <div class="fltr-input">
                  <input type="number" v-model="matchMax" placeholder="0 to 100" />
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">Value for Money</span>
              <div class="fltr-inputs">
                <div class="custom-radio-actions">
                  <input
                    type="radio"
                    name="vm"
                    id="vm_gthan"
                    v-model="valueForMoneyFilter"
                    value="1"
                  />
                  <label class="pointer" for="vm_gthan">Is greater than</label>
                  <input
                    type="radio"
                    name="vm"
                    id="vm_lthan"
                    v-model="valueForMoneyFilter"
                    value="0"
                  />
                  <label class="pointer" for="vm_lthan">Is lesser than</label>
                </div>
                <div class="fltr-input">
                  <input type="number" v-model="valueForMoneyMax" placeholder="0 to 100" />
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">Cost of Attendance</span>
              <div class="fltr-inputs">
                <div class="custom-radio-actions">
                  <input
                    type="radio"
                    name="cost_att"
                    v-model="costOfAttandanceFilter"
                    id="cost_gthan"
                    value="1"
                  />
                  <label class="pointer" for="cost_gthan">Is greater than</label>
                  <input
                    type="radio"
                    name="cost_att"
                    v-model="costOfAttandanceFilter"
                    id="cost_lthan"
                    value="0"
                  />
                  <label class="pointer" for="cost_lthan">Is lesser than</label>
                </div>
                <div class="fltr-input">
                  <input type="number" v-model="costMax" placeholder="0 to 100" />
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">Application Deadline</span>
              <div class="fltr-inputs">
                <div class="custom-radio-actions">
                  <input
                    type="radio"
                    name="app_dl"
                    v-model="appDeadFilter"
                    id="app_gthan"
                    value="1"
                  />
                  <label class="pointer" for="app_gthan">Is greater than</label>
                  <input
                    type="radio"
                    name="app_dl"
                    id="app_lthan"
                    v-model="appDeadFilter"
                    value="0"
                  />
                  <label class="pointer" for="app_lthan">Is lesser than</label>
                </div>
                <div class="fltr-input">
                  <date-picker
                    v-model="fromDate"
                    type="date"
                    class="span2"
                    style="max-width: 136px;"
                    value-type="format"
                    :popup-style="{'border-radius': '15px !important'}"
                  ></date-picker>
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">Degree</span>
              <div class="fltr-inputs">
                <div class="custom-select">
                  <select
                    class="select2-multiple2 select2-hidden-accessible"
                    multiple
                    id="Degree"
                    data-select2-id="Degree"
                    tabindex="-1"
                    aria-hidden="true"
                  ></select>
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">Country</span>
              <div class="fltr-inputs">
                <div class="custom-select">
                  <select
                    class="select2-multiple2 select2-hidden-accessible"
                    multiple
                    id="country"
                    data-select2-id="country"
                    tabindex="-1"
                    aria-hidden="true"
                  ></select>
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">State</span>
              <div class="fltr-inputs">
                <div class="custom-select">
                  <select
                    class="select2-multiple2 select2-hidden-accessible"
                    multiple
                    id="State"
                    data-select2-id="State"
                    tabindex="-1"
                    aria-hidden="true"
                  ></select>
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">City</span>
              <div class="fltr-inputs">
                <div class="custom-select">
                  <select
                    class="select2-multiple2 select2-hidden-accessible"
                    multiple
                    id="city"
                    data-select2-id="city"
                    tabindex="-1"
                    aria-hidden="true"
                  ></select>
                </div>
              </div>
            </li>
            <li>
              <span class="fltr-lbl">Eligibility</span>
              <div class="fltr-inputs">
                <div class="custom-radio-actions">
                  <input type="radio" name="eligible" v-model="picked" id="both_item" />
                  <label for="both_item">Both</label>
                  <input type="radio" name="eligible" id="eg_item" v-model="picked" value="both" />
                  <label for="eg_item">Eligible</label>
                  <!-- <input type="radio" name="eligible" id="neg_item" v-model="picked" value="show" />
                  <label for="neg_item">Not Eligible</label>-->
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="factors-action">
          <div class="filter-btns">
            <a href="#" @click.prevent="clearFilters()">Clear Filters</a>
            <button type="button" @click.prevent="applyFilters()">Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageFooter from "../layout/Footer.vue";
import { mapGetters, mapActions } from "vuex";
import metricBar from "../ui/MetricBars.vue";
import select2 from "select2";
import "datatables.net";
import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import "datatables.net-responsive";
// import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  data() {
    return {
      data: [],
      picked: "both",
      admissionMax: "",
      costMax: "",
      matchMax: "",
      valueForMoneyMax: "",
      errorAdMin: false,
      errorAdMax: false,
      playDataTable: {},
      modifiedData: [],
      errorCostMin: false,
      errorCostMax: false,
      errorMatchMin: false,
      errorMatchMax: false,
      errorValueForMoneyMin: false,
      errorValueForMoneyMax: false,
      fromDate: "",
      toDate: "",
      backUp: {},
      isRolling: false,
      selectedList: {
        degree: [],
        state: [],
        country: [],
        city: []
      },
      ddlData: {
        degree: [],
        state: [],
        country: [],
        city: []
      },
      dateEvent: {},
      toggleFilter: false,
      searchKey: "",
      admissionFilter: "1",
      valueForMoneyFilter: "1",
      matchFilter: "1",
      costOfAttandanceFilter: "1",
      appDeadFilter: "1",
      loading: false,
      toggleFilters: false,
      tableInfo: "0-0 of 0"
    };
  },
  methods: {
    ...mapActions(["updateUnlockTriggers"]),
    getImgUrl(pet) {
      var images = require.context("../../../assets/images/", false, /\.svg$/);
      return images("./" + pet);
    },
    preventClosing(event) {
      event.stopPropagation();
    },
    async backUpValues(whichFilter) {
      if (whichFilter === "admission") {
        this.backUp = await {
          min: this.admissionMin,
          max: this.admissionMax
        };
      } else if (whichFilter === "Cost of Attendance") {
        this.backUp = await {
          min: this.costMin,
          max: this.costMax
        };
      } else if (whichFilter === "Match to Expectations") {
        this.backUp = await {
          min: this.matchMin,
          max: this.matchMax
        };
      } else if (whichFilter === "Value for money") {
        this.backUp = await {
          min: this.valueForMoneyMin,
          max: this.valueForMoneyMax
        };
      } else if (whichFilter === "application_dl") {
        this.dateEvent = this.backUp = {
          min: this.fromDate,
          max: this.toDate
        };
      }
    },
    async triggerFilter() {
      /**
       * Eligiblity filter
       */
      if (this.picked === "eligible") {
        this.modifiedData = this.getPlaygroundData.filter(
          item => item.isEligible == true
        );
      } else if (this.picked === "not-eligible") {
        this.modifiedData = this.getPlaygroundData.filter(
          item => item.isEligible == false
        );
      } else {
        this.modifiedData = this.getPlaygroundData;
      }

      /**
       * Admission filter
       */
      if (this.admissionFilter > 0) {
        this.modifiedData = await this.modifiedData.filter(
          item =>
            item.admission_chance >
            (parseInt(this.admissionMax) ? this.admissionMax : 0)
        );
      } else {
        this.modifiedData = await this.modifiedData.filter(
          item =>
            item.admission_chance <
            (parseInt(this.admissionMax) ? this.admissionMax : 0)
        );
      }

      /**
       * Cost of attendance
       */
      if (this.costOfAttandanceFilter > 0) {
        this.modifiedData = await this.modifiedData.filter(
          item =>
            parseFloat(item.cost_of_attendance) >=
            (parseFloat(this.costMax) ? this.costMax : 0) * 100000
        );
      } else {
        this.modifiedData = await this.modifiedData.filter(
          item =>
            parseFloat(item.cost_of_attendance) <=
            (parseFloat(this.costMax) ? this.costMax : 0) * 100000
        );
      }

      /**
       * Match to expectations
       */
      if (this.matchFilter > 0) {
        this.modifiedData = await this.modifiedData.filter(
          item =>
            item.match_to_expectation > (this.matchMax ? this.matchMax : 0)
        );
      } else {
        this.modifiedData = await this.modifiedData.filter(
          item =>
            item.match_to_expectation <= (this.matchMax ? this.matchMax : 0)
        );
      }

      /**
       * Value for money
       */
      if (this.valueForMoneyFilter > 0) {
        this.modifiedData = this.modifiedData.filter(
          item =>
            item.value_for_money >
            (this.valueForMoneyMax ? this.valueForMoneyMax : 0)
        );
      } else {
        this.modifiedData = this.modifiedData.filter(
          item =>
            item.value_for_money <
            (this.valueForMoneyMax ? this.valueForMoneyMax : 0)
        );
      }

      /**
       * Application date filter
       */

      if (!this.fromDate) {
        this.fromDate = "";
      }

      if (this.fromDate.toString().length > 0) {
        this.modifiedData = this.modifiedData.filter(
          item => item.application_deadline != "Rolling"
        );

        if (this.appDeadFilter > 0) {
          this.modifiedData = this.modifiedData.filter(
            item =>
              new Date(item.application_deadline) > new Date(this.fromDate)
          );
        } else {
          this.modifiedData = this.modifiedData.filter(
            item =>
              new Date(item.application_deadline) < new Date(this.fromDate)
          );
        }
      }

      /**
       * degrees selected
       */
      let tempStorage = [];

      if (this.selectedList.degree.length > 0) {
        this.modifiedData.forEach(item => {
          let isFound = Object.assign(
            [],
            this.selectedList.degree.filter(element => element === item.degree)
          );
          if (isFound.length > 0) {
            tempStorage.push(item);
          }
        });
        this.modifiedData = tempStorage;
      }

      /**
       * countries selected
       */

      tempStorage = [];

      if (this.selectedList.country.length > 0) {
        this.modifiedData.forEach(item => {
          let isFound = Object.assign(
            [],
            this.selectedList.country.filter(
              element => element === item.country
            )
          );
          if (isFound.length > 0) {
            tempStorage.push(item);
          }
        });
        this.modifiedData = tempStorage;
      }

      /**
       * state selected
       */

      tempStorage = [];

      if (this.selectedList.state.length > 0) {
        this.modifiedData.forEach(item => {
          let isFound = Object.assign(
            [],
            this.selectedList.state.filter(element => element === item.state)
          );
          if (isFound.length > 0) {
            tempStorage.push(item);
          }
        });
        this.modifiedData = tempStorage;
      }

      /**
       * city selected
       */

      tempStorage = [];

      if (this.selectedList.city.length > 0) {
        this.modifiedData.forEach(item => {
          let isFound = Object.assign(
            [],
            this.selectedList.city.filter(element => element === item.city)
          );
          if (isFound.length > 0) {
            tempStorage.push(item);
          }
        });
        this.modifiedData = tempStorage;
      }

      this.playDataTable.clear();
      this.playDataTable.rows.add(this.modifiedData);
      this.playDataTable.draw();

      this.toggleFilter = false;
    },
    updateInputFilter(whichFilter) {
      if (whichFilter === "admission") {
        if (
          !this.validate(whichFilter, this.admissionMin, this.admissionMax, 100)
        ) {
          return false;
        }
      } else if (whichFilter === "Cost of Attendance") {
        if (!this.validate(whichFilter, this.costMin, this.costMax, 300)) {
          return false;
        }
      } else if (whichFilter === "Match to Expectations") {
        if (!this.validate(whichFilter, this.matchMin, this.matchMax, 100)) {
          return false;
        }
      } else if (whichFilter === "Value for money") {
        if (
          !this.validate(
            whichFilter,
            this.valueForMoneyMin,
            this.valueForMoneyMax,
            100
          )
        ) {
          return false;
        }
      }
      $(".dropdown-toggle").dropdown("toggle");
      this.triggerFilter();
    },
    validate(whichFilter, minValue, maxValue, defaultMax) {
      if (minValue < 0 || minValue > defaultMax) {
        this.throwMessage(
          "error",
          `&nbsp; Invalid ` + whichFilter + ` Min input`
        );
        return false;
      } else if (maxValue < 0 || maxValue > defaultMax) {
        this.throwMessage(
          "error",
          `&nbsp; Invalid ` + whichFilter + ` Max input`
        );
        return false;
      } else if (parseInt(minValue) > parseInt(maxValue)) {
        this.throwMessage(
          "error",
          `&nbsp; ` +
            whichFilter +
            ` Min cannot be more than ` +
            whichFilter +
            ` Max input`
        );
        return false;
      } else return true;
    },
    cancelChanges(whichFilter) {
      $(".dropdown-toggle").dropdown("toggle");
      if (whichFilter == "admission") {
        this.admissionMin = this.backUp.min;
        this.admissionMax = this.backUp.max;
      } else if (whichFilter == "Cost of Attendance") {
        this.costMin = this.backUp.min;
        this.costMax = this.backUp.max;
      } else if (whichFilter == "Match to Expectations") {
        this.matchMin = this.backUp.min;
        this.matchMax = this.backUp.max;
      } else if (whichFilter == "Value for money") {
        this.valueForMoneyMin = this.backUp.min;
        this.valueForMoneyMax = this.backUp.max;
      } else if (whichFilter === "application_dl") {
        this.fromDate = this.backUp.min;
        this.toDate = this.backUp.max;
      }
    },
    throwMessage(messageType, message) {
      this.$swal({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 4000,
        type: messageType,
        html: message
      });
    },
    applicationFilter(selected) {
      if (selected != "rolling") {
        if (this.toDate || this.fromDate) {
          if (
            new Date(this.fromDate).toString().toLowerCase() === "invalid date"
          ) {
            this.throwMessage("error", "&nbsp; Invalid from date");
            return false;
          } else if (
            new Date(this.toDate).toString().toLowerCase() === "invalid date"
          ) {
            this.throwMessage("error", "&nbsp; Invalid to date");
            return false;
          } else if (new Date(this.fromDate) > new Date(this.toDate)) {
            this.throwMessage(
              "error",
              "&nbsp; From date cannot be greater than the To date"
            );
            return false;
          }
        }
      }
      if (selected === "rolling") {
        this.isRolling = true;
        this.toDate = "";
        this.fromDate = "";
      } else {
        this.isRolling = false;
      }
      $(".dropdown-toggle").dropdown("toggle");
      this.triggerFilter();
    },
    async renewData() {
      this.data = [];
      this.$store.dispatch("updatePlaygroundData", []);
      if (this.getActiveTab === "data_play") {
        let response = await this.$util.get(
          this.$util.dashboardEntryPoint +
            "/v1/dashboard/" +
            localStorage.getItem("user_id") +
            "/" +
            this.getScenarioById(this.getActiveScenario).scenario_id +
            "/final-list"
        );
        if (response.status === "success") {
          this.data = response.message;
          this.$store.dispatch("updatePlaygroundData", response.message);

          this.data = this.data.sort(function(a, b) {
            var x = a["university_name"];
            var y = b["university_name"];
            return x < y ? -1 : x > y ? 1 : 0;
          });

          this.data.forEach((element, index) => {
            element.sno = index + 1;
          });
          this.triggerFilter();
        } else {
          this.throwMessage(
            "error",
            `&nbsp; Did we mess up? Give it another try.`
          );
        }
      }
    },
    async extractDdlData() {
      return new Promise((resolve, reject) => {
        let state = [];
        let country = [];
        let city = [];
        let degree = [];

        /**
         * state extractions
         */
        this.getPlaygroundData.forEach(element => {
          let find = Object.assign(
            [],
            state.filter(item => item === element.state)
          );
          if (find.length <= 0) {
            state.push(element.state);
          }
        });
        this.$store.dispatch("updateStatePgList", state);

        /**
         * country extractions
         */
        this.getPlaygroundData.forEach(element => {
          let find = Object.assign(
            [],
            country.filter(item => item === element.country)
          );
          if (find.length <= 0) {
            country.push(element.country);
          }
        });
        this.$store.dispatch("updateCountryPgList", country);

        /**
         * city extractions
         */

        this.getPlaygroundData.forEach(element => {
          let find = Object.assign(
            [],
            city.filter(item => item === element.city)
          );
          if (find.length <= 0) {
            city.push(element.city);
          }
        });
        this.$store.dispatch("updateCityPgList", city);

        /**
         * degree extractions
         */

        this.getPlaygroundData.forEach(element => {
          let find = Object.assign(
            [],
            degree.filter(item => item === element.degree)
          );
          if (find.length <= 0) {
            degree.push(element.degree);
          }
        });

        state = state.sort(function(a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        });
        state = state.filter(item => item != null);
        // country = country.sort(function(a, b) {
        //   return a < b ? -1 : a > b ? 1 : 0;
        // });
        city = city.sort(function(a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        });
        city = city.filter(item => item != null);

        degree = degree.sort(function(a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        });
        degree = degree.filter(item => item != null);

        this.$store.dispatch("updateDegreeList", degree);
        this.$store.dispatch("updateCountryPgList", country);
        this.$store.dispatch("updateCityPgList", city);
        this.$store.dispatch("updateStatePgList", state);

        resolve({ state, country, city, degree });
      });
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
      }
      this.$store.dispatch("updateShortlistByScenarioId", payload);
    },
    validate(program_id) {
      let shortListedPrograms = this.getScenarioById(this.getActiveScenario)
        .shortListedPrograms;
      let program = shortListedPrograms.filter(
        item => item.program_id == program_id
      );
      if (program.length > 0) return false;
      else return true;
    },
    applyFilters() {
      if (this.admissionMax > 100 || this.admissionMax < 0) {
        this.throwMessage("error", "Please enter a valid 'Admission' filter");
        return false;
      } else if (this.matchMax > 100 || this.matchMax < 0) {
        this.throwMessage(
          "error",
          "Please enter a valid 'Match to Expectations' filter"
        );
        return false;
      } else if (this.valueForMoneyMax > 100 || this.valueForMoneyMax < 0) {
        this.throwMessage(
          "error",
          "Please enter a valid 'Value for Money' filter"
        );
        return false;
      } else if (this.costMax > 300 || this.costMax < 0) {
        this.throwMessage(
          "error",
          "Please enter a valid 'Cost of Attandance' filter"
        );
        return false;
      }

      this.triggerFilter();
      this.toggleSlider(false);
    },
    clearFilters() {
      this.admissionMax = "";
      this.matchMax = "";
      this.valueForMoneyMax = "";
      this.costMax = "";
      this.fromDate = "";
      this.picked = "both";

      $("#admission_chance,#Match_Exp,#Value_Money,#Cost_Att,#appdead_Att")
        .val("1")
        .trigger("change");

      $("#State,#Degree,#country,#city")
        .val("")
        .trigger("change");

      this.playDataTable.clear();
      this.playDataTable.rows.add(this.getPlaygroundData);
      this.playDataTable.draw();
    },
    focusContainer() {
      window.scroll({
        top: 100,
        left: 100,
        behavior: "smooth"
      });
      this.toggleFilter = !this.toggleFilter;
    },
    exportCSV() {
      let objectExport = Object.assign(
        [],
        this.modifiedData.length ? this.modifiedData : this.data
      );
      let skimmedData = [];
      objectExport.forEach(element => {
        let column = {};
        column.university_program =
          element.university_name + " - " + element.program_name;
        column.state = element.state;
        column.city = element.city;
        column.match_to_expectations = element.match_to_expectation + "%";
        column.admission_chance = element.admission_chance + "%";
        column.cost_of_attendance = "₹ " + element.cost_of_attendance;

        skimmedData.push(column);
      });

      var jsonObject = JSON.stringify(skimmedData);
      var array =
        typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;
      var str = "";
      str +=
        "University/ Program, State, City, Match to Expectations, Admission change, Cost of Attendance \r\n";
      for (var i = 0; i < array.length; i++) {
        var line = "";
        for (var index in array[i]) {
          if (line != "") line += ",";

          line += array[i][index];
        }

        str += line + "\r\n";
      }

      var BOM = "\uFEFF";
      var date = new Date();
      str = BOM + str;
      var blobdata = new Blob([str], { type: "text/csv;charset=utf-8" });
      var link = document.createElement("a");
      link.setAttribute("href", window.URL.createObjectURL(blobdata));
      link.setAttribute(
        "download",
        "GradRight_" +
          localStorage.getItem("user_name") +
          "_Programs_" +
          date.getFullYear() +
          date.getMonth() +
          date.getDate() +
          ".csv"
      );
      document.body.appendChild(link); // Required for FF

      link.click();
      link.remove();
    },
    changeFont(event) {
      if (event.target.value) {
        $(event.target).css("font-weight", "500");
      } else {
        $(event.target).css("font-weight", "100");
      }
    },
    triggerPayment() {
      /*this.$router.push({ name: "selectPlan" });*/
      this.$store.dispatch("updateTriggerPayment", true);
    },
    toggleSlider(value) {
      this.toggleFilters = value;
      if (value) {
        $("body").addClass("no-scroll");
      } else {
        $("body").removeClass("no-scroll");
      }
    },
    nextAction() {
      $("#data_tbl_next").click();
    },
    previousAction() {
      $("#data_tbl_previous").click();
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
  components: {
    pageFooter,
    metricBar,
    DatePicker
  },
  watch: {
    // picked(value) {
    //   this.triggerFilter();
    // },

    admissionMax(value) {
      if (value > 100 || value < 0) {
        this.errorAdMax = true;
      } else {
        this.errorAdMax = false;
      }
    },

    costMax(value) {
      if (value > 300 || value < 0) {
        this.errorCostMax = true;
      } else {
        this.errorCostMax = false;
      }
    },
    matchMax(value) {
      if (value > 100 || value < 0) {
        this.errorMatchMax = true;
      } else {
        this.errorMatchMax = false;
      }
    },
    valueForMoneyMax(value) {
      if (value > 100 || value < 0) {
        this.errorValueForMoneyMax = true;
      } else {
        this.errorValueForMoneyMax = false;
      }
    },
    getActiveScenario(Value) {
      this.renewData();
    },
    searchKey(value) {
      $("#data_tbl_filter input").val(value);
      $("#data_tbl_filter input").trigger("input");
    }
  },
  computed: {
    ...mapGetters([
      "getActiveScenario",
      "getScenarioById",
      "getPlaygroundData",
      "getDegreeList",
      "getCountryList_pg",
      "getStateList_pg",
      "getActiveTab",
      "getIsPaidUser"
    ])
  },
  async created() {
    $("body").addClass("custom-select2");

    let current_url = document.location.href;
    if (!current_url.includes("data-")) {
      current_url = location.origin + "/dashboard/data-playground";
      window.history.pushState({ path: current_url }, "", current_url);
    }

    if (!this.getIsPaidUser) {
      return false;
    }
    this.loading = true;
    if (this.getPlaygroundData.length <= 0) {
      let response = await this.$util.get(
        this.$util.dashboardEntryPoint +
          "/v1/dashboard/" +
          localStorage.getItem("user_id") +
          "/" +
          this.getScenarioById(this.getActiveScenario).scenario_id +
          "/final-list"
      );
      if (response.status === "success") {
        this.data = response.message;
        this.$store.dispatch("updatePlaygroundData", response.message);
        // this.data.forEach((element, index) => {
        //   element.university_name += ", " + element.program_name;
        // });
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "erroe",
          html: `&nbsp; Did we mess up? Give it another try.`
        });
      }
    } else {
      this.data = await this.getPlaygroundData;
      this.loading = false;
    }

    this.ddlData = await this.extractDdlData();
    var vm = this;
    // vm.data = vm.data.sort((a, b) => a.university_name - b.university_name);

    vm.data = vm.data.sort(function(a, b) {
      var x = a["university_name"];
      var y = b["university_name"];
      return x < y ? -1 : x > y ? 1 : 0;
    });

    vm.data.forEach((element, index) => {
      element.sno = index + 1;
      // element.university_name += ", " + element.program_name;
    });

    vm.playDataTable = $("#data_tbl").DataTable({
      data: vm.data,
      responsive: true,
      columns: [
        // { title: "S.No", data: "sno" },
        { title: "University/Program", data: "university_name" }, //

        { title: "State", data: "state" }, //
        { title: "City", data: "city" }, //
        {
          title: "Match to Expectations",
          data: "match_to_expectation"
        }, //
        { title: "Admission Chances", data: "admission_chance" }, //
        { title: "Cost of Attendance", data: "cost_of_attendance" }, //
        // { title: "Program", data: "program_name" }, //
        // { title: "Value for money", data: "value_for_money" }, //
        { title: "", data: "program_id" },
        { title: "", data: "program_id" }
      ],
      order: [[0, "asc"]],
      columnDefs: [
        {
          targets: 1,
          orderable: false,
          render: function(params, type, row, meta) {
            return (
              " <div class='td_col-state'> <div class='dtbl-vm'>" +
              (params ? params : "N/A") +
              "</div></div>"
            );
          }
        },
        {
          targets: 2,
          orderable: false,
          render: function(params, type, row, meta) {
            return (
              " <div class='td_col-city'> <div class='dtbl-vm'>" +
              (params ? params : "N/A") +
              "</div></div>"
            );
          }
          // width: "60px"
        },
        {
          targets: 0,
          // width: "20%",
          orderable: true,
          render: function(param, type, row, meta) {
            return (
              "<div class='td_col-univ'>" +
              param +
              "<p>" +
              row["program_name"] +
              "</p></div>"
            );
          }
        },
        {
          targets: 3,

          render: function(param) {
            let adClass = "";
            if (parseFloat(param) < 20) {
              adClass = "end";
            }

            return (
              "<div class='td_col-match'><div class='dtbl-vm'><div class='dbar'><div class='data-bars match'><div class='bar-percent " +
              adClass +
              "' style='width:" +
              param +
              "%'>" +
              param +
              "%</div></div></div>  </div></div>"
            );
          }
        },
        {
          targets: 4,
          render: function(param) {
            let adClass = "";
            if (parseFloat(param) < 20) {
              adClass = "end";
            }
            return (
              "<div class='td_col-match'><div class='dtbl-vm'><div class='dbar'><div class='data-bars admision'><div class='bar-percent " +
              adClass +
              "' style='width:" +
              param +
              "%'>" +
              param +
              "%</div></div></div>  </div></div>"
            );
          }
        },
        {
          targets: 5,
          type: "formatted-num",
          render: function(param) {
            let modifiedParam = (param / 100000).toFixed(2);
            param = (param / 100000).toFixed(2);

            let adClass = "";
            if (parseFloat(param) < 20) {
              adClass = "end";
            }
            return (
              "<div class='td_col-match'><div class='dtbl-vm'><div class='dbar'><div class='data-bars cost'><div class='bar-percent " +
              adClass +
              "' style='width:" +
              param +
              "%'>" +
              modifiedParam +
              "L</div></div></div>  </div></div>"
            );
          }
        },
        {
          targets: -1,
          orderable: false,
          render: function(param) {
            return (
              "<div class='td_col-action'><div class='dtbl-vm contentCenter' ><div class='data-actions'><a name='details' href='#' class='view-dtl-btn dplay-dtl' id=" +
              param +
              " title='View Details'></a></div></div></div>"
            );
          }
        },
        {
          targets: -2,
          orderable: false,
          render: function(param) {
            return (
              "<div class='td_col-action'><div class='dtbl-vm contentCenter' ><div class='data-actions'><a name='add' href='#' class='dplay-slist' id=" +
              param +
              " title='Add Shortlist'></a></div></div></div>"
            );
          }
        }
      ],
      language: {
        sLengthMenu: "Showing _MENU_ University/Program",
        paginate: {
          previous: "<",
          next: ">"
        }
      },
      fnInfoCallback: function(oSettings, iStart, iEnd, iMax, iTotal, sPre) {
        vm.tableInfo = iStart + " - " + iEnd + " of " + iMax;
        return iStart + " - " + iEnd + " of " + iMax;
      },
      pagingType: "simple",
      headerCallback: function headerCallback(
        thead,
        data,
        start,
        end,
        display
      ) {
        let arr = $(thead).find("th");
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          let _element = $(element).html();
          if (!_element.includes("<div>")) {
            let changedHeader = `<div>` + $(element).html() + `<\div>`;
            $(element).html(changedHeader);
          }
        }
      }
    });

    /**
     * state select
     */
    $.fn.select2.amd.require(
      [
        "select2/selection/single",
        "select2/selection/placeholder",
        "select2/selection/allowClear",
        "select2/dropdown",
        "select2/dropdown/search",
        "select2/dropdown/attachBody",
        "select2/utils"
      ],
      function(
        SingleSelection,
        Placeholder,
        AllowClear,
        Dropdown,
        DropdownSearch,
        AttachBody,
        Utils
      ) {
        var SelectionAdapter = Utils.Decorate(SingleSelection, Placeholder);

        SelectionAdapter = Utils.Decorate(SelectionAdapter, AllowClear);

        var DropdownAdapter = Utils.Decorate(
          Utils.Decorate(Dropdown, DropdownSearch),
          AttachBody
        );

        var base_element2 = $("#State");
        $(base_element2).select2({
          placeholder: "State: All",
          selectionAdapter: SelectionAdapter,
          dropdownAdapter: DropdownAdapter,
          data: vm.ddlData.state,
          allowClear: true,
          dropdownCssClass: "test",
          templateResult: function(data) {
            if (!data.id) {
              return data.text;
            }

            var $res = $("<div></div>");

            $res.text(data.text);
            $res.addClass("wrap");

            return $res;
          },
          templateSelection: function(data) {
            if (!data.id) {
              if (vm.selectedList.state.length > 0) {
                vm.selectedList.state = [];
                // vm.triggerFilter();
              }
              return data.text;
            }
            // var selected = ($(base_element2).val() || []).length;

            let selectedStates = "";
            vm.selectedList.state = $(base_element2).val();

            vm.selectedList.state.forEach((element, index) => {
              if (index === 0) {
                selectedStates += element;
              } else selectedStates += ", " + element;
            });

            // var total = $("option", $(base_element2)).length;
            // vm.triggerFilter();
            return "States : " + selectedStates;
          }
        });
      }
    );

    /**
     * degree select
     */
    $.fn.select2.amd.require(
      [
        "select2/selection/single",
        "select2/selection/placeholder",
        "select2/selection/allowClear",
        "select2/dropdown",
        "select2/dropdown/search",
        "select2/dropdown/attachBody",
        "select2/utils"
      ],
      function(
        SingleSelection,
        Placeholder,
        AllowClear,
        Dropdown,
        DropdownSearch,
        AttachBody,
        Utils
      ) {
        var SelectionAdapter = Utils.Decorate(SingleSelection, Placeholder);

        SelectionAdapter = Utils.Decorate(SelectionAdapter, AllowClear);

        var DropdownAdapter = Utils.Decorate(
          Utils.Decorate(Dropdown, DropdownSearch),
          AttachBody
        );

        var base_element2 = $("#Degree");
        $(base_element2).select2({
          placeholder: "Degree: All",
          selectionAdapter: SelectionAdapter,
          dropdownAdapter: DropdownAdapter,
          data: vm.ddlData.degree,
          allowClear: true,
          templateResult: function(data) {
            if (!data.id) {
              return data.text;
            }

            var $res = $("<div></div>");

            $res.text(data.text);
            $res.addClass("wrap");

            return $res;
          },
          templateSelection: function(data) {
            if (!data.id) {
              if (vm.selectedList.degree.length > 0) {
                vm.selectedList.degree = [];
                // vm.triggerFilter();
              }
              // console.log(data.id);
              return data.text;
            }

            vm.selectedList.degree = $(base_element2).val();
            let degreeLabel = "";
            vm.selectedList.degree.forEach((element, index) => {
              if (index == 0) {
                degreeLabel += element;
              } else degreeLabel += ", " + element;
            });
            // vm.triggerFilter();
            return "Degrees : " + degreeLabel;
          }
        });
      }
    );

    /**
     * country select
     */
    $.fn.select2.amd.require(
      [
        "select2/selection/single",
        "select2/selection/placeholder",
        "select2/selection/allowClear",
        "select2/dropdown",
        "select2/dropdown/search",
        "select2/dropdown/attachBody",
        "select2/utils"
      ],
      function(
        SingleSelection,
        Placeholder,
        AllowClear,
        Dropdown,
        DropdownSearch,
        AttachBody,
        Utils
      ) {
        var SelectionAdapter = Utils.Decorate(SingleSelection, Placeholder);

        SelectionAdapter = Utils.Decorate(SelectionAdapter, AllowClear);

        var DropdownAdapter = Utils.Decorate(
          Utils.Decorate(Dropdown, DropdownSearch),
          AttachBody
        );

        var base_element2 = $("#country");
        $(base_element2).select2({
          placeholder: "Country: All",
          selectionAdapter: SelectionAdapter,
          dropdownAdapter: DropdownAdapter,
          data: vm.ddlData.country,
          allowClear: true,
          templateResult: function(data) {
            if (!data.id) {
              return data.text;
            }

            var $res = $("<div></div>");

            $res.text(data.text);
            $res.addClass("wrap");

            return $res;
          },
          templateSelection: function(data) {
            if (!data.id) {
              if (vm.selectedList.country.length > 0) {
                vm.selectedList.country = [];
                // vm.triggerFilter();
              }
              return data.text;
            }
            var selected = ($(base_element2).val() || []).length;
            vm.selectedList.country = $(base_element2).val();
            let selectedCountries = "";

            vm.selectedList.country.forEach((element, index) => {
              if (index === 0) {
                selectedCountries += element;
              } else {
                selectedCountries += ", " + element;
              }
            });
            // vm.triggerFilter();
            return "Countries : " + selectedCountries;
          }
        });
      }
    );

    /**
     * city select
     */

    $.fn.select2.amd.require(
      [
        "select2/selection/single",
        "select2/selection/placeholder",
        "select2/selection/allowClear",
        "select2/dropdown",
        "select2/dropdown/search",
        "select2/dropdown/attachBody",
        "select2/utils"
      ],
      function(
        SingleSelection,
        Placeholder,
        AllowClear,
        Dropdown,
        DropdownSearch,
        AttachBody,
        Utils
      ) {
        var SelectionAdapter = Utils.Decorate(SingleSelection, Placeholder);

        SelectionAdapter = Utils.Decorate(SelectionAdapter, AllowClear);

        var DropdownAdapter = Utils.Decorate(
          Utils.Decorate(Dropdown, DropdownSearch),
          AttachBody
        );

        var base_element2 = $("#city");
        $(base_element2).select2({
          placeholder: "City: All",
          selectionAdapter: SelectionAdapter,
          dropdownAdapter: DropdownAdapter,
          data: vm.ddlData.city,
          allowClear: true,
          templateResult: function(data) {
            if (!data.id) {
              return data.text;
            }
            var $res = $("<div></div>");

            $res.text(data.text);

            $res.addClass("wrap");
            return $res;
          },
          templateSelection: function(data) {
            if (!data.id) {
              if (vm.selectedList.city.length > 0) {
                vm.selectedList.city = [];
                // vm.triggerFilter();
              }
              return data.text;
            }
            var selected = ($(base_element2).val() || []).length;
            // var total = $("option", $(base_element2)).length;

            vm.selectedList.city = $(base_element2).val();
            let selectedCities = "";

            vm.selectedList.city.forEach((element, index) => {
              if (index === 0) {
                selectedCities += element;
              } else {
                selectedCities += ", " + element;
              }
            });
            // vm.triggerFilter();
            return "Cities : " + selectedCities;
          }
        });
      }
    );

    $("#admission_chance")
      .select2({ minimumResultsForSearch: -1 })
      .on("select2:select", params => {
        vm.admissionFilter = params.params.data.id;
      });
    $("#Match_Exp")
      .select2({ minimumResultsForSearch: -1 })
      .on("select2:select", params => {
        vm.matchFilter = params.params.data.id;
      });
    $("#Value_Money")
      .select2({ minimumResultsForSearch: -1 })
      .on("select2:select", params => {
        vm.valueForMoneyFilter = params.params.data.id;
      });
    $("#Cost_Att")
      .select2({ minimumResultsForSearch: -1 })
      .on("select2:select", params => {
        vm.costOfAttandanceFilter = params.params.data.id;
      });
    $("#appdead_Att")
      .select2({ minimumResultsForSearch: -1 })
      .on("select2:select", params => {
        vm.appDeadFilter = params.params.data.id;
      });

    $("#data_tbl tbody").on("click", "a", function(event) {
      // var data = table.row($(this).parents("tr")).data();
      event.preventDefault();
      if (event.target.name == "details") {
        vm.showDetails(event.target.id);
      } else {
        vm.updateShortlistByScenarioId({
          id: event.target.id,
          type: "add"
        });
      }
    });
    this.loading = false;
    vm.playDataTable.tables({ visible: true, api: true }).columns.adjust();
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
      "formatted-num-pre": function(a) {
        // a = a === "-" || a === "" ? 0 : a.replace(/[^\d\-\.]/g, "");
        return parseFloat($(a).data("value"));
      },

      "formatted-num-asc": function(a, b) {
        return a - b;
      },

      "formatted-num-desc": function(a, b) {
        return b - a;
      }
    });
    $("#data_tbl_filter,#data_tbl_info,#data_tbl_paginate").hide();

    $(".ro-select").filter(function() {
      var $this = $(this),
        $sel = $("<ul>", { class: "ro-select-list" }),
        $wr = $("<div>", { class: "ro-select-wrapper" }),
        $inp = $("<input>", {
          type: "hidden",
          name: $this.attr("name"),
          class: "ro-select-input"
        }),
        $text = $("<div>", {
          class: "ro-select-text",
          text: $this.attr("placeholder")
        });
      var $opts = $this.children("option");

      $text.click(function() {
        $sel.show();
      });

      $opts.filter(function() {
        var $opt = $(this);
        $sel
          .append($("<li>", { text: $opt.text(), class: "ro-select-item" }))
          .data("value", $opt.attr("value"));
      });
      $sel.on("click", "li", function() {
        $text.text($(this).text()).removeClass("ro-select-text-empty");
        $(this)
          .parent()
          .hide()
          .children("li")
          .removeClass("ro-select-item-active");
        $(this).addClass("ro-select-item-active");

        $("div#data_tbl_length select.custom-select")
          .val($(this).html())
          .change();
        $inp.val($this.data("value"));
      });
      $wr.append($text);
      $wr.append($("<i>", { class: "fa fa-caret-down ro-select-caret" }));
      $this.after($wr.append($inp, $sel));
      $this.remove();
    });
  },
  destroyed() {
    $("body").removeClass("custom-select2");
  }
};
</script>