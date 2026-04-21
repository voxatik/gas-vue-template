import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

// Hash history is required — GAS serves from a fixed URL with no path routing
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
