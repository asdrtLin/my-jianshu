import { LOGIN_OR_REGISTER , IS_LOGIN } from './constants'
import axios from 'axios'
export const  login_or_register = (data) => {
    return dispatch => {
        dispatch ({
            type:LOGIN_OR_REGISTER,
            data
        })
    }
}
export const is_login = (data) => {
    console.log(data)
    return dispatch => {
                dispatch({
                    type:IS_LOGIN,
                    data
                })
    }
}
export const login = (pwd,userName) => {
    return dispatch => {
        let k={
            "pwd":"pwd","userName":"userName"
        }
        axios.get('/LSLjianshu/api/login.php')
        .then(res=>{
                dispatch({
                    type:IS_LOGIN,
                    data:res.data.status
                })
        })
        .catch(e=>{
            alert(e.message)
        })
    }
}