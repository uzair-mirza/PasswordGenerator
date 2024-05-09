import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length , setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")
  // useRef hook
  const passwordRef = useRef(null) 
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "`!@#$%^&*(){}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length,numberAllowed,charAllowed,setPassword])
  // copy to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  }, [password])
  // to generate password
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 p-4 text-orange-500 bg-gray-700'>
        <h1 className='text-center text-white mb-2' style={{fontSize:"26px"}}>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
            <div className='flex text-center gap-x-1'>
                <input 
                type="range"
                min={6}
                max={50}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
                />
                <label>Length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() =>{
                  setNumberAllowed((prev) => !prev); //reverse the previous value
                }}
                />
                <label htmlFor="numberInput">Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() =>{
                  setCharAllowed((prev) => !prev); //reverse the previous value
                }}
                />
                <label htmlFor="characterInput">Character</label>
            </div>
        </div>
      </div>  
    </>
  )
}

export default App
