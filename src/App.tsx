import { useState, ChangeEvent, FormEvent, MouseEvent, Fragment } from 'react'
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
  }

  const handleGroupSize = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupSize(parseInt(e.target.value));
    setGroups(namesArray.length / groupSize);
  }

  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('downloading...');
    e.preventDefault();
    // add ability to download results into text file
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

    // fix so that there is no one person remaining
    // tempArray = namesArray.splice(0, 1);
    // const final = newArray.splice(-1)
    // const finalGroup = final.concat(tempArray).flat();
    // newArray.push(finalGroup);
    // setNewNamesArray(newArray);
    
    setNamesArray(newNamesArray.flat())
  }

  const handleResults = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let desc = 'GROUPS';
    if (groups <= 1) {
      desc = 'GROUP'
    } 
    setResultTitle(`${groups} ${desc} OF ${groupSize}`);
    randomise();
    group();
  }

  const handleClick = () => {
    setGroups(Math.ceil(namesArray.length / groupSize));
    console.log(namesArray);
    console.log(groups);
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
          <div>
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
          </div>
          <div>
          <button onClick={handleClick} className='mb-14 mt-3'>
            run
          </button>
          </div>
        </form>
      </div>

      <div>
        { newNamesArray.length > 0 ? (
        <>
          <h3 className="text-white font-dosis">{resultTitle}</h3>
          <ul className='results'>{newNamesArray.map((group, index) => {
            return (
              <Fragment key={index}>
                <p className='text-purple-300'>{index + 1}</p>
                <ul>{group.map((name) => {
                  return <li key={name}>{name}</li>
              })}
                </ul>
              </Fragment>
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
