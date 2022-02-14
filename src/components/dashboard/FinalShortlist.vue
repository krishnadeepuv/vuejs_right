<template>
  <div>
    <div v-if="loading">
      <img
        style="display: flex;height: 90vh;justify-content: center;"
        src="../../assets/images/dual-ring.svg"
        alt
        width="10"
      />
    </div>
    <template v-else>
      <div v-if="!isListEmpty">
        <div class="pro-dtl-full">
          <div class="pro-dtl-oflow">
            <div v-for="(item,index) in finalShortList" :key="index" class="db_pro_card p-relative">
              <div class="pro_dtl_main">
                <div class="apply-ddline">
                  {{item.application_deadline}}
                  <span>Application Deadline</span>
                </div>
                <div class="univ_img">
                  <img src="../../assets/images/university-img.png" alt />
                </div>
                <div class="univ_dtl">
                  <h2>{{item.university_name}}</h2>
                  <p>{{item.city + ", " + (item.state?(item.state + ", "):"") + item.country}}</p>
                  <span>{{item.degree+", "+item.program_name}}</span>
                </div>
              </div>
              <div class="macv-value">
                <div>
                  <span>Match to Expectations</span>
                  <p>{{(parseFloat(item.match_to_expectation) ? parseFloat(item.match_to_expectation).toFixed(1) : 0)}}%</p>
                </div>
                <div class="admission">
                  <span>Admission Chances</span>
                  <p>{{(parseFloat(item.admission_chance) ? parseFloat(item.admission_chance).toFixed(1) : 0)}}%</p>
                </div>
                <div>
                  <span>Cost of Attendance</span>
                  <p>
                    <i class="rupee">₹</i>
                    {{(((parseFloat(item.cost_of_attendance) ? item.cost_of_attendance : 0) / 100000).toFixed(2))}}L
                  </p>
                </div>
                <div>
                  <span>Value for Money</span>
                  <p>{{(parseFloat(item.value_for_money) ? parseFloat(item.value_for_money).toFixed(1) : 0)}} %</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sliderightaction">
          <button type="button" @click.prevent="shareRight()">Get Suggestions</button>
        </div>
      </div>
      <div v-else class="no-result">
        <img src="../../assets/images/select-shortlist.png" alt />
        <p style="text-align: center;font-size: 15px;">
          You have not shortlisted any program(s) yet.
          <a
            @click.prevent="resetDashBoard()"
            style="color:#FA7B50"
            href="#"
          >Go to dashboard</a> and
          shortlist
          program(s).
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      finalShortList: [],
      shortlist_id: "",
      loading: false,
      isListEmpty: false
    };
  },
  methods: {
    async shareRight() {
      let payload = [];
      this.finalShortList.forEach(element => {
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
      let result = await this.$util.put(
        this.$util.dashboardEntryPoint + "/v1/dashboard/final-shortlist/share",
        {
          user_id: localStorage.getItem("user_id"),
          shortlist_id: this.shortlist_id,
          program_ids: payload
        }
      );

      if (result.status == "success") {
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
          params: { token: result.message.url_token }
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
    },
    resetDashBoard() {
      this.$store.dispatch("updateSideBarTriggers", false);
      this.$store.dispatch("updateTriggerFinalShortList", false);
      this.$store.dispatch("updateActiveTab", "scenario");
      $("#scenarioTab a").addClass("active");
      $("#moreTab a").removeClass("active");
    }
  },
  async created() {
    let response = {};
    this.loading = true;
    response = await this.$util.get(
      this.$util.dashboardEntryPoint +
        "/v1/dashboard/" +
        localStorage.getItem("user_id") +
        "/final-shortlist"
    );
    if (response.status === "success") {
      this.shortlist_id = response.message.shortlist_id;
      this.finalShortList = response.message.finalShortList;

      if (typeof this.finalShortList === "object") {
        if (this.finalShortList.length <= 0) {
          this.isListEmpty = true;
        } else this.isListEmpty = false;
      } else this.isListEmpty = true;
    }
    this.loading = false;
  }
};
</script>

