import React, { Component } from 'react'
import styleds from './style.less'
import font from '../../static/iconfont/iconfont.module.less'
import { Link , Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginAction } from './store'
const mapStateToProps = (state , ownProps )=> {
    return {
        loginOrRegister:state.login.loginOrRegister,
        isLogin:state.login.isLogin
    }
}
@connect(mapStateToProps,loginAction)
class Login extends Component {
    render() {
        let {loginOrRegister , login_or_register , login , isLogin , is_login} = this.props;
        if(isLogin){
           return  <Redirect to='/' />
        }else{
        return (
            <div className={styleds.login}>
                <div className={styleds.loginImg}>
                    <img src="/img/logo.png" alt="" />
                </div>
                <div className={styleds.content}>
                    <div className={styleds.contentL}>
                        <div>下载简书App</div>
                        <img src={require("../../static/img/erweima.png").default} alt="" />
                    </div>
                    <div className={styleds.contentR}>
                    
                       <h4>
                            <Link to='/login' className={loginOrRegister?styleds.common:''}
                            onClick={()=>{login_or_register(true)}}
                            >登录</Link>
                            <Link to='/login' className={loginOrRegister?'':styleds.common}
                            onClick={()=>{login_or_register(false)}}
                            >注册</Link>
                        </h4>
                        <div className={styleds.contentRC}>

                            <input ref='userName' autoComplete='off' placeholder="用户名" type="text" id="userName" />
                            <i className={`${font.iconfont} ${styleds.fontRen}`}>&#xe654;</i>
                            <input ref='pwd' placeholder="密码" type="password" id="pwd" />
                            <i className={`${font.iconfont} ${font.iconSuo} ${styleds.fontSuo}`}></i>
                            <div className={styleds.remember}>
                                <input type="checkbox" name="" id="" />记住我
                            </div>
                            <a className={styleds.problem} href="http://www.baidu.com">登录遇到问题?</a>
                            
                            <input type="button" defaultValue={loginOrRegister?"登录":"注册"}
                            onClick={()=>{
                                let pwd=this.refs.pwd.value.trim();
                                let userName=this.refs.userName.value.trim();
                                if( pwd !=='' && userName!==''){
                                    login(pwd,userName)
                                }
                                
                            }}
                             />
                            
                            
                        </div>
                        <h6 >社交账号登录</h6>
                        <div className={styleds.account}>
                        <i className={`${font.iconfont} ${styleds.weibo}`}>&#xe600;</i>
                        <i className={`${font.iconfont} ${styleds.weixin}`}>&#xe637;</i>
                        <i className={`${font.iconfont} ${styleds.qq}`}>&#xf216;</i>
                        </div>
                    </div>

                </div>
            </div>
        )}
    }
    componentDidMount(){
        let {isLogin} =this.props;

        // login_or_register()
    }
}
export default Login