import { Menu } from "antd";
import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

function Slider() {
  const handleClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Layout>
      <Menu onClick={handleClick} style={{ width: 256 }} mode="inline">
        <Menu.Item>选项一</Menu.Item>
        <Menu.Item>选项二</Menu.Item>
      </Menu>
    </Layout>
  );
}

export default Slider;
