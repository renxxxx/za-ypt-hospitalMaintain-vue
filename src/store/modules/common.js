import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	hospitalAboutData:{},
	nowRouter:{
		to:'',
		from:'',
	},
	loginData:''
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
