import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_sample_data, start_prediction} from '../store/actions/experimentAction'
import Popup from './elements/Popup';
import {useCookies} from 'react-cookie'

// This is the starting page
function StartPage({ history }) {

    // All the starts we have utilised
    const [observation, setObservation] = useState("")
    const [hypothesis, setHypothesis] = useState("")
    const [display_msg, setDisplay_msg] = useState(false)
    const [isMobile, setMobile] = useState(false)
    const [on_obs_out, setMon_obs_out] = useState(false)
    const[cookie, setCookies] = useCookies(["input_count"])
    

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!observation) {
            setDisplay_msg(true)
            return
        }
        if (!hypothesis) {
            setDisplay_msg(true)
            return
        }

        const new_sample = {
            observation,
            hypothesis
        }


        
        dispatch(get_sample_data(new_sample))
        dispatch(start_prediction())

        history.push(`/expirement`)
        
    }

    if(display_msg){
        setTimeout(()=>{
            setDisplay_msg(false)
        }, 1500)
    }

    const win_width = window.innerWidth
 
    const onObsMouseOut = () => {

        let count = 1
      
        setCookies("input_count", count, {path:"/"})
      
        if(cookie.input_count == 1){
            setMon_obs_out(true)
        }
        
        if(observation.length == 0 && cookie.input_count == 1){
            setMon_obs_out(false)
        }
        
    }


    useEffect(() => {
        console.log(win_width)
        if (win_width < 500) {
            setMobile(true)
        }

    }, [win_width,])

    return <div className="start_page">
        {
            display_msg ? <Popup text="All inputs are required" color="red"/>: ""
        }
        <form onSubmit={handleSubmit}>
            <div className="input">
                <div className="input_style">
                    {
                        isMobile ? <div className={on_obs_out ? "textarea mouse_out" : "textarea"}>
                        <textarea placeholder="What's your observation?" value={observation} onChange={(e) => {setObservation(e.target.value); onObsMouseOut()}} rows="2" cols="24"></textarea> 
                    </div>
                        : <div className={on_obs_out ? "textarea mouse_out" : "textarea"}>
                            <textarea placeholder="What's your observation?" value={observation} onChange={(e) => {setObservation(e.target.value); onObsMouseOut()}} rows="3" cols="50"></textarea>
                        </div>


                    }
                </div>
                <div className="input_style">
                    {
                        isMobile ? <div className="textarea">
                            <textarea placeholder="What's your hypothesis?" value={hypothesis} onChange={(e) => setHypothesis(e.target.value)} rows="6" cols="24">

                            </textarea>
                        </div> : <div className="textarea">
                            <textarea placeholder="What's your hypothesis?" value={hypothesis} onChange={(e) => setHypothesis(e.target.value)} rows="6" cols="50">

                            </textarea>
                        </div>


                    }
                </div>
                <div className="input_btn">
                    <button>Start Experiment</button>
                </div>

            </div>
        </form>
    </div>;
}

export default StartPage;
