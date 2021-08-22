import { IS_DETAIL , LIST , SHOWLIST , CHANGE_SCROLL_SHOW , DOWNLOAD_APP , GET_TOPIC_IMG , LBT_FLAG , GET_LBT_INFO ,GET_WRITER , WRITER_INFO_SHOW} from './constants'
const defaultState = {
    list:[],
    showList:[],
    page:0,
    scrollShow:false,
    downloadApp:false,
    topicImg:[],
    lbtFlag:1,
    lbtInfo:[],
    writerInfo:[],
    writerInfoShow:[],
    writerPage:0,
    isDetail:false
}
const home = (state=defaultState,action)=>{
    switch(action.type){
        case LIST:
            return {...state,list:action.data};
        case CHANGE_SCROLL_SHOW: 
            return {...state,scrollShow:!state.scrollShow};
        case DOWNLOAD_APP:
            return {...state,downloadApp:!state.downloadApp};
        case GET_TOPIC_IMG:
            return {...state,topicImg:action.data};
        case SHOWLIST:
            let show=state.list.splice(0,5);
            let mshow=state.showList.concat(show)
            return {...state,showList:mshow,page:state.page+1}
        case LBT_FLAG:
            return {...state,lbtFlag:action.data}
        case GET_LBT_INFO:
            return {...state,lbtInfo:action.data}
        case GET_WRITER:
            return {...state,writerInfo:state.writerInfo.concat(action.data)}
        case WRITER_INFO_SHOW:
            let writerShow = state.writerInfo.splice(0,5)
            return {...state,writerPage:action.writerPage+1,writerInfoShow:writerShow}
        case IS_DETAIL:
            return {...state,isDetail:action.data}
        default:return state;
    }
}
export  {home}