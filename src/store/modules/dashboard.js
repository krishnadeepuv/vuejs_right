//@ts-check
const state = initialDashboardState();

const getters = {

    // getShortListedPrograms: state => {
    //     return id => state.scenarios.filter(item => item.scenarioId == id)[0].shortListedPrograms;
    // },
    getResponseCount: state => state.responses,
    getScenarioById: state => {
        return id => state.scenarios.filter(item => item._id == id)[0];
    },
    getActiveScenario: state => state.activeScenario,
    getScenarioIds: state => state.scenarios.map(a => {
        return { "scenarioId": a._id, "name": a.name };
    }),
    getProgramData: state => state.programList,
    getUniversityData: state => state.universityList,
    getSpecializationData: state => state.aoiList,
    getCountryData: state => state.countryList,
    getActiveMode: state => state.activeMode,
    getRawScenarioData: state => state.scenarioData,
    getIsShareRight: state => state.isShareRight,
    getScenarios: state => state.scenarios,
    getIsShareMode: state => state.isShareMode,
    getShareName: state => state.shareName,
    getEmitedChange: state => state.emitChange,
    getShowProgramDetails: state => state.showProgramDetails,
    getActiveProgram: state => state.activeProgram,
    getSideBarTriggers: state => state.sideBarTriggered,
    getActiveTab: state => state.activeTab,
    getSearchData: state => state.searchData,
    getUnlockTriggers: state => state.unlockTriggers,
    getSupportPopUp: state => state.supportPopUp,
    getRefTriggred: state => state.refTriggred,
    getFinalShortListTriggers: state => state.triggerFinalShortList,
    getTriggerFactors: state => state.triggerFactors,
    getShowSaveScenario: state => state.showSaveScenario,
    getPlaygroundData: state => state.playgroundData,
    getDegreeList: state => state.degreeList_pg,
    getCountryList_pg: state => state.countryList_pg,
    getStateList_pg: state => state.stateList_pg,
    getCityList_pg: state => state.cityList_pg,
    getShowRefOptions: state => state.showRefOptions,
    getPulseIt: state => state.isPulsing,
    getSaveScenarioClicked: state => state.saveScenarioClicked,
    getSideMenuToggles: state => state.sideMenuToggles,
    getFilterMode: state => state.filterMode
};

const mutations = {

    updateShortlistByScenarioId: (state, payload) => {
        var scenario = state.scenarios.filter(item => item._id == payload.scenarioId)[0];

        if (payload.type == "add") {
            state.isPulsing = true;
            setTimeout(() => {
                state.isPulsing = false;
            }, 1500);
            let program = [];
            program = scenario.user_programs.filter(item => item.program_id == payload.programId)[0];
            if (!program) {
                program = scenario.recommended_programs.filter(item => item.program_id == payload.programId)[0];
            }
            if (!program) {
                program = state.searchData.filter(item => item.program_id == payload.programId)[0];
            }
            if (!program) {
                program = state.playgroundData.filter(item => item.program_id == payload.programId)[0];
            }
            scenario.shortListedPrograms.push(program);
            scenario.shortListCount++;
            let localShortList = JSON.parse(localStorage.getItem("shortList"));
            if (Array.isArray(localShortList)) {
                localShortList.filter(item => item.scenario_id == payload.scenarioId)[0].shortList.push(program);
                localStorage.setItem("shortList", JSON.stringify(localShortList));
            }
        }
        else if (payload.type == "search") {
            let program = {};
            state.emitChange++;
            let recommendedProgramExists = scenario.recommended_programs.filter(item => item.program_id == payload.programId);
            let userProgramExists = scenario.user_programs.filter(item => item.program_id == payload.programId);
            if (!(recommendedProgramExists.length > 0 || userProgramExists.length > 0)) {
                payload.newProgram.is_user_selected = true;
                scenario.user_programs.push(payload.newProgram);
                program = scenario.user_programs.filter(item => item.program_id == payload.programId)[0];
            }
            else {
                if (recommendedProgramExists.length) {
                    program = recommendedProgramExists[0];
                } else
                    program = userProgramExists[0];
            }
            scenario.shortListedPrograms.push(program);
            scenario.shortListCount++;
            let localShortList = JSON.parse(localStorage.getItem("shortList"));
            if (Array.isArray(localShortList)) {
                localShortList.filter(item => item.scenario_id == payload.scenarioId)[0].shortList.push(program);
                localStorage.setItem("shortList", JSON.stringify(localShortList));
            }
        }
        else {
            scenario.shortListedPrograms = scenario.shortListedPrograms.filter(item => item.program_id != payload.programId);
            scenario.shortListCount--;
            let localShortList = JSON.parse(localStorage.getItem("shortList"));
            if (Array.isArray(localShortList)) {
                localShortList.filter(item => item.scenario_id == payload.scenarioId)[0].shortList = scenario.shortListedPrograms;
                localStorage.setItem("shortList", JSON.stringify(localShortList));
            }
        }
    },
    updateScores: (state, payload) => {
        var scenarioFilters = state.scenarios.filter(item => item._id == payload.scenarioId)[0].filters;
        scenarioFilters.scores[payload.exam][payload.subject] = payload.score;

    },
    updateWorkExperience: (state, payload) => {
        var scenarioFilters = state.scenarios.filter(item => item._id == payload.scenarioId)[0].filters;
        scenarioFilters.work_experience[payload.type] = payload.value;
    },
    updateFilter: (state, payload) => {
        var scenarioFilters = state.scenarios.filter(item => item._id == payload.scenarioId)[0].filters;
        scenarioFilters[payload.type] = payload.value;
    },
    updateAutoComplete: (state, payload) => {
        var scenarioFilters = state.scenarios.filter(item => item._id == payload.scenarioId)[0].filters;
        if (payload.action) {
            if ((scenarioFilters[payload.type].selectedList.filter(item => item.id == payload.id)).length <= 0) {
                let data = {
                    value: payload.value, id: payload.id
                };
                scenarioFilters[payload.type].selectedList.push(data);
            }
        }
        else {
            console.log(payload);
            console.log(scenarioFilters[payload.type]);

            scenarioFilters[payload.type].selectedList = scenarioFilters[payload.type].selectedList.filter(item => item.id != payload.id);
        }
    },
    updateCFL: (state, payload) => {
        var scenarioFilters = state.scenarios.filter(item => item._id == payload.scenarioId)[0].filters;
        scenarioFilters.challenge_fair_likely.fair = payload.cfl;
        scenarioFilters.challenge_fair_likely.challenge.to = payload.cfl.from;
        scenarioFilters.challenge_fair_likely.likely.from = payload.cfl.to;
    },
    updateActiveScenario: (state, payload) => {
        state.activeScenario = payload;
    },
    updateScenarioName: (state, payload) => {
        var scenario = state.scenarios.filter(item => item._id == payload.scenarioId)[0];
        scenario.name = payload.value;
    },
    mapScenarioData: (state, payload) => {
        state.scenarios = payload;
    },
    updateActiveMode: (state, payload) => {
        state.activeMode = payload;
    },
    updateRawScenarioData: (state, payload) => {
        state.scenarioData = payload;
    },
    updateFilterddlData: (state, payload) => {
        state.programList = payload.program_list;
        state.countryList = payload.country_list;
        state.aoiList = payload.special_list;
    },
    updateIsShareRight: (state, payload) => {
        state.isShareRight = payload;
    },
    resetDashboard(state) {
        // acquire initial state
        const initial_state = initialDashboardState();
        Object.keys(initial_state).forEach(key => {
            state[key] = initial_state[key];
        });
    },
    deleteScenario(state, payload) {
        state.scenarios = state.scenarios.filter(item => item._id != payload);
    },
    mapUpdatedScenarioData(state, payload) {
        let scenarioData = state.scenarios;
        scenarioData.forEach((element, index) => {
            if (element._id == payload._id) {
                scenarioData[index] = payload;
            }
        });
    },
    updateScenarioList(state, payload) {
        state.scenarios.push(payload);
    },
    updateIsShareMode(state, payload) {
        state.isShareMode = payload;
    },
    updateShareName(state, payload) {
        state.shareName = payload;
    },
    updateEmitChange(state, payload) {
        state.emitChange = payload;
    },
    updateShowProgramDetails(state, payload) {
        state.showProgramDetails = payload;
    },
    updateActiveProgram(state, payload) {
        state.activeProgram = payload;
    },
    updateSideBarTriggers(state, payload) {
        state.sideBarTriggered = payload;
    },
    updateActiveTab(state, payload) {
        state.activeTab = payload;
    },
    updateSearchData(state, payload) {
        state.searchData = payload;
    },
    updateUnlockTriggers(state, payload) {
        state.unlockTriggers = payload;
    },
    triggerSupportPopUp(state, payload) {
        state.supportPopUp = payload;
    },
    updateRefTriggred(state, payload) {
        state.refTriggred = payload;
    },
    updateTriggerFinalShortList(state, payload) {
        state.triggerFinalShortList = payload;
    },
    updateTriggerFactors(state, payload) {
        state.triggerFactors = payload;
    },
    updateShowSaveScenario(state, payload) {
        state.showSaveScenario = payload;
    },
    updatePlaygroundData(state, payload) {
        state.playgroundData = payload;
    },
    updateDegreeList(state, payload) {
        state.degreeList = payload;
    },
    updateCountryPgList(state, payload) {
        state.countryList_pg = payload;
    },
    updateCityPgList(state, payload) {
        state.degreeList = payload;
    },
    updateStatePgList(state, payload) {
        state.degreeList = payload;
    },
    updateShowRefOptions(state, payload) {
        state.showRefOptions = payload;
    },
    updatePulseIt(state, payload) {
        state.isPulsing = payload;
    },
    updateSaveScenarioClicked(state, payload) {
        state.saveScenarioClicked = payload;
    },
    updateSideMenuToggles(state, payload) {
        state.sideMenuToggles = payload;
    },
    updateFilterMode(state, payload) {
        state.filterMode = payload;
    }

};

const actions = {
    updateShortlistByScenarioId: (context, payload) => {
        context.commit('updateShortlistByScenarioId', payload);
    },
    updateScores: (context, payload) => {
        context.commit('updateScores', payload);
    },
    updateWorkExperience: (context, payload) => {
        context.commit('updateWorkExperience', payload);
    },
    updateFilter: (context, payload) => {
        context.commit('updateFilter', payload);
    },
    updateAutoComplete: (context, payload) => {
        context.commit('updateAutoComplete', payload);
    },
    updateCFL: (context, payload) => {
        context.commit('updateCFL', payload);
    },
    updateActiveScenario: (context, payload) => {
        context.commit('updateActiveScenario', payload);
    },
    updateScenarioName: (context, payload) => {
        context.commit('updateScenarioName', payload);
    },
    mapScenarioData: (context, payload) => {
        context.commit('mapScenarioData', payload);
    },
    updateActiveMode: (context, payload) => {
        context.commit('updateActiveMode', payload);
    },
    updateRawScenarioData: (context, payload) => {
        context.commit('updateRawScenarioData', payload);
    },
    updateFilterddlData: (context, payload) => {
        context.commit('updateFilterddlData', payload);
    },
    updateIsShareRight: (context, payload) => {
        context.commit('updateIsShareRight', payload);
    },
    resetDashboard: (context) => {
        context.commit('resetDashboard');
    },
    deleteScenario: (context, payload) => {
        context.commit('deleteScenario', payload);
    },
    mapUpdatedScenarioData: (context, payload) => {
        context.commit('mapUpdatedScenarioData', payload);
    },
    updateScenarioList: (context, payload) => {
        context.commit('updateScenarioList', payload);
    },
    updateIsShareMode: (context, payload) => {
        context.commit('updateIsShareMode', payload);
    },
    updateShareName: (context, payload) => {
        context.commit('updateShareName', payload);
    },
    updateEmitChange: (context, payload) => {
        context.commit('updateEmitChange', payload);
    },
    updateShowProgramDetails: (context, payload) => {
        context.commit('updateShowProgramDetails', payload);
    },
    updateActiveProgram: (context, payload) => {
        context.commit('updateActiveProgram', payload);
    },
    updateSideBarTriggers: (context, payload) => {
        if (payload) {
            $("body").addClass("no-scroll");
        }
        else {
            $("body").removeClass("no-scroll");
        }
        context.commit('updateSideBarTriggers', payload);
    },
    updateActiveTab: (context, payload) => {
        context.commit('updateActiveTab', payload);
    },
    updateSearchData: (context, payload) => {
        context.commit('updateSearchData', payload);
    },
    updateUnlockTriggers: (context, payload) => {
        context.commit('updateUnlockTriggers', payload);
    },
    triggerSupportPopUp: (context, payload) => {
        context.commit('triggerSupportPopUp', payload);
    },
    updateRefTriggred: (context, payload) => {
        context.commit('updateRefTriggred', payload);
    },
    updateTriggerFinalShortList: (context, payload) => {
        context.commit('updateTriggerFinalShortList', payload);
    },
    updateTriggerFactors: (context, payload) => {
        if (payload) {
            $("body").addClass("no-scroll");
        }
        else {
            $("body").removeClass("no-scroll");
        }
        context.commit('updateTriggerFactors', payload);
    },
    updateShowSaveScenario: (context, payload) => {
        context.commit('updateShowSaveScenario', payload);
    },
    updatePlaygroundData: (context, payload) => {
        context.commit('updatePlaygroundData', payload);
    },
    updateDegreeList: (context, payload) => {
        context.commit('updateDegreeList', payload);
    },
    updateCountryPgList: (context, payload) => {
        context.commit('updateCountryPgList', payload);
    },
    updateCityPgList: (context, payload) => {
        context.commit('updateCityPgList', payload);
    },
    updateStatePgList: (context, payload) => {
        context.commit('updateStatePgList', payload);
    },
    updateShowRefOptions: (context, payload) => {
        context.commit('updateShowRefOptions', payload);
    },
    updatePulseIt: (context, payload) => {
        context.commit('updatePulseIt', payload);
    },
    updateSaveScenarioClicked: (context, payload) => {
        context.commit("updateSaveScenarioClicked", payload);
    },
    updateSideMenuToggles: (context, payload) => {
        context.commit("updateSideMenuToggles", payload);
    },
    updateFilterMode: (context, payload) => {
        context.commit("updateFilterMode", payload);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

function initialDashboardState() {
    return {
        scenarios: [],
        filterMode: "",
        responses: 4,
        activeScenario: -1,
        scenarioData: [],
        sideBarTriggered: false,
        universityList: [
            { id: 1, name: 'UCLA', branch: 'Computer Science' },
            { id: 2, name: 'UCLA', branch: 'Electronics' },
            { id: 3, name: 'UC Berkely', branch: 'Art' },
            { id: 4, name: 'South bay', branch: 'Instrumentation' },
        ],
        programList: [
            // { value: 'Computer Science', id: 1 },
            // { value: 'Mechanical', id: 2 },
            // { value: 'Electrical', id: 3 },
            // { value: 'Architecture', id: 4 },
        ],
        aoiList: [
            // { value: 'Artificial intelligence', id: 1 },
            // { value: 'Database', id: 2 },
            // { value: 'IoT', id: 3 },
            // { value: 'Big Data', id: 4 },
        ],
        countryList: [
            // { value: 'USA', id: 1 },
            // { value: 'Canada', id: 2 },
            // { value: 'France', id: 3 },
            // { value: 'Germany', id: 4 },
            // { value: 'UK', id: 5 }
        ],
        shortListedPrograms: [],
        activeMode: "mix",
        isShareRight: false,
        isShareMode: false,
        shareName: "",
        emitChange: 0,
        showProgramDetails: false,
        activeProgram: 0,
        activeTab: "scenario",
        searchData: [],
        unlockTriggers: false,
        supportPopUp: false,
        refTriggred: false,
        triggerFinalShortList: false,
        triggerFactors: false,
        showSaveScenario: false,
        playgroundData: [],
        degreeList_pg: [],
        countryList_pg: [],
        stateList_pg: [],
        cityList_pg: [],
        showRefOptions: false,
        isPulsing: false,
        saveScenarioClicked: false,
        sideMenuToggles: false,
    };
}