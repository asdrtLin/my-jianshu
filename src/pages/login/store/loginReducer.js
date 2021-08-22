import { LOGIN_OR_REGISTER , IS_LOGIN } from './constants'
const defaultState = {
    loginOrRegister:true,
    isLogin:false
}
export const  loginReducer = (state=defaultState,action) => {
    switch(action.type){
        case LOGIN_OR_REGISTER:
            return {...state,loginOrRegister:action.data};
        case IS_LOGIN:
            return {...state,isLogin:action.data}
        default:return state;
    }
}