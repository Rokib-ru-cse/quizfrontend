import authReducers from "./auth.reducers"
import { combineReducers } from 'redux'
import userauthReducers from './userauth.reducers'
import productReducers from './product.reducer'
import orderReducers from './order.reducer'
import categoryReducers from './category.reducer'
import initialDataReducers from './initialData.reducers'
import cartReducer from './cart.reducers'
import userReducer from './user.reducers'

const rootReducers = combineReducers({
    authReducers: authReducers,
    userauthReducers: userauthReducers,
    productReducers : productReducers,
    orderReducers : orderReducers,
    categoryReducers : categoryReducers,
    initialDataReducers:initialDataReducers,
    cartReducer:cartReducer,
    userReducer:userReducer,
})

export default rootReducers