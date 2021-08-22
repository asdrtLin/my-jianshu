import {  CHANGEMENUS , MESSAGE , FOCUS_CHANGE ,MSG_MOUSE}  from './contants'

export const change_menus = (data) => {
    return dispatch=>dispatch({
        type:CHANGEMENUS
    })
}
export const input_message = (data) => {
    return dispatch => dispatch({
        type:MESSAGE,
        msg:data
    })
}
export const focus_change = (data) => {
    return dispatch => dispatch({
        type:FOCUS_CHANGE
    })
}
export const msg_focus = (data) => {
    return dispatch => dispatch ({
        type:MSG_MOUSE
    })
}
