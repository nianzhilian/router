import React, {
  useId,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useImperativeHandle,
  useRef,
  useMemo,
  useContext,
  createRef,
} from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Link,
  Redirect,
} from "react-router-dom";
import { Container, Alert, Button, AlertHeading } from "react-bootstrap";
import reportWebVitals from "./reportWebVitals";
import {
  Transition,
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import Admin from "./page/Admin";
import { v4 as uuid } from "uuid";
//只运行一次该模块不做任何的导入
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "animate.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

function PageA() {
  return <div>页面a</div>;
}

function PageB() {
  return <div>页面b</div>;
}

function NotFound() {
  return <div>404页面</div>;
}

// function Link(props) {
//   const isActive = props.location.pathname === props.to;
//   return (
//     <a className={isActive ? "link-active" : ""} style={props.style} href={props.to} onClick={(e) => {
//       e.preventDefault();
//       props.history.push(props.to);
//     }}>{props.children}</a>
//   )
// }
// Link = withRouter(Link);

function NavLinks() {
  return (
    <>
      <Link
        replace
        style={{ marginRight: "20px" }}
        to={{
          pathname: "/a",
          search: "?name=123&age=23",
          hash: "#abc",
          state: { from: "/a" },
        }}
      >
        页面a
      </Link>
      <Link replace to="/b">
        页面b
      </Link>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <NavLinks />
        <Switch>
          <Route path="/a">
            <PageA />
          </Route>
          <Route path="/b">
            <PageB />
          </Route>
          <Redirect exact from="/abc/:id" to="/b/:id" />
        </Switch>
      </Router>
    </>
  );
}

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
