import Cookies from 'js-cookie';

const state = {
    cityNameStr: /*(Cookies.get('cityName')).length > 0*/  document.cookie.indexOf('cityName') != -1 ? Cookies.get('cityName') : ''    
};

const mutations = {
	SET_NAME: ( state, cityName ) => {
		state.cityNameStr = cityName;
		Cookies.set('cityName', state.cityNameStr);
		console.log('---',Cookies.get('cityName'));
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