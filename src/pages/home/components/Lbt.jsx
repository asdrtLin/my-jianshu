import React , { PureComponent } from 'react'
import * as styled from './../style.less'
import { connect } from 'react-redux'
import { action as homeAction } from '../store'
const mapStateToProps = (state, ownProps) => {
    return {
        lbtFlag: state.home.lbtFlag,
        lbtInfo: state.home.lbtInfo
    }
}
@connect(mapStateToProps, homeAction)
class Lbt extends PureComponent {
    constructor(props) {
        super(props)
        this.lb = this.lb.bind(this)
        this.dsq = setTimeout(this.lb, 2000)
    }
    class_Change(arr){//{remove:[],add:{}}
        for(let key of arr.remove){
            key.classList.remove(styled.focusSpan);
        }
        arr.add.classList.add(styled.focusSpan);
    }
    lb(k) {
        let { change_lbt_flag, lbtFlag, } = this.props
        let { lunbo1, lunbo2, lunbo3, lunbo4, lbtUl, lbtConent, lbtUlDiv } = this.refs
        if (k) {
            lbtFlag = k;
        }
        switch (lbtFlag) {
            case 1:
                lbtConent.style.display = 'block';
                lbtUlDiv.style.width = '1100px';
                lbtUl.scrollTo(220, 0);
                this.class_Change({remove:[lunbo1,lunbo3,lunbo4],add:lunbo2})
                break;
            case 2:
                lbtUl.scrollTo(440, 0);
                this.class_Change({remove:[lunbo1,lunbo2,lunbo4],add:lunbo3})
                break;
            case 3:
                lbtUl.scrollTo(660, 0);
                this.class_Change({remove:[lunbo1,lunbo3,lunbo4],add:lunbo4})
                break;
            case 4:
                lbtUl.scrollTo(880, 0);
                this.class_Change({remove:[lunbo2,lunbo3,lunbo4],add:lunbo1})
                setTimeout(() => {
                    lbtConent.style.display = 'none';
                    lbtUlDiv.style.width = '220px';
                }, 500)
                break;
            default :return true;
        }
        lbtFlag++;
        if (lbtFlag > 4) {
            lbtFlag = 1;
        }
        change_lbt_flag(lbtFlag)
        this.dsq = setTimeout(() => { this.lb() }, 2000)
    }
    render(){
        let { lbtInfo } = this.props;
        return (
            <div className={styled.lbt}>
                    <ul className={styled.lbtUl} ref='lbtUl'>
                        <div className={styled.lbtUlDiv} ref='lbtUlDiv'>
                            <div className={styled.lbtConent} ref='lbtConent'>
                                {
                                    lbtInfo.map((value,index)=>{
                                        return (
                                            <li key={index}><a href={value.href}><img src={value.urlImg} alt="" /></a></li>
                                        )
                                    })
                                }
                                
                            </div>
                            {lbtInfo[0]?<li className={styled.tail} ref='tail'><a href={lbtInfo[0].href}><img src={lbtInfo[0].urlImg} alt="" /></a></li>:''}
                            
                        </div>
                    </ul>
                    <div className={styled.focus}>
                        <span ref='lunbo1' className={styled.focusSpan} onMouseMove={
                            () => {
                                let { lunbo1, lunbo2, lunbo3, lunbo4, lbtUl } = this.refs
                                this.class_Change({remove:[lunbo2,lunbo3,lunbo4],add:lunbo1})
                                lbtUl.scrollTo(0, 0)
                                clearTimeout(this.dsq)
                            }
                        }
                            onMouseLeave={
                                () => {
                                    console.log(12)
                                    let { lb } = this
                                    this.dsq = setTimeout(() => { lb(1) }, 2000)
                                }
                            }
                        ></span>
                        <span ref='lunbo2' onMouseMove={
                            () => {

                                let { lunbo1, lunbo2, lunbo3, lunbo4, lbtUl } = this.refs
                                this.class_Change({remove:[lunbo1,lunbo3,lunbo4],add:lunbo2})
                                lbtUl.scrollTo(220, 0)
                                clearTimeout(this.dsq)
                            }

                        }
                            onMouseLeave={
                                () => {
                                    let { lb } = this
                                    this.dsq = setTimeout(() => { lb(2) }, 2000)
                                }
                            }
                        ></span>
                        <span ref='lunbo3' onMouseMove={
                            () => {
                                let { lunbo1, lunbo2, lunbo3, lunbo4, lbtUl } = this.refs
                                this.class_Change({remove:[lunbo2,lunbo1,lunbo4],add:lunbo3})
                                lbtUl.scrollTo(440, 0)
                                clearTimeout(this.dsq)
                            }
                        }
                            onMouseLeave={
                                () => {
                                    let { lb } = this
                                    this.dsq = setTimeout(() => { lb(3) }, 2000)
                                }
                            }
                        ></span>
                        <span ref='lunbo4' onMouseMove={
                            () => {
                                let { lunbo1, lunbo2, lunbo3, lunbo4, lbtUl } = this.refs
                                this.class_Change({remove:[lunbo2,lunbo3,lunbo1],add:lunbo4})
                                lbtUl.scrollTo(660, 0)
                                clearTimeout(this.dsq)
                            }
                        }
                            onMouseLeave={
                                () => {
                                    let { lb } = this
                                    this.dsq = setTimeout(() => { lb(4) }, 2000)
                                }
                            }
                        ></span>
                    </div>
                </div>
        )
    }
    componentDidMount(){
        let { get_lbt_info , lbtInfo }=this.props;
        if(lbtInfo.length===0 ){
            get_lbt_info()
        }
    }
    componentWillUnmount(){
        clearTimeout(this.dsq)
    }
}
export default Lbt