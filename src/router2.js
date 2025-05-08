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
function Info(){
  return (
    <div>个人信息</div>
  )
}
function Pay(){
  return (
    <div>
      支付信息
    </div>
  )
}
function User({match}){
  return (
    <>
    <div>
      <h1>User 组件的固定区域</h1>
      <p>
        <Link style={{marginRight: '20px'}} to={`${match.url}/info`}>用户信息</Link>
        <Link to={`${match.url}/pay`}>支付</Link>
      </p>
      <div style={{
        width:500,
        height:500,
        border:'1px solid #ddd',
        background:'lightblue',
        margin: '0 auto'
      }}>
        <Route path={`${match.url}/info`}>
          <Info />
        </Route>
        <Route path={`${match.url}/pay`}>
          <Pay />
        </Route>
      </div>
    </div>
    </>
  )
}
//路由组件常见的应用
function App(){
  return (
    <>
    <Router>
      <Route path="/u" component={(props)=>{
        console.log(props)
        return <User {...props} />
      }}>
      </Route>
    </Router>
    </>
  )
}

root.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
