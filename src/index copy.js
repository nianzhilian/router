import React, { useId } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import PagerContainer from './components/PagerContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));


//定义错误边界组件 当子组件树中 抛出错误时 显示降级的ui
class ErrorBound extends React.Component {
    //定义组件的状态
    state = {
        hasError: false
    }
    constructor(props) {
        super(props);
    }
    
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    显示降级的ui
                </div>
            )
        }
    }
}

class Form extends React.Component {
    state = {
        useId: '',
        password: '',
        chooice: [],
        sex:'',
        loves: [
            {
                value: 'beijing',
                name: "北京"
            },
            {
                value: "shanghai",
                name: "上海"
            },
            {
                value: "shenzhen",
                name: "深圳"
            }
        ],
        sel:''
    }
    handleChange = (e)=>{
        let value = e.target.value;
        const name = e.target.name;
        if(e.target.type === "checkbox"){
            if(e.target.checked){
                value = [...this.state.chooice,value];
            }else{
                value = this.state.chooice.filter((item) => item!=value)
            }
        }
        this.setState({
            [name]:value
        })
    }
    constructor(props) {
        super(props);
    }
    render() {
        let checkboxs = this.state.loves.map((item, index, array) =>
            <label key={index}>
                <input type='checkbox' name='chooice' value={item.value} checked={this.state.chooice.includes(item.value)} onChange={this.handleChange} />
                {item.name}
            </label>
        )
        return (
            <div className='form'>
                <p>
                    <input name='useId' value={this.state.useId} onChange={this.handleChange} />
                </p>
                <p>
                    <input name='password' value={this.state.password} onChange={this.handleChange} />
                </p>
                <p>
                    <label>
                        <input type='radio' name='sex' value="nan" checked={this.state.sex === 'nan'} onChange={this.handleChange} />
                        男
                    </label>
                    <label>
                        <input type='radio' name='sex' value="nv" checked={this.state.sex === 'nv'} onChange={this.handleChange} />
                        女
                    </label>
                </p>
                <p>
                    {
                        checkboxs
                    }
                </p>
                <p>
                    <select name='sel' value={this.state.sel} onChange={this.handleChange}>
                        <option value='zhangsan'>张三</option>
                        <option value='lisi'>李四</option>
                    </select>
                </p>
                <p>
                    <button onClick={()=>{
                        console.log(this.state)
                    }}>获取表单数据</button>
                </p>
            </div>
        )
    }
}

root.render(<Form />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
