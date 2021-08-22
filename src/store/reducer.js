import {combineReducers} from 'redux'
import {header} from '../common/Header/store/HerderReducer'
import {home} from '../pages/home/store/HomeReducer'
import { detailReducer as detail } from '../pages/detail/store'
import { loginReducer as login } from '../pages/login/store'
export const rootReducer = combineReducers ({
    header:header,
    home:home,
    detail:detail,
    login:login
})
