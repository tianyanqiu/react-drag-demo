import NestList from "./nest-list";
import BeautifulDndList from "./beautiful-dnd-list";
import SpringList from "./react-spring-list";
import GridLayoutDemo from "./grid-layout-demo";

const ROUTES = [
  {
    path: "/nest-list",
    title: "嵌套列表",
    component: NestList,
    exact: true,
  },
  {
    path: "/beautiful-dnd-list",
    title: "beautiful-dnd简单列表",
    component: BeautifulDndList,
    exact: true,
  },
  {
    path: "/use-gesture-list",
    title: "react-use-gesture列表",
    component: SpringList,
    exact: true,
  },
  {
    path: "/react-grid-layout-demo",
    title: "react-grid-layout-demo",
    component: GridLayoutDemo,
    exact: true,
  },
];

export default ROUTES;
