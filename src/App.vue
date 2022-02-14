<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    checkIsUserOnline() {
      if (
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          localStorage.getItem("user_id")
        ) ||
        !localStorage.getItem("token")
      )
        return false;
      else return true;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path.includes("shareright")) {
        return;
      }
      localStorage.setItem("routed_to", to.path);
      localStorage.setItem("routed_from", from.path);
      if (!this.checkIsUserOnline()) {
        window.location.href = this.$util.ssoURL + "/?message=loginFirst";
      }
    }
  },
  created() {
    if (window.location.href.includes("shareright")) {
      return;
    }
    if (!this.checkIsUserOnline()) {
      if (!this.$util.getQueryStringValue("token")) {
        window.location.href = this.$util.ssoURL + "/?message=loginFirst";
      }
    }
  }
};
</script>

<style>
</style>
