import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addDoctor = r => require.ensure([], () => r(require('@/page/addDoctor')), 'addDoctor');
const addNurse = r => require.ensure([], () => r(require('@/page/addNurse')), 'addNurse');
const doctorList = r => require.ensure([], () => r(require('@/page/doctorList')), 'doctorList');
const nurseList = r => require.ensure([], () => r(require('@/page/nurseList')), 'nurseList');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
        meta:{auth:true},
        component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addDoctor',
			component: addDoctor,
			meta: ['添加数据', '添加医生'],
		},{
            path: '/addNurse',
            component: addNurse,
            meta: ['添加数据', '添加护士'],
        },{
			path: '/doctorList',
			component: doctorList,
			meta: ['数据管理', '医生列表'],
		},{
            path: '/nurseList',
            component: nurseList,
            meta: ['数据管理', '护士列表'],
        }]
	}
]
export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
