import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'


const initialState = {}

const devTools = () => {
    let result = null
    if(process.env.NODE_ENV === "development"){
        result = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        return result
    }
     return null
}

const reduxDevTools = devTools()

// const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk), reduxDevTools))

const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)))

 export default store