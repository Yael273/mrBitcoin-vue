import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../pages/home-page.vue'
import ContactIndex from '../pages/contact-index.vue'
import ContactDetails from '../pages/contact-details.vue'
import ContactEdit from '../pages/contact-edit.vue'
import Chart from '../pages/chart.vue'
import AvgChart from '../cmps/avg-chart.vue'
import ValueChart from '../cmps/value-chart.vue'
import SignUp from '../pages/login-signup.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signup'
    },
    {
      path: '/home',
      component: HomePage,
    },
    {
      path: '/signup',
      component: SignUp,
    },
    {
      path: '/contact',
      component: ContactIndex,
      children: [],
    },
    {
      path: '/contact/:_id',
      component: ContactDetails,
  },
  {
      path: '/contact/edit/:_id?',
      component: ContactEdit,
  },
  {
      path: '/stats',
      component: Chart,
      children: [
        {
          path: 'average',
          component: AvgChart,
        },
        {
          path: 'value',
          component: ValueChart,
        },
      ],
  },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../pages/AboutView.vue')
    // }
  ]
})

export default router
