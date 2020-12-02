import React from "react";
import styled from "styled-components";
import { Route, BrowserRouter } from "react-router-dom";
import routes from "./router";
import NavList from "./NavList";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
`;

function Slider() {
  return (
    <BrowserRouter>
      <Layout>
        <NavList />
        <Content>
          {routes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              component={item.component}
              title={item.title}
              exact={item.exact}
            />
          ))}
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default Slider;
