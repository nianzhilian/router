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
import queryString from "query-string";
import Admin from "./page/Admin";
import { v4 as uuid } from "uuid";
//只运行一次该模块不做任何的导入
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "animate.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

//受保护的页面
//1  直接登录跳转到首页
//2  通过分享的连接 如果验证通过则进入  如果验证不通过 则跳转到登录，登录成功后再跳转到 分享的连接

const auth = {
  isAuth:false,
  login(){
    this.isAuth = true;
  },
  logout(){
    this.isAuth = false;
  }
}

function Home(){
  return (
    <div>首页</div>
  )
}

function Login(props){
  console.log(props)
  const params = queryString.parse(props.location.search);
  console.log(params)
  return (
    <div>
      <h1>登录</h1>
      <p>登录授权页，点击下方按钮即登录成功</p>
      <Button onClick={()=>{
        auth.login();
        if(props.location.state){
          props.history.push(props.location.state)
        }else{
          props.history.push('/')
        }
      }}>
        登录
      </Button>
    </div>
  )
}

function Person(props){
  return (
    <div>
      <h1>个人中心</h1>
      <p>登录成功</p>
    </div>
  )
}

function RouteSecure({component:Component,...rest}){
  return (
    <>
    <Route {...rest} render={(values)=>{
      const {location} = values;
      if(auth.isAuth){
        return (
          <Component />
        )
      }else{
        return (
          <Redirect to={{
            pathname:'/login',
            state:location.pathname
            //search:'?redicturl='+location.pathname
          }} />
        );
      }
    }} />
    </>
  )
}

function App(){
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/login">登录</Link></li>
          <li><Link to="/person">个人中心</Link></li>
        </ul>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <RouteSecure path="/person" component={Person} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}


root.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
