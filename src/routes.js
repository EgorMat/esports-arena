import HomePage from './components/HomePage.vue'
import Dashboard from './components/Dashboard.vue'
import GamePage from './components/GamePage.vue'
import GamesList from './components/GamesList.vue'
import FinancePage from './components/FinancePage.vue'
import ProfilePage from './components/ProfilePage.vue'

const routes = [
  {path: '*', component: HomePage},
  { name:'home', path: '/', component: HomePage },
  { path: '/dashboard', component: Dashboard,
  meta : {
    requiresAuth : true
  },
  children: [{path:'/' , component : GamesList} ,
              {name: 'game', path:'/game/:id' ,component: GamePage, props:true},
              {name: 'finance', path:'/finance' , component: FinancePage },
              {name: 'profile', path:'/profile', component: ProfilePage}] ,

    },

]

export default routes;
