<template>
  <div class="refer_popup_overlay" :class="{'show':getShowRefOptions}">
    <div class="refer_popup">
      <a class="close" href="#">
        <!-- <img
          @click="updateShowRefOptions(false)"
          src="../../../assets/images/close.svg"
          alt
          width="15"
        />-->
      </a>
      <div class="refer_popup_socialicons">
        <ul>
          <li>
            <a
              :href="'mailto:mailto:edithtis@editthis.com?subject=GradRight referral&body='+emailbody"
              title="Email"
              class="email"
            >Email</a>
          </li>
          <li>
            <a href="#" @click.prevent="shareOnFB()" class="fb">Facebook</a>
          </li>
          <li>
            <a :href="'https://wa.me/?text='+whatsappBody" target="_blank" class="wat">Watsapp</a>
          </li>
        </ul>
      </div>
      <div class="button waves-effect waves-light" @click="copyToClipBoard(referalURL)">
        <!-- <img class="link_icon" src="../../../assets/images/link_refer.svg" alt width="17" />Copy link -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      referalURL: "",
      emailbody: ``,
      whatsappBody: ``
    };
  },
  computed: {
    ...mapGetters(["getShowRefOptions"])
  },
  methods: {
    ...mapActions(["updateShowRefOptions"]),
    copyToClipBoard(copiableText) {
      var copyText = document.getElementById("refInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.copied = true;
      var vm = this;
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        html: `&nbsp; ` + `Copied to clipboard`
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
    }
  },
  created() {
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
  }
};
</script>

<style>
</style>