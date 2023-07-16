import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import shuffleLogo from './assets/shuffle.svg'
import './App.css'

const App  = () => {
  const [names, setNames] = useState<string>('')
  const [namesArray, setNamesArray] = useState<string[]>([])
  const [groupSize, setGroupSize] = useState<number>(2)
  const [resultTitle, setResultTitle] = useState<string>('')
  const [groupings, setGroupings] = useState<string[]>([])

  const handleNames = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNamesArray(names.split('\n'));
    setNames(e.target.value);
  }

  const handleGroupSize = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupSize(parseInt(e.target.value));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleResults();
  }

  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('downloading...');
    e.preventDefault();
  }

  const handleResults = () => {
    setResultTitle(`Groups of ${groupSize}`.toUpperCase());
    setGroupings([]);
    randomise();
    setGroupings(namesArray);
    // setNames('');
    // setGroupSize(1);
  }

  const handleReset = () => {
    setGroupings([])
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
              cols={30}
              rows={10}
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
              size={3}
              min={1}
              value={groupSize}
              onChange={handleGroupSize}/>
          </label>
          <button onClick={handleReset}>
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
