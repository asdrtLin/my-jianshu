import React, { PureComponent } from 'react'
import * as styled from './style.module.less'
import * as font from '../../static/iconfont/iconfont.module.less'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { detailAction } from './store'
import Lbt from '../home/components/Lbt'

const mapStateToProps = (state, ownProps) => {
    return {
        headerFlag: state.detail.headerFlag,
        headerScrollY: state.detail.headerScrollY,
        recommendPosition: state.detail.recommendPosition,
        detailContent: state.detail.detailContent,
        asideAuther: state.detail.asideAuther,
        recommendedReading: state.detail.recommendedReading
    }
}
@connect(mapStateToProps, detailAction)
class Detail extends PureComponent {
    constructor(props) {
        super(props)
        this.debounce = this.debounce.bind(this)

        this.removeQd = this.scrollFn().bind(this)
    }
    render() {
        let { recommendedReading, recommendPosition, detailContent, asideAuther } = this.props
        console.log(detailContent)
        return (
            <div className={styled.global}>
                <div className={styled.detail}>
                    <div className={styled.section}>
                        <h3 className={styled.title}>那一夜，我错的太离谱</h3>
                        <div className={styled.writer}>
                            <a href="http://www.baidu.com" className={styled.writerL}>
                                <img src='/img/detail/tou.jpg' alt="" />
                            </a>
                            <div className={styled.writerR}>
                                <div className={styled.writerRT} >
                                    <span>{asideAuther.dataA ? asideAuther.dataA.name : ""}</span>
                                    <span>关注</span>
                                </div>
                                <div className={styled.writerRB}>
                                    <span>
                                        <i className={`${font.iconfont} ${font.iconZuanshi}`}></i>
                                        30
                                    </span>
                                    <span>
                                        2021.07.08 21:03:20
                                    </span>
                                    <span>
                                        字数<output>1,057</output>
                                    </span>
                                    <span>
                                        阅读<output>30,253</output>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styled.content} dangerouslySetInnerHTML={{ __html: detailContent.section }}>
                        </div>
                    </div>
                    <div className={styled.moreG}>
                        <div className={styled.great}>
                            <div className={`${styled.gContent} ${font.iconfont}`}>&#xe870;</div>
                            <span>342赞</span>
                        </div>
                        <div className={styled.reward}>
                            <div className={`${styled.rContent} ${font.iconfont}`}>&#xe610;</div>
                            <span>赞赏</span>
                        </div>
                        <div className={styled.moreArticles}>
                            <div className={`${styled.mContent} ${font.iconfont}`}>&#xe632;</div>
                            <span>更多好文</span>
                        </div>
                    </div>
                    <div className={styled.aside}>
                        <Lbt />
                        <div className={styled.more}>
                            <div className={styled.writer}>
                                <a href="http://www.baidu.com" className={styled.writerL}>
                                    <img src={asideAuther.dataA ? asideAuther.dataA.imgUrl : ""} alt="" />
                                </a>
                                <div className={styled.writerR}>
                                    <div className={styled.writerRT} >
                                        <span>{asideAuther.dataA ? asideAuther.dataA.name : ""}</span>
                                        <span>关注</span>
                                    </div>
                                    <div className={styled.writerRBZ}>
                                        总资产{asideAuther.dataA ? asideAuther.dataA.assets : ""}
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <ul className={styled.moreU}>
                                {
                                    asideAuther.dataC ? asideAuther.dataC.map((value, index) => {
                                        return (
                                            <li key={index} className={styled.moreL}>
                                                <h4>{value.title}</h4>
                                                <span>阅读 {value.reading}</span>
                                            </li>
                                        )
                                    }) : ""
                                }
                            </ul>
                        </div>
                        <div className={recommendPosition ? `${styled.more} ${styled.recommendPosition}` : styled.more} ref='recommend'>
                            <h3 className={styled.recommend}>推荐阅读</h3>
                            <ul className={styled.moreU}>

                                {
                                    recommendedReading.map((value, index) => {
                                        return (
                                            <li key={index} className={styled.moreL}>
                                                <h4>{value.title}</h4>
                                                <span>阅读{value.reading}</span>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.bindEvent()
        this.props.get_content()
        this.props.get_author_other()
        this.props.get_recommended_reading()
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.removeQd)
    }
    bindEvent() {
        window.addEventListener('scroll', this.removeQd)
    }
    scrollFn() {
        let k = null;
        return () => {
            let { recommend } = this.refs;
            let { recommendPosition } = this.props;
            if (window.scrollY > recommend.getBoundingClientRect().bottom && !recommendPosition) {
                this.props.recommend_position()
            }
            if (window.scrollY < recommend.getBoundingClientRect().bottom && recommendPosition) {
                this.props.recommend_position()
            }
            clearTimeout(k)
            k = setTimeout(this.debounce, 500)
        }
    }
    debounce() {
        let { change_header, headerScrollY } = this.props;
        if (window.scrollY > headerScrollY) {
            change_header(window.scrollY, true)
            return 'down';
        }
        if (window.scrollY < headerScrollY) {
            change_header(window.scrollY, false)
            return 'up'
        }
    }
}
export default withRouter(Detail);
