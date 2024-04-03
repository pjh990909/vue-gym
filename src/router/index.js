import { createRouter, createWebHistory } from 'vue-router'
import MemberJoinFormView from '../views/member/MemberJoinFormView.vue'
import memberLoginView from '../views/member/LoginView.vue'
import memberMainView from '../views/member/MainView.vue'
import memberModifyView from '../views/member/ModifyMemberFormView.vue'
import memberListView from '../views/member/MemberListView.vue'

import trainerJoinView from '../views/trainer/JoinView.vue'
import trainerLoginView from '../views/trainer/LoginView.vue'
import trainerModifyView from '../views/trainer/ModifyView.vue'
import trainerMainView from '../views/trainer/MainView.vue'

import memberBookView from '../views/trainer/MemberBookView.vue'
import gymRegisterView from '../views/gym/RegisterView.vue'
import gymPaymentView from '../views/gym/PaymentView.vue'

const routes = [
  {
    path: '/',
    name: '/',
    component: memberLoginView
  },
  {
    path: '/member/join',
    name: '/member/join',
    component: MemberJoinFormView
  },
  {
    path: '/member/main',
    name: '/member/main',
    component: memberMainView
  },
  {
    path: '/member/modify',
    name: '/member/modify',
    component: memberModifyView
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
    path: '/trainer/book',
    name: '/trainer/book',
    component: memberBookView
  },
  {
    path: '/gym/register',
    name: '/gym/register',
    component: gymRegisterView
  },
  {
    path: '/gym/payment/:period',
    name: '/gym/payment',
    component: gymPaymentView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
