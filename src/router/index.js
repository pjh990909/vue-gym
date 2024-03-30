import { createRouter, createWebHistory } from 'vue-router'
import memberJoiniew from '../views/member/JoinView.vue'
import memberLoginView from '../views/member/LoginView.vue'
import trainerJoiniew from '../views/trainer/JoinView.vue'
import trainerLoginView from '../views/trainer/LoginView.vue'

const routes = [
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
    component: trainerJoiniew
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
