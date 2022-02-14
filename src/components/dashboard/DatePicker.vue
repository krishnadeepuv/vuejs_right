<template>
  <div class="box">
    <section>
      <date-picker
        v-model="value1"
        type="datetime"
        placeholder="Select datetime"
        :show-time-panel="showTimePanel"
        @close="handleOpenChange"
      >
        <template v-slot:footer>
          <button
            class="mx-btn mx-btn-text"
            @click="toggleTimePanel"
          >{{ showTimePanel ? 'select date' : 'select time' }}</button>
        </template>
      </date-picker>
    </section>
    <section>
      <date-picker
        v-model="value2"
        type="datetime"
        placeholder="Select datetime range"
        range
        :show-time-panel="showTimeRangePanel"
        @close="handleRangeClose"
      >
        <template v-slot:footer>
          <button
            class="mx-btn mx-btn-text"
            @click="toggleTimeRangePanel"
          >{{ showTimeRangePanel ? 'select date' : 'select time' }}</button>
        </template>
      </date-picker>
    </section>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
const today = new Date();
today.setHours(0, 0, 0, 0);

export default {
  data() {
    return {
      value1: new Date(),
      value2: new Date(),
      value3: "",
      value4: "",
      value5: ""
    };
  },
  components: {
    DatePicker
  },
  watch: {
    value1(value) {
      console.log(value);
    },
    value2(value) {
      console.log(value);
    },
    value3(value) {
      console.log(value);
    },
    value4(value) {
      console.log(value);
    }
  },
  methods: {
    notBeforeToday(date) {
      return date < today;
    },
    notAfterToday(date) {
      return date > today;
    },
    notBeforeNine(date) {
      return date.getHours() < 9;
    },
    notBeforeDate(date) {
      return date < new Date(2019, 9, 9);
    },
    notBeforeTime(date) {
      return date < new Date(2019, 9, 9, 12);
    }
  }
};
</script>