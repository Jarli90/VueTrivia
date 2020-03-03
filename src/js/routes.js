import GameMenu from '../views/GameMenu.vue';
import GamePlay from '../views/GamePlay.vue';
import GameOver from '../views/GameOver.vue';
const routes = [
  { path: "/", name: "MainMenu", component: GameMenu },
  { path: "/game", name: "Game", component: GamePlay },
  { path: "/game_over", name: "GameOver", component: GameOver },
];

export default routes;