import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../components/pages/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../components/pages/login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/pages/dashboard.vue')
  },
  {
    path: '/project',
    name: 'project-create',
    component: () => import('../components/pages/project-form.vue')
  },
  {
    path: '/project/:id',
    name: 'project-update',
    component: () => import('../components/pages/project-form.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from , next) => {
  firebase.auth().onAuthStateChanged((user) =>{
    if (user) {
      if (to.name === 'login') {
        next({name: 'dashboard'});
      }
    } else {
      if (to.name === 'dashboard') {
        next({name: 'login'});
      }
    }
  });
  next();
});


export default router
