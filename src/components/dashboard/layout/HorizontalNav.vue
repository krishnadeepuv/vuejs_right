<template>
  <div>
    <div class="top_bar">
      <div class="scenario_sec">
        <div v-if="isUserPaid" class="scnr-name nav-item dropdown d-flex">
          <div class="name-action-show">
            <input
              type="text"
              class="name-edit"
              :value="scenario.name"
              @blur="updateScenarioName($event)"
              id="editableScenario"
            />
            <div
              class="delete_scnario"
              data-toggle="tooltip"
              data-original-title="Delete Scenario"
              data-placement="right"
              v-if="getScenarioIds.length>1"
              @click.prevent="deleteScenario()"
            >
              <a href="#">&nbsp;</a>
            </div>
            <div class="name-edit-actions">
              <div class="d-flex justify-content-around">
                <a href="#" class="save-name">&nbsp;</a>
                <a href="#" class="close-name">&nbsp;</a>
              </div>
            </div>
          </div>
          <div class="switch-scnr" data-toggle="dropdown">
            <div
              data-toggle="tooltip"
              title
              data-original-title="Switch Scenario"
              data-placement="right"
            >&nbsp;</div>
            <div class="dropdown-menu" id="scenarioDDL" aria-labelledby>
              <a
                v-for="(item,index) in getScenarioIds"
                :key="index"
                :id="item.scenarioId"
                class="dropdown-item"
                @click.self.prevent="updateActiveScenario($event.target.id);updateShowSaveScenario(false)"
              >{{item.name}}</a>
            </div>
          </div>
        </div>
        <div v-else style="font-size: 20px;font-weight: 500; width: 200px;" v-html="scenario.name"></div>
      </div>
      <div class="save-new-scnr" v-if="getShowSaveScenario">
        <button
          type="button"
          class="btn"
          @click="updateSaveScenarioClicked(true)"
        >Save as New Scenario</button>
        <div class="close_save_new" v-html="'✕'" @click="updateShowSaveScenario(false)"></div>
      </div>
      <div class="user_share">
        <div class="shareright" @click="getSharableLink()">
          <span v-if="!shareRightLoading">Shareright</span>
          <img
            v-else
            src="../../../assets/images/loading-anim1.svg"
            style="margin-left: 85px;"
            alt="image"
            class
            width="30"
          />
        </div>

        <div class="user_info dropdown">
          <a href="#" data-toggle="dropdown">
            <div class="user">
              <span class :title="userName">{{userName}}</span>
              <img src="../../../assets/images/user.svg" width="35" />
            </div>
          </a>
          <div class="dropdown-menu user-dropdown">
            <ul>
              <li @click.prevent="updateSideBarTriggers(true)">
                <a href="#">Final Shortlist</a>
              </li>
              <li @click.prevent="openMore()">
                <a href="#">Manage Profile</a>
              </li>
              <li @click.prevent="signOut()">
                <a href="#">Logout</a>
              </li>
            </ul>
          </div>
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
      isUserPaid: false,
      scenario: {},
      userName: "",
      shortListCount: 0,
      scenarioName: "",
      shareRightLoading: false,
      showEditActions: false,
      editActivated: false
    };
  },
  computed: {
    ...mapGetters([
      "getIsPaidUser",
      "getActiveScenario",
      "getScenarioById",
      "getScenarioIds",
      "getShowSaveScenario"
    ])
  },
  methods: {
    ...mapActions([
      "updateSideBarTriggers",
      "updateActiveScenario",
      "updateShowSaveScenario",
      "updateSaveScenario",
      "updateSaveScenarioClicked"
    ]),
    async updateScenarioName(event) {
      this.showEditActions = false;
      let value = $("#editableScenario").val();
      if (value.trim().length <= 0) {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; Scenario name cannot be empty`
        });
        $("#editableScenario").html(this.scenarioName);
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
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; Scenario name should be unique`
        });
        return false;
      }

      let result = await this.$util.put(
        this.$util.dashboardEntryPoint + "/v1/dashboard/scenario-name",
        {
          user_id: localStorage.getItem("user_id"),
          scenario_id: this.getScenarioById(this.getActiveScenario).scenario_id,
          name: value
        }
      );
      if (result.status === "success") {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          html: `&nbsp; ` + result.message
        });
        this.editActivated = false;
        this.$store.dispatch("updateScenarioName", {
          value: value,
          scenarioId: this.getActiveScenario
        });
      } else {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: "erroe",
          html: `&nbsp; Something is wrong! Please try again`
        });
        this.$store.dispatch("updateScenarioName", {
          value: this.scenarioName,
          scenarioId: this.getActiveScenario
        });
      }
    },
    async getSharableLink() {
      if (!this.shareRightLoading) {
        let currentRoute = window.location.href;
        this.shareRightLoading = true;
        if (currentRoute.includes("final-shortlist")) {
          let response = await this.$util.get(
            this.$util.dashboardEntryPoint +
              "/v1/dashboard/" +
              localStorage.getItem("user_id") +
              "/final-shortlist"
          );
          if (response.status === "success") {
            // this.scenarioName =
            this.shortlist_id = response.message.shortlist_id;
            let programs = response.message.finalShortList;
            let payload2 = [];
            programs.forEach(element => {
              payload2.push(element.program_id);
            });
            let result2 = await this.$util.put(
              this.$util.dashboardEntryPoint +
                "/v1/dashboard/final-shortlist/share",
              {
                user_id: localStorage.getItem("user_id"),
                shortlist_id: this.shortlist_id,
                program_ids: payload2
              }
            );
            this.shareRightLoading = false;
            if (result2.status == "success") {
              this.$swal({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                type: "success",
                html: `&nbsp; ` + "Sharable link created"
              });
              let routeData = this.$router.resolve({
                name: "shareRight",
                params: { token: result2.message.url_token }
              });
              let otherWindow = window.open(routeData.href, "_blank");
              otherWindow.opener = null;
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
            // this.$router.push({ name: "shortlist" });
          } else {
            this.$swal({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000,
              type: "error",
              html: `&nbsp; Did we mess up? Give it another try.`
            });
            return false;
          }
        } else {
          let payload = [];
          let scenario = this.getScenarioById(this.getActiveScenario);

          scenario.shortListedPrograms.forEach(element => {
            payload.push(element.program_id);
          });
          let result = await this.$util.put(
            this.$util.dashboardEntryPoint + "/v1/dashboard/final-shortlist",
            {
              user_id: localStorage.getItem("user_id"),
              scenario_id: scenario.scenario_id,
              program_ids: payload,
              username: localStorage.getItem("user_name")
            }
          );

          if (result.status == "success") {
            let response = await this.$util.get(
              this.$util.dashboardEntryPoint +
                "/v1/dashboard/" +
                localStorage.getItem("user_id") +
                "/final-shortlist"
            );
            if (response.status === "success") {
              // this.scenarioName =
              this.shortlist_id = response.message.shortlist_id;
              let programs = response.message.finalShortList;
              let payload2 = [];
              programs.forEach(element => {
                payload2.push(element.program_id);
              });
              let result2 = await this.$util.put(
                this.$util.dashboardEntryPoint +
                  "/v1/dashboard/final-shortlist/share",
                {
                  user_id: localStorage.getItem("user_id"),
                  shortlist_id: this.shortlist_id,
                  program_ids: payload2
                }
              );
              this.shareRightLoading = false;
              if (result2.status == "success") {
                this.$swal({
                  toast: true,
                  position: "top",
                  showConfirmButton: false,
                  timer: 3000,
                  type: "success",
                  html: `&nbsp; ` + "Sharable link created"
                });
                let routeData = this.$router.resolve({
                  name: "shareRight",
                  params: { token: result2.message.url_token }
                });
                let otherWindow = window.open(routeData.href, "_blank");
                otherWindow.opener = null;
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
              // this.$router.push({ name: "shortlist" });
            } else {
              this.$swal({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                type: "error",
                html: `&nbsp; Did we mess up? Give it another try.`
              });
              return false;
            }
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
        }
      }
    },
    async focusEdit() {
      this.editActivated = await true;
      setTimeout(() => {
        $("#editableScenario").focus();
      }, 200);
    },
    deleteScenario() {
      let scenario_id = this.getScenarioById(this.getActiveScenario)._id;
      this.showAddScenario = false;
      if (this.getScenarioIds.length <= 1) {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; Not all can be deleted. At least one scenario needs to stay.`
        });
        return false;
      }

      var vm = this;
      this.$swal({
        type: "warning",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        focusCancel: true,
        showCancelButton: true,
        customClass: {
          confirmButton: "alertButtons",
          cancelButton: "alertButtons"
        },
        text: "Delete if the scenario is not useful to you any more!"
      }).then(async function(result) {
        if (result.value) {
          let result = await vm.$util.deleteMode(
            vm.$util.dashboardEntryPoint + "/v1/dashboard/scenario",
            {
              user_id: localStorage.getItem("user_id"),
              scenario_id: vm.getScenarioById(scenario_id).scenario_id
            }
          );

          if (result.status == "success") {
            vm.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              type: "success",
              html: `&nbsp; ` + result.message
            });
            vm.setDashbord(scenario_id);
          } else if (
            result.status == "error" &&
            result.message == "share right exists."
          ) {
            vm.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              type: "error",
              html: `&nbsp; ` + "Share right exists for this scenario."
            });
          } else {
            vm.$swal({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              type: "error",
              html: `&nbsp; ` + "Did we mess up? Give it another try."
            });
          }
        } else if (result.dismiss == "cancel") {
          //console.log("cancel");
        }
      });
    },
    setDashbord(scenario_id) {
      let activeIndex = 0;
      if (this.getScenarioIds[0].scenarioId == scenario_id) {
        activeIndex = 1;
        document
          .getElementById("scenarioDDL")
          .getElementsByTagName("a")
          [activeIndex].click();
        setTimeout(() => {
          this.$store.dispatch("deleteScenario", scenario_id);
        }, 500);
      } else {
        document
          .getElementById("scenarioDDL")
          .getElementsByTagName("a")
          [activeIndex].click();
        this.$store.dispatch("deleteScenario", scenario_id);
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
    },
    signOut() {
      this.$store.dispatch("updateIsUserLoggedIn", false);
      localStorage.clear();
      this.$store.dispatch("resetAuth");
      this.$store.dispatch("resetDashboard");
      this.$store.dispatch("resetQuestionState");
      localStorage.setItem("previousUrl", "/");
      localStorage.setItem("currentUrl", "/");
      window.location = this.$util.ssoURL + "/?message=logOut";
    }
  },
  watch: {
    getIsPaidUser(value) {
      this.isUserPaid = value;
    },
    getActiveScenario(value) {
      this.scenario = this.getScenarioById(this.getActiveScenario);
      this.shortListCount = this.scenario.shortListedPrograms.length;
      this.scenarioName = this.scenario.name;
    }
  },
  created() {
    this.scenario = this.getScenarioById(this.getActiveScenario);
    this.shortListCount = this.scenario.shortListedPrograms.length;
    this.isUserPaid = this.getIsPaidUser;
    this.scenarioName = this.scenario.name;
    this.userName =
      localStorage
        .getItem("user_name")
        .slice(0, 1)
        .toUpperCase() + localStorage.getItem("user_name").slice(1);
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
};
</script>


<style scoped>
.name-action-show .name-edit-actions {
  display: block;
}
</style>