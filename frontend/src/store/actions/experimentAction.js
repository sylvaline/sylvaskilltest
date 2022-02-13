import {DATA_SAMPLE, LOADING, EXPERIMENT_COMPLETED, START_PREDICTION, STOP_LOADING} from './types'
import Helper from "../../helper"
const {checkPrediction} = new Helper()


export const get_sample_data = (data_collected) => dispatch => {
    dispatch({
        type:LOADING
    })

    dispatch({
        type:DATA_SAMPLE,
        payload : data_collected
    })
}

export const experiment_completed = () => dispatch => {
    dispatch({
        type : EXPERIMENT_COMPLETED
    })
}

 export const start_prediction = () =>  dispatch =>{

    dispatch({
        type:LOADING
    })

    // the result of the prediction
    const result = checkPrediction()
    console.log(result)

    dispatch({
        type: START_PREDICTION,
        payload : result
    })

    console.log("from prediction")
}

