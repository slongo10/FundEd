import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import ScholarshipsPage from '@/pages/ScholarshipsPage.vue'
import ScholarshipDetailsPage from '@/pages/ScholarshipDetailsPage.vue'
import MyApplicationsPage from '@/pages/MyApplicationsPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/scholarships',
    name: 'scholarships',
    component: ScholarshipsPage,
  },

  {
    path: '/scholarships/:id',
    name: 'scholarship-details',
    component: ScholarshipDetailsPage,
  },

  {
    path: '/applications',
    name: 'applications',
    component: MyApplicationsPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
