import { createRouter, createWebHistory } from 'vue-router'
import MemberJoinFormView from '../views/member/MemberJoinFormView.vue'
import memberLoginView from '../views/member/LoginView.vue'
import memberMainView from '../views/member/MainView.vue'
import memberModifyView from '../views/member/ModifyMemberFormView.vue'
import memberBookView from '../views/member/MemberBookView.vue'

import trainerJoinView from '../views/trainer/JoinView.vue'
import trainerLoginView from '../views/trainer/LoginView.vue'
import tModifyView from '../views/trainer/ModifyView.vue'
import trainerMainView from '../views/trainer/MainView.vue'
import trainerBookView from '../views/trainer/trainerBookView.vue'

import TrainerIntroductionView from '../views/trainer/IntroductionView.vue'
import trainerEnrollView from '../views/trainer/trainerEnrollView.vue'
import trainerModifyView from '../views/trainer/trainerModifyView.vue'
import MyMemberListView from '../views/trainer/MyMemberListView.vue'
import AllMemberListView from '../views/trainer/AllMemberListView.vue'

import gymRegisterView from '../views/gym/RegisterView.vue'
import gymPaymentView from '../views/gym/PaymentView.vue'

import managerView from '../views/manager/ManagerView.vue'
import managerMemberView from '../views/manager/ManagerMemberView.vue'

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
    path: '/member/book',
    name: '/member/book',
    component: memberBookView
  },
  {
    path: '/trainer/book',
    name: '/trainer/book',
    component: trainerBookView
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
    component: tModifyView
  },
  {
    path: '/trainer/main',
    name: '/trainer/main',
    component: trainerMainView
  },
  
  {
    path: '/trainer/introduction',
    name: '/trainer/introduction',
    component: TrainerIntroductionView
  },
  {
    path: '/trainer/enroll',
    name: '/trainer/enroll',
    component: trainerEnrollView
  },
  {
    path: '/trainer/enroll2',
    name: '/trainer/enroll2',
    component: trainerModifyView
  },
  {
    path: '/trainer/mymemberlist',
    name: '/trainer/mymemberlist',
    component: MyMemberListView
  },
  {
    path: '/trainer/memberlist',
    name: '/trainer/memberlist',
    component: AllMemberListView
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
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: managerView
  },
  {
    path: '/manager/memberlist/:no',
    name: '/manager/memberlist',
    component: managerMemberView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
