import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	hospitalAboutData:{},
	nowRouter:{
		to:'',
		from:'',
	},
	loginData:'',
	transitionName:'slide-top',
}
const getters={
}
const actions={}
const mutations={}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
