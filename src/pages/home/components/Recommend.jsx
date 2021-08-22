import React, { PureComponent } from 'react'
import * as styled from './../style.less'
import * as fontStyled from '../../../static/iconfont/iconfont.module.less'
import { connect } from 'react-redux'
import { action as homeAction } from '../store'
import Lbt from './Lbt'
const mapStateToProps = (state, ownProps) => {
    return {
        downloadApp: state.home.downloadApp,
        lbtFlag: state.home.lbtFlag
    }
}
@connect(mapStateToProps, homeAction)
class Recommend extends PureComponent {
    render() {
        let { download_app, downloadApp } = this.props;

        return (
            <div>
                <a className={styled.download}
                    href="http://www.baidu.com"
                    onMouseOver={
                        () => {
                            if (!downloadApp) {
                                download_app()
                            }
                        }
                    }
                    onMouseLeave={
                        () => {
                            if (downloadApp) {
                                download_app()
                            }
                        }
                    }
                >
                    <img src={require('../../../static/img/erweima.png').default} alt="" />
                    <div className={styled.info}>
                        <h3 className={styled.title}>下载简书手机App</h3>
                        <p className={styled.description}>随时随地发现和创作内容</p>
                    </div>
                    <div className={downloadApp ? styled.downloadDiv : `${styled.downloadDiv} ${styled.hide}`}>
                        <span className={`${fontStyled.iconfont} ${styled.downloadSpan}`}>&#xe629;</span>
                        <img className={styled.downloadImg} src={require('../../../static/img/erweima.png').default} alt="" />
                    </div>
                </a>
                <Lbt />

            </div>
        )
    }
}
export default Recommend