import React , { PureComponent } from 'react'
import * as styled from './style.less'
import List from './components/List'
import Reacommend from './components/Recommend'
import Topic from './components/Topic'
import Writer from './components/Writer'
import {connect} from 'react-redux'
import {action as homeAction} from './store'
const mapStateToProps = (state, ownProps) =>{
    return {
        scrollShow:state.home.scrollShow
    }
}
@connect(mapStateToProps,homeAction)
class Home extends PureComponent{
    constructor(props){
        super(props)
        this.scrollBar=this.scrollBar.bind(this)
    }
    render(){
        let {scrollShow} = this.props;
        return (
            <div className={styled.home}>
                <List />
                <div className={styled.sidebar}>
                <Topic></Topic>
                <Reacommend ></Reacommend>
                <Writer></Writer>
                
                </div>
                {scrollShow?<div onClick={this.toTop} className={styled.toTop}></div>:''}
                
            </div>
        )
    }
    componentDidMount(){
        this.bindEvent()
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.scrollBar)
    }
    toTop(){
        window.scrollTo(0,0)
    }
    bindEvent(){
        window.addEventListener('scroll',this.scrollBar)
    }
    scrollBar(){
        let { change_scroll_show , scrollShow } = this.props;
        if(window.scrollY>200 && !scrollShow){
            change_scroll_show(true)
        }
        if(window.scrollY<200 && scrollShow){
            change_scroll_show(false)
        }
    }

}
export default Home;