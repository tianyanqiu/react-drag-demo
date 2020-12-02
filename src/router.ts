import NestList from "./nest-list";
import BeautifulDndList from "./beautiful-dnd-list";

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
];

export default ROUTES;
