<template>
  <div class="global_chart">
    <div class="chart_val">
      <div class="val-box amb">
        Ambitious
        <span>{{ ambitiousCount }}</span>
      </div>
      <div class="val-box mod">
        Moderate
        <span>{{ moderateCount }}</span>
      </div>
      <div class="val-box safe">
        Safe&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>{{ safeCount }}</span>
      </div>
    </div>
    <div id="chartdiv"></div>
    <div class="bslide-fade"></div>
    <div class="bslide-box">
      <a href="#" @click.prevent="closeSlider()" class="close-bs"></a>
      <div class="bslide-hdr">
        <h2>{{ tooltipData.state }}</h2>
      </div>
      <div class="bslide-scroll">
        <div class="bslide-content" style="display: none;">
          <div class="map-ttip">
            <div
              class="ttip-item"
              v-for="(item, index) in tooltipData.fullData"
              :key="index"
            >
              <div class="item-univ-name">{{ item.name }}</div>
              <span class="item-pro">{{ item.degree }}</span>
              <p class="metrics">
                <span class="metric-item">M {{ item.m }}%</span>
                <span class="metric-item">A {{ item.a }}%</span>
                <span class="metric-item">
                  C
                  <span class="rupee">₹</span>
                  {{ item.c }} L
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";

export default {
  data() {
    return {
      stateCodes: [
        {
          code: "US-WY",
          longitude: -107.53655,
          name: "Wyoming",
          latitude: 43.001000000000005,
        },
        {
          code: "US-WV",
          longitude: -80.6106457816211,
          name: "West Virginia",
          latitude: 38.65029333704605,
        },
        {
          code: "US-WI",
          longitude: -90.02939880964333,
          name: "Wisconsin",
          latitude: 44.64077977601623,
        },
        {
          code: "US-WA",
          longitude: -120.41554847328322,
          name: "Washington DC",
          latitude: 47.37424493824208,
        },
        {
          code: "US-WA",
          longitude: -120.41554847328322,
          name: "Washington",
          latitude: 47.37424493824208,
        },
        {
          code: "US-VT",
          longitude: -72.66750316981812,
          name: "Vermont",
          latitude: 44.07540785899888,
        },
        {
          code: "US-VA",
          longitude: -78.87133545447753,
          name: "Virginia",
          latitude: 37.52773886599295,
        },
        {
          code: "US-UT",
          longitude: -110.919975,
          name: "Utah",
          latitude: 38.874475,
        },
        {
          code: "US-TX",
          longitude: -99.3578530826763,
          name: "Texas",
          latitude: 31.506144425522375,
        },
        {
          code: "US-TN",
          longitude: -86.03130000000002,
          name: "Tennessee",
          latitude: 35.8405,
        },
        {
          code: "US-SD",
          longitude: -100.2221812129443,
          name: "South Dakota",
          latitude: 44.44071907835582,
        },
        {
          code: "US-SC",
          longitude: -80.89846408805207,
          name: "South Carolina",
          latitude: 33.915763206928354,
        },
        {
          code: "US-RI",
          longitude: -71.59939469154985,
          name: "Rhode Island",
          latitude: 41.704087346409345,
        },
        {
          code: "US-PA",
          longitude: -77.79810036258893,
          name: "Pennsylvania",
          latitude: 40.874958836167615,
        },
        {
          code: "US-OR",
          longitude: -120.54336158854386,
          name: "Oregon",
          latitude: 43.940020730200565,
        },
        {
          code: "US-OK",
          longitude: -97.51190031656273,
          name: "Oklahoma",
          latitude: 35.59077880511146,
        },
        { code: "US-OH", longitude: -83.0438, name: "Ohio", latitude: 40.2117 },
        {
          code: "US-NY",
          longitude: -75.06724999999999,
          name: "New York",
          latitude: 43.44015000000001,
        },
        {
          code: "US-NV",
          longitude: -116.65183421409768,
          name: "Nevada",
          latitude: 39.3550469928408,
        },
        {
          code: "US-NM",
          longitude: -106.11079342465919,
          name: "New Mexico",
          latitude: 34.42193993093767,
        },
        {
          code: "US-NJ",
          longitude: -74.71719999999999,
          name: "New Jersey",
          latitude: 39.757,
        },
        {
          code: "US-NH",
          longitude: -71.57829558496896,
          name: "New Hampshire",
          latitude: 43.689622389942585,
        },
        {
          code: "US-NE",
          longitude: -99.6877,
          name: "Nebraska",
          latitude: 41.5012,
        },
        {
          code: "US-ND",
          longitude: -99.4584,
          name: "North Dakota",
          latitude: 47.468,
        },
        {
          code: "US-NC",
          longitude: -79.40705740327942,
          name: "North Carolina",
          latitude: 35.55672820495737,
        },
        {
          code: "US-MT",
          longitude: -109.62614745339614,
          name: "Montana",
          latitude: 47.03107741567746,
        },
        {
          code: "US-MS",
          longitude: -89.67131253937114,
          name: "Mississippi",
          latitude: 32.765799790735194,
        },
        {
          code: "US-MO",
          longitude: -92.44375,
          name: "Missouri",
          latitude: 38.30865,
        },
        {
          code: "US-MN",
          longitude: -94.65823124999999,
          name: "Minnesota",
          latitude: 46.802231250000006,
        },
        {
          code: "US-MI",
          longitude: -84.816,
          name: "Michigan",
          latitude: 43.7481,
        },
        {
          code: "US-ME",
          longitude: -69.24266248781653,
          name: "Maine",
          latitude: 45.401665821887484,
        },
        {
          code: "US-MD",
          longitude: -76.8019339531121,
          name: "Maryland",
          latitude: 39.065589274165134,
        },
        {
          code: "US-MA",
          longitude: -71.84136352904703,
          name: "Massachusetts",
          latitude: 42.27128387714697,
        },
        {
          code: "US-LA",
          longitude: -92.54366250000001,
          name: "Louisiana",
          latitude: 31.5161625,
        },
        {
          code: "US-KY",
          longitude: -85.28584247533693,
          name: "Kentucky",
          latitude: 37.53084772410103,
        },
        {
          code: "US-KS",
          longitude: -98.32130000000001,
          name: "Kansas",
          latitude: 38.5012,
        },
        {
          code: "US-IN",
          longitude: -86.27741847998969,
          name: "Indiana",
          latitude: 39.9097329101727,
        },
        {
          code: "US-IL",
          longitude: -89.20034142993887,
          name: "Illinois",
          latitude: 40.06989085861169,
        },
        {
          code: "US-ID",
          longitude: -115.27938750000001,
          name: "Idaho",
          latitude: 43.92281250000001,
        },
        {
          code: "US-IA",
          longitude: -93.49527635486156,
          name: "Iowa",
          latitude: 42.08851091103813,
        },
        {
          code: "US-HI",
          longitude: -155.51080045194962,
          name: "Hawaii",
          latitude: 19.611732920495225,
        },
        {
          code: "US-GA",
          longitude: -83.45726084615215,
          name: "Georgia",
          latitude: 32.65819156359583,
        },
        {
          code: "US-FL",
          longitude: -81.37102500000002,
          name: "Florida",
          latitude: 27.703325000000003,
        },
        {
          code: "US-DE",
          longitude: -75.41120000000001,
          name: "Delaware",
          latitude: 38.8285,
        },
        {
          code: "US-DC",
          longitude: -77.03088811514615,
          name: "",
          latitude: 38.938366733515025,
        },
        {
          code: "US-CT",
          longitude: -72.72542821845086,
          name: "Connecticut",
          latitude: 41.624289712913885,
        },
        {
          code: "US-CO",
          longitude: -105.52975,
          name: "Colorado",
          latitude: 39.0009,
        },
        {
          code: "US-CA",
          longitude: -117.8628625,
          name: "California",
          latitude: 35.4919625,
        },
        {
          code: "US-AZ",
          longitude: -111.65984527670338,
          name: "Arizona",
          latitude: 34.29094941189948,
        },
        {
          code: "US-AR",
          longitude: -92.44391404912884,
          name: "Arkansas",
          latitude: 34.9047487608521,
        },
        {
          code: "US-AL",
          longitude: -86.70795,
          name: "Alabama",
          latitude: 32.644800000000004,
        },
        {
          code: "US-AK",
          longitude: -154.14289999999997,
          name: "Alaska",
          latitude: 65.63740000000001,
        },
        { name: "Afghanistan", code: "AF" },
        { name: "Aland Islands", code: "AX" },
        { name: "Albania", code: "AL" },
        { name: "Algeria", code: "DZ" },
        { name: "American Samoa", code: "AS" },
        { name: "Andorra", code: "AD" },
        { name: "Angola", code: "AO" },
        { name: "Anguilla", code: "AI" },
        { name: "Antarctica", code: "AQ" },
        { name: "Antigua and Barbuda", code: "AG" },
        { name: "Argentina", code: "AR" },
        { name: "Armenia", code: "AM" },
        { name: "Aruba", code: "AW" },
        { name: "Australia", code: "AU" },
        { name: "Austria", code: "AT" },
        { name: "Azerbaijan", code: "AZ" },
        { name: "Bahamas", code: "BS" },
        { name: "Bahrain", code: "BH" },
        { name: "Bangladesh", code: "BD" },
        { name: "Barbados", code: "BB" },
        { name: "Belarus", code: "BY" },
        { name: "Belgium", code: "BE" },
        { name: "Belize", code: "BZ" },
        { name: "Benin", code: "BJ" },
        { name: "Bermuda", code: "BM" },
        { name: "Bhutan", code: "BT" },
        { name: "Bolivia, Plurinational State of", code: "BO" },
        { name: "Bonaire, Sint Eustatius and Saba", code: "BQ" },
        { name: "Bosnia and Herzegovina", code: "BA" },
        { name: "Botswana", code: "BW" },
        { name: "Bouvet Island", code: "BV" },
        { name: "Brazil", code: "BR" },
        { name: "British Indian Ocean Territory", code: "IO" },
        { name: "Brunei Darussalam", code: "BN" },
        { name: "Bulgaria", code: "BG" },
        { name: "Burkina Faso", code: "BF" },
        { name: "Burundi", code: "BI" },
        { name: "Cambodia", code: "KH" },
        { name: "Cameroon", code: "CM" },
        { name: "Canada", code: "CA" },
        { name: "Cape Verde", code: "CV" },
        { name: "Cayman Islands", code: "KY" },
        { name: "Central African Republic", code: "CF" },
        { name: "Chad", code: "TD" },
        { name: "Chile", code: "CL" },
        { name: "China", code: "CN" },
        { name: "Christmas Island", code: "CX" },
        { name: "Cocos (Keeling) Islands", code: "CC" },
        { name: "Colombia", code: "CO" },
        { name: "Comoros", code: "KM" },
        { name: "Congo", code: "CG" },
        { name: "Congo, the Democratic Republic of the", code: "CD" },
        { name: "Cook Islands", code: "CK" },
        { name: "Costa Rica", code: "CR" },
        { name: "CÃ´te d'Ivoire", code: "CI" },
        { name: "Croatia", code: "HR" },
        { name: "Cuba", code: "CU" },
        { name: "CuraÃ§ao", code: "CW" },
        { name: "Cyprus", code: "CY" },
        { name: "Czech Republic", code: "CZ" },
        { name: "Denmark", code: "DK" },
        { name: "Djibouti", code: "DJ" },
        { name: "Dominica", code: "DM" },
        { name: "Dominican Republic", code: "DO" },
        { name: "Ecuador", code: "EC" },
        { name: "Egypt", code: "EG" },
        { name: "El Salvador", code: "SV" },
        { name: "Equatorial Guinea", code: "GQ" },
        { name: "Eritrea", code: "ER" },
        { name: "Estonia", code: "EE" },
        { name: "Ethiopia", code: "ET" },
        { name: "Falkland Islands (Malvinas)", code: "FK" },
        { name: "Faroe Islands", code: "FO" },
        { name: "Fiji", code: "FJ" },
        { name: "Finland", code: "FI" },
        { name: "France", code: "FR" },
        { name: "French Guiana", code: "GF" },
        { name: "French Polynesia", code: "PF" },
        { name: "French Southern Territories", code: "TF" },
        { name: "Gabon", code: "GA" },
        { name: "Gambia", code: "GM" },
        { name: "Georgia", code: "GE" },
        { name: "Germany", code: "DE" },
        { name: "Ghana", code: "GH" },
        { name: "Gibraltar", code: "GI" },
        { name: "Greece", code: "GR" },
        { name: "Greenland", code: "GL" },
        { name: "Grenada", code: "GD" },
        { name: "Guadeloupe", code: "GP" },
        { name: "Guam", code: "GU" },
        { name: "Guatemala", code: "GT" },
        { name: "Guernsey", code: "GG" },
        { name: "Guinea", code: "GN" },
        { name: "Guinea-Bissau", code: "GW" },
        { name: "Guyana", code: "GY" },
        { name: "Haiti", code: "HT" },
        { name: "Heard Island and McDonald Islands", code: "HM" },
        { name: "Vatican City State", code: "VA" },
        { name: "Honduras", code: "HN" },
        { name: "Hong Kong", code: "HK" },
        { name: "Hungary", code: "HU" },
        { name: "Iceland", code: "IS" },
        { name: "India", code: "IN" },
        { name: "Indonesia", code: "ID" },
        { name: "Iran, Islamic Republic of", code: "IR" },
        { name: "Iraq", code: "IQ" },
        { name: "Ireland", code: "IE" },
        { name: "Isle of Man", code: "IM" },
        { name: "Israel", code: "IL" },
        { name: "Italy", code: "IT" },
        { name: "Jamaica", code: "JM" },
        { name: "Japan", code: "JP" },
        { name: "Jersey", code: "JE" },
        { name: "Jordan", code: "JO" },
        { name: "Kazakhstan", code: "KZ" },
        { name: "Kenya", code: "KE" },
        { name: "Kiribati", code: "KI" },
        { name: "Korea, Democratic People's Republic of", code: "KP" },
        { name: "Korea, Republic of", code: "KR" },
        { name: "Kuwait", code: "KW" },
        { name: "Kyrgyzstan", code: "KG" },
        { name: "Lao People's Democratic Republic", code: "LA" },
        { name: "Latvia", code: "LV" },
        { name: "Lebanon", code: "LB" },
        { name: "Lesotho", code: "LS" },
        { name: "Liberia", code: "LR" },
        { name: "Libya", code: "LY" },
        { name: "Liechtenstein", code: "LI" },
        { name: "Lithuania", code: "LT" },
        { name: "Luxembourg", code: "LU" },
        { name: "Macao", code: "MO" },
        { name: "Macedonia, the Former Yugoslav Republic of", code: "MK" },
        { name: "Madagascar", code: "MG" },
        { name: "Malawi", code: "MW" },
        { name: "Malaysia", code: "MY" },
        { name: "Maldives", code: "MV" },
        { name: "Mali", code: "ML" },
        { name: "Malta", code: "MT" },
        { name: "Marshall Islands", code: "MH" },
        { name: "Martinique", code: "MQ" },
        { name: "Mauritania", code: "MR" },
        { name: "Mauritius", code: "MU" },
        { name: "Mayotte", code: "YT" },
        { name: "Mexico", code: "MX" },
        { name: "Micronesia, Federated States of", code: "FM" },
        { name: "Moldova, Republic of", code: "MD" },
        { name: "Monaco", code: "MC" },
        { name: "Mongolia", code: "MN" },
        { name: "Montenegro", code: "ME" },
        { name: "Montserrat", code: "MS" },
        { name: "Morocco", code: "MA" },
        { name: "Mozambique", code: "MZ" },
        { name: "Myanmar", code: "MM" },
        { name: "Namibia", code: "NA" },
        { name: "Nauru", code: "NR" },
        { name: "Nepal", code: "NP" },
        { name: "Netherlands", code: "NL" },
        { name: "New Caledonia", code: "NC" },
        { name: "New Zealand", code: "NZ" },
        { name: "Nicaragua", code: "NI" },
        { name: "Niger", code: "NE" },
        { name: "Nigeria", code: "NG" },
        { name: "Niue", code: "NU" },
        { name: "Norfolk Island", code: "NF" },
        { name: "Northern Mariana Islands", code: "MP" },
        { name: "Norway", code: "NO" },
        { name: "Oman", code: "OM" },
        { name: "Pakistan", code: "PK" },
        { name: "Palau", code: "PW" },
        { name: "Palestine, State of", code: "PS" },
        { name: "Panama", code: "PA" },
        { name: "Papua New Guinea", code: "PG" },
        { name: "Paraguay", code: "PY" },
        { name: "Peru", code: "PE" },
        { name: "Philippines", code: "PH" },
        { name: "Pitcairn", code: "PN" },
        { name: "Poland", code: "PL" },
        { name: "Portugal", code: "PT" },
        { name: "Puerto Rico", code: "PR" },
        { name: "Qatar", code: "QA" },
        { name: "RÃ©union", code: "RE" },
        { name: "Romania", code: "RO" },
        { name: "Russian Federation", code: "RU" },
        { name: "Rwanda", code: "RW" },
        { name: "Saint BarthÃ©lemy", code: "BL" },
        { name: "Saint Helena, Ascension and Tristan da Cunha", code: "SH" },
        { name: "Saint Kitts and Nevis", code: "KN" },
        { name: "Saint Lucia", code: "LC" },
        { name: "Saint Martin", code: "MF" },
        { name: "Saint Pierre and Miquelon", code: "PM" },
        { name: "Saint Vincent and the Grenadines", code: "VC" },
        { name: "Samoa", code: "WS" },
        { name: "San Marino", code: "SM" },
        { name: "Sao Tome and Principe", code: "ST" },
        { name: "Saudi Arabia", code: "SA" },
        { name: "Senegal", code: "SN" },
        { name: "Serbia", code: "RS" },
        { name: "Seychelles", code: "SC" },
        { name: "Sierra Leone", code: "SL" },
        { name: "Singapore", code: "SG" },
        { name: "Sint Maarten", code: "SX" },
        { name: "Slovakia", code: "SK" },
        { name: "Slovenia", code: "SI" },
        { name: "Solomon Islands", code: "SB" },
        { name: "Somalia", code: "SO" },
        { name: "South Africa", code: "ZA" },
        { name: "South Georgia and the South Sandwich Islands", code: "GS" },
        { name: "South Sudan", code: "SS" },
        { name: "Spain", code: "ES" },
        { name: "Sri Lanka", code: "LK" },
        { name: "Sudan", code: "SD" },
        { name: "Suriname", code: "SR" },
        { name: "Svalbard and Jan Mayen", code: "SJ" },
        { name: "Swaziland", code: "SZ" },
        { name: "Sweden", code: "SE" },
        { name: "Switzerland", code: "CH" },
        { name: "Syrian Arab Republic", code: "SY" },
        { name: "Taiwan, Province of China", code: "TW" },
        { name: "Tajikistan", code: "TJ" },
        { name: "Tanzania, United Republic of", code: "TZ" },
        { name: "Thailand", code: "TH" },
        { name: "Timor-Leste", code: "TL" },
        { name: "Togo", code: "TG" },
        { name: "Tokelau", code: "TK" },
        { name: "Tonga", code: "TO" },
        { name: "Trinidad and Tobago", code: "TT" },
        { name: "Tunisia", code: "TN" },
        { name: "Turkey", code: "TR" },
        { name: "Turkmenistan", code: "TM" },
        { name: "Turks and Caicos Islands", code: "TC" },
        { name: "Tuvalu", code: "TV" },
        { name: "Uganda", code: "UG" },
        { name: "Ukraine", code: "UA" },
        { name: "United Arab Emirates", code: "AE" },
        { name: "United Kingdom", code: "GB" },
        { name: "United States", code: "US" },
        { name: "United States Minor Outlying Islands", code: "UM" },
        { name: "Uruguay", code: "UY" },
        { name: "Uzbekistan", code: "UZ" },
        { name: "Vanuatu", code: "VU" },
        { name: "Venezuela, Bolivarian Republic of", code: "VE" },
        { name: "Viet Nam", code: "VN" },
        { name: "Virgin Islands, British", code: "VG" },
        { name: "Virgin Islands, U.S.", code: "VI" },
        { name: "Wallis and Futuna", code: "WF" },
        { name: "Western Sahara", code: "EH" },
        { name: "Yemen", code: "YE" },
        { name: "Zambia", code: "ZM" },
        { name: "Zimbabwe", code: "ZW" },
      ],
      ambitiousCount: 0,
      moderateCount: 0,
      safeCount: 0,
      chartInstance: {},
      tooltipData: {},
    };
  },
  props: ["classify"],
  computed: {
    ...mapGetters(["getScenarioById", "getActiveScenario"]),
  },
  methods: {
    async getGeoCodes(program) {
      // this.userMapData.forEach(element => {

      // });
      try {
        let response = await this.$util.get(
          "http://open.mapquestapi.com/geocoding/v1/address?key=tzZ0vNcTo2IsPwFA4PLljInNJCU6DFUj&location=" +
            program.city +
            "," +
            program.state
        );
        if (response) {
          if (response.results[0].locations[0].latLng) {
            return response.results[0].locations[0].latLng;
          } else {
            return "";
          }
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    },
    closeSlider() {
      $(".bslide-content").slideToggle("fast");
      $(".bslide-fade").toggleClass("show");
      $(".bslide-box").toggleClass("open");
    },
  },
  mounted() {
    /* Chart code */
    // Themes begin
    var vm = this;
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    this.chartInstance = chart;

    let title = chart.titles.create();

    /*title.text =
      "[bold font-size: 20]Population of the World in 2011[/]\nsource: Gapminder";
    title.textAlign = "middle";*/
    let scenario = this.getScenarioById(this.getActiveScenario);
    let cfl = scenario.filters.challenge_fair_likely;
    let currentCountry = "United States (Total)";
    let currentPolygon;
    let userMapData = [];
    // if (!this.classify) {
    //   userMapData = scenario.user_programs;
    // } else {
    userMapData = scenario.recommended_programs;
    //}

    // console.log(await this.getGeoCodes(userMapData[0]));

    let mapData = [];

    for (let index = 0; index < userMapData.length; index++) {
      const item = userMapData[index];

      /*let coordinates = await this.getGeoCodes(item);*/
      let color = "#f54e5b";

      if (parseFloat(item.admission_chance) <= cfl.challenge.to) {
        this.ambitiousCount++;
        color = "#f54e5b";
      } else if (
        parseFloat(item.admission_chance) <= cfl.fair.to &&
        parseFloat(item.admission_chance) > cfl.fair.from
      ) {
        this.moderateCount++;
        color = "#fac44a";
      } else {
        this.safeCount++;
        color = "#5cd039";
      }
      /**change */
      // color = "#000";
      /*if (coordinates) {
        coordinates = [coordinates.lat, coordinates.lng];
      }*/
      let state = {};
      if (item.country === "United States of America") {
        state = this.stateCodes.filter(
          (element) => element.name.toLowerCase() === item.state.toLowerCase()
        )[0];
      } else {
        state = this.stateCodes.filter(
          (element) => element.name.toLowerCase() === item.country.toLowerCase()
        )[0];
      }

      if (state) {
        let modifiedItem = {
          id: state.code,
          name: item.university_name,
          degree: item.degree + ", " + item.program_name,
          value: parseFloat(item.admission_chance)
            ? parseFloat(item.admission_chance).toFixed(1) + "%"
            : "0%",
          geometry: {
            type: "Point",
            coordinates: [state.latitude, state.longitude],
          },
          // color,
          color: "#7BADC5",
          state: state.name,
          m: parseFloat(item.match_to_expectation)
            ? parseFloat(item.match_to_expectation).toFixed(1)
            : 0,
          a: parseFloat(item.admission_chance)
            ? parseFloat(item.admission_chance).toFixed(1)
            : 0,
          c: parseFloat(item.admission_chance)
            ? parseFloat(item.admission_chance).toFixed(1)
            : 0,
          metrics:
            "M " +
            (parseFloat(item.match_to_expectation)
              ? parseFloat(item.match_to_expectation).toFixed(1)
              : 0) +
            "% | A " +
            (parseFloat(item.admission_chance)
              ? parseFloat(item.admission_chance).toFixed(1)
              : 0) +
            "% | C ₹" +
            (
              (parseFloat(item.cost_of_attendance)
                ? item.cost_of_attendance
                : 0) / 100000
            ).toFixed(2),
        };
        /**change */
        modifiedItem.value = "50";
        mapData.push(modifiedItem);
      }
    }

    let temp = [];

    mapData.forEach((element) => {
      if (!temp.filter((item) => item.id === element.id).length) {
        element.fullData = [];
        element.fullData.push(element);
        element.htmlData =
          `<div style="width: 90%;
  margin: 0 0 5px;">
        <div style="  color: #08104d;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;">` +
          element.name +
          `</div>
        <span style="color: #2ec5d4;
  font-size: 0.8em;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  margin: 0 0 5px;">` +
          element.degree +
          `</span>
        <p style="font-size: 1em;
  color: #f43d4b;"> 
            <span style=" border-right: 1px solid rgba(81, 89, 119, 0.1);
  font-weight: 600;
  padding: 0 5px 0 0;
  margin: 0 5px 0 0;">M ` +
          element.m +
          `% </span>
            <span style=" border-right: 1px solid rgba(81, 89, 119, 0.1);
  font-weight: 600;
  padding: 0 5px 0 0;
  margin: 0 5px 0 0;">A ` +
          element.a +
          `% </span>
            <span style=" border-right: 1px solid rgba(81, 89, 119, 0.1);
  font-weight: 600;
  padding: 0 5px 0 0;
  margin: 0 5px 0 0;border-right: none;">C <span class="rupee">₹</span> ` +
          element.c +
          ` L </span> 
        </p>
    </div>`;
        /*element.htmlData =
          `<tr style="font-size:12px">
                    <th align="left">` +
          element.name +
          `</th>
                    <td>` +
          element.metrics +
          `</td>
                    </tr>`;*/
        temp.push(element);
      } else {
        /*temp.filter(item => item.id === element.id)[0].htmlData +=
          ` <tr style="font-size:12px">
                    <th align="left">` +
          element.name +
          `</th>
                    <td>` +
          element.metrics +
          `</td>
                    </tr>`;*/
        temp.filter((item) => item.id === element.id)[0].fullData.push(element);
        temp.filter((item) => item.id === element.id)[0].htmlData +=
          `<div style="width: 90%;
  margin: 0 0 5px;">
        <div style="  color: #08104d;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;">` +
          element.name +
          `</div>
        <span style="color: #2ec5d4;
  font-size: 0.8em;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  margin: 0 0 5px;">` +
          element.degree +
          `</span>
        <p style="font-size: 1em;
  color: #f43d4b;"> 
            <span style="border-right: 1px solid rgba(81, 89, 119, 0.1);
  font-weight: 600;
  padding: 0 5px 0 0;
  margin: 0 5px 0 0;">M ` +
          element.m +
          `% </span>
            <span style="border-right: 1px solid rgba(81, 89, 119, 0.1);
  font-weight: 600;
  padding: 0 5px 0 0;
  margin: 0 5px 0 0;">A ` +
          element.a +
          `% </span>
            <span style="border-right: 1px solid rgba(81, 89, 119, 0.1);
  font-weight: 600;
  padding: 0 5px 0 0;
  margin: 0 5px 0 0;border-right: none;">C <span class="rupee">₹</span> ` +
          element.c +
          ` L </span> 
        </p>
    </div>`;
      }
    });
    mapData = temp;

    /**Zoom controls */
    chart.zoomControl = new am4maps.ZoomControl();
    chart.zoomControl.align = "right";
    chart.zoomControl.marginRight = 15;
    // chart.zoomControl.stepCount = 1;
    chart.zoomControl.valign = "middle";

    // by default minus button zooms out by one step, but we modify the behavior so when user clicks on minus, the map would fully zoom-out and show world data
    chart.zoomControl.minusButton.events.on("hit", showWorld);

    // clicking on a "sea" will also result a full zoom-out
    chart.seriesContainer.background.events.on("hit", showWorld);
    chart.seriesContainer.background.events.on("over", resetHover);
    chart.seriesContainer.background.fillOpacity = 0;
    chart.zoomEasing = am4core.ease.sinOut;
    /**Zoom controls end */

    // Set map definition
    chart.geodata = am4geodata_worldLow;
    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = "value";

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = "color";
    imageSeries.tooltip.getFillFromObject = false;
    imageSeries.tooltip.fill = am4core.color("#fff");
    imageSeries.tooltip.opacity = 0;
    // circle.tooltipText = "{name}: [bold]{value}[/]";
    /*circle.tooltipHTML = `<center><strong>{state}</strong></center>
                          <hr />
                          <table>
                          {htmlData}
                          </table>
                          <hr />`;*/

    if (!this.$util.mobileAndTabletCheck()) {
      circle.tooltipHTML = `<center><strong style="color:#000">{state}</strong></center>
                         
                          <div style='width: 300px;
                                      display: flex;
                                      flex-wrap: wrap;
                                      font-size: 12px;
                                      padding: 10px;
                                      justify-content: space-between;
                                      border-radius: 9px;'>
                          {htmlData}
                          </div>
                         `;
    }
    let isMobile = this.$util.mobileAndTabletCheck();
    circle.events.on("hit", function(event) {
      if (isMobile) {
        vm.tooltipData = event.target.dataItem.dataContext;
        $(".bslide-content").slideToggle("fast");
        $(".bslide-fade").toggleClass("show");
        $(".bslide-box").toggleClass("open");
      }
    });

    imageSeries.heatRules.push({
      target: circle,
      property: "radius",
      min: 4,
      max: 10,
      dataField: "value",
    });

    imageTemplate.adapter.add("latitude", function(latitude, target) {
      /*if (target.dataItem.dataContext.id === "KMM") {
        return target.dataItem.dataContext.geometry.coordinates[0];
      }*/
      if (target.dataItem.dataContext.id.includes("US"))
        return target.dataItem.dataContext.geometry.coordinates[0];
      else {
        let polygon = polygonSeries.getPolygonById(
          target.dataItem.dataContext.id
        );
        if (polygon) {
          if (target.dataItem.dataContext.id.includes("US-")) {
            return target.dataItem.dataContext.geometry.coordinates[0];
          } else return polygon.visualLatitude;
        } else return latitude;
      }
    });

    function showWorld() {
      currentCountry = "World";
      currentPolygon = undefined;
      resetHover();

      /*if (countryDataTimeout) {
        clearTimeout(countryDataTimeout);
      }*/

      // make all inactive
      polygonSeries.mapPolygons.each(function(polygon) {
        polygon.isActive = false;
      });
      /*
      updateCountryName();

      // update line chart data (again, modifying instead of setting new data for a nice animation)
      for (var i = 0; i < lineChart.data.length; i++) {
        let di = covid_us_total_timeline[i];
        let dataContext = lineChart.data[i];
        dataContext.confirmed = di.confirmed;
        dataContext.deaths = di.deaths;
        valueAxis.min = undefined;
        valueAxis.max = undefined;
      }

      lineChart.invalidateRawData();

      updateTotals(currentIndex);*/
      chart.goHome();
    }

    function resetHover() {
      polygonSeries.mapPolygons.each(function(polygon) {
        polygon.isHover = false;
      });
    }

    imageTemplate.adapter.add("longitude", function(longitude, target) {
      /*if (target.dataItem.dataContext.id === "KMM") {
        return target.dataItem.dataContext.geometry.coordinates[1];
      }*/
      if (target.dataItem.dataContext.id.includes("US")) {
        return target.dataItem.dataContext.geometry.coordinates[1];
      } else {
        let polygon = polygonSeries.getPolygonById(
          target.dataItem.dataContext.id
        );
        if (polygon) {
          if (target.dataItem.dataContext.id.includes("US-")) {
            return target.dataItem.dataContext.geometry.coordinates[1];
          } else return polygon.visualLongitude;
        } else return longitude;
      }
    });

    $(".bslide-content").scroll(function() {
      var scroll = $(this).scrollTop();
      if (scroll >= 10) {
        $(this)
          .parent()
          .addClass("scrolled");
      } else {
        $(this)
          .parent()
          .removeClass("scrolled");
      }
    });
  },
  beforeDestroy() {
    this.chartInstance.dispose();
  },
};
</script>

<style scoped>
#chartdiv {
  width: 100%;
  height: 600px;
}

@media only screen and (max-width: 768px) {
  #chartdiv {
    width: 100%;
    height: 100%;
  }
}

.map-ttip {
  width: 500px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  margin: 150px auto 0;
  font-size: 14px;
  padding: 10px;
  justify-content: space-between;
  border-radius: 10px;
}

.ttip-item {
  width: calc(49% - 10px);
  margin: 0 0 5px;
}

.item-univ-name {
  color: #08104d;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-pro {
  color: #2ec5d4;
  font-size: 0.8em;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  margin: 0 0 5px;
}

.metrics {
  font-size: 1em;
  color: #f43d4b;
}

.metrics .metric-item {
  border-right: 1px solid rgba(81, 89, 119, 0.1);
  font-weight: 600;
  padding: 0 5px 0 0;
  margin: 0 5px 0 0;
}

.metrics .metric-item:last-child {
  border-right: none;
}

.bslide-box {
  position: fixed;
  left: 0;
  bottom: -60px;
  background: #fff;
  width: 100%;
  border-radius: 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  z-index: 999;
  border-radius: 20px;
}

.bslide-box h2 {
  font-size: 1.8em;
  padding: 15px;
  margin: 0;
}

.bslide-content {
  height: 50vh;
  width: 100%;
  overflow: auto;
  margin-bottom: 45px;
  padding: 15px;
}

.bslide-fade {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 999;
  display: none;
}

.bslide-fade.show {
  opacity: 1;
  display: flex;
}

.bslide-content .map-ttip {
  width: 100%;
  margin: 0px auto 0;
  padding: 0;
}

.bslide-content .ttip-item {
  width: 100%;
  padding: 12px;
  box-shadow: 0px 0px 15px 0 rgba(185, 185, 185, 0.52);
  border-radius: 10px;
  margin-bottom: 10px !important;
}

.bslide-scroll {
  position: relative;
  overflow: hidden;
}

.scrolled::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 5px;
  box-shadow: 0px 2px 7px 1px rgba(0, 0, 0, 0.1);
  left: 0;
  top: -6px;
  z-index: 99;
}

.scrolled::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 5px;
  box-shadow: 0px -4px 7px 1px rgba(0, 0, 0, 0.1);
  left: 0;
  bottom: -7px;
  z-index: 99;
}

.close-bs {
  display: flex;
  background: url("../../assets/images/close-white.svg") no-repeat #616181
    center;
  background-size: 12px;
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 999;
  border-radius: 50%;
  left: calc(50% - 15px);
  top: -50px;
  opacity: 0;
  visibility: hidden;
}

.bslide-box.open .close-bs {
  opacity: 1;
  visibility: visible;
}
</style>
