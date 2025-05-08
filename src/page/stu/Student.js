import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string';

export default function Student(){
    const location = useLocation();
    console.log(queryString.parse(location.search));
    return (
        <div>
            学生列表
        </div>
    )
}