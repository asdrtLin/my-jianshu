import {RECOMMENDED_READING, AUTHOR_OTHER , CHANGE_HEADER , RECOMMEND_POSITION , GET_CONTENT } from './constants'
const defaultState = {
    headerFlag:false,
    headerScrollY:0,
    recommendPosition:false,
    detailContent:{section:"",title:""},
    asideAuther:{},
    recommendedReading:[]
}
export const detailReducer = ( state = defaultState , action ) => {
    switch(action.type){
        case CHANGE_HEADER:
            return {...state,headerFlag:action.headerFlag,headerScrollY:action.headerScrollY};
        case RECOMMEND_POSITION:
            return {...state,recommendPosition:!state.recommendPosition};
        case GET_CONTENT:
            return {...state,detailContent:action.data};
        case AUTHOR_OTHER:
            return {...state,asideAuther:action.data}
        case RECOMMENDED_READING:
            return {...state,recommendedReading:action.data}
        default :return state
    }
}