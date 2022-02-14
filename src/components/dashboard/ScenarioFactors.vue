<template>
  <div>
    <div class="vertical_tabs">
      <ul class="nav nav-tabs tabs-left">
        <li class="active">
          <a href="#FactorScore" data-toggle="tab" class>Scores</a>
        </li>
        <li>
          <a href="#FactorExperience" data-toggle="tab" class>Work Experience</a>
        </li>
        <li>
          <a href="#FactorExpectations" data-toggle="tab" class>Match to Expectations</a>
        </li>
        <li>
          <a href="#FactorAttendance" data-toggle="tab" class>Cost of Attendance</a>
        </li>
        <li>
          <a href="#FactorPrograms" data-toggle="tab" class>Programs</a>
        </li>
        <li>
          <a href="#FactorCountries" data-toggle="tab" class>Countries</a>
        </li>
        <li>
          <a href="#FactorSpecialization" data-toggle="tab" class>Area of Specialization</a>
        </li>
        <li>
          <a href="#FactorBuckets" data-toggle="tab" class>Admission Buckets</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="FactorScore">
          <div class="tab-info-content">
            <div class="factorscores-block gre">
              <div class="edit" :class="{show:editScoresGRE}">
                <div class="scorestitle">
                  <b>GRE</b>
                </div>
                <ul>
                  <li class>
                    <label for>Quant</label>
                    <input type="text" pattern="\d" maxlength="3" class v-model="gre_quant" />
                    <span>Range 130 - 170</span>
                  </li>
                  <li>
                    <label for>Verbal</label>
                    <input
                      type="text"
                      pattern="\d"
                      maxlength="3"
                      v-model="gre_verbal"
                      class="verbal-ph"
                    />
                    <span>Range 130 - 170</span>
                  </li>
                  <li>
                    <label for>AWA</label>
                    <input type="number" class="awa-ph" v-model="gre_awa" />
                    <span>Range 0 - 6</span>
                  </li>
                </ul>
                <div class="save-score-factors">
                  <a href="#" class="cancel-link" @click="cancleScores('gre')">Cancel</a>
                  <a href="#" class="save-link" @click.prevent="editScoresGRE=false">Save</a>
                </div>
              </div>
              <div class="save" :class="{show:!editScoresGRE}">
                <div class="scorestitle">
                  <b>GRE</b>
                  <a href="#" class="edit-link" @click.prevent="backUp('gre')">Edit</a>
                </div>
                <ul>
                  <li>
                    Quant
                    <span>{{scenarioFactors.scores.gre.quant}}</span>
                  </li>
                  <li>
                    Verbal
                    <span>{{scenarioFactors.scores.gre.verbal}}</span>
                  </li>
                  <li>
                    AWA
                    <span>{{scenarioFactors.scores.gre.AWA}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="factorscores-block gre">
              <div class="edit" :class="{show:editScoresTOEFL}">
                <div class="scorestitle">
                  <b>TOFEL</b>
                </div>
                <ul>
                  <li class>
                    <label for>Listining</label>
                    <input
                      type="text"
                      maxlength="2"
                      v-model="toefl_listening"
                      pattern="[0-9]"
                      class
                    />
                    <span>Range 1 - 30</span>
                  </li>
                  <li>
                    <label for>Reading</label>
                    <input
                      type="text"
                      maxlength="2"
                      v-model="toefl_reading"
                      pattern="[0-9]"
                      class="verbal-ph"
                    />
                    <span>Range 1 - 30</span>
                  </li>
                  <li>
                    <label for>Writing</label>
                    <input
                      type="text"
                      maxlength="2"
                      v-model="toefl_writing"
                      pattern="[0-9]"
                      class="awa-ph"
                    />
                    <span>Range 1 - 30</span>
                  </li>
                  <li>
                    <label for>Speaking</label>
                    <input type="text" maxlength="2" v-model="toefl_speaking" pattern="[0-9]" class />
                    <span>Range 1 - 30</span>
                  </li>
                </ul>
                <div class="save-score-factors">
                  <a href="#" class="cancel-link" @click="cancleScores('toefl')">Cancel</a>
                  <a href="#" class="save-link" @click.prevent="editScoresTOEFL=false">Save</a>
                </div>
              </div>
              <div class="save" :class="{show:!editScoresTOEFL}">
                <div class="scorestitle">
                  <b>TOFEL</b>
                  <a href="#" class="edit-link" @click.prevent="backUp('toefl')">Edit</a>
                </div>
                <ul>
                  <li>
                    Listining
                    <span>{{scenarioFactors.scores.toefl.learning?scenarioFactors.scores.toefl.learning:0}}</span>
                  </li>

                  <li>
                    Reading
                    <span>{{scenarioFactors.scores.toefl.reading?scenarioFactors.scores.toefl.reading:0}}</span>
                  </li>
                  <li>
                    Speaking
                    <span>{{scenarioFactors.scores.toefl.speaking?scenarioFactors.scores.toefl.speaking:0}}</span>
                  </li>
                  <li>
                    Writing
                    <span>{{scenarioFactors.scores.toefl.writing?scenarioFactors.scores.toefl.writing:0}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="factorscores-block gre">
              <div class="edit" :class="{show:editScoresIELTS}">
                <div class="scorestitle">
                  <b>IELTS</b>
                </div>
                <ul>
                  <li class>
                    <label for>Listining</label>
                    <input type="number" v-model="ielts_listening" pattern="[0-9]" class />
                    <span>Range 0.5 - 9</span>
                  </li>
                  <li>
                    <label for>Reading</label>
                    <input type="number" v-model="ielts_reading" pattern="[0-9]" class="verbal-ph" />
                    <span>Range 0.5 - 9</span>
                  </li>
                  <li>
                    <label for>Writing</label>
                    <input type="number" v-model="ielts_writing" pattern="[0-9]" class="awa-ph" />
                    <span>Range 0.5 - 9</span>
                  </li>
                  <li>
                    <label for>Speaking</label>
                    <input type="number" v-model="ielts_speaking" pattern="[0-9]" class />
                    <span>Range 0.5 - 9</span>
                  </li>
                </ul>
                <div class="save-score-factors">
                  <a href="#" class="cancel-link" @click="cancleScores('ielts')">Cancel</a>
                  <a href="#" class="save-link" @click.prevent="editScoresIELTS=false">Save</a>
                </div>
              </div>
              <div class="save" :class="{show:!editScoresIELTS}">
                <div class="scorestitle">
                  <b>IELTS</b>
                  <a href="#" class="edit-link" @click.prevent="backUp('ielts')">Edit</a>
                </div>
                <ul>
                  <li>
                    Listining
                    <span>{{scenarioFactors.scores.ielts.learning?scenarioFactors.scores.ielts.learning:0}}</span>
                  </li>

                  <li>
                    Reading
                    <span>{{scenarioFactors.scores.ielts.reading?scenarioFactors.scores.ielts.reading:0}}</span>
                  </li>
                  <li>
                    Speaking
                    <span>{{scenarioFactors.scores.ielts.speaking?scenarioFactors.scores.ielts.speaking:0}}</span>
                  </li>
                  <li>
                    Writing
                    <span>{{scenarioFactors.scores.ielts.writing?scenarioFactors.scores.ielts.writing:0}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="FactorExperience">
          <div class="tab-info-content">
            <div class="exp-container">
              <div class="range-slider-block">
                <b>
                  Total
                  <span>(Months)</span>
                </b>
                <div id="total-exp" class="slider-bar noUi-target noUi-ltr noUi-horizontal"></div>
              </div>

              <div class="range-slider-block">
                <b>
                  Research Related
                  <span>(Months)</span>
                </b>
                <div id="research-exp" class="slider-bar"></div>
              </div>
              <div class="range-slider-block">
                <b>
                  Program related
                  <span>(Months)</span>
                </b>
                <div id="program-exp" class="slider-bar"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="FactorExpectations">
          <div class="tab-info-content">
            <div class="range-slider-block">
              <b>
                Expectation threshold
                <span>%</span>
              </b>

              <div id="pr-Exp" class="slider-bar"></div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="FactorAttendance">
          <div class="tab-info-content">
            <div class="range-slider-block">
              <b>
                Maximum Cost
                <span>(in Lacs)</span>
              </b>
              <div id="ft-Cost" class="slider-bar"></div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="FactorPrograms">
          <div class="tab-info-content">
            <div class="factor-search-bar">
              <input
                type="text"
                style="text-align:left"
                @input="search($event,'programList')"
                placeholder="Search Programs"
              />
            </div>
            <div class="factor-search-list">
              <ul id="programList" class="overflow-custom">
                <li
                  style="cursor:pointer"
                  v-for="(program,index) in getProgramData"
                  :id="program.id"
                  :key="index"
                  @click.self="filterDdlClicked($event,'programs')"
                  :name="program.text"
                >
                  <div
                    :id="program.id"
                    @click.self="filterDdlClicked($event,'programs')"
                    :name="program.text"
                  >
                    <span
                      v-html="program.text"
                      :id="program.id"
                      @click.self="filterDdlClicked($event,'programs')"
                      :name="program.text"
                    ></span>
                    <span
                      class="add-tag"
                      :id="program.id"
                      @click.self="filterDdlClicked($event,'programs')"
                      :name="program.text"
                    ></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="FactorCountries">
          <div class="tab-info-content">
            <div class="factor-search-bar">
              <input
                type="text"
                @input="search($event, 'countryList')"
                style="text-align:left"
                placeholder="Search Country"
              />
            </div>
            <div class="factor-search-list">
              <ul id="countryList">
                <li
                  style="cursor:pointer"
                  v-for="(country,index) in getCountryData"
                  :id="country.id"
                  :data="country.searchBy"
                  :key="index"
                  :name="country.text"
                  @click.self="filterDdlClicked($event,'countries')"
                >
                  <div :id="country.id" @click.self="filterDdlClicked($event,'countries')">
                    <span
                      v-html="country.text"
                      :name="country.text"
                      :id="country.id"
                      @click.self="filterDdlClicked($event,'countries')"
                    ></span>
                    <span
                      class="add-tag"
                      :name="country.text"
                      :id="country.id"
                      @click.self="filterDdlClicked($event,'countries')"
                    ></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="FactorSpecialization">
          <div class="tab-info-content">
            <div class="factor-search-bar">
              <input
                type="text"
                @input="search($event, 'specialList')"
                style="text-align:left"
                placeholder="Search Specialization"
              />
            </div>
            <div class="factor-search-list">
              <ul id="specialList" class="overflow-custom">
                <li
                  style="cursor:pointer"
                  v-for="(specialization,index) in getSpecializationData"
                  :id="specialization.id"
                  :key="index"
                  :name="specialization.text"
                  @click.self="filterDdlClicked($event, 'specialList')"
                >
                  <div
                    :id="specialization.id"
                    :name="specialization.text"
                    @click.self="filterDdlClicked($event, 'specialList')"
                  >
                    <span
                      :id="specialization.id"
                      :name="specialization.text"
                      v-html="specialization.text"
                      @click.self="filterDdlClicked($event, 'specialList')"
                    ></span>
                    <span
                      :id="specialization.id"
                      :name="specialization.text"
                      class="add-tag"
                      @click.self="filterDdlClicked($event, 'specialList')"
                    ></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="FactorBuckets">
          <!-- <div class="tab-info-content">Admission Buckets</div> -->
          <div class>
            <div id="Challenging">
              <div class id="challenge-v">
                <div class>
                  <div class="challenge-lbls">
                    <div class="ch">
                      Ambitious
                      <label>
                        <span>0%</span> -
                        <span v-html="chMax+'%'">30%</span>
                      </label>
                    </div>
                    <div class="fr">
                      Moderate
                      <label>
                        <span v-html="chMax+'%'"></span> -
                        <span v-html="frMax+'%'"></span>
                      </label>
                    </div>
                    <div class="lk">
                      Safe
                      <label>
                        <span v-html="frMax+'%'"></span> -
                        <span v-html="lkMax+'%'"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div id="slider-vertical" class="slider-bar"></div>
              <p
                align="center"
                style="font-size:13px"
              >Define Ambitious/Moderate/Safe categories here in terms of your admission chance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      scenarioFactors: {
        scores: {
          gre: {
            verbal: 130,
            AWA: 0.5,
            quant: 130
          },
          toefl: {
            reading: 0,
            writing: 0,
            speaking: 0,
            learning: 0
          },
          ielts: {
            reading: 0,
            writing: 0,
            speaking: 0,
            learning: 0
          }
        }
      },
      total_exp: {},
      research_exp: {},
      program_exp: {},
      greQuant: {},
      greVerbal: {},
      greAWA: {},
      expThrosheld: {},
      Ft_Cost: {},
      program_list: [],
      cfl: {},
      tListening: {},
      tWriting: {},
      tReading: {},
      tSpeaking: {},
      iListening: {},
      iWriting: {},
      iSpeaking: {},
      iReading: {},
      editScoresGRE: false,
      editScoresTOEFL: false,
      editScoresIELTS: false,
      chMax: 30,
      frMax: 70,
      lkMax: 100,
      backUpGre: {
        verbal: 130,
        AWA: 0.5,
        quant: 130
      },
      backUpToefl: {
        reading: 0,
        writing: 0,
        speaking: 0,
        learning: 0
      },
      backUpIelts: {
        reading: 0,
        writing: 0,
        speaking: 0,
        learning: 0
      }
    };
  },
  watch: {
    // getActiveScenario(value) {
    //   //
    //   var scenario = this.getScenarioById(value);
    //   this.scenarioFilterData = scenario.scenarioFilters;
    // }
    getActiveScenario(value) {
      this.scenarioFactors = this.getScenarioById(value).filters;
      this.backUpGre = this.getScenarioById(value).filters.scores.gre;
      this.backUpToefl = this.getScenarioById(value).filters.scores.toefl;
      this.backUpIelts = this.getScenarioById(value).filters.scores.ielts;
      this.populateFactorData(this.scenarioFactors, "loaded");
    },
    getShowSaveScenario(value) {
      if (value) {
        this.editScoresGRE = false;
        this.editScoresTOEFL = false;
        this.editScoresIELTS = false;
      }
    }
  },
  computed: {
    ...mapGetters([
      "getIsPaidUser",
      "getActiveScenario",
      "getScenarioById",
      "getProgramData",
      "getSpecializationData",
      "getCountryData",
      "getShowSaveScenario"
    ]),
    gre_quant: {
      get() {
        return this.scenarioFactors.scores.gre.quant;
      },
      set(value) {
        this.scenarioFactors.scores.gre.quant = value;
        this.$store.dispatch("updateScores", {
          score: parseInt(value) ? parseInt(value) : 0,
          subject: "quant",
          exam: "gre",
          scenarioId: this.getActiveScenario
        });
      }
    },
    gre_verbal: {
      get() {
        return this.scenarioFactors.scores.gre.verbal;
      },
      set(value) {
        this.scenarioFactors.scores.gre.verbal = value;
        this.$store.dispatch("updateScores", {
          score: parseInt(value) ? parseInt(value) : 0,
          subject: "verbal",
          exam: "gre",
          scenarioId: this.getActiveScenario
        });
      }
    },
    gre_awa: {
      get() {
        return this.scenarioFactors.scores.gre.AWA;
      },
      set(value) {
        this.scenarioFactors.scores.gre.AWA = value;
        this.$store.dispatch("updateScores", {
          score: parseFloat(value) ? parseFloat(value) : 0,
          subject: "AWA",
          exam: "gre",
          scenarioId: this.getActiveScenario
        });
      }
    },
    toefl_listening: {
      get() {
        return this.scenarioFactors.scores.toefl.learning;
      },
      set(value) {
        this.scenarioFactors.scores.toefl.learning = value;
        this.$store.dispatch("updateScores", {
          score: parseInt(value) ? parseInt(value) : 0,
          subject: "learning",
          exam: "toefl",
          scenarioId: this.getActiveScenario
        });
      }
    },
    toefl_reading: {
      get() {
        return this.scenarioFactors.scores.toefl.reading;
      },
      set(value) {
        this.scenarioFactors.scores.toefl.reading = value;
        this.$store.dispatch("updateScores", {
          score: parseInt(value) ? parseInt(value) : 0,
          subject: "reading",
          exam: "toefl",
          scenarioId: this.getActiveScenario
        });
      }
    },
    toefl_speaking: {
      get() {
        return this.scenarioFactors.scores.toefl.speaking;
      },
      set(value) {
        this.scenarioFactors.scores.toefl.speaking = value;
        this.$store.dispatch("updateScores", {
          score: parseInt(value) ? parseInt(value) : 0,
          subject: "speaking",
          exam: "toefl",
          scenarioId: this.getActiveScenario
        });
      }
    },
    toefl_writing: {
      get() {
        return this.scenarioFactors.scores.toefl.writing;
      },
      set(value) {
        this.scenarioFactors.scores.toefl.writing = value;
        this.$store.dispatch("updateScores", {
          score: parseInt(value) ? parseInt(value) : 0,
          subject: "writing",
          exam: "toefl",
          scenarioId: this.getActiveScenario
        });
      }
    },
    ielts_listening: {
      get() {
        return this.scenarioFactors.scores.ielts.learning;
      },
      set(value) {
        this.scenarioFactors.scores.ielts.learning = value;
        this.$store.dispatch("updateScores", {
          score: parseFloat(value) ? parseFloat(value) : 0,
          subject: "learning",
          exam: "ielts",
          scenarioId: this.getActiveScenario
        });
      }
    },
    ielts_reading: {
      get() {
        return this.scenarioFactors.scores.ielts.reading;
      },
      set(value) {
        this.scenarioFactors.scores.ielts.reading = value;
        this.$store.dispatch("updateScores", {
          score: parseFloat(value) ? parseFloat(value) : 0,
          subject: "reading",
          exam: "ielts",
          scenarioId: this.getActiveScenario
        });
      }
    },
    ielts_speaking: {
      get() {
        return this.scenarioFactors.scores.ielts.speaking;
      },
      set(value) {
        this.scenarioFactors.scores.ielts.speaking = value;
        this.$store.dispatch("updateScores", {
          score: parseFloat(value) ? parseFloat(value) : 0,
          subject: "speaking",
          exam: "ielts",
          scenarioId: this.getActiveScenario
        });
      }
    },
    ielts_writing: {
      get() {
        return this.scenarioFactors.scores.ielts.writing;
      },
      set(value) {
        this.scenarioFactors.scores.ielts.writing = value;
        this.$store.dispatch("updateScores", {
          score: parseFloat(value) ? parseFloat(value) : 0,
          subject: "writing",
          exam: "ielts",
          scenarioId: this.getActiveScenario
        });
      }
    }
  },

  methods: {
    ...mapActions(["updateScores", "updateWorkExperience", "updateFilter"]),
    search(event, whichList) {
      let filter, ul, li, a, i, txtValue, id;
      filter = event.target.value.toLowerCase();
      ul = document.getElementById(whichList);
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        txtValue = li[i].innerHTML.toLowerCase();
        if (whichList.includes("university") || whichList.includes("country")) {
          txtValue += li[i].getAttribute("data");
        }
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          txtValue = li[i]
            .getElementsByTagName("div")[0]
            .getElementsByTagName("span")[0].innerHTML;
          if (filter.length > 0) {
            if (
              txtValue.toLowerCase().slice(0, 1) ==
              filter.toLowerCase().slice(0, 1)
            ) {
              li[i].style.display = "";
            } else {
              li[i].style.display = "none";
            }
          } else {
            li[i].style.display = "";
          }
        } else {
          li[i].style.display = "none";
        }
      }
    },
    populateFactorData(filterData, mode) {
      let scores = filterData.scores;
      /**
       * Experience population
       */

      this.total_exp.noUiSlider.set(filterData.work_experience.total);
      // document.getElementById("totalExp").value = filterData.work_experience
      //   .total
      //   ? filterData.work_experience.total
      //   : 0;
      this.research_exp.noUiSlider.set(filterData.work_experience.research);
      // document.getElementById("researchExp").value = filterData.work_experience
      //   .research
      //   ? filterData.work_experience.research
      //   : 0;
      this.program_exp.noUiSlider.set(0); //filterData.work_experience.value
      // document.getElementById("relExp").value = 0;

      /**
       * Match to expectation threshold
       */
      this.expThrosheld.noUiSlider.set(
        filterData.match_to_expectation_threshold
      );
      // document.getElementById(
      //   "input-pr-Exp"
      // ).value = filterData.match_to_expectation_threshold
      //   ? filterData.match_to_expectation_threshold
      //   : 0;
      /**
       * Maximum cost of attendance
       */
      this.Ft_Cost.noUiSlider.set(
        filterData.maximum_cost_of_attendance / 100000
      );

      // document.getElementById(
      //   "input-Cost"
      // ).value = filterData.maximum_cost_of_attendance
      //   ? filterData.maximum_cost_of_attendance / 100000
      //   : 0;

      setTimeout(
        () => {
          /**
           * Programs interested in
           */
          $("#programList,#specialList,#countryList")
            .find("li div span.add-tag")
            .removeClass("active");

          filterData.programs_intrested.selectedList.forEach(item => {
            $("#programList")
              .find("li#" + item.id + " div span.add-tag")
              .addClass("active");
          });

          /**
           * Programs interested in
           */
          filterData.area_of_interest.selectedList.forEach(item => {
            $("#specialList")
              .find("li#" + item.id + " div span.add-tag")
              .addClass("active");
          });

          /**
           * Programs interested in
           */
          filterData.country.selectedList.forEach(item => {
            $("#countryList")
              .find("li#" + item.id + " div span.add-tag")
              .addClass("active");
          });
        },
        mode === "loaded" ? 0 : 2000
      );

      this.cfl.noUiSlider.set([
        filterData.challenge_fair_likely.fair.from,
        filterData.challenge_fair_likely.likely.from
      ]);
      this.chMax = filterData.challenge_fair_likely.fair.from;
      this.frMax = filterData.challenge_fair_likely.fair.to;
      this.lkMax = filterData.challenge_fair_likely.likely.to;
    },
    filterDdlClicked(event, ddl) {
      let currentfactors = this.getScenarioById(this.getActiveScenario).filters;
      let isThere = [];
      if (ddl === "programs") {
        isThere = currentfactors.programs_intrested.selectedList.filter(
          item => item.id === event.target.id
        );
        if (isThere.length > 0) {
          var payload = {
            type: "programs_intrested",
            id: event.target.id,
            action: false,
            scenarioId: this.getActiveScenario
          };
          $(
            "#programList li#" + event.target.id + " div span.add-tag"
          ).removeClass("active");
        } else {
          var payload = {
            type: "programs_intrested",
            id: event.target.id,
            value: event.target.getAttribute("name"),
            action: true,
            scenarioId: this.getActiveScenario
          };
          $(
            "#programList li#" + event.target.id + " div span.add-tag"
          ).addClass("active");
        }
      } else if (ddl === "countries") {
        isThere = currentfactors.country.selectedList.filter(
          item => item.id === event.target.id
        );
        if (isThere.length > 0) {
          var payload = {
            type: "country",
            id: event.target.id,
            action: false,
            scenarioId: this.getActiveScenario
          };
          $(
            "#countryList li#" + event.target.id + " div span.add-tag"
          ).removeClass("active");
        } else {
          var payload = {
            type: "country",
            id: event.target.id,
            value: event.target.getAttribute("name"),
            action: true,
            scenarioId: this.getActiveScenario
          };
          $(
            "#countryList li#" + event.target.id + " div span.add-tag"
          ).addClass("active");
        }
      } else {
        isThere = currentfactors.area_of_interest.selectedList.filter(
          item => item.id === event.target.id
        );
        if (isThere.length > 0) {
          var payload = {
            type: "area_of_interest",
            id: event.target.id,
            action: false,
            scenarioId: this.getActiveScenario
          };
          $(
            "#specialList li#" + event.target.id + " div span.add-tag"
          ).removeClass("active");
        } else {
          var payload = {
            type: "area_of_interest",
            id: event.target.id,
            value: event.target.getAttribute("name"),
            action: true,
            scenarioId: this.getActiveScenario
          };
          $(
            "#specialList li#" + event.target.id + " div span.add-tag"
          ).addClass("active");
        }
      }
      this.$store.dispatch("updateAutoComplete", payload);
    },
    backUp(whichOne) {
      if (whichOne === "gre") {
        this.editScoresGRE = true;
        this.backUpGre = Object.assign({}, this.scenarioFactors.scores.gre);
      } else if (whichOne === "toefl") {
        this.editScoresTOEFL = true;
        this.backUpToefl = Object.assign({}, this.scenarioFactors.scores.toefl);
      } else {
        this.editScoresIELTS = true;
        this.backUpIelts = Object.assign({}, this.scenarioFactors.scores.ielts);
      }
    },
    cancleScores(whichone) {
      if (whichone === "gre") {
        this.editScoresGRE = false;
        this.scenarioFactors.scores.gre = this.backUpGre;
        this.$store.dispatch("updateScores", {
          score: parseInt(this.backUpGre.quant)
            ? parseInt(this.backUpGre.quant)
            : 0,
          subject: "quant",
          exam: "gre",
          scenarioId: this.getActiveScenario
        });
        this.$store.dispatch("updateScores", {
          score: parseInt(this.backUpGre.verbal)
            ? parseInt(this.backUpGre.verbal)
            : 0,
          subject: "verbal",
          exam: "gre",
          scenarioId: this.getActiveScenario
        });
        this.$store.dispatch("updateScores", {
          score: parseInt(this.backUpGre.AWA)
            ? parseInt(this.backUpGre.AWA)
            : 0,
          subject: "AWA",
          exam: "gre",
          scenarioId: this.getActiveScenario
        });
      } else if (whichone === "toefl") {
        this.editScoresTOEFL = false;
        this.scenarioFactors.scores.toefl = this.backUpToefl;
        this.$store.dispatch("updateScores", {
          score: parseInt(this.backUpToefl.learning)
            ? parseInt(this.backUpToefl.learning)
            : 0,
          subject: "learning",
          exam: "toefl",
          scenarioId: this.getActiveScenario
        });
        this.$store.dispatch("updateScores", {
          score: parseInt(this.backUpToefl.writing)
            ? parseInt(this.backUpToefl.writing)
            : 0,
          subject: "writing",
          exam: "toefl",
          scenarioId: this.getActiveScenario
        });
        this.$store.dispatch("updateScores", {
          score: parseInt(this.backUpToefl.reading)
            ? parseInt(this.backUpToefl.reading)
            : 0,
          subject: "reading",
          exam: "toefl",
          scenarioId: this.getActiveScenario
        });
        this.$store.dispatch("updateScores", {
          score: parseInt(this.backUpToefl.speaking)
            ? parseInt(this.backUpToefl.speaking)
            : 0,
          subject: "speaking",
          exam: "toefl",
          scenarioId: this.getActiveScenario
        });
      } else {
        this.editScoresIELTS = false;
        this.scenarioFactors.scores.ielts = this.backUpIelts;

        this.$store.dispatch("updateScores", {
          score: parseFloat(this.backUpIelts.learning)
            ? parseFloat(this.backUpIelts.learning)
            : 0,
          subject: "learning",
          exam: "ielts",
          scenarioId: this.getActiveScenario
        });
        this.$store.dispatch("updateScores", {
          score: parseFloat(this.backUpIelts.reading)
            ? parseFloat(this.backUpIelts.reading)
            : 0,
          subject: "reading",
          exam: "ielts",
          scenarioId: this.getActiveScenario
        });
        this.$store.dispatch("updateScores", {
          score: parseFloat(this.backUpIelts.writing)
            ? parseFloat(this.backUpIelts.writing)
            : 0,
          subject: "writing",
          exam: "ielts",
          scenarioId: this.getActiveScenario
        });
        this.$store.dispatch("updateScores", {
          score: parseFloat(this.backUpIelts.speaking)
            ? parseFloat(this.backUpIelts.speaking)
            : 0,
          subject: "speaking",
          exam: "ielts",
          scenarioId: this.getActiveScenario
        });
      }
    },
    submit() {
      this.editScoresGRE = false;
      this.editScoresTOEFL = false;
      this.editScoresIELTS = false;
    }
  },
  async mounted() {
    var vm = this;
    vm.scenarioFactors = vm.getScenarioById(vm.getActiveScenario).filters;
    let subdomain_id = vm.getScenarioById(vm.getActiveScenario).subdomain_id
      ? vm.getScenarioById(vm.getActiveScenario).subdomain_id
      : 1;
    //**Get Programs */
    if (this.getProgramData.length <= 0) {
      this.program_list = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/program-list/" +
          subdomain_id
      );
      if (this.program_list.status === "success") {
        this.program_list = this.program_list.message.program_list.map(item => {
          // return { id: item.program_tag_id, value: item.program_name };
          return { id: item.program_tag_id, text: item.program_name };
        });
      } else {
        return this.error();
      }
    }

    let country_list = {};
    //**Get Countries */
    if (this.getCountryData.length <= 0) {
      country_list = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/countries/" +
          subdomain_id
      );
      if (country_list.status === "success") {
        country_list = country_list.message.country.map(item => {
          // return {
          //   id: item.country_id,
          //   value: item.country_name,
          //   searchBy: item.tags
          // };
          return {
            id: item.country_id,
            text: item.country_name,
            searchBy: item.tags
          };
        });
      } else {
        return this.error();
      }
    }

    /** Specialization */
    let special_list = {};
    if (this.getSpecializationData.length <= 0) {
      special_list = await this.$util.get(
        this.$util.questionsEntryPoint +
          "/v1/master-data/specialization/" +
          subdomain_id
      );
      if (special_list.status === "success") {
        if (subdomain_id > 1) {
          special_list = [];
        } else {
          special_list = special_list.message.specialization.map(item => {
            // return { id: item.specialization_id, value: item.specialization_name };
            return {
              id: item.specialization_id,
              text: item.specialization_name
            };
          });
        }
      } else {
        return this.error();
      }
      this.$store.dispatch("updateFilterddlData", {
        program_list: this.program_list,
        country_list,
        special_list
      });
    }

    //#region nouisliders
    /**
     * Experience
     */
    var pipFormats = {
      "0": "0%",
      "10": "10%",
      "20": "20%",
      "30": "30%",
      "40": "40%",
      "50": "50%",
      "60": "60%",
      "70": "70%",
      "80": "80%",
      "90": "90%",
      "100": "100%"
    };

    vm.total_exp = document.getElementById("total-exp");
    // var total_exp_input = document.getElementById("totalExp");
    noUiSlider.create(vm.total_exp, {
      start: [0],
      connect: [true, false],
      step: 1,
      orientation: "horizontal", // 'horizontal' or 'vertical'
      range: {
        min: 0,
        max: 100
      },
      tooltips: true,
      pips: {
        mode: "range",
        // values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        // density: 0
        density: 100
      },
      format: wNumb({
        decimals: 0
      })
    });

    vm.total_exp.noUiSlider.on("update", function(values, handle) {
      // total_exp_input.value = values[handle];
    });
    vm.total_exp.noUiSlider.on("change", function(values, handle) {
      vm.scenarioFactors.work_experience.total = values[handle];
      vm.$store.dispatch("updateWorkExperience", {
        value: parseInt(values[handle]) ? parseInt(values[handle]) : 0,
        scenarioId: vm.getActiveScenario,
        type: "total"
      });
    });

    vm.research_exp = document.getElementById("research-exp");
    var research_exp_input = document.getElementById("researchExp");

    noUiSlider.create(vm.research_exp, {
      start: [0],
      connect: [true, false],
      step: 1,
      orientation: "horizontal", // 'horizontal' or 'vertical'
      range: {
        min: 0,
        max: 100
      },
      tooltips: true,
      pips: {
        mode: "range",
        values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        // density: 0
        density: 100
      },
      format: wNumb({
        decimals: 0
      })
    });

    vm.research_exp.noUiSlider.on("update", function(values, handle) {
      // research_exp_input.value = values[handle];
    });
    vm.research_exp.noUiSlider.on("change", function(values, handle) {
      vm.scenarioFactors.work_experience.research = values[handle];
      vm.$store.dispatch("updateWorkExperience", {
        value: parseInt(values[handle]) ? parseInt(values[handle]) : 0,
        scenarioId: vm.getActiveScenario,
        type: "research"
      });
    });

    vm.program_exp = document.getElementById("program-exp");
    var rel_exp_input = document.getElementById("relExp");

    noUiSlider.create(vm.program_exp, {
      start: [0],
      connect: [true, false],
      step: 1,
      orientation: "horizontal", // 'horizontal' or 'vertical'
      range: {
        min: 0,
        max: 100
      },
      tooltips: true,
      pips: {
        mode: "range",
        //  values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        // density: 0
        density: 100
      },
      format: wNumb({
        decimals: 0
      })
    });

    vm.program_exp.noUiSlider.on("update", function(values, handle) {
      // rel_exp_input.value = values[handle];
    });
    vm.program_exp.noUiSlider.on("change", function(values, handle) {
      vm.scenarioFactors.work_experience.program = values[handle];
      vm.$store.dispatch("updateWorkExperience", {
        value: parseInt(values[handle]) ? parseInt(values[handle]) : 0,
        scenarioId: vm.getActiveScenario,
        type: "program"
      });
    });

    /**
     * Threshold
     */
    vm.expThrosheld = document.getElementById("pr-Exp");
    var Pr_Exp_input = document.getElementById("input-pr-Exp");

    noUiSlider.create(vm.expThrosheld, {
      start: [0],
      connect: [true, false],
      step: 1,
      orientation: "horizontal", // 'horizontal' or 'vertical'
      range: {
        min: 0,
        max: 100
      },
      tooltips: true,
      pips: {
        mode: "range",
        density: 100
      },
      // pips: {
      //   mode: "positions",
      //   values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      //   // density: 0
      //   density: 20,
      //   format: {
      //     to: function(a) {
      //       return pipFormats[a];
      //     }
      //   }
      // },
      format: wNumb({
        decimals: 0
      })
    });

    vm.expThrosheld.noUiSlider.on("update", function(values, handle) {
      // Pr_Exp_input.value = values[handle];
    });

    vm.expThrosheld.noUiSlider.on("change", function(values, handle) {
      vm.scenarioFactors.match_to_expectation_threshold = values[handle];
      vm.updateFilter({
        value: parseInt(values[handle]),
        type: "match_to_expectation_threshold",
        scenarioId: vm.getActiveScenario
      });
    });

    vm.Ft_Cost = document.getElementById("ft-Cost");
    var Ft_Cost_input = document.getElementById("input-Cost");
    var Ft_Cost_inputs = [Ft_Cost_input];

    noUiSlider.create(vm.Ft_Cost, {
      start: [0],
      connect: [true, false],
      step: 1,
      orientation: "horizontal", // 'horizontal' or 'vertical'
      range: {
        min: 0,
        max: 300
      },
      tooltips: true,
      pips: {
        mode: "range",
        density: 300
      },
      format: wNumb({
        decimals: 0
      })
    });

    vm.Ft_Cost.noUiSlider.on("update", function(values, handle) {
      // Ft_Cost_inputs[handle].value = values[handle];
    });

    vm.Ft_Cost.noUiSlider.on("change", function(values, handle) {
      vm.updateFilter({
        value: parseInt(values[handle]),
        type: "maximum_cost_of_attendance",
        scenarioId: vm.getActiveScenario
      });
    });
    vm.cfl = document.getElementById("slider-vertical");
    noUiSlider.create(vm.cfl, {
      start: [0, 100],
      step: 1,
      pips: {
        mode: "positions",
        values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        density: 0,
        format: {
          to: function(a) {
            return pipFormats[a];
          }
        }
      },
      connect: [false, true, true],
      orientation: "vertical",
      range: {
        min: 0,
        max: 100
      },
      tooltips: true,
      format: wNumb({
        decimals: 0
      })
    });

    vm.cfl.noUiSlider.on("update", function(values, handle) {
      vm.chMax = values[0];
      vm.frMax = values[1];
      vm.lkMax = 100;
    });

    vm.cfl.noUiSlider.on("change", function(values, handle) {
      if (vm.scenarioFactors) {
        vm.$store.dispatch("updateCFL", {
          scenarioId: vm.getActiveScenario,
          cfl: { from: values[0], to: values[1] }
        });
      }
      // activeScenario.filters[0].maximum_cost_of_attendance = values[handle] * 100000;
    });
    //#endregion

    vm.populateFactorData(vm.scenarioFactors, "onload");
  }
};
</script>


