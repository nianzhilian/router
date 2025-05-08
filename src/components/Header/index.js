import React from "react";
//只运行一次模块 不做任何的导入
import './index.css';

export default function Header() {
  return (
    <div className="header-content">
      <div className="left">
        <h1>测试</h1>
      </div>
      <div className="right">
        <span>用户名</span>
        <button>退出</button>
      </div>
    </div>
  );
}
