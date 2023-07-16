import { useState } from 'react'
import shuffleLogo from './assets/shuffle.svg'
import './App.css'

const App = () => {
  const [names, setNames] = useState('')
  const [namesArray, setNamesArray] = useState([])
  const [groupSize, setGroupSize] = useState(2)
  const [resultTitle, setResultTitle] = useState('')
  const [groupings, setGroupings] = useState([])

  const handleNames = (e) => {
    setNamesArray(names.split('\n'));
    setNames(e.target.value);
  }

  const handleGroupSize = (e) => {
    setGroupSize(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResults();
  }

  const handleDownload = (e) => {
    console.log('downloading...');
    e.preventDefault();
  }

  const handleResults = () => {
    setResultTitle(`Groups of ${groupSize}`.toUpperCase());
    console.log(namesArray);
    randomise();
    console.log(namesArray);
    setGroupings(namesArray);
    // setNames('');
    // setGroupSize(1);
  }

  const randomise = () => {
    let i = namesArray.length;
    while (--i > 0) {
      const temp = Math.floor(Math.random() * (i + 1));
      [namesArray[temp], namesArray[i]] = [namesArray[i], namesArray[temp]];
    }
    
    
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
              min={1}
              value={groupSize}
              onChange={handleGroupSize}/>
          </label>
          <button>
            run
          </button>
        </form>
      </div>

      <div>
        { groupings.length > 0 ? (
        <>
          <h3 className="text-white font-dosis">{resultTitle}</h3>
          <ul className='results'>{groupings.map((name) => {
            return <li key={name}>{name}</li>
          })}
          </ul>
          <button autoFocus onClick={handleDownload}>download</button>
        </>) : []
        }
      </div>
    </>
  )
}

export default App
