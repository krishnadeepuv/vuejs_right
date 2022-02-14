<template>
  <div class="priority-item">
    <div class="range-slider-block">
      <div :id="dataObject.id" class="slider-bar" :disabled="!getPrioritiesMode"></div>
    </div>
  </div>
</template>
<script>
import "../../../assets/js/nouislider.js";
import wNumb from "wnumb";
import { mapGetters } from "vuex";

export default {
  props: ["dataObject"],
  computed: {
    ...mapGetters([
      "getRenderAutocomplete",
      "getPrioritiesMode",
      "getMostImportantListPaid"
    ])
  },
  mounted() {
    var vm = this;
    var slider = document.getElementById(vm.dataObject.id);
    noUiSlider.create(slider, {
      start: [parseInt(vm.dataObject.score)],
      connect: "lower",
      step: 1,
      orientation: "horizontal", // 'horizontal' or 'vertical'
      range: {
        min: 0,
        max: 100
      },
      tooltips: true,
      pips: {
        mode: "values",
        values: [0, 100],
        density: 100
      },
      swiping: true,
      format: wNumb({
        decimals: 0
      })
    });

    slider.noUiSlider.on("change", function(values, handle) {
      let payload = {
        type: vm.dataObject.type,
        value: values[handle],
        user: "paid"
      };
      vm.$store.dispatch("updateMostImportant", payload);
      setTimeout(() => {
        vm.$util.renderChart(vm.getMostImportantListPaid);
      }, 200);
    });

    /* $("#" + vm.dataObject.id).roundSlider({
      radius: 55,
      width: 6,
      readOnly: !this.getPrioritiesMode,
      handleSize: "+20",
      handleShape: "dot",
      sliderType: "min-range",
      editableTooltip: false,
      value: vm.dataObject.score,
      change: function(args) {
        let payload = {
          type: args.id,
          value: args.value,
          user: "paid"
        };
        vm.$store.dispatch("updateMostImportant", payload);
      }
    });*/
  }
};
</script>