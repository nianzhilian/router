import React, {
  useId,
  useState,
  useEffect,
  //useReducer,
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
  Prompt,
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

function Page1(){
  return (
    <div>
      第一页
    </div>
  )
}

/*class Prompt extends React.PureComponent{
  constructor(props){
    super(props);
  }
  handleBlock(){
    if(this.props.when){
      //阻塞路由  有返回值 返回的是一个函数   该函数是取消阻塞
      this.unBlock = this.props.history.block(this.props.message)
    }else{
      if(this.unBlock){
        this.unBlock();
      }
    }
  }
  componentDidMount(){
    this.handleBlock();
  }
  componentDidUpdate(){
    this.handleBlock();
    console.log('组件更新完毕')
  }
  componentWillUnmount(){
    console.log('组件将要卸载掉')
    if(this.unBlock){
      this.unBlock();
    }
  }
  render(){
    console.log('组件渲染了')
    return null
  }
}
Prompt = withRouter(Prompt);*/
class Page2 extends React.Component{
  state = {
    val:''
  }
  constructor(props){
    super(props);
  }
  // handleBlock(val){
  //   if(val){
  //     this.unBlock = this.props.history.block('别乱来，会导致数据丢失，真的要跳转吗？')
  //   }else{
  //     if(this.unBlock){
  //       this.unBlock();
  //     }
  //   }
    
  //   console.log(this.props)
  // }
  componentWillUnmount(){
    // if(this.unBlock){
    //   this.unBlock();
    // }
  }
  render() {
    return (
      <div>
        <Prompt when={this.state.val!=''}  message="别乱来，会导致数据丢失，真的要跳转吗？要跳转请点击确定按钮" />
        <textarea value={this.state.val} onChange={(e)=>{
          this.setState({
            val:e.target.value
          })
        }}>
        </textarea>
      </div>
    )
  }
}

function useReducer(reducer,initialState){
  const [state, setstate] = useState(initialState);
  function dispatch(action){
    const newState = reducer(state,action);
    setstate(newState)
  }
  return [state,dispatch]
}

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min)+min)
}

function todoReducer(state,action){
  switch (action.type) {
    case 'add':
      return [...state,{
        text:'张三'+getRandom(1,100)
      }]
    default:
      return state
  }
}

function Todo(){
  const [state,dispatch] = useReducer(todoReducer,[]);
  const elems = state.map((item,index)=><li key={index}>{item.text}</li>);
  return (
    <div>
      <ul>
        {elems}
      </ul>
      <button onClick={()=>{
        dispatch({type:'add'})
      }}>
        添加
      </button>
    </div>
  )
}

function App(){
  return (
    <Router getUserConfirmation={(msg,cb)=>{
      cb(window.confirm(msg));
    }}>
      <div className="router-header ">
        <NavLink to={'/page1'}>页面1</NavLink>
        <NavLink to={'/page2'}>页面23</NavLink>
      </div>
      <Todo />
      <div>
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
      </div>
    </Router>
  )
}

root.render(<App />)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
