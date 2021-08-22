import React , { PureComponent } from 'react' 
import * as styled from '../style.less'
import { connect } from 'react-redux'
import { action as homeAction } from '../store'
const mapStateToProps = (state,ownProps) => {
    return {
        topicImg:state.home.topicImg
    }
}
@connect(mapStateToProps,homeAction)
class Topic extends PureComponent {
    render(){
        let { topicImg  } = this.props;
        return (
            <div className={styled.topic}>
                {
                    topicImg.map((value,index)=>{
                        return (
                            <a href={value.href} key={index}>
                                <img src={value.imgUrl} alt="" />
                            </a>
                        )
                    })
                }
            </div>
        )
    }
    componentDidMount(){
        let { topicImg , get_topic_img } = this.props;
        if(topicImg.length===0)get_topic_img();
    }
}
export default Topic