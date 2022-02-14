//@ts-check
import util from '../../utilities/util.js';
const state = initialQuestionsState();

const getters = {
    getUserName: state => getData(state, "and-you-are").answer,

    getUniversityList: function (state) {
        let data = getData(state, "where-all-would-you-apply");
        var universityList = data.universityList.map(a => {
            return { "value": a.university_name + ", " + a.city + ", " + a.program_name, "id": a.program_id, "type": "university", "searchBy": a.tags, isSelected: false };
            //return { "text": a.university_name + ", " + a.city + ", " + a.program_name, "id": a.program_id, "type": "university", "searchBy": a.tags, selected: false };
        });
        var selectedUniversityList = data.answer;
        selectedUniversityList.forEach(element => {
            if (universityList.filter(item => item.id == element.id)[0]) {
                universityList.filter(item => item.id == element.id)[0].isSelected = true;
            }
        });
        return universityList;
    },
    getUserStatus: state => {
        let data = getData(state, "which-of-these-are-you");
        var userStatusList = data.statusList.map(a => {
            return { id: a.id, optionDescription: a.optionDescription, class: a.class, isChecked: false };
        });
        var checkedStatus = data.answer;
        checkedStatus.forEach(element => {
            userStatusList.filter(item => item.id == element.id)[0].isChecked = true;
        });
        return userStatusList;
    },
    getAoI: state => {
        let data = getData(state, "what-do-you-want-to-study");
        var specialList = data.intrestList.specialization.map(a => {
            return { "value": a.specialization_name, "id": a.specialization_id, "type": "specialization", "isSelected": false };
            //return { "text": a.specialization_name, "id": a.specialization_id, "type": "specialization", "selected": false };
        });
        var programList = data.intrestList.programs.map(a => {
            return { "value": a.program_name, "id": a.program_tag_id, "type": "program", "isSelected": false };
            //return { "text": a.program_name, "id": a.program_tag_id, "type": "program", "selected": false };
        });

        var selectedAOI = data.answer.specialization;
        var selectedPrograms = data.answer.programs;
        selectedAOI.forEach(element => {
            specialList.filter(item => item.id == element.id)[0].isSelected = true;
            //specialList.filter(item => item.id == element.id)[0].selected = true;
        });
        selectedPrograms.forEach(element => {
            programList.filter(item => item.id == element.id)[0].isSelected = true;
            //programList.filter(item => item.id == element.id)[0].selected = true;
        });
        return {
            programList: programList,
            specialList: specialList
        };
    },
    getSpecialization: state => {
        let data = getData(state, "what-do-you-want-to-study");
        var specialList = data.intrestList.specialization.map(a => {
            return { "value": a.specialization_name, "id": a.specialization_id, "type": "specialization", "isSelected": false };
        });
        var selectedAOI = data.answer.specialization;
        selectedAOI.forEach(element => {
            specialList.filter(item => item.id == element.id)[0].isSelected = true;
        });
        return specialList;
    },
    getMostImportantList: state => state.mostImportantList,
    getMostImportantListPaid: state => state.mostImportantListPaid,
    getScores: state => getData(state, "what-are-your-scores").answer,
    getWorkExperience: state => getData(state, "work-experience").answer,
    getDegreeDetails: state => getData(state, "your-bachelor-degree").answer,
    //getUserFinances: state => getData(state, "maximum-cost-of-attendance").answer,
    getUserResearchDetails: state => getData(state, "you-published-any-research").answer,
    getIsReviewPage: state => state.isReviewPage,
    getIsFreeScreens: state => state.isFreeScreens,
    getCountries: state => {
        let data = getData(state, "what-are-your-country-preferences");
        var countryList = data.countryList.map(a => {
            return { "value": a.country_name, "id": a.country_id, "type": "country", "searchBy": a.tags, "isSelected": false };
            //return { "text": a.country_name, "id": a.country_id, "type": "country", "searchBy": a.tags, "selected": false };
        });
        var selectedCountries = data.answer;

        selectedCountries.forEach(element => {
            if (countryList.filter(item => item.id == element.id)[0]) {
                countryList.filter(item => item.id == element.id)[0].isSelected = true;
                //countryList.filter(item => item.id == element.id)[0].selected = true;
            }
        });
        return countryList;
    },
    getIsFlashBackPage: state => state.isFlashBackPage,
    getFreeUserPrioritys: state => {
        var impList = state.mostImportantList;
        // mostImportantListPaid
        var modifiedList = [];
        var colors = ["bg_purple", "bg_green", "bg_orange", "bg_yellow", "bg_blue", "bg_red"];
        impList.forEach((element, index) => {
            var group = element.groupMembers;
            var name = element.type;
            var description = element.description;
            var data = { standardIndex: index, type: name, description: description, pxScore: 0, score: 0, normalizedScore: 0, circleColor: colors[index] };
            group.forEach(item => {
                data.score += item.score;
            });
            data.score = data.score / 2;
            modifiedList.push(data);
        });
        var scoresSummation = 0;
        modifiedList.forEach(element => {
            scoresSummation += element.score;
        });
        var sortedList = modifiedList.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
        sortedList.forEach((element, index) => {
            element.pxScore = (index + 1) * 30;
            element.normalizedScore = (element.score * 100) / scoresSummation;
        });

        modifiedList = sortedList.sort((a, b) => parseFloat(a.standardIndex) - parseFloat(b.standardIndex));
        return modifiedList;
    },
    getUserPrioritys: state => {
        /*var impList = state.mostImportantListPaid;
        var modifiedList = [];
        var colors = ["bg_purple", "bg_green", "bg_orange", "bg_yellow", "bg_blue", "bg_red", "bg_purple", "bg_green", "bg_orange", "bg_yellow", "bg_blue", "bg_red"];
        impList.forEach((element, index) => {
            var group = element.groupMembers;
            var name = element.type;
            var description = element.description;
            var data = { standardIndex: index, type: name, description, pxScore: 0, score: 0, normalizedScore: 0, circleColor: colors[index] };
            group.forEach(item => {
                data.score += item.score;
            });
            data.score = data.score / 2;
            modifiedList.push(data);
        });
        var scoresSummation = 0;
        modifiedList.forEach(element => {
            scoresSummation += element.score;
        });
        var sortedList = modifiedList.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
        sortedList.forEach((element, index) => {
            element.pxScore = (index + 1) * 8.34;
            element.normalizedScore = (element.score * 100) / scoresSummation;
        });

        modifiedList = sortedList.sort((a, b) => parseFloat(a.standardIndex) - parseFloat(b.standardIndex));*/
        var impList = Object.assign([], state.mostImportantListPaid);
        var modifiedList = {
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
        let scoreSummation = 0;
        impList.forEach(element => {
            scoreSummation += parseFloat(element.score);
        });
        impList.forEach(element => {
            let score = (element.score * 100) / scoreSummation;
            modifiedList[element.type] = score;
        });
        return modifiedList;
    },
    getColorfullReview: state => state.colorFull,
    getAllSelected: state => state.allSelected,
    getQuestionsList: state => state.questionsList,

    //**Above things need to be removed and can be depend on this getter - part of optimization */
    getAnswerById: state => {
        return (id) => state.questionScreens.filter(item => item.question_id == id)[0];
    },
    getPreFilledAnswersList: state => state.answersList,
    getIsLoading: state => state.loading,
    // getCollegeList: state => state.college_list,
    getCollegeList: state => {
        var collegeList = state.college_list.map(a => {
            return { "value": a.college_name, "id": a.college_id };
            //return { "text": a.country_name, "id": a.country_id, "type": "country", "searchBy": a.tags, "selected": false };
        });
        return collegeList;
    },
    // getProgramDegreeList: state => state.pd_list,
    getProgramDegreeList: state => {
        var collegeList = state.pd_list.map(a => {
            return { "value": a.name, "id": a.code };
            //return { "text": a.country_name, "id": a.country_id, "type": "country", "searchBy": a.tags, "selected": false };
        });
        return collegeList;
    },
    getActiveSlideIndex: state => state.activeSlideIndex,
    getRenderAutocomplete: state => state.renderAutocomplete,
    getPrioritiesMode: state => state.PrioritiesMode,
    getDomainDetails: state => getData(state, "discipline-for-your-masters").answer,
    getDomainList: state => {
        let data = getData(state, "discipline-for-your-masters");
        var countryList = data.domainList.map(a => {
            return { "value": a.subdomain_name, "id": a.subdomain_id };
            //return { "text": a.country_name, "id": a.country_id, "type": "country", "searchBy": a.tags, "selected": false };
        });
        return countryList;
    },
    // getDomainList: state => getData(state, "discipline-for-your-masters").domainList,
    getDomainId: state => getData(state, "discipline-for-your-masters").answer.subdomain_id,
    getredirectTriggred: state => state.redirectTriggred,
    getQsSubmited: state => state.qsSubmited

};

const mutations = {
    updateUserName: (state, userName) => {
        getData(state, "and-you-are").answer = userName;
    },
    updateUserStatus: (state, payload) => {
        var data = getData(state, "which-of-these-are-you");

        if (payload.isChecked) {
            let newItem = { id: payload.sId, optionDescription: data.statusList.filter(status => status.id == payload.sId)[0].optionDescription };
            data.answer.push(newItem);
        }
        else {
            data.answer = data.answer.filter(item => item.id != payload.sId);
        }
        // console.log(state.userStatus.filter(status => status.id == payload.sId));
        // console.log(state.userStatus);
    },
    updateUniversity: (state, payload) => {
        var data = getData(state, "where-all-would-you-apply");

        if (payload.isSelected) {
            let newItem = { id: payload.sId, name: payload.value };
            data.answer.push(newItem);
        }
        else {
            data.answer = data.answer.filter(item => item.id != payload.sId);
        }
    },
    updateSpecialization: async (state, payload) => {
        var data = getData(state, "what-do-you-want-to-study");
        if (payload.listType == "specialization") {
            if (payload.isSelected) {
                let newItem = { id: payload.sId, specialization: payload.value };
                data.answer.specialization.push(newItem);
            }
            else {
                data.answer.specialization = data.answer.specialization.filter(item => item.id != payload.sId);
            }
        }
        else {
            if (payload.isSelected) {
                let newItem = { id: payload.sId, program: payload.value };
                data.answer.programs.push(newItem);
            }
            else {
                data.answer.programs = data.answer.programs.filter(item => item.id != payload.sId);
            }
            /*let selectedPrograms = [];
            data.answer.programs.forEach(element => {
                selectedPrograms.push(element.id);
            });
            //let specialData = await util.getPrams("3001/v1/master-data/specialization?pid=", selectedPrograms);
            //let specialData = await util.get("3001/v1/master-data/specialization?pid=" + JSON.stringify(selectedPrograms));
            let specialData = await util.get("3001/v1/master-data/specialization?pid=1");

            if (specialData.status === "success") {
                data.intrestList.specialization = specialData.message.specialization;
            }
            else
                alert("Something went wrong!");*/
        }
        //state.areaOfIntrest.filter(aoi => aoi.id == payload.sId)[0].isSelected = payload.isSelected;
    },
    updateMostImportant: (state, payload) => {
        if (payload.user == 'free') {
            let item = state.mostImportantList.filter(group => group.type == payload.type)[0].groupMembers.filter(item => item.id == payload.sId)[0];
            item.isChecked = payload.isChecked;
            item.score = payload.score;
        }
        else {
            // let item = state.mostImportantListPaid.filter(group => group.type == payload.type)[0].groupMembers.filter(item => item.id == payload.sId)[0];
            // item.isChecked = payload.isChecked;
            // item.score = payload.score;
            let item = state.mostImportantListPaid.filter(item => item.type == payload.type)[0];
            item.score = payload.value;
        }
    },
    updateWorkExperienceQ: (state, payload) => {
        getData(state, "work-experience").answer[payload.type] = payload.value;
    },
    // updateBudget: (state, budget) => {
    //     state.budget = budget;
    // },
    updateExamScores: (state, payload) => {
        if (payload.subject == "")
            getData(state, "what-are-your-scores").answer[payload.exam].total = payload.score;
        else {
            getData(state, "what-are-your-scores").answer[payload.exam][payload.subject] = payload.score;
        }
    },
    updateDegreeDetails: (state, payload) => {
        getData(state, "your-bachelor-degree").answer[payload.whichDetail] = payload.detail;
    },
    updateUserFinances: (state, payload) => {
        getData(state, "maximum-cost-of-attendance").answer[payload.type] = payload.value;
    },
    updateUserResearchDetails: (state, payload) => {
        var data = getData(state, "you-published-any-research").answer;
        if (payload.type == 'link') {
            data.researchLinks.push(payload.detail);
        }
        else if (payload.type == 'linkRemove') {
            data.researchLinks = data.researchLinks.filter(item => item !== payload.detail);
        }
        else
            data[payload.type] = payload.detail;
    },
    updateIsReviewPage: (state, payload) => {
        state.isReviewPage = payload;
    },
    updateIsFreeScreens: (state, payload) => {
        state.isFreeScreens = payload;
    },
    updateCountry: (state, payload) => {
        var data = getData(state, "what-are-your-country-preferences");
        if (payload.isSelected) {
            let newItem = { id: payload.sId, country: payload.value };
            data.answer.push(newItem);
        }
        else {
            data.answer = data.answer.filter(item => item.id != payload.sId);
        }
        //state.country.filter(item => item.id == payload.sId)[0].isSelected = payload.isSelected;
    },
    updateIsFlashBackPage: (state, payload) => {
        state.isFlashBackPage = payload;
    },
    resetPriorities: (state, payload) => {
        var priorityList = state[payload];
        priorityList.forEach(element => {
            element.groupMembers.forEach(item => {
                item.isChecked = false;
                item.score = 0;
            });
        });
        getData(state, "most-important-thing-for-you").answer = [];
    },
    updateColorfullReview: (state, payload) => state.colorFull = payload,
    updateAllSelected: (state, payload) => state.allSelected = payload,
    updateQuestionsList: (state, payload) => state.questionsList = payload,
    updateQuestionScreens: (state, payload) => {
        state.questionScreens.filter(item => item.question_unique_name == payload.question_unique_name)[0].question_id = payload.id;
    },
    updateAnswersList: (state, payload) => {
        state.answersList = payload;
    },
    mapQuestionScreensWithAnswers: (state, payload) => {
        let screen = state.questionScreens.filter(item => item.question_id == payload.id)[0];
        if (screen) {
            screen.answer = payload.answer;
        }
    },
    updateLoading: (state, payload) => {
        state.loading = payload;
    },
    resetQuestionState(state) {
        // acquire initial state
        const initial_state = initialQuestionsState();
        Object.keys(initial_state).forEach(key => {
            state[key] = initial_state[key];
        });
    },
    updateDropDownData(state, payload) {
        getData(state, "where-all-would-you-apply").universityList = payload.university_programs;
        getData(state, "what-do-you-want-to-study").intrestList.programs = payload.program_list;
        getData(state, "what-are-your-country-preferences").countryList = payload.country_list;
        getData(state, "what-do-you-want-to-study").intrestList.specialization = payload.special_list;
        getData(state, "discipline-for-your-masters").domainList = payload.subdomain_list;
        state.college_list = payload.college_list;
        state.pd_list = payload.pd_list;
    },
    updateActiveSlideIndex(state, payload) {
        state.activeSlideIndex = payload;
    },
    updateRenderAutoComplete: (state, payload) => {
        state.renderAutocomplete = payload;
    },
    updatePrioritiesMode: (state, payload) => {
        state.PrioritiesMode = payload;
    },
    updateSubDomain: (state, payload) => {
        getData(state, "discipline-for-your-masters").answer = payload;

        getData(state, "where-all-would-you-apply").answer = [];
        getData(state, "what-do-you-want-to-study").answer = {
            programs: [],
            specialization: []
        };
        getData(state, "what-are-your-country-preferences").answer = [];

    },
    updateSpecificDropDownData(state, payload) {

        if (payload.type === "universities") {
            getData(state, "where-all-would-you-apply").universityList = payload.university_programs;
        } else if (payload.type === "programs") {
            getData(state, "what-do-you-want-to-study").intrestList.programs = payload.program_list;
        } else if (payload.type === "country") {
            getData(state, "what-are-your-country-preferences").countryList = payload.country_list;
        } else if (payload.type === "specialization") {
            getData(state, "what-do-you-want-to-study").intrestList.specialization = payload.special_list;
        }
        // state.college_list = payload.college_list;
        // state.pd_list = payload.pd_list;
    },
    updateRedirectTriggred(state, payload) {
        state.redirectTriggred = payload;
    },
    clearDomainDependents(state) {

        var data = getData(state, "where-all-would-you-apply");
        var pData = getData(state, "what-do-you-want-to-study");
        var cData = getData(state, "what-are-your-country-preferences");
        data.answer = [];
        pData.answer = {
            programs: [],
            specialization: []
        };
        cData.answer = [];
    },
    updateQsSubmited(state, payload) {
        state.qsSubmited = payload;
    }
};

const actions = {
    updateUserName: (context, payload) => {
        context.commit('updateUserName', payload);
    },
    updateUniversityAction: (context, payload) => {
        context.commit('updateUniversity', payload);
    },
    updateAoI: (context, payload) => {
        context.commit('updateSpecialization', payload);
    },
    updateUserStatus: (context, payload) => {
        context.commit('updateUserStatus', payload);
    },
    updateMostImportant: (context, payload) => {
        context.commit('updateMostImportant', payload);
    },
    updateWorkExperienceQ: (context, payload) => {
        context.commit('updateWorkExperienceQ', payload);
    },
    updateBudget: (context, payload) => {
        context.commit('updateBudget', payload);
    },
    updateExamScores: (context, payload) => {
        context.commit('updateExamScores', payload);
    },
    updateDegreeDetails: (context, payload) => {
        context.commit('updateDegreeDetails', payload);
    },
    updateUserResearchDetails: (context, payload) => {
        context.commit('updateUserResearchDetails', payload);
    },
    updateUserFinances: (context, payload) => {
        context.commit('updateUserFinances', payload);
    },
    updateIsReviewPage: (context, payload) => {
        context.commit('updateIsReviewPage', payload);
    },
    updateIsFreeScreens: (context, payload) => {
        context.commit('updateIsFreeScreens', payload);
    },
    updateCountry: (context, payload) => {
        context.commit('updateCountry', payload);
    },
    updateIsFlashBackPage: (context, payload) => {
        context.commit('updateIsFlashBackPage', payload);
    },
    resetPriorities: (context, payload) => {
        context.commit('resetPriorities', payload);
    },
    updateColorfullReview: (context, payload) => {
        context.commit('updateColorfullReview', payload);
    },
    updateAllSelected: (context, payload) => {
        context.commit('updateAllSelected', payload);
    },
    updateQuestionsList: (context, payload) => {
        context.commit('updateQuestionsList', payload);
    },
    updateQuestionScreens: (context, payload) => {
        context.commit('updateQuestionScreens', payload);
    },
    updateAnswersList: async (context, payload) => {
        context.commit('updateAnswersList', payload);
    },
    mapQuestionScreensWithAnswers: (context, payload) => {
        context.commit('mapQuestionScreensWithAnswers', payload);
    },
    updateLoading: (context, payload) => {
        context.commit('updateLoading', payload);
    },
    resetQuestionState: (context) => {
        context.commit('resetQuestionState');
    },
    updateDropDownData: (context, payload) => {
        context.commit('updateDropDownData', payload);
    },
    updateActiveSlideIndex: (context, payload) => {
        context.commit('updateActiveSlideIndex', payload);
    },
    updateRenderAutoComplete: (context, payload) => {
        context.commit('updateRenderAutoComplete', payload);
    },
    updatePrioritiesMode: (context, payload) => {
        context.commit('updatePrioritiesMode', payload);
    },
    updateSubDomain: (context, payload) => {
        context.commit('updateSubDomain', payload);
    },
    updateSpecificDropDownData: (context, payload) => {
        context.commit('updateSpecificDropDownData', payload);
    },
    updateRedirectTriggred(context, payload) {
        context.commit('updateRedirectTriggred', payload);
    },
    clearDomainDependents(context) {
        context.commit('clearDomainDependents');
    },
    updateQsSubmited(context, payload) {
        context.commit("updateQsSubmited", payload);
    }
};
function getData(state, question) {
    return state.questionScreens.filter(item => item.question_unique_name == question)[0];
}
export default {
    state,
    mutations,
    actions,
    getters
};

function initialQuestionsState() {
    return {
        questionScreens: [
            {
                "question_id": "",
                "question_unique_name": "and-you-are",
                answer: '',
            },
            {
                "question_id": "",
                "question_unique_name": "which-of-these-are-you",
                statusList: [
                    { id: 1, optionDescription: 'I am in college', class: "im-college" },
                    { id: 2, optionDescription: 'I am a working professional', class: "professional" },
                    { id: 3, optionDescription: 'I attempted GRE', class: "att_gre" },
                    { id: 4, optionDescription: 'I attempted TOEFL', class: "att_toefl" },
                    { id: 5, optionDescription: 'I want to go for masters in 2021', class: "masters" },
                    {
                        id: 6, optionDescription: 'I shortlisted some programs and want to find better ones', class: "shortlist"
                    },
                    { id: 8, optionDescription: 'I am slightly confused about where to apply', class: "confuse" },
                    { id: 7, optionDescription: 'I attempted IELTS', class: "att_ielts" }
                ],
                answer:
                    [
                        // { id: 1, optionDescription: 'I am in college' },
                        // { id: 7, optionDescription: 'I attempted IELTS' }
                    ]
            },
            {
                "question_id": "",
                "question_unique_name": "discipline-for-your-masters",
                domainList: [

                ],
                answer: {
                    subdomain_id: "-1",
                    subdomain_name: ""
                }
            },
            {
                "question_id": "",
                "question_unique_name": "where-all-would-you-apply",
                universityList: [
                    // { id: 1, name: 'UCLA', branch: 'Computer Science' },
                    // { id: 2, name: 'UCLA', branch: 'Electronics' },
                    // { id: 3, name: 'UC Berkely', branch: 'Art' },
                    // { id: 4, name: 'South bay', branch: 'Instrumentation' },
                ],
                answer: [

                    // { id: 3, name: 'UC Berkely', branch: 'Art' },
                    // { id: 4, name: 'South bay', branch: 'Instrumentation' },
                ]
            },
            {
                "question_id": "",
                "question_unique_name": "what-do-you-want-to-study",
                intrestList: {
                    programs: [
                        // { id: 1, program: 'Computer Science' },
                        // { id: 2, program: 'Computer Science and Engineering ' },
                        // { id: 3, program: 'Information and technology' },
                        // { id: 4, program: 'Informatics' },
                    ],
                    specialization: [
                        // { specialization_id: 1, specialization_name: 'Artificial intelligence' },
                        // { specialization_id: 2, specialization_name: 'Database' },
                        // { specialization_id: 3, specialization_name: 'IoT' },
                        // { specialization_id: 4, specialization_name: 'Big Data' },
                    ]
                },
                answer: {
                    programs: [],
                    specialization: []
                    // { id: 1, specilization: 'Artificial intelligence' },
                    // { id: 2, specilization: 'Database' },
                }
            },
            {
                "question_id": "",
                "question_unique_name": "what-are-your-country-preferences",
                countryList: [
                    // { id: 1, country: 'USA' },
                    // { id: 2, country: 'Canada' },
                    // { id: 3, country: 'France' },
                    // { id: 4, country: 'Germany' },
                    // { id: 5, country: 'UK' }
                ],
                answer: [
                    // { id: 4, country: 'Germany' },
                    // { id: 5, country: 'UK' }
                ]
            },
            {
                "question_id": "",
                "question_unique_name": "most-important-thing-for-you",
                answer: []
            },
            {
                "question_id": "",
                "question_unique_name": "what-are-your-scores",
                answer: {
                    gre: {
                        total: 0,
                        quant: 0,
                        verbal: 0,
                        AWA: 0
                    },
                    tofel: {
                        total: 0,
                        listening: 0, reading: 0, writing: 0, speaking: 0
                    },
                    ielts: {
                        total: 0,
                        listening: 0, reading: 0, writing: 0, speaking: 0
                    }
                }
            },
            {
                "question_id": "",
                "question_unique_name": "work-experience",
                answer: {
                    research: 0,
                    total: 0,
                    program: 0
                }
            },
            {
                "question_id": "",
                "question_unique_name": "your-bachelor-degree",
                answer: {
                    institution: "-1",
                    program: "-1",
                    your_score: "0",
                    max_score: "0",
                    scoreType: "score"
                }
            },
            {
                "question_id": "",
                "question_unique_name": "you-published-any-research",
                answer: {
                    international: "0",
                    national: "0",
                    college: "0",
                    others: "0",
                    regional: "0",
                    researchLinks: []
                }
            },
            /*{
                "question_id": "",
                "question_unique_name": "maximum-cost-of-attendance",
                answer: {
                    budget: "",
                    bootstrap: "",
                    assets: ""
                }
            }*/




        ],
        name: {},
        userStatus: {},//gre or working or ielts etc 
        universityList: {

        },
        areaOfIntrest: {

        },
        country: {

        },
        loading: false,
        mostImportantList: [
            {
                id: 1, type: 'academic', groupMembers: [{
                    id: 11, parent: 'academic', imageSrc: 'priority-Learning.svg', class: 'priority-item purple pull-left', description: 'Learning', isChecked: false, inputClass: 'primary', score: 0
                }, {
                    id: 12, parent: 'academic', imageSrc: 'priority-Learning.svg', class: 'priority-item yellow hide pull-left', description: 'Research Infrastructure', isChecked: false, inputClass: 'secondary', score: 0
                }]
            },
            {
                id: 2, type: 'financial', groupMembers: [{
                    id: 21, parent: 'financial', imageSrc: 'priority-earning.svg', class: 'priority-item green mar-lr-auto', description: 'Earnings', isChecked: false, inputClass: 'primary', score: 0
                }, {
                    id: 22, parent: 'financial', imageSrc: 'priority-earning.svg', class: 'priority-item pink mar-lr-auto hide', description: 'Popular hiring companies', isChecked: false, inputClass: 'secondary', score: 0
                }]
            },
            {
                id: 3, type: 'social', groupMembers: [{
                    id: 31, parent: 'social', imageSrc: 'priority-settling-abroad.svg', class: 'priority-item orange pull-right', description: `Ease of <br/> settling abroad`, isChecked: false, inputClass: 'primary', score: 0
                }, {
                    id: 32, parent: 'social', imageSrc: 'priority-settling-abroad.svg', class: 'priority-item blue pull-right hide', description: 'International Diversity', isChecked: false, inputClass: 'secondary', score: 0
                }]
            }
        ],
        /* mostImportantListPaid: [
             {
                 id: 1, type: 'facultyQuality', description: `Faculty<br> Reputation`, groupMembers: [{
                     id: 11, parent: 'facultyQuality', imageSrc: 'priority-faculty.svg', class: 'priority-item pink pull-right', description: `Faculty <br>Reputation`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 12, parent: 'facultyQuality', imageSrc: 'priority-faculty.svg', class: 'priority-item green hide pull-right', description: `Friendly <br>faculty`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 2, type: 'research', description: `Research<br> Infrastructure`, groupMembers: [{
                     id: 21, parent: 'research', imageSrc: 'priority-infrastructure.svg', class: 'priority-item blue pull-right', description: `Research <br> Infrastructure`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 22, parent: 'research', imageSrc: 'priority-infrastructure.svg', class: 'priority-item yellow hide pull-right', description: `High <br> research budget`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 3, type: 'alumni', description: `Active alumni`, groupMembers: [{
                     id: 31, parent: 'alumni', imageSrc: 'priority-alumni.svg', class: 'priority-item yellow pull-right', description: `Active <br/> Alumni`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 32, parent: 'alumni', imageSrc: 'priority-alumni.svg', class: 'priority-item blue hide pull-right', description: `International <br/> Diverse Alumni`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 4, type: 'easeOfSettling', description: `Ease of settling<br> abroad`, groupMembers: [{
                     id: 41, parent: 'easeOfSettling', imageSrc: 'priority-settling-abroad.svg', class: 'priority-item green pull-right', description: `Ease of <br/>settling abroad`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 42, parent: 'easeOfSettling', imageSrc: 'priority-settling-abroad.svg', class: 'priority-item pink hide pull-right', description: `Ease of <br/>getting work visa`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 5, type: 'fame', description: `Global<br> Reputation`, groupMembers: [{
                     id: 51, parent: 'fame', imageSrc: 'priority-reputation.svg', class: 'priority-item orange pull-right', description: `Global <br/> Reputation`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 52, parent: 'fame', imageSrc: 'priority-reputation.svg', class: 'priority-item pink hide pull-right', description: `Reputation <br/>in home country`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 6, type: 'earnings', description: `Earnings`, groupMembers: [{
                     id: 61, parent: 'earnings', imageSrc: 'priority-earning.svg', class: 'priority-item green pull-right', description: `Earnings`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 62, parent: 'earnings', imageSrc: 'priority-earning.svg', class: 'priority-item purple hide pull-right', description: `Popular <br/>hiring companies`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 7, type: 'indiansInTheCommunity', description: `Indian-ness on<br> campus`, groupMembers: [{
                     id: 71, parent: 'indiansInTheCommunity', imageSrc: 'priority-indianess.svg', class: 'priority-item purple pull-right', description: `Indian-ness <br/>on campus`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 72, parent: 'indiansInTheCommunity', imageSrc: 'priority-indianess.svg', class: 'priority-item green hide pull-right', description: `Available <br/>Indian food`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 8, type: 'ROED', description: `Value for<br> Money`, groupMembers: [{
                     id: 81, parent: 'ROED', imageSrc: 'priority-value-money.svg', class: 'priority-item pink pull-right', description: `Value <br/>for money`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 82, parent: 'ROED', imageSrc: 'priority-value-money.svg', class: 'priority-item orange hide pull-right', description: `Fair <br/>outcome for cost`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 9, type: 'learning', description: `Learning`, groupMembers: [{
                     id: 91, parent: 'learning', imageSrc: 'priority-Learning.svg', class: 'priority-item purple pull-right', description: `Learning`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 92, parent: 'learning', imageSrc: 'priority-Learning.svg', class: 'priority-item orange hide pull-right', description: `International <br/> Diversity`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 10, type: 'importanceToMicroField', description: `Performance<br> within field`, groupMembers: [{
                     id: 101, parent: 'importanceToMicroField', imageSrc: 'priority-performance.svg', class: 'priority-item yellow pull-right', description: `Performance <br/>within field`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 102, parent: 'importanceToMicroField', imageSrc: 'priority-performance.svg', class: 'priority-item blue hide pull-right', description: `Research <br/>output in field`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 11, type: 'safety', description: `Safety`, groupMembers: [{
                     id: 111, parent: 'safety', imageSrc: 'priority-safety.svg', class: 'priority-item blue pull-right', description: `Safety`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 112, parent: 'safety', imageSrc: 'priority-safety.svg', class: 'priority-item yellow hide pull-right', description: `Easy <br/>Weather`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
             {
                 id: 12, type: 'accreditation', description: `Accreditation`, groupMembers: [{
                     id: 121, parent: 'accreditation', imageSrc: 'priority-curriculum.svg', class: 'priority-item pink pull-right', description: `Accreditation`, isChecked: false, score: 0, inputClass: 'primary'
                 }, {
                     id: 122, parent: 'accreditation', imageSrc: 'priority-curriculum.svg', class: 'priority-item green hide pull-right', description: `Accepted <br/>Curriculum`, isChecked: false, score: 0, inputClass: 'secondary'
                 }]
             },
         ], */
        mostImportantListPaid: [
            {
                id: "facultyReputation-slider", type: 'facultyQuality', description: `Faculty Reputation`, imageSrc: 'priority-faculty.svg', class: 'pr-pink', score: 5, color: "#24c5d4"
            },
            {
                id: "research-slider", type: 'research', description: `Research Infrastructure`, imageSrc: 'priority-infrastructure.svg', class: 'pr-blue', score: 5, color: "#4b9fe0"
            },
            {
                id: "alumni-slider", type: 'alumni', description: `Active alumni`, imageSrc: 'priority-alumni.svg', class: 'pr-yellow', score: 5, color: "#fe84c0"
            },
            {
                id: "abroad-slider", type: 'easeOfSettling', description: `Ease of settling abroad`, imageSrc: 'priority-settling-abroad.svg', class: 'pr-green', score: 5, color: "#ff7b7d"
            },
            {
                id: "globalReputation-slider", type: 'fame', description: `Global Reputation`, imageSrc: 'priority-reputation.svg', class: 'pr-orange', score: 5, color: "#fdab66"
            },
            {
                id: "earnings-slider", type: 'earnings', description: `Earnings`, imageSrc: 'priority-earning.svg', class: 'pr-green', score: 5, color: "#fec666"
            },
            {
                id: "indianess-slider", type: 'indiansInTheCommunity', description: `Indian-ness on campus`, imageSrc: 'priority-indianess.svg', class: 'pr-purple', score: 5, color: "#8290c8"
            },
            {
                id: "valueMoney-slider", type: 'ROED', description: `Value for Money`, imageSrc: 'priority-value-money.svg', class: 'pr-pink', score: 5, color: "#ba8fc7"
            },
            {
                id: "learning-slider", type: 'learning', description: `Learning`, imageSrc: 'priority-learning.svg', class: 'pr-purple', score: 5, color: "#ffe266"
            },
            {
                id: "performanceField-slider", type: 'importanceToMicroField', description: `Performance within field`, imageSrc: 'priority-performance.svg', class: 'pr-yellow', score: 5, color: "#f9f366"
            },
            {
                id: "safety-slider", type: 'safety', description: `Safety`, imageSrc: 'priority-safety.svg', class: 'pr-blue', score: 5, color: "#c5dd84"
            },
            {
                id: "accreditation-slider", type: 'accreditation', description: `Accreditation`, imageSrc: 'priority-curriculum.svg', class: 'pr-orange', score: 5, color: "#a9dd75"
            },
        ],
        scores: {

        },
        degreeDetails: {

        },
        workExperience: {

        },
        userFinantialDetails: {

        },
        userResearchDetails: {

        },
        PrioritiesMode: true,
        isReviewPage: false,
        budget: 3000000,
        isFreeScreens: true,
        isFlashBackPage: false,
        colorFull: false,
        allSelected: false,
        questionsList: [],
        answersList: [],
        college_list: [],
        pd_list: [],
        activeSlideIndex: 0,
        renderAutocomplete: false,
        redirectTriggred: false,
        qsSubmited: false
    };
}