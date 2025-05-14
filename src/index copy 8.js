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

//阻止页面跳转
function Page1(){
  return (
    <div>
      页面1
    </div>
  )
}

class Prompt extends React.Component{
  static defaultProps = {
    when:false,
    message:''
  }
  constructor(props){
    super(props);
  }
  //组件挂载时添加阻塞
  componentDidMount(){
    this.handleBlock();
  }
  //组件更新时更新阻塞
  componentDidUpdate(){
    this.handleBlock();
  }
  handleBlock(){
    if(this.props.when){
      this.unBlock = this.props.history.block(this.props.message)
    }else{
      if(this.unBlock){
        this.unBlock();
      }
    }
  }
  //组件卸载时取消阻塞
  componentWillUnmount(){
    if(this.unBlock){
      this.unBlock();
    }
  }
  render(){
    return null;
  }
}
Prompt = withRouter(Prompt);
class Page2 extends React.Component{
  state = {
    val:''
  }
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({val:e.target.value});
  }
  render(){
    return (
      <>
      <Prompt when={this.state.val!==''} message="数据未保存，确定要离开吗？" />
      <textarea value={this.state.val} onChange={this.handleChange}></textarea>
      </>
    )
  }
}

let SafeNavLink = ({ to, history,location,match,staticContext, ...props }) => {
  console.log(history,location,match)
  return (
  <NavLink
    {...props}
    to={to}
    onClick={(e) => {
      //当点击时发现 当前的路由和要跳转的路由相同，则阻止跳转
      if (location.pathname === to) {
        e.preventDefault();
      }
    }}
  />
)
};
SafeNavLink = withRouter(SafeNavLink);
function App(){
  return (
    <>
    <Router getUserConfirmation={(msg,cb)=>{
      cb(window.confirm(msg))
    }}>
      <nav>
        <SafeNavLink activeStyle={{color:'red'}} to='/page1'>页面1</SafeNavLink>
        <SafeNavLink activeStyle={{color:'red'}} to='/page2'>页面2</SafeNavLink>
      </nav>
      <div className="container" style={{position:'static'}}>
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
      </div>
    </Router>
    </>
  )
}

root.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
