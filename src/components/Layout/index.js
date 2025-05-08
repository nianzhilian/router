import React from 'react'
//只运行一次模块 不做任何的导入
import './index.css'
export default function Layout(props){
    return (
        <>
            <div className='container'>
                <div className='header'>
                    {props.head}
                </div>
                <div className='middle'>
                    <aside className='aside'>
                        {props.menu}
                    </aside>
                    <div className='main'>
                        {/* 根据地址url 匹配要显示的组件 */}
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}