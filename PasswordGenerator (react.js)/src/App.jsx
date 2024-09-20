import { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import './App.css'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordref=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) {
      str = str + "0123456789"
    }
    if (charAllowed) {
      str = str + "!@#$%^&*:'\}?><,.~`"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass =pass + str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed,setPassword])

  const copyPasswordClipboard = useCallback(()=>{
    passwordref.current.select();
    passwordref.current?.setSelectionRange(0,3 )
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <h1 style={{ marginLeft: "540px", fontSize: "30px" }}>password   Generator</h1>
      <div className='w-full bg-black  max-w-md mx-auto shadow-md rounded-lg my-8 text-orange-500 px-4'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordref} /> <button className='outline-none shrink-0 rounded' onClick={copyPasswordClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={100} value={length} onChange={(e)=>setlength(e.target.value)} className='cursor-pointer' />
            <label htmlFor="" >length:{length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }} />
            <label htmlFor="numberinput" >Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }} />
            <label htmlFor="numberinput" >Numbers</label>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
