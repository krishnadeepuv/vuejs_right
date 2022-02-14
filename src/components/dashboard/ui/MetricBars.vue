<template>
  <div class="dbar">
    <div :class="className+' data-bars' ">
      <div class="bar-percent" :style="'width:'+value+'%'"></div>
    </div>
    {{value+' '}}%
  </div>
</template>

<script>
export default {
  props: ["value", "className"]
};
</script>

<style scoped>
.dbar {
  display: flex;
  flex-direction: row;
  font-size: 0.85em;
  align-items: center;
}

.data-bars {
  background: #f2f2f2;
  border-radius: 6px;
  overflow: hidden;
  width: 150px;
  margin: 0 10px 0 0;
  display: flex;
  height: 20px;
}

.bar-percent {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  padding: 0.3em;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.match .bar-percent {
  background: #fa7b50;
}

.admision .bar-percent {
  background: #ffaa79;
}

.cost .bar-percent {
  background: #ffc399;
}
</style>