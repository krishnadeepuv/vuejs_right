<template>
  <input
    type="text"
    :id="inputName"
    class="tagify--outside"
    spellcheck="flase"
    :placeholder="placeholderText"
    autocomplete
  />
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Tagify from "@yaireo/tagify";
// var vueObj =
export default {
  data() {
    return {
      parentTagify: "",
      tagControl: ""
    };
  },
  props: ["placeholderText", "inputName"],
  methods: {
    ...mapActions(["updateUniversityAction"]),
    renderData() {
      var vm = this;
      var input = document.getElementById(this.inputName);
      var ddlData = [];
      //console.log($("div.active").find("h3")[0].id);
      if (vm.inputName === "university") {
        ddlData = vm.getUniversityList;
      } else if (vm.inputName === "specialization") {
        ddlData = vm.getAoI.specialList;
      } else if (vm.inputName === "programs") {
        ddlData = vm.getAoI.programList;
      } else {
        ddlData = vm.getCountries;
      }

      var tagify = new Tagify(input, {
        whitelist: ddlData, //populating the autocomplete dropdown
        enforceWhitelist: true, //able to make only whitelisted tags

        dropdown: {
          position: "input",
          maxItems: 200,
          // closeOnSelect: false,
          enabled: 0 // always opens dropdown when input gets focus
        },
        delimiters: ":"
      });

      if (vm.inputName === "specialization") vm.tagControl = tagify;

      //prepopulating the selected tags
      var prePoppulate = [];
      ddlData.forEach(element => {
        if (element.isSelected == true) {
          prePoppulate.push(element);
        }
      });

      if (prePoppulate.length > 0) tagify.addTags(prePoppulate);

      //dispatching the add mutation
      tagify.on("add", function(e) {
        let option = e.detail.data;
        let data = { sId: option.id, value: option.value, isSelected: true };
        let action = "";
        if (option.type == "university") action = "updateUniversityAction";
        else if (option.type == "country") action = "updateCountry";
        else if (option.type == "specialization") {
          data.listType = "specialization";
          action = "updateAoI";
        } else if (option.type == "program") {
          data.listType = "program";
          action = "updateAoI";
        }
        var tagifyDiv = document.getElementsByClassName("tagify")[0];
        tagifyDiv.scrollTop = tagifyDiv.scrollHeight - tagifyDiv.clientHeight;
        vm.$store.dispatch(action, data);
      });
      //dispatching the remove mutation
      tagify.on("remove", function(e) {
        let option = e.detail.data;
        let data = { sId: option.id, isSelected: false };
        let action = "";
        if (option.type == "university") action = "updateUniversityAction";
        else if (option.type == "country") action = "updateCountry";
        else if (option.type == "specialization") {
          data.listType = "specialization";
          action = "updateAoI";
        } else if (option.type == "program") {
          data.listType = "program";
          action = "updateAoI";
        }

        vm.$store.dispatch(action, data);
      });
    }
  },
  computed: {
    ...mapGetters([
      "getUniversityList",
      "getAoI",
      "getCountries",
      "getIsLoading",
      "getSpecialization",
      "getRenderAutocomplete",
      "getDomainId"
    ])
  },
  beforeCreate() {
    //this.$store.dispatch("updateLoading", true);
  },
  mounted() {
    var vm = this;
    vm.renderData();
  }
};
</script>