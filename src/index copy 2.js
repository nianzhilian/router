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
} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'));

//路由是根据路径去匹配要显示的组件 能够做到不需要刷新页面，不需要请求服务器

function About(){
	return (
		<div>
			关于我们
		</div>
	)
}

function Us(){
	return (
		<div>
			联系我们
		</div>
	)
}

function Four(){
	return (
		<div>
			不写path会匹配任意的路径
		</div>
	)
}

function Home(){
	return (
		<div>
			这是首页
			<Switch>
				<Route path="/home/about">
					<About />
				</Route>
				<Route path="/home/us">
					<Us />
				</Route>
				{/* 不写path会匹配任意的路径 */}
				<Route>
					<Four />
				</Route>
			</Switch>
			
		</div>
	)
}

function NotFound(){
	return (
		<div>
			404页面
			<div>
				
			</div>
		</div>
	)
}

function DashBoard(){
	return (
		<div>
			这是DashBoard页面
		</div>
	)
}

function App(){
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<DashBoard />
				</Route>
				<Route path="/home">
					<Home />
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
			
		</Router>
	)
}

root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
