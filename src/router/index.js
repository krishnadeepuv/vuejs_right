import Vue from 'vue';
import Router from 'vue-router';
import questions from '../components/questions/';
// import reviewStory from '../components/questions/premium/ReviewMain.vue';
import shareRight from '../components/dashboard/ShareRight.vue';
import actionPlan from '../components/questions/ActionPlan.vue';
import dashboard from '../components/dashboard/index.vue';
import datepicker from '../components/dashboard/DatePicker.vue';
import whichYou from '../components/questions/screens/WhichAreYou.vue';
import subDomain from '../components/questions/screens/Subdomain.vue';
import university from '../components/questions/screens/University.vue';
import priority from '../components/questions/screens/Priority.vue';
import scores from '../components/questions/screens/Scores.vue';
import workExp from '../components/questions/screens/WorkExperience.vue';
import programs from '../components/questions/screens/Programs.vue';
import country from '../components/questions/screens/Country.vue';
import degreeDetails from '../components/questions/screens/DegreeDetails.vue';
import research from '../components/questions/screens/Research.vue';

Vue.use(Router);

const scrollBehavior = (to, from, savedPosition) => {
    let position = {};
    if (savedPosition) {
        //console.log(savedPosition);

        return savedPosition;
    } else {
        position.x = 0;
        position.y = 0;
    }
    return position;
};
export const router = new Router({
    mode: 'history',
    scrollBehavior,
    routes: [
        {
            path: '/questions',
            name: 'questions',
            component: questions
        },
        // {
        //     path: '/questions/reviewstory',
        //     name: 'reviewStory',
        //     component: reviewStory
        // },
        {
            path: '/questions/which-of-these-are-you',
            name: 'which-of-these-are-you',
            component: whichYou
        },
        {
            path: '/questions/discipline-for-your-masters',
            name: 'discipline-for-your-masters',
            component: subDomain
        },
        {
            path: '/questions/where-all-would-you-apply',
            name: 'where-all-would-you-apply',
            component: university
        },
        {
            path: '/questions/what-do-you-want-to-study',
            name: 'what-do-you-want-to-study',
            component: programs
        },
        {
            path: '/questions/what-are-your-country-preferences',
            name: 'what-are-your-country-preferences',
            component: country
        },
        {
            path: '/questions/most-important-thing-for-you',
            name: 'most-important-thing-for-you',
            component: priority
        },
        {
            path: '/questions/what-are-your-scores',
            name: 'what-are-your-scores',
            component: scores
        },
        {
            path: '/questions/work-experience',
            name: 'work-experience',
            component: workExp
        },
        {
            path: '/questions/your-bachelor-degree',
            name: 'your-bachelor-degree',
            component: degreeDetails
        },
        {
            path: '/questions/you-published-any-research',
            name: 'you-published-any-research',
            component: research
        },

        {
            path: '/dashboard',
            name: 'user-dashboard',
            component: dashboard
        },
        {
            path: '/dashboard/:name',
            name: 'dashboard',
            component: dashboard
        },
        {
            path: '/questions/action-plan',
            name: 'actionPlan',
            component: actionPlan
        },
        {
            path: "/datepicker",
            name: "datepicker",
            component: datepicker
        },
        // {
        //     path: '/start',
        //     name: 'listen',
        //     component: listen
        // },
        {
            path: '/shareright/:token',
            name: 'shareRight',
            component: shareRight
        },
        {
            path: '*',
            component: questions
        },
    ],
});

router.afterEach((to, from) => {
    // if (to.name === "home") {
    //     return false;
    // }
    localStorage.setItem("previousUrl", from.path);
    localStorage.setItem("currentUrl", to.path);
});