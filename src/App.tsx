import { useState, ChangeEvent, FormEvent, Fragment } from 'react'
import shuffleLogo from './assets/shuffle.svg'
import './App.css'

const App  = () => {
  const [names, setNames] = useState<string>('')
  const [groupSize, setGroupSize] = useState<number>(2)

  const [resultTitle, setResultTitle] = useState<string>('')
  const [newNamesArray, setNewNamesArray] = useState<string[][]>([])

  const handleNames = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNames(e.target.value);
  }

  const handleGroupSize = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupSize(parseInt(e.target.value));
  }

  // const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
  //   console.log('downloading...');
  //   e.preventDefault();
    // add ability to download results into text file
  // }

  const handleReset = () => {
    setNames('');
    setNewNamesArray([]);
    setGroupSize(2);
  }

  const handleResults = (e: FormEvent<HTMLFormElement>) => {    
    e.preventDefault();    
    const namesArray = names.split('\n');
    const groups = Math.floor(namesArray.length / groupSize);

    let desc = 'GROUPS';
    if (groups <= 1) {
      desc = 'GROUP'
    }    
    
    names == '' ? setResultTitle('') : setResultTitle(`${groups} ${desc}`);
    
    // randomise();
    // group();

// randomise
    let i = namesArray.length;
    while (--i > 0) {
      const temp = Math.floor(Math.random() * (i + 1));
      [namesArray[temp], namesArray[i]] = [namesArray[i], namesArray[temp]];
    }

// group
    const newArray: string[][] = [];
    let tempArray: string[] = [];
    const remainder: number = namesArray.length % groupSize
    console.log(remainder);
    

    while (namesArray.length > 0) {
      remainder == 1 ? 
        tempArray = namesArray.splice(0, groupSize + 1) : 
        tempArray = namesArray.splice(0, groupSize);

      newArray.push(tempArray);     
      setNewNamesArray(newArray);
    }  
  }

  return (
    <div className='mt-6 mb-16'>
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
          <button className='mt-3'>
            run
          </button>
          </div>
        </form>
      </div>

      <div>
        { newNamesArray.length > 0 && newNamesArray[0][0] != '' ? (
        <>
          <h3 className="text-white font-dosis">{resultTitle}</h3>
          <ul className='results'>
            {newNamesArray.map((group, index) => {
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
          <div>
            <button onClick={handleReset} className='mb-14 mt-3'>
              reset
            </button>
          </div>
          {/* <button autoFocus onClick={handleDownload} className='mb-14 mt-3'>
            download
          </button> */}
        </>) : ''
        }
      </div>
    </div>
  )
}

export default App
