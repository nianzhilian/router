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
  use,
} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Container, Alert, Button, AlertHeading } from "react-bootstrap";
import reportWebVitals from "./reportWebVitals";
import {
  Transition,
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import { v4 as uuid } from "uuid";
//只运行一次该模块不做任何的导入
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import 'animate.css'
const root = ReactDOM.createRoot(document.getElementById("root"));

function Li({text,id,tasks,setTasks},ref){
  return (
    <li ref={ref}>
              {text}
              <button onClick={()=>{
                var aa = tasks.filter(item=>item.id!==id)
                setTasks(aa)
              }}>
                删除
              </button>
            </li>
  )
}

//Li = React.forwardRef(Li);

// 创建个高阶组件
function withTransition(WrappedComponent) {
  class Log extends React.Component{
    render(){
      const {forwardRef,...rest} = this.props;
      return (  
        <WrappedComponent {...rest} ref={forwardRef} />
      )
    }
  }
  function forwardRef(props, ref) { // 这里的ref是Log组件的实例
    return <Log {...props} forwardRef={ref} />
  }
  return React.forwardRef(forwardRef);
}
// Li = withTransition(Li);

function Te(props){
  console.log(props);
  useImperativeHandle(props.ref, () => ({
    test: () => {
      console.log('test');
    }
  }));
  return (
    <div>
      测试
    </div>
  )
}
const Tes = withTransition(Te);
function Test() {
  const [tasks, setTasks] = useState(()=>[
    {
      id:uuid(),
      text:'任务1',
      nodeRef:createRef(null)
    },
    {
      id:uuid(),
      text:'任务2',
      nodeRef:createRef(null)
    }
  ])
  const ref = useRef(null)
  useEffect(()=>{
    console.log(ref);
  },[]);
  return (
    <>
    <Tes ref={ref} name="测试" width={200} height={200} />
    <TransitionGroup component="ul" className="task-ul">
      {
        tasks.map(({id,text,nodeRef})=>(
          <CSSTransition nodeRef={nodeRef} key={id} classNames="task" timeout={200}>
            {/* <Li ref={nodeRef} text={text} id={id} tasks={tasks} setTasks={setTasks} /> */}
            <li ref={nodeRef}>
              {text}
              <button onClick={()=>{
                var aa = tasks.filter(item=>item.id!==id)
                setTasks(aa)
              }}>
                删除
              </button>
            </li>
          </CSSTransition>
        ))
      }
    </TransitionGroup>
    <button onClick={()=>{
      var name = window.prompt('请输入任务名称');
      setTasks(prev=>[...prev,{id:uuid(),text:name,nodeRef:createRef(null)}])
    }}>
      添加任务
    </button>
    </>
  )
}

root.render(<Test />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
