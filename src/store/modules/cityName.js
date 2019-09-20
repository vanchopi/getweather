
const state = {
    cityNameStr: '',    
};

const mutations = {
	SET_NAME: ( state, cityName ) => {
		state.cityNameStr = cityName;
	}
};

const getters = {
	getCityName(state){
		return state.cityNameStr;
	}
};

const actions = {
	setCityName( context, cityName){
		context.commit('SET_NAME', cityName);
	}
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};