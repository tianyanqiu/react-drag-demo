import { Menu } from "antd";
import React from "react";
import routes from "./router";
import { useHistory } from "react-router-dom";

export default function NavList() {
  const history = useHistory();

  const handleClick = (path: string) => {
    console.log("click ", path);
    history.push(path);
  };
  return (
    <Menu style={{ width: 256 }} mode="inline">
      {routes.map((route) => (
        <Menu.Item key={route.path} onClick={() => handleClick(route.path)}>
          {route.title}
        </Menu.Item>
      ))}
    </Menu>
  );
}
