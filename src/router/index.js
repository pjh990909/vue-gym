import { createRouter, createWebHistory } from 'vue-router'
import memberLoginView from '../views/member/LoginView.vue'
import trainerLoginView from '../views/trainer/LoginView.vue'
const routes = [
  {
    path: '/member/login',
    name: '/member/login',
    component: memberLoginView
  },
  {
    path: '/trainer/login',
    name: '/trainer/login',
    component: trainerLoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
