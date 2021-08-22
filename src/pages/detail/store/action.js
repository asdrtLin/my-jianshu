import axios from '_axios@0.21.1@axios'
import { RECOMMENDED_READING ,  CHANGE_HEADER , RECOMMEND_POSITION , GET_CONTENT , AUTHOR_OTHER } from './constants'
export const change_header = (headerScrollY,headerFlag) => {
    return dispatch => {
        dispatch({
            type:CHANGE_HEADER,
            headerScrollY,
            headerFlag
        })
    }
}

export const recommend_position = () => {
    return dispatch=> {
        dispatch({
            type:RECOMMEND_POSITION
        })
    }
}
export const get_content = () => {
    return dispatch => {
        axios.get('/LSLjianshu/api/detailContent.php')
        .then(res=>{
            dispatch({
                type:GET_CONTENT,
                data:res.data.data
            })
        })
        .catch(e=>{
            alert(e.message)
        })
    }
}
export const get_author_other = () => {
    return dispatch => {
        axios.get('/LSLjianshu/api/detailAside.php')
        .then(res=>{
            dispatch({
                type:AUTHOR_OTHER,
                data:res.data.data
            })
        })
        .catch(e=>{
            alert(e.message)
        })
    }
}
export const get_recommended_reading = () => {
    return dispatch => {
        axios.get('/LSLjianshu/api/detailRecommendedReading.php')
        .then(res=>{
            dispatch({
                type:RECOMMENDED_READING,
                data:res.data.data
            })
        })
        .catch(e=>{
            alert(e.message)
        })
    }
}