<template>
  <!-- <div class="priority-items">
    <div class="pr-lbl">{{head}}</div>
    <div class="pr-bar">
      <div
        data-toggle="tooltip"
        :title="userValue+'%'"
        v-if="(parseFloat(userValue)<parseFloat(value) && false)"
        class="st-prcnt"
        :style="{'--widthValue': userValue+'%'}"
      >{{(parseFloat(userValue))>=5?((parseFloat(userValue))+' %'):''}}</div>
      <div
        data-toggle="tooltip"
        :title="value+'%'"
        class="st-uni"
        :style="{'--widthValue1': value+'%'}"
      >{{(parseFloat(value))>=5?((parseFloat(value))+' %'):''}}</div>
  </div>-->

  <li class="db_priority_item">
    <div class="db_priority_lbl">{{head}}</div>
    <div class="range-bar">
      <div class="range" :style="{'--widthValue': value+'%'}" :class="{'end':value<=7}">{{value}}%</div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["value", "head", "userValue"],
  created() {
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
};
</script>



<style scoped >
.priority-items {
  margin: 0 0 10px;
}

.pr-lbl {
  font-size: 16px;
}

.pr-bar {
  height: 16px;
  position: relative;
  background: #ddd;
  color: #fff;
  overflow: hidden;
  border-radius: 0 8px 8px 0;
  margin: 5px 0 0;
  box-shadow: inset 0 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 0.8em;
  width: 559px;
}
.st-prcnt {
  /* animation: stat_slide;
  animation-duration: 1s; */
  background: #2cadca;
  position: absolute;
  /* left: 0; */
  /* top: 0; */
  height: 100%;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 0 6px 6px 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  width: var(--widthValue);
}

.st-uni {
  background: #fa7b50;
  height: 100%;
  text-align: right;
  padding-right: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 0 6px 6px 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  width: var(--widthValue1);
}

.range-bar {
  width: calc(100% - 150px);
  font-size: 0.65em;
  background: #f2f2f5;
  border-radius: 10px;
  border: 1px solid #b8b8c1;
  display: flex;
  color: #fff;
  height: 21px;
}

.range {
  background: #fa7c50;
  /* border: 1px solid #c65d38; */
  border-radius: 10px;
  padding-right: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: var(--widthValue);
}
.end {
  justify-content: end !important;
  color: #4b4b53;
}
</style>