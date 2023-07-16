import { useState } from 'react'
import shuffleLogo from './assets/shuffle.svg'
import './App.css'

const App = () => {
  const [names, setNames] = useState([])
  const [groupSize, setGroupSize] = useState(2)
  const [results, setResults] = useState("")

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
    handleResults();
    setNames([]);
    setGroupSize(2);
  }

  const handleDownload = (e) => {
    console.log('downloading...');
    e.preventDefault();
  }

  const handleResults = () => {
    setResults(`Groups of ${groupSize}: ${names}`);
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
              value={names}
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
              value={groupSize}
              onChange={handleGroupSize}/>
          </label>
          <button>
            run
          </button>
        </form>
      </div>

      <div>
        { results ? (
        <>
          <p className="results">{results}</p>
          <button onClick={handleDownload}>download</button>
        </>) : ""
        }
      </div>
    </>
  )
}

export default App
