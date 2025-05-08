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

function Home(){
  return (
    <div>
      这是首页
    </div>
  )
}

function Detail(){
  return (
    <div>
      这是详情页
    </div>
  )
}

function Content(){
  return (
    <div>
      这是内容页
    </div>
  )
}

function Nav(){
  return (
    <>
    <Link style={{marginRight: '10px'}} to={'/home'}>首页</Link>
    <Link style={{marginRight: '10px'}} to={'/detail'}>详情页</Link>
    <Link to={'/content'}>内容页</Link>
    </>
  )
}

let prevLocation,unblock,unlisten,location,action;

class _RouteGuardHelp extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props)
    //路由监听器
    //只是监听路由的变化 不会阻止跳转
    this.listen = unlisten = this.props.history.listen((location,action)=>{
        this.props.onChange && this.props.onChange(this.props.location,location,action,this.listen);
    })
    //路由拦截器 可以控制让不让跳转  返回一个函数取消阻塞
    this.unblock = unblock = this.props.history.block((nextLocation,ac)=>{
      prevLocation = this.props.location;
      location = nextLocation;
      action = ac;
      return '';
    });
  }
  componentWillUnmount(){
    //卸载掉监听器
    this.listen();
    this.unblock();
  }
  render(){
    return null;
  }
}
const GuardHelp = withRouter(_RouteGuardHelp);
// function App(){
//   function onChange(from,to,action){
//     console.log(`路由从${from.pathname}到${to.pathname}`,action);
//   }
//   return (
//     <>
//     <Router getUserConfirmation={(msg,cb)=>{
//       console.log(this)
//       console.log(false)
//       cb(false)
//     }}>
//       <Nav></Nav>
//       <RouteGuard onChange={onChange}>
//         <Route path="/home" component={Home}></Route>
//         <Route path="/detail" component={Detail}></Route>
//         <Route path="/content" component={Content}></Route>
//       </RouteGuard>
//     </Router>
//     </>
//   )
// }


class RouteGuard extends React.Component{
  userConfirmation = (msg,cb)=>{
    console.log(msg)
    if(this.props.onBeforeChange){
      this.props.onBeforeChange(prevLocation,location,action,cb,unblock)
    }else{
      //允许跳转
      cb(true);
    }
  }
  constructor(props){
    super(props);
  }
  render(){
    return (
      <>
      <Router getUserConfirmation={this.userConfirmation}>
        <GuardHelp onChange={this.props.onChange} />
        {this.props.children}
      </Router>
      </>
    )
  }
}

function App(){
  return (
    <RouteGuard onBeforeChange={
      (from,to,action,commit,unblock)=>{
        console.log(`页面从${from.pathname}到${to.pathname},允许跳转,跳转方法${action}`);
        commit(false);
        //只阻塞一次 后续不在阻塞
        unblock();
      }
    } onChange={
      (from,to,action,unlisten)=>{
        console.log(`从页面${from.pathname}切换到${to.pathname},切换方式${action}`);
        //只监听一次
        unlisten();
      }
    }>
      <Nav />
      <Route path="/home" component={Home}></Route>
      <Route path="/detail" component={Detail}></Route>
      <Route path="/content" component={Content}></Route>
    </RouteGuard>
  )
}

root.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
