import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AuthPage from '@/views/pages/auth/AuthPage.vue'
import AdminPage from '@/views/pages/admin/AdminPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: '/',
      name: 'auth',
      component: AuthPage,
      children:[
        {
          path: '/',
          name: 'login',
          component: () => import('../views/pages/auth/LoginPage.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/pages/auth/RegisterPage.vue')
        }
      ]
    },

    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      children:[
        {
          path: '/admin',
          name: 'admin',
          component: () => import('../views/pages/admin/dashboard/DashboardPage.vue')
        },
        {
          path: '/posts',
          name: 'posts',
          component: () => import('../views/pages/admin/post/CreatePost.vue')
        },
        {
          path: '/list-posts',
          name: 'list-posts',
          component: () => import('../views/pages/admin/post/ListPostPage.vue')
        }
      ]
    },



  ]
})

export default router
