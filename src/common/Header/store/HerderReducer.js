import {   CHANGEMENUS , MESSAGE , FOCUS_CHANGE , MSG_MOUSE } from './contants'
let defaultState = {
    menus:false,
    msg:[],
    focusChange:false,
    msgMouse:false,
}
export const header = (state=defaultState,action={}) => {
    switch(action.type){
        case CHANGEMENUS:return {...state,menus:!state.menus};
        case MESSAGE : return {...state,msg:action.msg};
        case FOCUS_CHANGE : return {...state,focusChange:!state.focusChange};
        case MSG_MOUSE : return {...state , msgMouse:!state.msgMouse};
        
        default :return state;
    }
}
//   header