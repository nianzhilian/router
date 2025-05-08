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
import reportWebVitals from "./reportWebVitals";
import { Transition } from "react-transition-group";
import Admin from "./page/Admin";

function Login() {
  return <div>这是登录页面</div>;
}
const duration = 500;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
function Test(){
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  console.log(nodeRef.current)
  useEffect(() => {
    //这个副作用只在挂载和卸载时执行一次
    console.dir(nodeRef.current);
  }, []);
    return (
        <div>
            <Transition appear nodeRef={nodeRef} in={inProp} timeout={duration}
                addEndListener={(node, done) => {
                    nodeRef.current.addEventListener("transitionend", ()=>{
                        console.log("过渡结束了")
                    }, { once: true })
                }}
            >
                {(state)=>{
                  console.log(state)
                  return (
                    <div ref={nodeRef} style={{...defaultStyle,...transitionStyles[state]}}>
                      I'm a fade Transition!
                    </div>
                  )
                }}

            </Transition>
            <button onClick={() => setInProp(!inProp)}>
                Click to Toggle
            </button>
        </div>
    );
}

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/login">
//           <Login />
//         </Route>
//         <Route path="/">
//           <Admin />
//         </Route>
//       </Switch>
//     </Router>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Test />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
