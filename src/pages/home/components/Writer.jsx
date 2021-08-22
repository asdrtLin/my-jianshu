import React , { PureComponent } from 'react'
import * as styled from '../style.less' 
import * as fontStyled from '../../../static/iconfont/iconfont.module.less'
import { connect } from 'react-redux'
import { action as homeAction} from '../store'
const mapStateToProps = (state,ownProps) =>{
    return {
        writerInfoShow:state.home.writerInfoShow,
        writerInfo:state.home.writerInfo,
        writerPage:state.home.writerPage
    }
}
@connect(mapStateToProps,homeAction)
class Writer extends PureComponent {
    render(){
        let { writerPage, writerInfo , writerInfoShow , write_info_show , get_write_info } =this.props
        return (
            <div className={styled.writer}>
                <div className={styled.title}>
                    <span>推荐作者</span>
                    <a href="#oj" onClick={
                        ()=>{
                            if(writerInfo.length===0){
                                get_write_info(0)
                            }else{
                                write_info_show(writerPage)
                            }
                            
                        }
                    }>
                        <i className={fontStyled.iconfont}>&#xe851;</i>
                        换一批
                    </a>
                </div>
                <ul>
                    {
                        writerInfoShow.map((value,index)=>{
                            return (
                                <li key={index}>
                        <a href={value.href}>
                            <img src={value.imgUrl} alt="" />
                        </a>
                        <span>+关注</span>
                        <div className={styled.content}>
                            <span>{value.name}</span>
                            <p>{value.introduce}</p>
                        </div>
                    </li>
                            )
                        })
                    }
                </ul>
                <a href="http://www.baidu.com" className={styled.footer}>查看全部</a>
            </div>
        )
    }
    componentDidMount(){
        let { writerPage , get_write_info }=this.props;
        if(writerPage===0){
            get_write_info(writerPage)
        }
    }
}
export default Writer