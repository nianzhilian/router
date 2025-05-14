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
      首页
    </div>
  )
}

function News(props){
  console.log(props)
  return (
    <>
    <div>
      <nav>
        <BetterLink to={{name:"newhome"}} style={{marginRight: '10px'}}>新闻首页</BetterLink>
        <BetterLink to={{name:"newdetail"}}  style={{marginRight: '10px'}}>新闻详情页</BetterLink>
        <BetterLink to={{name:"newsearch"}}>新闻搜索页</BetterLink>
      </nav>
      <div>
        {props.children}
      </div>
    </div>
    </>
  )
}

function NewHome(){
  return (
    <div>
      新闻首页
    </div>
  )
}
function NewDetail(){
  return (
    <div>
      详情页
    </div>
  )
}
function NewSearch(){
  return (
    <div>
      搜索页
    </div>
  )
} 
const configRoute = [
  {
    name:'news',
    path:'/news',
    component:News,
    children:[
      {
        name:'newhome',
        path:'/',
        component:NewHome,
        exact:true
      },
      {
        name:'newdetail',
        path:'/detail',
        component:NewDetail,
        exact:true
      },
      {
        name:'newsearch',
        path:'/search',
        component:NewSearch,
        exact:true
      }
    ]
  },
  {
    name:'home',
    path:'/',
    component:Home
  }
]

function getRoutes(routes,basePath){
  const rs = routes.map((r,i)=>{
    const {children,component:Component,path,...rest} = r;
    let newpath = `${basePath}${path}`;
    newpath = newpath.replace(/\/\//g,'/');
    console.log(newpath)
    return (
      <Route key={i} {...rest} path={newpath} render={(props)=>{
        return (
          <Component {...props}>
            {children && getRoutes(children,newpath)}
          </Component>
        )
      }} />
    )
  })
  console.log(rs);
  return (
    <>
    <Switch>
      {rs}
    </Switch>
    </>
  )
}

function RootRoute(){
  return (
    <>
    {getRoutes(configRoute,'/')}
    </>
  )
}

function getPath(name,baseUrl,routes){
  for (const rt of routes) {
    let newpath = baseUrl+rt.path;
    newpath = newpath.replace(/\/\//g,'/')
    if(rt.name == name){
      return  newpath;
    }else{
      if(Array.isArray(rt.children)){
        const path = getPath(name,newpath,rt.children)
        if(path){
          return path;
        }
      }
    }
  }
}

function BetterLink({to,...rest}){
  to.pathname = getPath(to.name,'/',configRoute);
  return (
    <Link {...rest} to={to} />
  );
}

function App(){
  return (
    <>
    <Router>
      <nav>
        <BetterLink style={{marginRight: '10px'}} to={{name:'home'}}>首页</BetterLink>
        <BetterLink style={{marginRight: '10px'}} to={{name:'news'}}>新闻页</BetterLink>
      </nav>
      <div>
        {/* 路由 */}
        <RootRoute />
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
