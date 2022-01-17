import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({value,text}) => (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
)


const Statistics = ({good,neutral,bad}) => {
  const total = bad + neutral + good
  const average = parseFloat((good * 1 + neutral * 0 + bad * -1) / total).toFixed(2)
  const positive = parseFloat(good * 100 /total ).toFixed(2) + ' %'
  
  if (total === 0) {
    return (
      <div>
        No feedback given ... yet 
      </div>
    )
  }
  return (
    <div>
      <h2>Some stats</h2> 
      <table>
        <tbody>
          <Statistic value={good} text="Good" />
          <Statistic value={neutral} text="Neutral" />
          <Statistic value={bad} text="Bad" /> 
          <Statistic value={total} text="All" /> 
          <Statistic value={average} text="Average" />
          <Statistic value={positive} text="Positive" />
        </tbody>
      </table>  
    </div>
  )
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const plusFeedBack = criteria => {
    switch (criteria) {
      case 'g':
        setGood(good + 1)
        break;
      case 'n':
        setNeutral(neutral + 1)
        break;
      case 'b':
        setBad(bad + 1)
        break;
      default:
        console.log('Just for fun');
    }
  }

  return (
    <div>
      <h1>Give us your feedback</h1>  
      <Button handleClick={() => plusFeedBack('g')} text="Good" />
      <Button handleClick={() => plusFeedBack('n')} text="Neutral" />
      <Button handleClick={() => plusFeedBack('b')} text="Bad" /> 
      <hr/>
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)