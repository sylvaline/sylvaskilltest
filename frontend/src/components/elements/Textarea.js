import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_sample_data, start_prediction } from '../../store/actions/experimentAction'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import Popup from '../elements/Popup'

function Textarea({ history, setDisplayModal }) {

    const { hypothesis } = useSelector(state => state.Experiment)

    const [User_hypothesis, setUser_Hypothesis] = useState(hypothesis)
    const [isMobile, setMobile] = useState(false)
    const [on_obs_out, setMon_obs_out] = useState(false)
    const [display_msg, setDisplay_msg] = useState(false)

    const [cookie, setCookies] = useCookies(["input_count"])

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (hypothesis == User_hypothesis || !User_hypothesis) {
            setDisplay_msg(true)
            return
        }

        // I had to get the user's observation from the local storage
        const update_sample = {
            observation: localStorage.getItem("observation"),
            hypothesis : User_hypothesis
        }



        dispatch(get_sample_data(update_sample))
        dispatch(start_prediction())
        setDisplayModal(false)

    }

    if (display_msg) {
        setTimeout(() => {
            setDisplay_msg(false)

        }, 1500)
    }

    const win_width = window.innerWidth

    const onObsMouseOut = () => {

        let count = 1
        console.log(cookie.input_count)
        setCookies("input_count", count, { path: "/" })
        console.log("cookie" + cookie.input_count)
        if (cookie.input_count == 1) {
            console.log("cookie" + cookie.input_count)
            console.log("count" + count)
            setMon_obs_out(true)
        }

        if (User_hypothesis.length == 0 && cookie.input_count == 1) {
            setMon_obs_out(false)
        }

    }

    const handleNotNow = () => {
        history.push("/")
    }


    useEffect(() => {
        console.log(win_width)
        if (win_width < 500) {
            setMobile(true)
        }

    }, [win_width,])

    return (<>
      
        <form onSubmit={handleSubmit}>

            <div className="input">
                <div className="input_style">
                    {
                        isMobile ? <div className={on_obs_out ? "textarea mouse_out" : "textarea"}>
                            <textarea  value={display_msg?"New hypothesis needed":User_hypothesis} onChange={(e) => { setUser_Hypothesis(e.target.value); onObsMouseOut() }} rows="2" cols="14"></textarea>
                        </div>
                            : <div className={on_obs_out ? "textarea mouse_out" : "textarea"}>
                                <textarea value={display_msg?"New hypothesis needed":User_hypothesis} onChange={(e) => { setUser_Hypothesis(e.target.value); onObsMouseOut() }} rows="3" cols="30"></textarea>
                            </div>


                    }

                </div>

                <button >Continue Experiment</button>


            </div>
        </form>

        <button className=' margin_t_on_win left_on_mobile'><Link to="/">Not Now</Link></button>

    </>
    )

}

export default Textarea;
