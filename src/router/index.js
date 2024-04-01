import { createRouter, createWebHistory } from 'vue-router'
import mainView from '../views/main/mainView.vue'
import memberJoinView from '../views/member/JoinView.vue'
import memberLoginView from '../views/member/LoginView.vue'
import memberMainView from '../views/member/MainView.vue'
import memberListView from '../views/member/MemberListView.vue'
import trainerJoinView from '../views/trainer/JoinView.vue'
import trainerLoginView from '../views/trainer/LoginView.vue'
import trainerModifyView from '../views/trainer/ModifyView.vue'
import trainerMainView from '../views/trainer/MainView.vue'
import gymRegisterView from '../views/gym/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: '/',
    component: mainView
  },
  {
    path: '/member/login',
    name: '/member/login',
    component: memberLoginView
  },
  {
    path: '/member/join',
    name: '/member/join',
    component: memberJoinView
  },
  {
    path: '/member/main',
    name: '/member/main',
    component: memberMainView
  },
  {
    path: '/member/list',
    name: '/member/list',
    component: memberListView
  },
  {
    path: '/trainer/login',
    name: '/trainer/login',
    component: trainerLoginView
  },
  {
    path: '/trainer/join',
    name: '/trainer/join',
    component: trainerJoinView
  },
  {
    path: '/trainer/modify',
    name: '/trainer/modify',
    component: trainerModifyView
  },
  {
    path: '/trainer/main',
    name: '/trainer/main',
    component: trainerMainView
  },
  {
    path: '/gym/register',
    name: '/gym/register',
    component: gymRegisterView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
