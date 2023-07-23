import { useState, ChangeEvent, FormEvent, Fragment } from 'react'
import shuffleLogo from './assets/shuffle.svg'
import './App.css'
import { randomise, } from './util/randomise'
import { group } from './util/group'

const App  = () => {
  const [names, setNames] = useState<string>('')
  const [groupSize, setGroupSize] = useState<number>(2)

  const [resultTitle, setResultTitle] = useState<string>('')
  const [groupedNamesArray, setGroupedNamesArray] = useState<string[][]>([])

  const handleNames = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNames(e.target.value);
  }

  const handleGroupSize = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupSize(parseInt(e.target.value));
  }

  const handleReset = () => {
    setNames('');
    setGroupedNamesArray([]);
    setGroupSize(2);
  }

  const handleResults = (e: FormEvent<HTMLFormElement>) => {    
    e.preventDefault();    
    const namesArray = names.split('\n');
    const groups = namesArray.length / groupSize
    const remainder = namesArray.length % groupSize
    const groupNum = remainder == 1 ? Math.floor(groups) : Math.ceil(groups) 
    const numOfNames = namesArray.length
    
    let desc = 'GROUPS';
    if (groupNum <= 1) {
      desc = 'GROUP'
    }
    
    groupSize > numOfNames ? setGroupSize(numOfNames) : setGroupSize(groupSize)
    names == '' ? setResultTitle('') : setResultTitle(`${groupNum} ${desc}`);
    randomise(namesArray)
    setGroupedNamesArray(group(namesArray, groupSize));
  }

  return (
    <div className='mt-6 mb-16 font-dosis'>
      <div>
        <img src={shuffleLogo} className="logo" alt="Shuffle logo" />
        <h1>WiT Randomiser</h1>
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
                min={2}
                value={groupSize}
                onChange={handleGroupSize}/>
            </label>
          </div>
          <div>
          <button className='mt-3'>
            run
          </button>
          </div>
        </form>
      </div>

      <div>
        { groupedNamesArray.length > 0 && groupedNamesArray[0][0] != '' ? (
        <>
          <h3 className="text-white">{resultTitle}</h3>
          <ul className='results'>
            {groupedNamesArray.map((group, index) => {
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
          </ul >
          <div>
            <button onClick={handleReset} className='mt-3'>
              reset
            </button>
          </div>
        </>) : ''
        }
      </div>
    </div>
  )
}

export default App
