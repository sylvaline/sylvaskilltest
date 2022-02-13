import {DATA_SAMPLE, LOADING, EXPERIMENT_COMPLETED,START_PREDICTION, STOP_LOADING} from '../actions/types'

const initialState = {
    "observation":localStorage.getItem("observation"),
    "hypothesis":localStorage.getItem("hypothesis"),
    "loading":false,
    "experimenting":"no",
    "result": false
}

 function experimentReducer(state=initialState, action){

    switch (action.type){

       case LOADING:
           return{
               ...state,
               loading: true
           }

        case STOP_LOADING:
        return{
            ...state,
            loading: false
        }   

        case DATA_SAMPLE:

            localStorage.setItem("observation", action.payload.observation)
            localStorage.setItem("hypothesis", action.payload.hypothesis)
            console.log(action.payload)
        return{
            ...state,
            observation:action.payload.observation,
            hypothesis:action.payload.hypothesis,
            loading:false,
            experimenting : true
            
        } 
        
        case EXPERIMENT_COMPLETED:
           return{
               ...state,
               experimenting : "completed"
           }

        case START_PREDICTION:
        return{
            ...state,
            experimenting : "started",
            result : action.payload
        }   

        default:
           return state   

    }
}

export default experimentReducer