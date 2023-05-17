// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'
import publicVuex from './modules/public'
import empower from './modules/empower'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		publicVuex,
		empower
	}
})
export default store