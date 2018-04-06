import HomePage from './components/HomePage.vue'
import Dashboard from './components/Dashboard.vue'
import GamePage from './components/GamePage.vue'
import GamesList from './components/GamesList.vue'
import FinancePage from './components/FinancePage.vue'

const routes = [
  {path: '*', component: HomePage},
  { name:'home', path: '/', component: HomePage },
  { path: '/dashboard', component: Dashboard,
  meta : {
    requiresAuth : true
  },
  children: [{path:'/' , component : GamesList} ,
              {name: 'tournament', path:'/tournament/:id' ,component: GamePage,  props: true },
              {name: 'finance', path:'/finance' , component: FinancePage }] ,

    },

]

export default routes;
