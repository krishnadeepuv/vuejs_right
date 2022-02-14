<template>
  <div class="select-process">
    <div class="logo-select">
      <img src="../../assets/images/select-logo.png" alt width="200" />
    </div>
    <div class="select-process-center">
      <div v-if="false" class="select-process-headings">
        <h2>Pellentesque cursus, eros eget vehicula!</h2>
        <p>Nullam a mauris leo. Donec suscipit nisl sit amet dictum aliquam. Nam dui enim, cursus</p>
      </div>

      <ul>
        <li class="step-analyize">
          <h4>Analyze</h4>
        </li>
        <li class="step-shortlist">
          <h4>Shortlist</h4>
        </li>
        <li class="step-share">
          <h4>ShareRight</h4>
        </li>
      </ul>
      <div class="select-pro-btn">
        <router-link
          tag="button"
          style="background:#fdc665"
          :to="{name:'user-dashboard'}"
        >Go to Dashboard</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>