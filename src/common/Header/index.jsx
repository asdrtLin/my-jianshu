import React, { Component } from 'react'
import * as styleds from './style.module.less'
import * as font from '../../static/iconfont/iconfont.module.less'
import * as types from './store/action'
import { loginAction } from '../../pages/login/store'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class Header extends Component {
    constructor(props){
        super(props)
        this.bindScroll=this.bindScroll.bind(this)
        this.debounce=this.debounce.bind(this)
    }
    render() {
        let { menus, msg, focusChange, msgMouse } = this.props.header;
        let {  change_menus, input_message, msg_focus, focus_change , isLogin , isDetail , is_login } = this.props;
        return (
            <div className={isDetail?styleds.allHeader:`${styleds.allHeader} ${styleds.hiddO}`}>
                <div className={isDetail?`${styleds.headerchange} ${styleds.ovAuto}` :`${styleds.headerchange} ${styleds.hiddO}`}>
                    <div className={styleds.header} ref='header'>
                        <Link to='/' className={styleds.logo}>
                            <img src={require('../../static/img/logo.png').default} alt="" />
                        </Link>



                        <ul>
                            <li className={styleds.writing}>
                                <Link to={isLogin?'/write':"/login"} className={font.iconfont} >&#xe6eb;写文章</Link>
                            </li>
                            <li className={styleds.login}>{isLogin?"":<Link to='/login'>注册</Link>}</li>
                            <li className={styleds.aa}>{
                            isLogin?
                            <Link className={styleds.line} to='/'  onClick={()=>{
                                is_login(false)
                                
                            }}>退出</Link>:
                            <Link className={styleds.line} to='/login'>登录</Link>}
                            </li>
                            <li className={styleds.aa}><a href="https://www.baidu.com" className={`${styleds.line} ${font.iconfont}`}>&#xe636;</a></li>

                        </ul>
                        <div className={styleds.content}>
                            <span className={`${font.iconfont} ${styleds.menus}`} onClick={change_menus}>&#xe60e;</span>
                            <ul className={styleds.leftUl}>
                                <div className={menus ? `${styleds.dLeft} ${styleds.showLeft}` : `${styleds.dLeft} ${styleds.hiddLeft}`} >
                                    <li className={styleds.index}>
                                        <Link to="/" className={`${styleds.line} ${styleds.iconZhinanzhen} ${font.iconfont}`}>
                                            
                                                <span>首页</span>
                                            </Link>
                                    </li>
                                    <li className={styleds.app}>
                                        <a href="https://www.baidu.com" className={`${styleds.line} ${styleds.iconShoujixiazai} ${font.iconfont}`}>
                                            <span>下载App</span>
                                        </a>
                                    </li>
                                    <li className={styleds.app}>
                                        <a href="https://www.baidu.com" className={`${styleds.line} ${styleds.iconDilanxianxingiconyihuifuHuabanfuben} ${font.iconfont}`}>
                                            <span>IT技术</span>
                                        </a>
                                    </li>
                                    <li className={`${styleds.left} `}>
                                        <input type="text" placeholder='搜索' ref='search'
                                            onKeyUp={
                                                (e) => {
                                                    console.log(e.keyCode)
                                                    if (e.keyCode === 13) {
                                                        if (e.target.value.trim() !== '') {
                                                            
                                                            msg.unshift(e.target.value.trim())
                                                        }
                                                        if (msg.length > 5) {
                                                            msg.pop();
                                                        }
                                                        input_message(msg)
                                                        e.target.value = '';
                                                    }
                                                }
                                            }
                                            onFocus={
                                                () => {
                                                    if (!focusChange) { focus_change() };
                                                }
                                            }
                                            onBlur={
                                                () => {
                                                    if (focusChange) {
                                                        focus_change()
                                                    }
                                                }
                                            }
                                        />
                                        <span className={`${font.iconfont} ${styleds.fangdajing}`}>
                                            &#xe618;
                                        </span>
                                        <ul className={(focusChange && msg.length) || msgMouse > 0 ? styleds.msg : styleds.hidd}
                                            onMouseOver={
                                                () => {
                                                    if (!msgMouse) {
                                                        msg_focus()
                                                    }
                                                }
                                            }
                                            onMouseLeave={
                                                () => {
                                                    if (msgMouse) {
                                                        msg_focus()
                                                    }
                                                }
                                            }
                                        >

                                            {
                                                msg.map((value, index) => {
                                                    return (
                                                        <li className={font.iconfont} key={index}>
                                                            {value}
                                                            <span className={`${font.iconfont} ${styleds.delete}`}
                                                                onClick={
                                                                    () => {
                                                                        msg = msg.filter((valF) => {
                                                                            if (valF === value) {
                                                                                return false;
                                                                            }
                                                                            return true;
                                                                        })
                                                                        input_message(msg)
                                                                    }
                                                                }
                                                            >
                                                                &#xe73e;
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </li>
                                </div>

                            </ul>
                        </div>

                    </div>
                    {isDetail?<div></div>:""}
                    <div className={styleds.detail} ref='detail'>
                        <div className={styleds.detailC}>
                            <h3>
                                那一夜我错的太离谱
                            </h3>
                            <div className={styleds.detailR}>

                                <div className={styleds.writing}>
                                    <a href="http://www.baidu.com">赞赏支持</a>
                                </div>
                                <div className={styleds.login}>
                                    <a href="http://www.baidu.com">关注</a>
                                </div>
                                <a href="http://www.baidu.com" className={styleds.title}>
                                    <img src={require('../../static/img/detail/touxiang.jpg').default} alt="" />
                                    <span>风之色彩2019</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        window.addEventListener('scroll',this.bindScroll())
    }
    bindScroll(){
            let k=null;
            return ()=>{
                if(this.props.isDetail){
                    clearTimeout(k)
                    k=setTimeout(this.debounce,600) 
                }
    }
    }
    debounce(){
        let {headerFlag} =this.props;
        let { header , detail } = this.refs;
        if(!headerFlag){
            header.scrollIntoView(!headerFlag)
        }
        if(headerFlag){
            detail.scrollIntoView(headerFlag)
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        header: state.header,
        headerFlag: state.detail.headerFlag,
        isLogin:state.login.isLogin,
        isDetail:state.home.isDetail
    }
}
export default connect(mapStateToProps,{...types,is_login:loginAction.is_login})(Header);