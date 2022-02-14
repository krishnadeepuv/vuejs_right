import axios from 'axios';
import { rejects } from 'assert';
import swal from 'sweetalert2';

//var baseURL = 'http://api.gradright.com:';
var isProd = false;
var ssoURL = location.protocol + "//logindev.gradright.com";
var signupURL = location.protocol + "//signupdev.gradright.com";
var homeURL = location.protocol + "//dev.gradright.com";
var authEntryPoint = "https://authdev.gradright.com";
var questionsEntryPoint = "https://questionsdev.gradright.com";
var paymentEntryPoint = "https://paymentsdev.gradright.com";
var dashboardEntryPoint = "https://reportsdev.gradright.com";
var assistanceEntryPoint = "https://helperdev.gradright.com";
var razorKey = isProd ? "rzp_live_RCHNij751cFhor" : "rzp_test_VGq8AUwt2xVjX3";



var auth = {
  headers: { Authorization: "bearer " + (localStorage.getItem("token") ? localStorage.getItem("token") : "") },
  timeout: 15000
};

var get = async function (url) {
  return new Promise((resolve, reject) => {
    axios.get(url, auth).then(result => resolve(result.data))
      .catch((error) => {
        reject({ status: "error", message: error.message });
        console.log(error.message);
        if (error.message.includes('timeout')) {
          swal.fire({
            type: "error",
            title: "Grad is trying to connect",
            text: "Network is either slow or broken"
          });
        }
        else {
          swal.fire({
            type: "error",
            text: "Something went wrong! Please try again."
          }).then(function () {
            // localStorage.setItem("previousUrl", "/");
            // localStorage.setItem("currentUrl", "/");
            //window.location.href = "/";
          });
        }

        return { status: "error", message: error.message };
        let result = {};
        if (error.isAxiosError) {
          //result = handleException(error);
        }
        return result;
      });
    // reject(error);
  });
};
var getPrams = async function (url, payload) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      'params': { 'pid': payload },
      'paramsSerializer': function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  });
};
var post = function (url, payload) {
  return axios.post(url, payload, auth)
    .then(result => result.data)
    .catch(error => {
      console.log(error.message);
      swal.fire({
        type: "error",
        text: "Something went wrong! Please try again."
      }).then(function () {
        // localStorage.setItem("previousUrl", "/");
        // localStorage.setItem("currentUrl", "/");
        //window.location.href = "/";
      });
      return { status: "error", message: error.message };
      let result = {};
      if (error.isAxiosError) {
        result = handleException(error);
      }
      return result;
    });
};

var put = function (url, payload) {
  return axios.put(url, payload, auth)
    .then(result => result.data)
    .catch(error => {
      console.log(error.message);
      swal.fire({

        type: "error",
        text: "Something went wrong! Please try again."
      }).then(function () {
        // localStorage.setItem("previousUrl", "/");
        // localStorage.setItem("currentUrl", "/");
        //window.location.href = "/";
      });
      return { status: "error", message: error.message };
      let result = {};
      if (error.isAxiosError) {
        result = handleException(error);
      }
      return result;
    });
};

var deleteMode = function (url, payload) {

  return axios.delete(url, { data: payload }, auth)
    .then(result => result.data)
    .catch(error => {
      console.log(error.message);
      swal.fire({
        type: "error",
        text: "Something went wrong! Please try again."
      }).then(function () {
        // localStorage.setItem("previousUrl", "/");
        // localStorage.setItem("currentUrl", "/");
        //window.location.href = "/";
      });
      return { status: "error", message: error.message };
      let result = {};
      if (error.isAxiosError) {
        result = handleException(error);
      }
      return result;
    });
};

var fbCBoxRender = function () {
  setTimeout(function () {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '375928483082013',
        xfbml: true,
        version: 'v4.0'
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    FB.XFBML.parse(); // This is key for all this to work!
  }, 100);
};
var formulatePaidPriorities = function (userInputData, mode) {
  /** new flow */
  let mainTemplate = {
    accreditation: 0,
    alumni: 0,
    facultyQuality: 0,
    fame: 0,
    learning: 0,
    research: 0,
    indiansInTheCommunity: 0,
    earnings: 0,
    safety: 0,
    easeOfSettling: 0,
    ROED: 0,
    importanceToMicroField: 0
  };

  /** new flow */
  /*if (mode === "free") {
    userInputData.forEach(element => {
      let factorScore = element.normalizedScore;
      let numberOfSubFactors = template.filter(
        item => item.parent === element.type
      ).lengthor;
      let distributedScore = factorScore / numberOfSubFactors;
      template.forEach(item => {
        if (item.parent == element.type) {or
          item.normalizedScore = distributedScore;
        }
      });
    });

    for (const key of Object.keys(mainTemplate)) {
      mainTemplate[key] = template.filter(
        item => item.type === key
      )[0].normalizedScore;
    }
    return mainTemplate;
  } else {*/
  console.log(userInputData);

  for (const key of Object.keys(mainTemplate)) {
    mainTemplate[key] = userInputData.filter(
      item => item.type === key
    )[0].normalizedScore;
  }
  return mainTemplate;
  /*}*/
};

var freshChatInIt = function () {
  window.fcWidget.init({
    token: "a399853f-ca0e-4e2d-8c10-8fb89a3c8478",
    firstName: localStorage.getItem("user_name"),              // user’s first name
    // lastName: "Doe",
    host: "https://wchat.freshchat.com",
    "config": {
      // headerProperty: {
      //   direction: 'rtl'
      // },
      showFAQOnOpen: false
    },
    onInit: function () {
      window.fcWidget.on("widget:closed", function () {
        document.getElementById('fc_frame').style.display = 'none';
      });
      //window.fcWidget.user.setFirstName(localStorage.getItem("user_name"));
    }
  });
};
function handleException(error) {
  let result = { status: "error", message: error.message, code: error.response.status };
  if (error.response.status == "409")
    result.message = "phone or email already exists.";
  else
    alert("Action failed with status code - " + error.response.status);

  console.log(error.config.url + " failed with status code - " + error.response.status);
  // console.log(error.message);
  return result;
}

function getQueryStringValue(key) {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        "^(?:.*[&\\?]" +
        encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
        "(?:\\=([^&]*))?)?.*$",
        "i"
      ),
      "$1"
    )
  );
}

async function getQuestionText(questionName, questionList) {
  return new Promise((resolve, reject) => {
    if (questionList.questions) {
      let questionData = questionList.questions.filter(item => {
        return item.unique_name == questionName;
      })[0];

      resolve({
        status: true,
        id: questionData._id,
        text: questionData.text,
        unique_name: questionData.unique_name
      });
    } else {
      resolve({
        status: false
      });
    }
  });
}

function renderChart(getMostImportantListPaid) {
  //graph need to be cleared before rendering
  let params = [];
  let color = [];
  for (
    let index = 0;
    index < getMostImportantListPaid.length;
    index++
  ) {
    const element = getMostImportantListPaid[index];
    params.push(element.score);
    color.push(element.color);
  }
  $("#myChart").remove();
  $("#chart-block").append(
    !mobileAndTabletCheck() ? '<canvas id="myChart"  width="270" height="270"><canvas>' : '<canvas id="myChart"  width="200" height="200"><canvas>'
  );
  var ctx = document.getElementById("myChart");
  ctx = document.getElementById("myChart").getContext("2d");
  ctx.height = 500;
  ctx = $("#myChart");

  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [
        {
          data: params,
          backgroundColor: color
        }
      ],
      labels: [
        "Faculty Reputation",
        "Research Infrastructure",
        "Active Alumni",
        "Ease of settling abroad",
        "Global Reputation",
        "Earnings",
        "Indian-ness on campus",
        "Value for money",
        "Learning",
        "Performance within field",
        "Safety",
        "Accreditation"
      ]
    },
    options: {
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false
    }
  });
}

function mobileAndTabletCheck() {
  let check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

export default {
  get,
  post,
  put,
  deleteMode,
  getPrams,
  fbCBoxRender,
  formulatePaidPriorities,
  freshChatInIt,
  authEntryPoint,
  questionsEntryPoint,
  paymentEntryPoint,
  dashboardEntryPoint,
  assistanceEntryPoint,
  razorKey,
  ssoURL,
  homeURL,
  signupURL,
  getQueryStringValue,
  getQuestionText,
  renderChart,
  mobileAndTabletCheck
};