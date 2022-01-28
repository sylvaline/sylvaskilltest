import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Modal from './elements/Modal';
import {experiment_completed} from '../store/actions/experimentAction'
import Textarea from '../components/elements/Textarea';
import Button from '../components/elements/Button'

const ExperimentBox = (title, detail)=>{

}
// This component is responsible for managing our expirements
function Experiment() {

  const dispatch = useDispatch()

  const {loading, result, experimenting} = useSelector(state=>state.Experiment)
  

  const[isLoading, setIsLoading] = useState(true)
  const[displayModal, setDisplayModal] = useState(false)
  const[wonModal, setWonModal] = useState(false)
  const[theoryModal, setTheoryModal] = useState(false)
  const[processSwitch, setProcessSwitch] = useState(false)
  const[experiment_result, setExperiment_result] = useState(false)
  const[experiment_visibility, setExperiment_visibility] = useState(false)
  const[counter, setCounter] = useState(0)

  
console.log("resu "+result)
console.log("experimenting "+experimenting)

  useEffect(()=>{
    checkResult()
  },[result, experimenting])

 

  // I know i could have used an enum for experimenting variable, i just wanted a quick one now
  const checkResult = ()=>{
    if(experimenting == "started"){
      setTimeout(()=>{
        dispatch(experiment_completed())
      }, 1000)
    }
    if (experimenting == "completed"){
    if(result){setWonModal(true)}
    else{setDisplayModal(true)}
    }
  }

  const new_theory = () =>{
    setTheoryModal(false)
  }

  const retesting = ()=> {
    setIsLoading(false)
    setWonModal(false)
    setExperiment_result(true)
    setExperiment_visibility(true)

    // For checking when our counter value have changed
    for(let i=1;i<=5; i++){
      
      setTimeout(()=>{
        setCounter(i)
      }, 2000)
      
    }
  }

  
  useEffect(()=>{
    if (counter == 5){
      console.log("COUNTER FROM USEEFECT"+counter)
      setExperiment_result(false)

      setTimeout(()=>{
        setTheoryModal(true)
      }, 1000)

  }
  },[counter])
  

  return <div className="experiment"> 
      <div className="experiment_btn">
        <button onClick={()=>setProcessSwitch(!processSwitch)}>Change experiment process</button>
      </div>
      {
        processSwitch ? <div>
        <div className="experiment_top">

      <div className="experiment_box_wrapper">
      <div className="experiment_box">
        <div className="experiment_box_item">
        Predicting
        </div>
        <div className="experiment_box_completed">
        {
          (experimenting == "started")? <div class="lds-hourglass"></div> : <i className="fas fa-check"></i>
        }
        </div>
      </div>
      </div>
      </div>

      
      <div className="experiment_process">
        <div className="experiment_process_inner">
        <h2 className="process_title">Another Process</h2>
        <ul>
          <li>I'm not sure i know what other process to mention</li>
          <li>But it was a good try</li>
          <li>We start the prediction</li>
          <li>I'm very passionate about programming, I love to learn
          <ul className="inner_ul">
            <li>Please just tell me what to put here and i will make it happen, <p>we repeat the prediction to over rule it was a happenstance</p></li>
            <li>
              Else, we revise the hypothesis and predict again
            </li>
          </ul>
             </li>
          <li>At the end we will get a Scientific theory</li>
        </ul>
        </div>
      </div>
        </div> : <div>
          <div className="experiment_top">
      <div className="expirement_box_wrapper">
      <div className="experiment_box">
        <div className="experiment_box_item">
        <p>Observation</p>
        </div>
        <div className="experiment_box_completed">
        <i className="fas fa-check"></i>
        </div>
        
      </div>
      <i className="fas fa-arrow-down "></i>
      </div>

     <div className="experiment_box_wrapper">
     <div className="experiment_box">
        <div className="experiment_box_item">
        <p>Hypothesis</p>
        </div>
        <div className="experiment_box_completed">
        <i className="fas fa-check"></i>
        </div>
        
      </div>
      <i className="fas fa-arrow-down"></i>
     </div>

      <div className="experiment_box_wrapper">
      <div className="experiment_box">
        <div className="experiment_box_item">
        Predicting
        </div>
        <div className="experiment_box_completed">
        {
          isLoading ? <div class="lds-hourglass"></div> : <i className="fas fa-check"></i>
        }
        </div>
      </div>
      </div>

      <div style={{display:experiment_visibility?"block":"none"}} 
      
      className="experiment_box_wrapper">
         <i className="fas fa-arrow-down"></i>
      <div className="experiment_box">
        <div className="experiment_box_item">
        Re-testing {counter}/5
        </div>
        <div className="experiment_box_completed">
        {
          experiment_result ? <div class="lds-hourglass"></div> : <i className="fas fa-check"></i>
        }
        </div>
      </div>
      </div>
      </div>

      <div className="experiment_process">
        <div className="experiment_process_inner">
        <h2 className="process_title">Scientific Process</h2>
        <ul>
          <li>Checked if we have an observation</li>
          <li>Checked if the hypothesis is testable</li>
          <li>We start the prediction</li>
          <li>We have a prediction result
          <ul className="inner_ul">
            <li>If the prediction result corresponds with the hypothesis, <p>we repeat the prediction to over rule it was a happenstance</p></li>
            <li>
              Else, we revise the hypothesis and predict again
            </li>
          </ul>
             </li>
          <li>At the end we will get a Scientific theory</li>
        </ul>
        </div>
      </div>
        </div> 
      }

      {
        displayModal ? <Modal title={"Inconsistent Hypothesis"} subtitle={"Update your hypothesis"} content={<Textarea setDisplayModal={setDisplayModal}/>}/> : ''
      }
      {
        wonModal ? <Modal title={"Wow, Consistent Hypothesis"} subtitle={"Test the expirement for five more times?"} content={<Button content={"Yes, please"} func={retesting}/>} won={true} /> : ''
      }
      {
        theoryModal ? <Modal title={"Re-testing done!"} subtitle={"We now have a new Scientific theory, hurray!!!"} content={<Button content={"Click if you are happy!"} func={new_theory}/>} won={true} /> : ''
      }

  </div>;
}

export default Experiment;
