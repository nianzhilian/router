import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Student from "./stu/Student";
import StuAdd from "./stu/Add";
// 根据路由地址 匹配要渲染的组件
function Home(){
  return (
    <div>
      这是首页
    </div>
  )
}
export default function Admin() {
  return (
    <Layout head={<Header />} menu={<Menu />}>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route  path="/student">
          <Student />
        </Route>
        <Route exact path="/student/add">
          <StuAdd />
        </Route>
      </Switch>
    </Layout>
  );
}
