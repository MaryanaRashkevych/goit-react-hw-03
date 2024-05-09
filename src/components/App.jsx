import { useState } from 'react'
import { useEffect } from 'react'
import Description from './Description/Description'
import css from "./App.module.css"
import Options from './Options/Options'
import Feedback from './Feedback/Feedback'
import Notification from './Notification/Notification'


export default function App() {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  };

  const [feedback, setFeedback] = useState(
    JSON.parse(localStorage.getItem('feedback')) || initialState
  );

  useEffect(() => {
    
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);
const updateFeedback = (feedbackType) =>{
  setFeedback({
    ...feedback,
[feedbackType]: feedback[feedbackType] +1
  });   
}
const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

const handleReset = () => {
  setFeedback(initialState);
};

const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);


  return (
    <div className={css.container}>
    <Description/>
    <Options updateFeedback={updateFeedback} handleReset={handleReset} totalFeedback={totalFeedback} />
    {totalFeedback > 0 ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback}/> : <Notification/>}
    </div>
  )
}

 
