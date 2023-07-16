import { useState } from 'react'
import shuffleLogo from './assets/shuffle.svg'
import './App.css'

const App = () => {
  // const [count, setCount] = useState(0)
  const [names, setNames] = useState([])
  const [groupSize, setGroupSize] = useState(2)

  const handleNames = (e) => {
    setNames(e.target.value);
  }

  const handleGroupSize = (e) => {
    setGroupSize(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log(groupSize);
    console.log(names);
    e.preventDefault();
  }

  return (
    <>
      <div>
        <img src={shuffleLogo} className="logo" alt="Shuffle logo" />
        <h1 className='font-dosis'>WiT Randomiser</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="inputName">
            <textarea 
              className='rounded-md' 
              autoFocus 
              name="inputName" 
              id="inputName" 
              cols="30" 
              rows="10" 
              placeholder='Enter each name on a new line...'
              onChange={handleNames}>
            </textarea>
          </label>
          <label htmlFor="size">
            How many in a group?
            <input 
              className='rounded-md' 
              type="number" 
              id="size" 
              size="3" 
              defaultValue={groupSize} 
              onChange={handleGroupSize}/>
          </label>
          <button>
            run
          </button>
        </form>
      </div>

      <div>
      <p className="results">Result here.</p>
      <p className="results">{groupSize}</p>
      <p className="results">{names}</p>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      <button>download</button>
      </div>
    </>
  )
}

export default App
