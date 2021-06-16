import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad, average, positive}) => {

  if (good+neutral+bad > 0) {
    return (
      <table>
        <StatisticLine text="good" value={good} /> 
        <StatisticLine text="neutral" value={neutral} /> 
        <StatisticLine text="bad" value={bad} /> 
        <StatisticLine text="all" value={good+neutral+bad} /> 
        <StatisticLine text="average" value={average} /> 
        <StatisticLine text="positive" value={positive} /> 
      </table>
    )
  }
  else {
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td><td>{props.value}</td>
      </tr> 
    </tbody>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const IncGood = () => {
    setGood(good + 1)
  }

  const IncNeutral = () => {
    setNeutral(neutral + 1)
  }
  
  const IncBad = () => {
    setBad(bad + 1)
  }

  const Average = (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
  const Positive = (good / (good + neutral + bad)) * 100 + " %"

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => IncGood()} text="good" />
      <Button handleClick={() => IncNeutral()} text="neutral" />
      <Button handleClick={() => IncBad()} text="bad" />
      <h1>statistics</h1>          
      <Statistics good={good} neutral={neutral} bad={bad} average={Average} positive={Positive} />           
    </div>
  )

}



export default App
