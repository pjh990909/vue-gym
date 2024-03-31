import { createRouter, createWebHistory } from 'vue-router'
import mainView from '../views/main/mainView.vue'
import memberJoiniew from '../views/member/JoinView.vue'
import memberLoginView from '../views/member/LoginView.vue'
import trainerJoinView from '../views/trainer/JoinView.vue'
import trainerLoginView from '../views/trainer/LoginView.vue'
import trainerModifyView from '../views/trainer/ModifyView.vue'
import trainerJoinOkView from '../views/trainer/JoinOkView.vue'
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
    component: memberJoiniew
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
    path: '/trainer/joinok',
    name: '/trainer/joinok',
    component: trainerJoinOkView
  },
  {
    path: '/trainer/modify',
    name: '/trainer/modify',
    component: trainerModifyView
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
