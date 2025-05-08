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

function Home(props){
  return (
    <div className="page" ref={props.nodeRef}>
      首页
    </div>
  )
}

function Detail(props){
  return (
    <div className="page" ref={props.nodeRef}>
      详情
    </div>
  )
}

function Con(props){
  return (
    <div className="page" ref={props.nodeRef}>
      内容页
    </div>
  )
}

function Nav(){
  return (
    <>
    <header className="router-header">
      <NavLink to={'/home'} exact>
        首页
      </NavLink>
      <NavLink to={'/detail'} exact>
        详情页
      </NavLink>
      <NavLink to={'/con'} exact>
        内容页
      </NavLink>
    </header>
    </>
  )
}

function TranstionRoute(props){
  const {component:Component,...rest} = props;
  const ref = useRef(null);
  return (
    <Route {...rest}>
          {/* children作为function时  不管匹配匹配不上都会显示 在这里可以做动画展示 */}
            {
              (location,a)=><CSSTransition nodeRef={ref} classNames={{
                enter:'jinru',
                exit:'tuichu'
              }}
              timeout={10000}
              mountOnEnter
              unmountOnExit
              in={location.match?true:false}>
                <Component nodeRef={ref} />
              </CSSTransition>
            }
          </Route>
  )
}

function App(){
  const ref = useRef(null);
  return (
    <>
    <div style={{width:'500px',margin:'0 auto'}}>
      <Router>
        <Nav />
        <div className="router-page_container">
          <TranstionRoute path="/home" exact component={Home} />
          <TranstionRoute path="/detail" exact component={Detail} />
          <TranstionRoute path="/con" exact component={Con} />
        </div>
      </Router>
    </div>
    
    </>
  )
}

root.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
