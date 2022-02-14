<template>
  <div>
    <div v-if="loadComponent" class="db_page">
      <div class="select-db">
        <div class="mbl-top-bar rsp-content">
          <img src="../../assets/images/gr_logo_icon.png" alt width="35" />
        </div>
        <div class="db_main share-page">
          <div class="top_bar">
            <div
              class="gr-logo rsp-hide"
              style="cursor: pointer;color:#fa7c50;font-size:25px;font-weight:700"
            >
              <img @click="home()" src="../../assets/images/gr_logo_icon.png" alt width="35" />
              Share
              <span style="color:#2ec5d4">Right</span>
            </div>
            <a
              v-if="isMobile"
              href="#"
              @click.prevent="openDescussions=!openDescussions;commentsToggel(true)"
              class="chat-btn discussion-btn"
            >Share advice</a>
            <div v-if="isShareMode" class="header-right column">
              <div style="color:#2CADCA;font-size: 26px;">
                <b>
                  {{user_name}}'s
                  <span style="color:#c4c4c4">ShareRight</span>
                </b>
              </div>
            </div>
            <div v-else class="user_share">
              <div class="shareright">
                <span @click="triggerShare()">Share</span>
                <div class="shareright-window" :class="{show:showShare}">
                  <a href="#" @click.prevent="showShare=false" class="close-share-pop">&nbsp;</a>
                  <ul>
                    <li>
                      <a
                        :href="'mailto:test@test.com?subject=What do you think&body='+whatsappLink"
                        title="Email"
                        class="share_mail"
                      >Email</a>
                    </li>
                    <li>
                      <a
                        :href="'https://www.facebook.com/sharer/sharer.php?u='+whatsappLink"
                        id="shareOnFB"
                        @click.prevent="shareOnFB()"
                        class="share_fb"
                        target="_blank"
                        title="Facebook"
                      >Facebook</a>
                    </li>
                    <li>
                      <a
                        :href="'https://web.whatsapp.com/send?text='+whatsappLink"
                        target="_blank"
                        class="share_wapp"
                      >Whatsapp</a>
                    </li>
                  </ul>
                  <button
                    type="button"
                    class="copy-link"
                    @click.prevent="copyToClipBoard()"
                  >Copy Link</button>
                </div>
              </div>
              <div class="user_info dropdown">
                <a href="#" data-toggle="dropdown">
                  <div class="user">
                    <span class title="uName">{{user_name}}</span>
                    <img src="../../assets/images/user.svg" width="35" />
                  </div>
                </a>
                <div class="dropdown-menu user-dropdown">
                  <ul>
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
          <div class="db_content">
            <div class="share-head-title">
              <p :class="{'rsp-hide':isShareMode}">{{user_name}} Profile</p>

              <span v-if="isShareMode" class="shr-info">
                {{user_name}} dearly
                <span
                  @click="commentsToggel(true)"
                  class="highlight"
                >values your advice</span>. Could you spare a few to know what they want,
                their background and
                <span
                  class="highlight"
                  @click="commentsToggel(true)"
                >share what you think</span> about his shortlist?
              </span>
              <span v-else class="shr-info">
                You can now
                <span @click="triggerShare()" class="highlight">share this page</span> with friends, alumni or any well-wisher
                for
                <span
                  @click="triggerShare()"
                  class="highlight"
                >advice</span> by rightly expressing what you want, who you are and your current shortlist.
              </span>
            </div>
            <div class="share-profile-sec">
              <div class="sh_pro_box" style="height: 340px;">
                <div class="share-profile-item sh_priority h-100">
                  <div class="shr_title ic_priority">Priorities</div>
                  <div class="sh-item-content">
                    <ul>
                      <li v-for="(item,index) in mostImp" :key="index">{{item}}</li>
                    </ul>
                    <ul>
                      <li v-for="(item,index) in leastImp" class="least" :key="index">{{item}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="sh_pro_box" :class="{'super-height':(!isMobile ||showSpel)}">
                <div v-if="!isMobile ||showSpel" class="share-profile-item sh_priority h-50">
                  <div class="shr_title ic_aoi">Areas of Interest</div>
                  <div v-if="showSpel" class="sh-item-content">
                    <span v-for="(item,index) in aoi" :key="index">{{item.specialization}}</span>
                  </div>
                  <div v-else>
                    <span style="padding: 15px;font-size: 13px;font-weight: 600;">Not specified</span>
                  </div>
                </div>
                <div class="share-profile-item sh_priority h-50">
                  <div class="shr_title ic_work">Work Experience</div>
                  <div class="sh-item-content">
                    <div class="sh-exp-block">
                      <div>
                        <span>Total</span>
                        <b>{{workExperience.total}} months</b>
                      </div>
                      <div>
                        <span>Research</span>
                        <b>{{workExperience.research }} months</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sh_pro_box" style="height: 340px;">
                <div class="share-profile-item sh_priority h-50">
                  <div class="shr_title ic_gre_score">GRE Score</div>
                  <div class="sh-item-content">
                    <div class="sh-exp-block super-gre">
                      <div>
                        <span>Quant</span>
                        <b>{{scores.gre.quant}}</b>
                      </div>
                      <div>
                        <span>Verbal</span>
                        <b>{{scores.gre.verbal}}</b>
                      </div>
                      <div>
                        <span>AWA</span>
                        <b>{{scores.gre.AWA}}</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="share-profile-item sh_priority h-50">
                  <div class="shr_title ic_toefl">{{showTofel?'TOEFL':'IELTS'}} Score</div>
                  <div class="sh-item-content">
                    <div class="sh-exp-block">
                      <div>
                        <span>Reading</span>
                        <b>{{showTofel?scores.toefl.reading:scores.ielts.reading}}</b>
                      </div>
                      <div>
                        <span>Listening</span>
                        <b>{{showTofel?scores.toefl.learning:scores.ielts.learning}}</b>
                      </div>
                      <div>
                        <span>Speaking</span>
                        <b>{{showTofel?scores.toefl.reading:scores.ielts.reading}}</b>
                      </div>
                      <div>
                        <span>Writing</span>
                        <b>{{showTofel?scores.toefl.writing:scores.ielts.writing}}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sh_pro_box" style="height: 340px;">
                <div class="share-profile-item sh_priority h-100">
                  <div class="shr_title ic_degree">Bachelor’s degree</div>

                  <div class="sh-item-content">
                    <p>
                      College / University
                      <b>{{degreeDetails.college_name}}</b>
                    </p>
                    <p>
                      Degree / Programme
                      <b>{{degreeDetails.program}}</b>
                    </p>
                    <p>
                      Percentage
                      <b>{{degreeDetails.gpa}}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="prolist-tab">
              <div v-if="!isMobile" class="comment_advice">
                <a
                  href="#"
                  class="show-factors"
                  @click.prevent="openDescussions=!openDescussions;commentsToggel(true)"
                >Share advice</a>
              </div>
              <div class="share-head-title">
                <p>Program Shortlisted</p>
              </div>
            </div>

            <div v-if="shortlistedData.length" class="sh_shortlist_pro">
              <ul>
                <li v-for="(item,index) in shortlistedData" :key="index">
                  <div class="univ-dtl">
                    <div class="pro_dtl_main">
                      <div class="univ_img">
                        <img src="../../assets/images/university-img.png" alt />
                      </div>
                      <div class="univ_dtl">
                        <h2>{{item.university_name}}</h2>
                        <p>{{item.city + ", " + (item.state ?(item.state + ", "):"") + item.country}}</p>
                        <span>{{item.degree+", "+item.program_name}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="macv-dtl">
                    <div>
                      <p>Match to Expectations</p>
                      <span>{{(parseFloat(item.match_to_expectation) ? parseFloat(item.match_to_expectation).toFixed(1) : 0)}}%</span>
                    </div>
                    <div>
                      <p>Admission Chances</p>
                      <span>{{(parseFloat(item.admission_chance) ? parseFloat(item.admission_chance).toFixed(1) : 0)}} %</span>
                    </div>
                    <div>
                      <p>Cost of Attendance</p>
                      <span>
                        <i class="rupee">₹</i>
                        {{(((parseFloat(item.cost_of_attendance) ? item.cost_of_attendance : 0) / 100000).toFixed(2))}} L
                      </span>
                    </div>
                    <div>
                      <p>Value for Money</p>
                      <span>{{(parseFloat(item.value_for_money) ? parseFloat(item.value_for_money).toFixed(1) : 0)}} %</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else>
              <div class="nolist">
                <img src="../../assets/images/empty-share.png" alt />
                <p v-if="!isShareMode" align="center" style="font-size:16px">
                  You can get better suggestions when
                  you shortlist
                  some progrems and share with your
                  friends.
                </p>
                <p v-else align="center" style="font-size:16px">Shortlist empty</p>
              </div>
            </div>
          </div>
          <div class="copyright">Copyright © 2020 GradRight. All rights reserved.</div>
        </div>
      </div>
      <div class="chat-box">
        <div class="chat-head" :class="{open:openDescussions}">
          <a
            href="#"
            class="close_popup"
            @click.prevent="openDescussions=!openDescussions;commentsToggel(false)"
          >
            <img src="../../assets/images/popup-close.svg" alt />
          </a>
          <h2>Share advice</h2>
        </div>
        <div class="chat-body" style="display:none">
          <div v-if="showFbLoad" style="margin-top: 30%;">
            <img
              style="height: 20%;width: 20%;text-align: center;margin: 90px auto;display: table;"
              src="../../assets/images/loading-anim1.svg"
              alt
            />
            <p
              style="color: rgb(250, 123, 80);text-align: center;margin-top: -61px;font-size: 13px;font-style: italic;"
            >Loading conversations...</p>
          </div>
          <div
            v-show="!showFbLoad"
            class="fb-comments"
            :data-href="baseURL+$route.path"
            data-width="100%"
            data-numposts="5"
            data-order-by="reverse_time"
          ></div>
        </div>
      </div>
      <!-- <div class="slideRightWindow" :class="{show:openDescussions}" id="proDtl-full">
        <div class="slide-fade" @click.prevent="openDescussions=false;commentsToggel(false)"></div>
        <div class="slideRight_content">
          <a
            href="#"
            class="close_popup"
            @click.prevent="openDescussions=false;commentsToggel(false)"
          >
            <img src="../../assets/images/popup-close.svg" alt />
          </a>
          <div class="hdr">Share advice</div>
          <div v-if="showFbLoad" style="margin-top: 30%;">
            <img
              style="height: 20%;width: 20%;text-align: center;margin: 90px auto;display: table;"
              src="../../assets/images/loading-anim1.svg"
              alt
            />
            <p
              style="color: rgb(250, 123, 80);text-align: center;margin-top: -61px;font-size: 13px;font-style: italic;"
            >Loading conversations...</p>
          </div>
          <div
            v-show="!showFbLoad"
            class="fb-comments"
            :data-href="baseURL+$route.path"
            data-width="100%"
            data-numposts="5"
            data-order-by="reverse_time"
          ></div>
        </div>
      </div>-->
      <page-footer></page-footer>
    </div>
    <div v-else class="question-loader">
      <div>
        <img src="../../assets/images/dual-ring.svg" alt width="50" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pageFooter from "./layout/Footer.vue";
export default {
  data() {
    {
      return {
        showShare: false,
        baseURL: "",
        user_status: false,
        user_name: "",
        scores: {},
        showTofel: true,
        whatsappLink: "",
        showFbLoad: true,
        showGPA: true,
        mostImp: [],
        leastImp: [],
        aoi: [],
        showSpel: false,
        workExperience: {},
        degreeDetails: {},
        shortlistedData: [],
        loadComponent: false,
        isMobile: false,
        utilityTemplate: [
          {
            type: "accreditation",
            name: "Accreditation",
            value: 0
          },
          {
            type: "alumni",
            name: "Alumni",
            value: 0
          },
          {
            type: "facultyQuality",
            name: "Faculty Quality",
            value: 0
          },
          {
            type: "fame",
            name: "Reputation",
            value: 0
          },
          {
            type: "learning",
            name: "Learning",
            value: 0
          },
          {
            type: "research",
            name: "Research",
            value: 0
          },
          {
            type: "indiansInTheCommunity",
            name: "Indians in the Community",
            value: 0
          },
          {
            type: "earnings",
            name: "Earnings",
            value: 0
          },
          {
            type: "safety",
            name: "Safety",
            value: 0
          },
          {
            type: "easeOfSettling",
            name: "Ease of Settling",
            value: 0
          },
          {
            type: "ROED",
            name: "Value for money",
            value: 0
          },
          {
            type: "importanceToMicroField",
            name: "Importance to Micro field",
            value: 0
          }
        ],
        loadList: true,
        isShareMode: false,
        shareName: "",
        arrowHead: false,
        openDescussions: false
      };
    }
  },
  computed: {
    ...mapGetters(["getIsPaidUser", "getIsShareMode"])
  },
  methods: {
    copyToClipBoard() {
      this.$swal({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        html: `&nbsp; Copied to clipboard`
      });
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(window.location.href).select();
      document.execCommand("copy");
      $temp.remove();
    },
    shareOnFB() {
      let u = location.href;
      let t = document.title;
      window.open(
        "http://www.facebook.com/sharer.php?u=" +
          encodeURIComponent(u) +
          "&t=Study abroad decisions, simplified. Data science powered community platform to help find your blind spots.",
        "sharer",
        "toolbar=0,status=0,width=626,height=436"
      );

      return false;

      // FB.ui({
      //   method: "feed",
      //   name: 'This is the content of the "name" field.',
      //   link: "https://www.facebook.com/sharer.php?u=" + window.location.href,
      //   picture: "https://gradright.com",
      //   caption: "What do you think of these recommendation?",
      //   description: "What do you think of these recommendation?",
      //   message: "What do you think of these recommendation?"
      // });
    },
    commentsToggel(isOpend) {
      /*if (isOpend) {
        $("body").addClass("no-scroll");
      } else {
        $("body").removeClass("no-scroll");
      }*/
      $(".chat-body").slideToggle("fast");
    },
    triggerShare() {
      if (this.$util.mobileAndTabletCheck()) {
        this.testWebShare(this.whatsappLink);
      } else this.showShare = true;
      // $(".hover-options").trigger("mouseenter");
      // $(".hover-options").mouseenter();
    },
    home() {
      let url = window.location.href;
      if (url.includes("dev")) {
        window.location = "https://dev.gradright.com";
      } else window.location = "https://gradright.com";
    },
    openMore() {
      this.$router.push({ name: "user-dashboard" });
    },
    signOut() {
      this.$store.dispatch("updateIsUserLoggedIn", false);
      this.isShareMode = true;
      localStorage.clear();
      this.$store.dispatch("resetAuth");
      // this.$store.dispatch("resetDashboard");
      this.$store.dispatch("resetQuestionState");
      localStorage.setItem("previousUrl", "/");
      localStorage.setItem("currentUrl", "/");
    },
    async testWebShare(rURL) {
      if (navigator.share === undefined) {
        console.log("Error: Unsupported feature: navigator.share");
        return;
      }
      const url_input = document.querySelector("#url");
      const text = rURL;
      try {
        await navigator.share({ text });
        console.log("Successfully sent share");
      } catch (error) {
        console.log("Error sharing: " + error);
      }
    }
  },
  components: {
    pageFooter
  },
  created() {
    this.baseURL = window.location.origin;
    this.isMobile = this.$util.mobileAndTabletCheck();
  },
  async mounted() {
    this.whatsappLink = window.location.href;
    //console.log("mounted");
    let userStatus = await this.$util.get(
      this.$util.paymentEntryPoint +
        "/v1/user/" +
        localStorage.getItem("user_id") +
        "/order-status"
    );
    this.user_status = userStatus.message === "paid" ? true : false;
    this.$store.dispatch("updateIsPaidUser", this.user_status);
    let response = await this.$util.get(
      this.$util.dashboardEntryPoint +
        "/v1/dashboard/final-shortlist/share/" +
        this.$route.path.split("/")[this.$route.path.split("/").length - 1]
    );
    if (response.status === "success") {
      // this.scenarioName =
      this.shortlistedData = response.message.programs_shared;
      if (this.shortlistedData.length <= 0) {
        this.loadList = false;
      }
      this.user_name =
        response.message.username.charAt(0).toUpperCase() +
        response.message.username.slice(1);
      if (this.user_name === localStorage.getItem("user_name")) {
        this.isShareMode = false;
      } else {
        this.isShareMode = true;
      }

      this.scores = response.message.student_input.scores;

      if (response.message.student_input.scores.ielts.total > 0) {
        this.showTofel = false;
      }
      this.aoi = response.message.student_input.area_of_interest;

      if (this.aoi.length > 0) {
        this.showSpel = true;
      }
      this.workExperience = response.message.student_input.work_experience;
      this.degreeDetails = response.message.student_input.bachelors;
      // console.log(JSON.stringify(this.degreeDetails));
      let b_scores = response.message.student_input.bachelors;
      if (b_scores.gpa_4) {
        this.degreeDetails.gpa = b_scores.gpa_4;
      } else if (b_scores.gpa_10) {
        this.degreeDetails.gpa = b_scores.gpa_10;
      } else {
        this.showGPA = false;
        this.degreeDetails.gpa = b_scores.percentage_yours;
      }

      for (const key of Object.keys(response.message.student_input.utility)) {
        this.utilityTemplate.filter(item => item.type === key)[0].value =
          response.message.student_input.utility[key];
      }
      let sortedList = this.utilityTemplate.sort(
        (a, b) => parseFloat(a.value) - parseFloat(b.value)
      );
      for (let index = 0; index < 3; index++) {
        this.leastImp.push(sortedList[index].name);
      }
      sortedList = sortedList.reverse();
      for (let index = 0; index < 3; index++) {
        this.mostImp.push(sortedList[index].name);
      }
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
    this.loadComponent = true;
    this.$util.fbCBoxRender();
    setTimeout(() => {
      this.showFbLoad = false;
    }, 3000);
    //this.commentsToggel();
    /* if (document.getElementById("my-fb")) return; // was already loaded
    var scriptTag = document.createElement("script");
    scriptTag.async = "async";
    scriptTag.src =
      "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v4.0&appId=731221433728457&autoLogAppEvents=1";
    scriptTag.id = "my-fb";
    document.getElementsByTagName("head")[0].appendChild(scriptTag);*/
    //console.log("exitting mounted");
  },
  beforeDestroy() {
    this.$store.dispatch("updateIsShareRight", false);
    this.$store.dispatch("updateIsShareMode", false);
  }
};
</script>
<style  scoped>
.nolist {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* height: 80vh; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 1.2em;
  /* color: #fa7b50; */
  padding: 2em;
}
.nolist img {
  width: 300px;
  height: auto;
}

.db_main {
  transition: 0.2s;

  position: absolute;
  /* padding: 0 50px; */
  background: #f8f8f9;
  color: #5b5b76;
}

.highlight {
  cursor: pointer;
  font-size: 13px;
  color: #2ec5d4;
}

.sh-item-content b,
.sh-item-content li {
  font-size: 13px;
}

.sh-item-content p {
  font-size: 12px;
}
.super-gre div {
  padding: 0 12% 0 0 !important;
}
.super-height {
  height: 340px;
}
</style>

