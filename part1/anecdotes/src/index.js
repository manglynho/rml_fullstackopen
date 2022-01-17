import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({text, votes, conditional}) => {
  if(conditional && votes === 0){
    return (
      <div>No votes ... yet </div>
    )
  }
  return (
    <div>
      <p> {text}</p>
      <p>Has {votes} votes.</p>
    </div>
  )
}

const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState( Math.floor(Math.random() * 5))
  const [votes, setVote] = useState(Array(5).fill(0))

  const nextAnecdote = () => {
    setSelected( Math.floor(Math.random() * 5) )
  }

  const voteFor = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  const max = votes.indexOf(Math.max(...votes));
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text ={ props.anecdotes[selected] } votes ={ votes[selected]} conditional={false}/>
      <Button handleClick={() => voteFor(selected)} text="Vote" />
      <Button handleClick={() => nextAnecdote()} text="Next Anecdote" />
      <hr/>
      <h1>Anecdote with most votes</h1>
      <Anecdote text ={props.anecdotes[max]} votes ={votes[max]} conditional={true}/>
    </div>
  )

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)