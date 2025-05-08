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
  NavLink,
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

//滚动条复位

let NavItem = (props)=>{
  return (
    <>
    <li>
      <NavLink activeStyle={{color: 'red'}} to={props.to}>{props.children}</NavLink>
    </li>
    </>
  )
}
//NavItem = withRouter(NavItem);

function useScroll(pathname){
  useEffect(() => {
    resetScroll();
  }, [pathname]);
}

function Home(props){
  console.log(props);
  useScroll(props.location.pathname);
  return (
    <div>
      首页
    </div>
  )
}

function Detail(props){
  useScroll(props.location.pathname);
  return (
    <div>
      详情页
    </div>
  )
}

function withScroll(Component){
  return class extends React.Component{
    constructor(props){
      super(props);
    }
    componentDidMount(){
      // window.scrollTo({
      //   top:0,
      //   behavior:'smooth'
      // })
      resetScroll();
    }
    render(){
      return (
        <Component {...this.props} />
      )
    }
  }
}

//Home = withScroll(Home);
//Detail = withScroll(Detail);

let intervalId;

function resetScroll(){
  if(intervalId > 0) clearInterval(intervalId);
  let ht = document.documentElement;
  console.log(ht.scrollTop);
  intervalId = animate(ht.scrollTop,0,(val)=>{
    ht.scrollTop = val;
  }); 
}

function animate(start,end,callback){
  //多久运行一次
  const interval = 16;
  //完成动画所需要的时长
  const timeout = 200;
  //运行完动画需要多少次
  const runCounts = Math.ceil(timeout / interval);
  let curTimes = 0;
  //运行一次的距离
  let dis = Math.floor((end - start) / runCounts);
  let timer = setInterval(() => {
    curTimes++;
    start+=dis;
    console.log("start:"+start,"curTimes:"+curTimes,"times:"+runCounts,"dis:"+dis)
    if(curTimes == runCounts){
      start = end;
      clearInterval(timer);
    }
    callback(start)
  }, interval);
  return timer;
}

class RouterHelp extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const that = this;
    this.listen = this.props.history.listen((location,action)=>{
      this.props.onChange && this.props.onChange(this.props.location,location,action);
    })
  }
  render(){
    console.log(this.props)
    return this.props.children
  }
}
RouterHelp = withRouter(RouterHelp)
class RouterGuard extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <>
      <Router>
        <RouterHelp onChange={this.props.onChange}>
          {this.props.children}
        </RouterHelp>
      </Router>
      </> 
    )
  }
}

function App(){
  return (
    <>
    <RouterGuard onChange={(prevLocation,location,action)=>{
      if(prevLocation!==location){
        resetScroll();
      }
    }}>
      <ul style={{
          position:'fixed',
          width:'100px',
          height:'50px',
          top:'50%',
          left:'0'
        }}>
          <NavItem to={'/home'}>首页</NavItem>
          <NavItem to={'/detail'}>详情页</NavItem>
        </ul>
        <div className="main" style={{height:'2000px'}}>
          <Route path="/home" component={Home} />
          <Route path="/detail" component={Detail} />
        </div>
    </RouterGuard>
    {/* <Router>
      <ul style={{
        position:'fixed',
        width:'100px',
        height:'50px',
        top:'50%',
        left:'0'
      }}>
        <NavItem to={'/home'}>首页</NavItem>
        <NavItem to={'/detail'}>详情页</NavItem>
      </ul>
      <div className="main" style={{height:'2000px'}}>
        <Route path="/home" component={Home} />
        <Route path="/detail" component={Detail} />
      </div>
    </Router> */}
    </>
  )
}

root.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
