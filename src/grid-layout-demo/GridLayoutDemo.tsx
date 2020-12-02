import React from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styled from "styled-components";

const Item = styled.div`
  background-color: aqua;
`;

const layout = [
  { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
  { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: "c", x: 4, y: 0, w: 1, h: 2 },
];

function GridLayoutDemo() {
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      <Item key="a">a</Item>
      <Item key="b">b</Item>
      <Item key="c">c</Item>
    </GridLayout>
  );
}

export default GridLayoutDemo;
