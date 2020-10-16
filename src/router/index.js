import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Songsheet from '../views/Songsheet.vue'
import Album from "../views/Album.vue"
import Like from "../views/Like.vue"
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/songsheet',
    name: 'Songsheet',
    component: Songsheet
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/like',
    name: 'Like',
    component: Like
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
