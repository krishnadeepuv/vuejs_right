<template>
  <div>
    <div class="db_content">
      <div class="manage_profile_tabs rsp-hide" v-if="!isMobile">
        <ul class="nav nav-tabs tabs-left">
          <li
            :class="{ active: refOpen }"
            @click="
              refOpen = true;
              reqOpen = false;
              preOpen = true;
            "
          >
            <a
              href="#ReferTab"
              data-toggle="tab"
              class="refer-tab"
              :class="{ active: refOpen }"
              aria-expanded="true"
              >Refer your Friends</a
            >
          </li>
          <li
            :class="{ active: reqOpen }"
            @click="
              reqOpen = true;
              refOpen = false;
              preOpen = true;
              openShare = false;
            "
          >
            <a
              href="#RequestCallTab"
              data-toggle="tab"
              class="reqcall-tab"
              aria-expanded="false"
              >Request for Callback</a
            >
          </li>
          <li>
            <div class="ext-btn">
              <button type="button" @click.prevent="fireChatBox()" class="chat">
                Chat
              </button>
              <button type="button" @click.prevent="signOut()" class="logout">
                Logout
              </button>
            </div>
          </li>
        </ul>
        <div class="tab-content" :class="{ open: preOpen }">
          <a
            href="#"
            @click.prevent="
              preOpen = false;
              refOpen = false;
              reqOpen = false;
            "
            class="tab-close rsp-content"
            >&nbsp;</a
          >
          <div class="tab-pane" :class="{ active: refOpen }" id="ReferTab">
            <div class="tab-info-content">
              <div class="refer-content">
                <b>Give us one, consider it done.</b>

                <p>
                  Refer 1 friend of yours who is planning to go for a Master’s
                  abroad. Once we verify their identity, we will unlock the
                  platform for you free of charge!
                </p>
                <button
                  type="button"
                  class="show-refer"
                  @click.prevent="triggerShare()"
                >
                  Refer Now
                </button>
                <div class="refer-share" :class="{ flip: openShare }">
                  <div class="flip-item">
                    <a
                      href="#"
                      @click.prevent="openShare = false"
                      class="close-share"
                    >
                      <img
                        src="../../../assets/images/close_circle_icon.svg"
                        alt
                        width="38"
                      />
                    </a>
                    <p>Share with Friends</p>
                    <input id="refInput" type="hidden" :value="referalURL" />
                    <ul>
                      <li>
                        <a
                          :href="
                            'mailto:mailto:edithtis@editthis.com?subject=GradRight referral&body=' +
                              emailbody
                          "
                          title="Email"
                          class="share_mail"
                          >Email</a
                        >
                      </li>
                      <li>
                        <a
                          href="#"
                          @click.prevent="shareOnFB()"
                          class="share_fb"
                          >Facebook</a
                        >
                      </li>
                      <li>
                        <a
                          :href="
                            'https://web.whatsapp.com/send?text=' + whatsappBody
                          "
                          target="_blank"
                          class="share_wapp"
                          >Whatsapp</a
                        >
                      </li>
                    </ul>
                    <button
                      type="button"
                      @click.prevent="copyToClipBoard(referalURL)"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane"
            :class="{ active: reqOpen }"
            id="RequestCallTab"
          >
            <div class="tab-info-content">
              <!-- <h3>Contact Us</h3>

              <p>+91 95028 90087</p>
              <div class="or">Or</div>-->

              <div class="request-call">
                <input
                  type="number"
                  v-model="mobileNumber"
                  placeholder="Enter your phone number"
                />
                <button @click.prevent="callbackRequest()">
                  Request for callback
                </button>
                <p>Bear with us. You will get a call back in 48 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="more-mbl-items rsp-content" v-if="isMobile">
        <ul>
          <li
            @click.prevent="
              refOpen = true;
              reqOpen = false;
            "
          >
            <a href="#" class="refer">Refer your Friend</a>
          </li>
          <li
            @click.prevent="
              reqOpen = true;
              refOpen = false;
              preOpen = false;
            "
          >
            <a href="#" class="callback">Request for Callback</a>
          </li>
          <li>
            <div class="ext-btn">
              <button
                type="button"
                @click.prevent="fireChatBox()"
                class="chat bs-box"
              >
                Chat
              </button>
              <button
                type="button"
                @click.prevent="signOut()"
                class="logout bs-box"
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="refer-bs" v-if="isMobile" :class="{ show: preOpen || refOpen }">
      <div class="bslide-fade"></div>

      <div class="bslide-box">
        <a
          href="#"
          @click.prevent="
            refOpen = false;
            preOpen = false;
          "
          class="close-bs"
        ></a>

        <div class="bslide-scroll">
          <div class="bslide-content" style>
            <div class="refer-content">
              <b>Give us one, consider it done.</b>

              <p>
                Refer 1 friend of yours who is planning to go for a Master’s
                abroad. Once we verify their identity, we will unlock the
                platform for you free of charge!
              </p>
              <button
                type="button"
                class="show-refer"
                @click.prevent="triggerShare()"
              >
                Refer Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="call-bs" v-if="isMobile" :class="{ show: reqOpen }">
      <div class="bslide-fade"></div>

      <div class="bslide-box">
        <a href="#" class="close-bs" @click.prevent="reqOpen = false"></a>

        <div class="bslide-scroll">
          <div class="bslide-content" style>
            <div class="request-call-bg">
              <div class="request-call">
                <input
                  type="text"
                  v-model="mobileNumber"
                  placeholder="Enter your phone number"
                />
                <button @click.prevent="callbackRequest()" type="button">
                  Request for callback
                </button>
                <p>Bear with us. You will get a call back in 48 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Krishnadeepu
 */

import pageFooter from "../layout/Footer.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      home_link: "",
      referalURL: "",
      emailbody: ``,
      whatsappBody: ``,
      mobileNumber: "",
      openShare: false,
      refOpen: true,
      reqOpen: false,
      preOpen: true,
      isMobile: false,
    };
  },
  components: {
    pageFooter,
  },
  methods: {
    ...mapActions([
      "updateRefTriggred",
      "updateTriggerFinalShortList",
      "triggerSupportPopUp",
    ]),
    addScrollClass() {
      $("body").addClass("no-scroll");
      $(".arrow").hide();
    },
    removeScroll() {
      $("body").removeClass("no-scroll");
      $(".arrow").show();
    },
    triggerHelp(triggred) {
      if (triggred) {
        $("#HelpNav").css("right", "0px");
        document.getElementById("content-more").style.marginRight = "500px";
        document.getElementById("fadediv").style.visibility = "visible";
      } else {
        $("#HelpNav").css("right", "-500px");
        document.getElementById("content-more").style.marginRight = "0";
        document.getElementById("fadediv").style.visibility = "hidden";
      }
    },
    fireChatBox() {
      /* // this.$util.freshChatInIt();
      document.getElementById("fc_frame").style.display = "block";
      document.getElementById("fc_frame").style.width = "100%";
      window.fcWidget.open();
      // var widget = $("#fc_frame");
      // $("#chatBox").html(widget);*/
      document.getElementById("fc_frame").style.display = "block";
      window.fcWidget.open();
      $(".faq-link").trigger("click");
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
    },
    copyToClipBoard(copiableText) {
      var copyText = document.getElementById("refInput");
      copyText.type = "text";
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      copyText.type = "hidden";
      this.copied = true;
      var vm = this;
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        html: `&nbsp; ` + `Copied to clipboard`,
      });
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
    async callbackRequest() {
      this.infoMessage = "";
      this.mobileClass = "";
      this.showMessage = false;
      if (/^\d{10}$/.test(parseInt(this.mobileNumber))) {
        let response = await this.$util.post(
          this.$util.assistanceEntryPoint + "/v1/request-callback",
          {
            user_id: localStorage.getItem("user_id"),
            phone: "+91" + this.mobileNumber,
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
            html: `&nbsp; ` + response.message,
          });
        } else {
          this.$swal({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            type: "error",
            html: `&nbsp; Did we mess up? Give it another try.`,
          });
        }
      } else {
        this.$swal({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          type: "error",
          html: `&nbsp; Oh no! Try using an Indian mobile.`,
        });
      }
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
    },
    triggerShare() {
      if (this.$util.mobileAndTabletCheck()) {
        this.testWebShare(this.whatsappBody);
      } else this.openShare = true;
    },
  },
  computed: {
    ...mapGetters(["getFinalShortListTriggers", "getRefTriggred"]),
  },
  watch: {
    getFinalShortListTriggers(value) {
      if (!value) {
        $(".arrow").show();
      }
    },
    getRefTriggred(value) {
      if (!value) {
        $(".arrow").show();
      }
    },
  },
  created() {
    let current_url = document.location.href;
    this.isMobile = this.$util.mobileAndTabletCheck();
    if (!current_url.includes("more")) {
      current_url = location.origin + "/dashboard/more";
      window.history.pushState({ path: current_url }, "", current_url);
    }
    this.home_link = this.$util.homeURL;
    if (this.$util.mobileAndTabletCheck()) {
      if (localStorage.getItem("openRef")) {
        localStorage.removeItem("openRef");
        this.preOpen = true;
        this.refOpen = true;
      } else {
        this.preOpen = false;
        this.refOpen = false;
      }
    }

    this.referalURL =
      window.location.origin + "?referral=" + localStorage.getItem("ref_token");
    this.whatsappBody =
      `I’m inviting you to check out GradRight’s premium college selection tool. As an aspiring Master’s student, I think you’ll find this useful. Tap to get started ` +
      this.referalURL;
    this.emailbody =
      `Hello <insert name>!
I’m inviting you to try out GradRight’s SELECT platform. It’s an all new, data-science powered, tech-enable college selection tool that helps you research colleges in a matter of minutes.
Built by folks from IIT Delhi, IIM Ahmedabad, BITS Pilani and University of Pennsylvania, GradRight aims to give students the right information at the right time to ensure that your graduate education is the right fit for you and also ensures a high return on your education.
You can get started:  ` +
      this.referalURL +
      ` 
Best,
<insert name>`;
  },
};
</script>

<style scoped>
.hlp-links a {
  font-size: 17px;
  color: black;
}
</style>
