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
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Container, Alert, Button, AlertHeading } from "react-bootstrap";
import reportWebVitals from "./reportWebVitals";
import {
  Transition,
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import Admin from "./pages/Admin"
import { v4 as uuid } from "uuid";
//只运行一次该模块不做任何的导入
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "animate.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

function FadeTranstion(props) {
  function addTranstion() {
    if(props.isnew === "true"){
      props.nodeRef.current.style.transition = `opacity ${props.timeout}ms`;
    }else{
      const delay = Math.min(props.delay,props.timeout - 1);
      props.nodeRef.current.style.transition = `opacity ${props.timeout}ms ${delay}ms`;
    }
  }
  function removeTranstion() {
    props.nodeRef.current.style.transition = "";
  }
  return (
    <>
      <CSSTransition
        onEnter={addTranstion}
        onEntered={() => {
          removeTranstion();
        }}
        onExit={addTranstion}
        onExited={() => {
          removeTranstion();
        }}
        {...props}
        classNames={"fade"}
      />
    </>
  );
}

FadeTranstion.defaultProps = {
  timeout: 500,
};

function Abc() {
  const [isShow, setIsShow] = useState(true);
  const nodeRef = useRef(null);
  return (
    <>
      <SwitchTransition>
        <FadeTranstion appear nodeRef={nodeRef} timeout={200} key={isShow}>
          <h1 ref={nodeRef}>{isShow ? "标题1" : "标题2"}</h1>
        </FadeTranstion>
      </SwitchTransition>

      <button onClick={() => setIsShow(!isShow)}>切换</button>
    </>
  );
}

function Test() {
  //如果初始状态需要通过计算得出，则可以使用惰性初始化state
  const [tasks, setTasks] = useState(() => {
    return [
      {
        id: uuid(),
        name: "任务1",
        nodeRef: createRef(null),
      },
      {
        id: uuid(),
        name: "任务2",
        nodeRef: createRef(null),
      },
    ];
  });
  return (
    <>
      <TransitionGroup component={"ul"}>
        {tasks.map((task, index) => (
          <FadeTranstion
            appear
            nodeRef={task.nodeRef}
            timeout={(index + 1)*100}
            delay={(index + 1)*10}
            isnew = {task.isnew?task.isnew.toString():false.toString()}
            key={task.id}
          >
            <li ref={task.nodeRef} style={{marginBottom: "15px"}}>
              {task.name}
              <Button onClick={()=>{
                let newTasks = tasks.filter(item=>item.id!==task.id);
                setTasks(newTasks);
              }} size="sm">删除</Button>
            </li>
          </FadeTranstion>
        ))}
      </TransitionGroup>
      <Button variant="primary" size="sm" onClick={()=>{
        let name = prompt("请输入任务名称");
        setTasks([...tasks,{id:uuid(),name:name,nodeRef:createRef(null),isnew:true}])
      }}>
        新增
      </Button>
    </>
  );
}

function Login() {
  return (
    <div>
      登录页
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
