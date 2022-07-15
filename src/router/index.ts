import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
