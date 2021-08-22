import axios from 'axios'
import { IS_DETAIL , LIST , SHOWLIST , CHANGE_SCROLL_SHOW , DOWNLOAD_APP , GET_TOPIC_IMG , LBT_FLAG , GET_LBT_INFO , GET_WRITER , WRITER_INFO_SHOW } from './constants'
const list_get_action = (data,page) => {
    return {
        type:LIST,
        data,
        page
    }
}
const send_topic_img = (data) => {
    return {
        type:GET_TOPIC_IMG,
        data
    }
}
const send_lbt_info = (data) => {
    return {
        type:GET_LBT_INFO,
        data
    }
}
const send_write_info = (data) => {
    return {
        type:GET_WRITER,
        data,
    }
}

export const list_get = (page) =>{
    return dispatch=>{
        // if(){}
        axios.get(`/LSLjianshu/api/homeList.php?page=${page}`)
        .then(res=>{
            console.log(res.data)
            dispatch(list_get_action(res.data.data,page+1))
            dispatch(list_show())
        })
        .catch(e=>{
            alert(e.message)
        })
    }
}
export const list_show = () => {
    return {type:SHOWLIST}
}
export const change_scroll_show = (data) =>{
    return dispatch=>{
        dispatch({
            type:CHANGE_SCROLL_SHOW,
            data
        })
    }
}
export const download_app = () => {
    return dispatch => {
        dispatch({
            type:DOWNLOAD_APP
        })
    }
}
export const get_topic_img = () => {
    return dispatch => {
        axios.get('/LSLjianshu/api/homeTopic.php')
        .then(res=>{
            dispatch(send_topic_img(res.data.data))
        })
        .catch(
            e=>alert(e.message)
        )
    }
}
export const change_lbt_flag = (data) => {
    return dispatch=>{
        dispatch({type:LBT_FLAG,data})
    }
}
export const get_lbt_info = () => {
    return dispatch => {
        axios.get('/LSLjianshu/api/homeLbt.php')
        .then(res=>{
            dispatch(send_lbt_info(res.data.data));
        })
        .catch(e=>{
            alert(e.message);
        })
    }
}
export const get_write_info = (writerPage) => {
    return dispatch => {
        axios.get('/LSLjianshu/api/homeWriter.php')
        .then(res=>{
            dispatch(send_write_info(res.data.data));
            if(writerPage===0){
                dispatch(write_info_show())
            }
        })
        .catch(e=>{
            alert(e.message)
        })
    }
}
export const write_info_show = (writerPage=0) => {

    return {
        type:WRITER_INFO_SHOW,
        writerPage
    }
}
export const is_detail = (data) => {
    return dispatch =>{
        dispatch({
            type:IS_DETAIL,
            data
        })
    }
}