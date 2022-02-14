<template>
  <div>
    <div class="db_nav" id="sidebar">
      <div class="nav_logo" style="cursor:pointer" @click.prevent="routToHome()">
        <a href="#" class="logo_img">&nbsp;</a>
      </div>
      <div class="nav-top-menu">
        <ul id="sideNav">
          <li
            id="scenarioTab"
            data-toggle="tooltip"
            data-placement="right"
            title
            data-original-title="Scenarios"
          >
            <a @click.prevent="activateTab($event,'scenario')" class="active db-link">
              <i></i>
              <span>Scenario</span>
            </a>
          </li>
          <li
            id="searchTab"
            data-toggle="tooltip"
            data-placement="right"
            v-if="!mobileRule"
            title
            data-original-title="Search Program/University"
          >
            <a @click.prevent="activateTab($event,'search')" class="adms-link">
              <i></i>
              <span>Search</span>
            </a>
          </li>
          <li
            data-toggle="tooltip"
            data-placement="right"
            id="shortlistTab"
            title
            data-original-title="Shortlist"
            class
          >
            <div v-if="getPulseIt" class="notif-btn" style="position: absolute;"></div>

            <a @click.prevent="activateTab($event,'shortlist')" class="shortlist-link">
              <i></i>
              <span>Shortlist</span>
              <b
                v-if="(getScenarioById(getActiveScenario)).shortListedPrograms.length>0"
              >{{(getScenarioById(getActiveScenario)).shortListedPrograms.length}}</b>
            </a>
          </li>
          <li
            id="data_playTab"
            data-toggle="tooltip"
            data-placement="right"
            v-if="!mobileRule"
            title
            data-original-title="Data Playground"
          >
            <a @click.prevent="activateTab($event,'data_play')" class="dataplay-link">
              <i></i>
              <span>DataPlay Ground</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="nav-bottom-menu">
        <ul>
          <li data-toggle="tooltip" data-placement="right" title data-original-title="Support">
            <a @click.prevent="fireChatBox()" class="support-link">
              <i></i>
              <span>Support</span>
            </a>
          </li>
          <li
            id="moreTab"
            data-toggle="tooltip"
            data-placement="right"
            title
            data-original-title="More options"
          >
            <a @click.prevent="activateTab($event,'more')" id="moreEvent" class="more-link">
              <i></i>
              <span>More</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      mobileRule: false
    };
  },
  methods: {
    ...mapActions([
      "updateSideBarTriggers",
      "updateActiveTab",
      "triggerSupportPopUp"
    ]),
    activateTab(event, tab) {
      this.$store.dispatch("updateRefTriggred", false);
      $("ul#sideNav li.active").removeClass("active");
      $("ul#sideNav li a").removeClass("active");
      $("li#moreTab a").removeClass("active");
      // if (tab === "scenario") {
      $("#" + tab + "Tab" + " a").addClass("active");
      // } else if (tab === "search") {
      //   $("#" + tab + "Tab").addClass("active");
      // }

      // event.target.parentElement.classList.add("active");
      this.$store.dispatch("updateActiveTab", tab);

      window.scroll({
        top: 0,
        left: 0
        // behavior: "smooth"
      });

      if (this.$util.mobileAndTabletCheck()) {
        this.$store.dispatch("updateSideMenuToggles", true);
      }
    },
    fireChatBox() {
      // this.$util.freshChatInIt();
      if (this.$util.mobileAndTabletCheck()) {
        this.$store.dispatch("updateSideMenuToggles", true);
      }
      document.getElementById("fc_frame").style.display = "block";
      // document.getElementById("fc_frame").style.width = "100%";
      window.fcWidget.open();
      $(".faq-link").trigger("click");

      setTimeout(() => {
        var iframe = document.getElementById("fc_widget");
        iframe.contentWindow.postMessage(
          iframe.contentWindow.document
            .getElementsByClassName("channel-content")[0]
            .click(),
          "*"
        );
        iframe.contentWindow.document
          .getElementsByClassName("channel-content")[0]
          .click();
      }, 1000);
    },
    prompt() {
      this.$swal({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        type: "info",
        html: `&nbsp; Coming soon!`
      });
    },
    addScrollClass() {
      $("body").addClass("no-scroll");
    },
    routToHome() {
      localStorage.setItem("previousUrl", "/");
      localStorage.setItem("currentUrl", "/");
      // this.$router.push({ name: "home" });
      window.location = this.$util.homeURL;
    }
  },
  computed: {
    ...mapGetters([
      "getActiveScenario",
      "getScenarioById",
      "getIsPaidUser",
      "getPulseIt"
    ])
  },
  created() {
    if (!this.getIsPaidUser && this.$util.mobileAndTabletCheck()) {
      //this.mobileRule = true;
    }
  },
  mounted() {
    if (this.$util.mobileAndTabletCheck()) {
      $('[data-toggle="tooltip"]').tooltip("disable");
    }
  }
};
</script>

<style scoped>
.notif-btn {
  width: 1px;
  height: 1px;
  padding: 28%;
  cursor: pointer;
  outline: 0;
  border: none;

  -webkit-border-radius: 100%;
  border-radius: 100%;

  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  -webkit-animation: pulse 1.6s infinite;
  animation: pulse 1.6s infinite;
}

.notif-btn svg {
  fill: #fff;
}

/* Animations */

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(215, 17, 73, 0.85);
    box-shadow: 0 0 0 0 rgba(215, 17, 73, 0.85);
  }

  70% {
    -webkit-box-shadow: 0 0 0 2em rgba(215, 17, 73, 0);
    box-shadow: 0 0 0 2em rgba(215, 17, 73, 0);
  }

  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(215, 17, 73, 0);
    box-shadow: 0 0 0 0 rgba(215, 17, 73, 0);
  }
}

@keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(215, 17, 73, 0.85);
    box-shadow: 0 0 0 0 rgba(215, 17, 73, 0.85);
  }

  70% {
    -webkit-box-shadow: 0 0 0 2em rgba(215, 17, 73, 0);
    box-shadow: 0 0 0 2em rgba(215, 17, 73, 0);
  }

  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(215, 17, 73, 0);
    box-shadow: 0 0 0 0 rgba(215, 17, 73, 0);
  }
}
</style>