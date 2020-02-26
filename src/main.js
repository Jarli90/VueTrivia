import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.config.productionTip = false;
import GameMenu from './components/GameMenu.vue';
import GamePlay from './components/GamePlay.vue';
import GameOver from './components/GameOver.vue';
const routes = [
  { path: "/", name: "MainMenu", component: GameMenu },
  { path: "/game", name: "Game", component: GamePlay },
  { path: "/game_over", name: "GameOver", component: GameOver },
];
const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
