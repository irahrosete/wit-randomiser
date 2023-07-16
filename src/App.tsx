import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import shuffleLogo from './assets/shuffle.svg'
import './App.css'

const App  = () => {
  const [names, setNames] = useState<string>('')
  const [namesArray, setNamesArray] = useState<string[]>([])
  const [newNamesArray, setNewNamesArray] = useState<string[][]>([])
  const [groupSize, setGroupSize] = useState<number>(2)
  const [groups, setGroups] = useState<number>(0)
  const [resultTitle, setResultTitle] = useState<string>('')

  const handleNames = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNames(e.target.value);
    setNamesArray(names.split('\n'));
    setGroups(Math.ceil(namesArray.length / groupSize));
  }

  const handleGroupSize = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupSize(parseInt(e.target.value));
  }

  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('downloading...');
    e.preventDefault();
  }

  const randomise = () => {      
    let i = namesArray.length;
    while (--i > 0) {
      const temp = Math.floor(Math.random() * (i + 1));
      [namesArray[temp], namesArray[i]] = [namesArray[i], namesArray[temp]];
    }
  }

  const group = () => {  
    const newArray: string[][] = [];
    let tempArray: string[] = [];
    while (namesArray.length > 0) {
      tempArray = namesArray.splice(0, groupSize);
      newArray.push(tempArray);
      setNewNamesArray(newArray);
    }
    setNamesArray(newNamesArray.flat())
  }

  const handleResults = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultTitle(`${groups} groups of ${groupSize}`.toUpperCase());
    randomise();
    group();
  }

  return (
    <>
      <div>
        <img src={shuffleLogo} className="logo" alt="Shuffle logo" />
        <h1 className='font-dosis'>WiT Randomiser</h1>
      </div>

      <div className="card">
        <form onSubmit={handleResults}>
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
          <button>
            run
          </button>
        </form>
      </div>

      <div>
        { newNamesArray.length > 0 ? (
        <>
          <h3 className="text-white font-dosis">{resultTitle}</h3>
          <ul className='results'>{newNamesArray.map((group, index) => {
            return (
              <>
                <p className='text-purple-300'>{index + 1}</p>
                <ul key={group.join('')}>{group.map((name) => {
                  return <li key={name}>{name}</li>
              })}
                </ul>
              </>
            )
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
