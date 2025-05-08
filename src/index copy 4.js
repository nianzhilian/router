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
} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Container, Alert, Button, AlertHeading } from "react-bootstrap";
import reportWebVitals from "./reportWebVitals";
import { Transition, CSSTransition } from "react-transition-group";
//只运行一次该模块不做任何的导入
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

function Test1({ visible }) {
  const nodeRef = useRef(null);
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        appear
        mountOnEnter
        onEnter={() => {
          console.dir(nodeRef.current);
          console.log("enter");
        }}
        onEntering={() => {
          console.log("entering");
        }}
        onEntered={() => {
          console.log("entered");
        }}
        onExit={() => {
          console.log("exit");
        }}
        onExiting={() => {
          console.log("exiting");
        }}
        onExited={() => {
          console.log("exited");
        }}
        classNames="test"
        in={visible}
        timeout={10000}
      >
        <h1 className="title" ref={nodeRef}>
          这是标题1
        </h1>
      </CSSTransition>
    </>
  );
}

function Test2({ visible }) {
  const nodeRef = useRef(null);
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        mountOnEnter
        classNames="test"
        in={visible}
        timeout={10000}
      >
        <h1 className="title" ref={nodeRef}>
          这是标题2
        </h1>
      </CSSTransition>
    </>
  );
}

function Test() {
  const [visible, setVisible] = useState(true);
  const [showBtn, setShowBtn] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);
  const alertRef = useRef(null);
  return (
    <>
      {/* <div className="container">
      <div className="comp-container">
        <Test1 visible={visible} />
        <Test2 visible={!visible} />
      </div>
      <button onClick={()=>setVisible(!visible)}>
        切换显示状态
      </button>
      
    </div> */}
      {/* 默认情况下子组件达到退出状态后  仍保持挂载状态,如果希望默认是退出状态时 移除掉它  则可以设置unmountOnExit 组件退出后卸载它 */}

      <Transition nodeRef={nodeRef} timeout={300} in={showMessage}>
        <div ref={nodeRef}>这是测试</div>
      </Transition>

      <Container style={{ paddingTop: "2rem" }}>
        {showBtn && (
          <Button size="sm" onClick={() => setShowMessage(true)}>
            show message
          </Button>
        )}

        <CSSTransition
          mountOnEnter
          unmountOnExit
          nodeRef={alertRef}
          in={showMessage}
          timeout={300}
          classNames={"alert"}
          onEnter={() => setShowBtn(false)}
          onExited={() => setShowBtn(true)}
        >
          <Alert
            ref={alertRef}
            dismissible
            variant="primary"
            onClick={() => setShowMessage(false)}
          >
            <AlertHeading>Animated alert message</AlertHeading>
            <p>
              This alert message is being transitioned in and out of the DOM.
            </p>
            <Button variant="primary" onClick={() => setShowMessage(false)}>
              close
            </Button>
          </Alert>
        </CSSTransition>
      </Container>
    </>
  );
}

root.render(<Test />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
