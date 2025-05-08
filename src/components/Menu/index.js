import React from 'react'
import './index.css'
export default function Menu(){
    return (
        <ul className='menu'>
            <li>
                <a href='/student'>学生列表</a>
            </li>
            <li>
                <a href='/student/add'>添加学生</a>
            </li>
            <li>
                <a href='/course/list'>课程列表</a>
            </li>
            <li>
                <a href='/course/add'>添加课程</a>
            </li>
        </ul>
    )
}