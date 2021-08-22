import React, { PureComponent } from 'react'
import { action as homeAction } from '../store'
import { connect } from 'react-redux'
import * as styled from '../style.less'
import * as iconfont from '../../../static/iconfont/iconfont.module.less';
import { Link } from 'react-router-dom'
const mapStateToProps = (state, ownProps) => {
    return {
        list: state.home.list,
        page: state.home.page,
        showList:state.home.showList
    }
}
@connect(mapStateToProps, homeAction)
class List extends PureComponent {
    render() {
        let { showList , is_detail , list_show , list , list_get , page} = this.props
        return (
            <ul className={styled.listG}>
                {
                    showList.map((value,index) => {
                        return (
                            <li className={styled.list} key={index}>
                                {value.imgUrl?<a href={value.imgUrl} className={styled.imga}>
                                <img className={styled.imgg} src={value.imgUrl} alt="" />
                            </a>:''
                            }
                            
                            <div>
                                <Link to={value.path} onClick={()=>is_detail(true)}>
                                   <h3 className={styled.title}>{value.title}</h3>
                                </Link>
                                
                                <p className={styled.abstract}>{value.secction}</p>
                                <div className={styled.meta}>
                                    <span className={`${styled.ydl} ${iconfont.iconfont} ${iconfont.iconZuanshi}`}>{value.meta}</span>
                                    <a href="http://www.baidu.com">{value.nickname}</a>
                                    <a href="http://www.baidu.com" className={`${iconfont.iconfont} ${iconfont.iconXiaoxi}`}>{value.blank}</a>
                                    <span className={`${iconfont.iconfont} ${iconfont.iconXin}`}>{value.like}</span>
                                </div>
                            </div>
                        </li>
                        )
                    })
                }
                <div className={styled.more}
                onClick={
                    ()=>{
                        if(list.length===0){
                            list_get(page)
                        }else{
                            list_show ()
                        }
                    }
                }
                >阅读更多</div>
            </ul>

        )
    }
    componentDidMount() {
        let { page, list_get } = this.props
        list_get(page)
       
    }
}

export default List