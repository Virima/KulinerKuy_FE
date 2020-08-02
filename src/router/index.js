import Vue from 'vue' 
import Router from 'vue-router' 
const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue') 
const HelloWorld = () => import(/* webpackChunkName: "dashboard" */ '../components/HelloWorld.vue')
const login = () =>import(/* webpackChunkName: "dashboard" */ '../components/dashboardContents/loginPage.vue')
const daftar = () =>import(/* webpackChunkName: "dashboard" */ '../components/dashboardContents/DaftarController.vue')    
function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `../components/dashboardContents/${view}.vue`) 
}
const routes = [ 
    {
        path: '/', 
        component: HelloWorld,
    },
    { 
        path: '/components/dashboardLayout.vue', 
        component: DashboardLayout, 
        children: [ 
            { 
                name: 'UserController', 
                path: '/makanan', 
                component: loadView('makananView') ,
                meta:{title:'KULINERKUY'}
            },
            {
                name: 'favoriteUser', 
                path: '/fav', 
                component: loadView('favoriteku') ,
                meta:{title:'KULINERKUY'}
            },
            {
                name: 'createFood', 
                path: '/createFood', 
                component: loadView('createFood') ,
                meta:{title:'KULINERKUY'}
            },
            {
                name: 'createHotel', 
                path: '/createHotel', 
                component: loadView('createHotel') ,
                meta:{title:'KULINERKUY'}
            },
            {
                name: 'YourReview', 
                path: '/YourReview', 
                component: loadView('YourReview'),
                meta:{title:'KULINERKUY'} 
            },
            {
                name: 'profil', 
                path: '/YourProfil', 
                component: loadView('profil'),
                meta:{title:'KULINERKUY'}
            },
            { 
                name: 'BengkelController', 
                path: '/hotelReview', 
                component: loadView('bengkelController'),
                meta:{title:'KULINERKUY'}
            },
        ] 
    },
    {
        name:'loginPage',
        path:'/loginPage',
        component:login,
        meta:{title:'Login'}
    },
    {
        path:'/daftar',
        component:daftar,
        meta:{title:'Daftar'}
    }
] 

Vue.use(Router) 
const router = new Router({mode: 'history', routes: routes}) 
export default router