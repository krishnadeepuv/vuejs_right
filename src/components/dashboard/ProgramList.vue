<template>
  <div v-if="!loading">
    <div class="sh_cat" v-if="classify">
      <ul>
        <li class="sh_choose_amb">
          <input
            type="checkbox"
            class="chooseoption"
            @click="updateFilterMode('')"
            id="chall"
            v-model="chkChallange"
          />
          <label for="chall">Ambitious</label>
        </li>
        <li class="sh_choose_mod">
          <input
            type="checkbox"
            class="chooseoption"
            id="Fair"
            @click="updateFilterMode('')"
            v-model="chkFair"
          />
          <label for="Fair">Moderate</label>
        </li>
        <li class="sh_choose_safe">
          <input
            type="checkbox"
            class="chooseoption"
            id="Likely"
            @click="updateFilterMode('')"
            v-model="chkLikely"
          />
          <label for="Likely">Safe</label>
        </li>
      </ul>
    </div>
    <div class="db_pro_list" :class="{sh_item:classify}">
      <div :id="changeId" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(duo ,index) in list" :key="index" class="item" :class="{'active':index==0}">
            <div class="db_pro_carousel">
              <div
                v-for="(item,ind) in duo"
                :key="ind"
                class="db_pro_item"
                :class="{'amb_pro ':(classify&&(parseFloat(item.admission_chance)<=cfl.challenge.to)),'mod_pro ':(classify&&((parseFloat(item.admission_chance)<=cfl.fair.to)&&(parseFloat(item.admission_chance)>cfl.fair.from
                    ))),'safe_pro ':(classify&&(parseFloat(item.admission_chance)>cfl.likely.from))}"
              >
                <div :class="{locked_program:(!getIsPaidUser && classify)}">
                  <a
                    href="#"
                    v-if="(!getIsPaidUser && classify && item.university_name !='dummy' )"
                    @click.prevent="openMore()"
                    class="unlock-view"
                  >Unlock to View</a>
                  <div
                    v-if="item.university_name === 'dummy'"
                    class="db_pro_card"
                    style="height:100%;display:none"
                  >
                    <img
                      src="../../assets/images/end-list.png"
                      style="margin-left: 29%;width: 37.5%;"
                      alt
                    />
                    <div
                      style="text-align: center;font-size: 13px;"
                    >You have reached to the end of the list</div>
                  </div>
                  <div v-else class="db_pro_card" style="height:100%">
                    <div class="pro_dtl_main">
                      <div class="apply-ddline">
                        {{item.application_deadline}}
                        <span>Application Deadline</span>
                      </div>
                      <div class="univ_img">
                        <img src="../../assets/images/university-img.png" alt />
                      </div>
                      <div class="univ_dtl">
                        <h2>{{(!getIsPaidUser && classify)?"Some locked university":item.university_name}}</h2>
                        <p>{{(!getIsPaidUser && classify)?"City, State":(item.city + ", " + (item.state?(item.state + ", "):"") + item.country)}}</p>
                        <span>{{(!getIsPaidUser && classify)?"Degree, Program":(item.degree+", "+item.program_name)}}</span>
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

                    <div v-if="getIsPaidUser || !classify" class="db_pro_action">
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
        <div class="carousel-control-vert">
          <a class="carousel-prev controls" :href="'#'+changeId" data-slide="prev"></a>
          <a class="carousel-next controls" :href="'#'+changeId" data-slide="next"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      scenario: {},
      list: [],
      shortlistCount: 0,
      loading: true,
      chkChallange: true,
      chkFair: true,
      chkLikely: true,
      cfl: {
        challenge: { from: "0", to: "30" },
        fair: {
          from: "30",
          to: "70"
        },
        likely: {
          from: "70",
          to: "100"
        }
      }
    };
  },
  props: ["classify", "changeId"],
  watch: {
    getActiveScenario(value) {
      this.scenario = this.getScenarioById(value);
      this.shortlistCount = this.scenario.shortListedPrograms.length;
      this.cfl = this.scenario.filters.challenge_fair_likely;

      if (!this.classify) {
        this.list = this.sanatizeList(this.scenario.user_programs);
      } else {
        this.list = this.sanatizeList(this.scenario.recommended_programs);
      }
    },
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
    getFilterMode(value) {
      if (value === "red") {
        this.chkChallange = true;
        this.chkFair = false;
        this.chkLikely = false;
      } else if (value === "yellow") {
        this.chkChallange = false;
        this.chkFair = true;
        this.chkLikely = false;
      } else if (value === "green") {
        this.chkChallange = false;
        this.chkFair = false;
        this.chkLikely = true;
      }
    }
  },
  computed: {
    ...mapGetters([
      "getActiveScenario",
      "getScenarioById",
      "getIsPaidUser",
      "getFilterMode"
    ])
  },
  methods: {
    ...mapActions(["updateUnlockTriggers", "updateFilterMode"]),
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
    sanatizeList(paramList) {
      let tempList = [];
      for (let index = 0; index < paramList.length; index++) {
        const element = paramList[index];
        let element2 = {};
        if (paramList[index + 1]) {
          element2 = paramList[index + 1];
        } else {
          // element2 = { dummy: true };
          element2 = {
            university_name: "dummy",
            program_name: "dummy",
            admission_chance: "",
            match_to_expectation: "",
            cost_of_attendance: "",
            program_id: -1,
            application_deadline: "",
            city: "",
            state: "",
            country: ""
          };
        }
        index = index + 1;
        tempList.push([element, element2]);
      }
      return tempList;
    },
    animateAndSegrigate() {
      /*var vm = this;
      $("db_pro_carousel div.db_pro_item").hide();
      if (vm.chkChallange) {
        $('#grad_list .hide-on-mobile').removeClass('item').addClass('hide');
        $("div.db_pro_item.amb_pro").show();
      }
      if (vm.chkFair) {
        $("div.db_pro_item.mod_pro").show();
      }
      if (vm.chkLikely) {
        $("div.db_pro_item.safe.pro").show();
      }*/
      // $("ul.custom-anim li")
      //   .removeClass("is-animated")
      //   .hide()
      //   .promise()
      //   .done(function() {
      //     if (vm.chkChallange) {
      //       $("ul.custom-anim li.ch")
      //         .addClass("is-animated")
      //         .show();
      //     }
      //     if (vm.chkFair) {
      //       $("ul.custom-anim li.fr")
      //         .addClass("is-animated")
      //         .show();
      //     }
      //     if (vm.chkLikely) {
      //       $("ul.custom-anim li.lk")
      //         .addClass("is-animated")
      //         .show();
      //     }
      //   });
      let modified_red = Object.assign([], this.scenario.recommended_programs);
      let modified_yell = Object.assign([], this.scenario.recommended_programs);
      let modified_green = Object.assign(
        [],
        this.scenario.recommended_programs
      );
      if (this.chkChallange) {
        modified_red = modified_red.filter(
          item => item.admission_chance <= this.cfl.challenge.to
        );
      } else {
        modified_red = [];
      }

      if (this.chkFair) {
        modified_yell = modified_yell.filter(
          item =>
            item.admission_chance >= this.cfl.fair.from &&
            item.admission_chance <= this.cfl.fair.to
        );
      } else {
        modified_yell = [];
      }

      if (this.chkLikely) {
        modified_green = modified_green.filter(
          item => item.admission_chance > this.cfl.likely.from
        );
      } else {
        modified_green = [];
      }
      this.list = this.sanatizeList(
        modified_red.concat(modified_yell).concat(modified_green)
      );
    },
    checkEmpty() {
      if (!this.chkChallange && !this.chkFair && !this.chkLikely) {
        this.isGradListEmpty = true;
      }
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
    this.scenario = this.getScenarioById(this.getActiveScenario);
    if (!this.classify) {
      this.list = this.scenario.user_programs;
    } else {
      this.list = this.scenario.recommended_programs;
    }

    // if (this.list.length % 2 >= 1) {
    //   this.list.push = { dummy: true };
    // }

    this.list = this.sanatizeList(this.list);
    this.shortlistCount = this.scenario.length;
    $("body").removeClass("no-scroll");
    this.cfl = this.scenario.filters.challenge_fair_likely;
    this.loading = false;
  },
  mounted() {
    setTimeout(() => {
      $(".carousel").carousel({
        interval: false,
        wrap: false
      });
    }, 200);
  }
};
</script>

