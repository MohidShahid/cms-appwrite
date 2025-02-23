import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function PassGenerator() {
  const [inputType, setInputType] = useState("text");
  const [passValue , setPassValue] = useState('');
  const [isVisibility, setIsVisibility] = useState(true);
  const [range, setRange] = useState(8);
  const inputGenerator = useRef();
  const [Number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
   
  const GereratePassword = ()=>{
    let passChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(Number) passChar += '1234567890'
    if(character) passChar += '*&^%$#@!?:"<>'
    let val = '';
    for(let i =0; i<=range; i++){
      const random = Math.floor(Math.random()*passChar.length)
      val += passChar[random]
    }
    setPassValue(val);
  }

  useEffect(()=>{
    GereratePassword()
  },[range, Number, character])


  const handleCopy = () => {
    window.navigator.clipboard.writeText(passValue)
    inputGenerator.current?.select()
  };
  const showHideToggle = () => {
    setIsVisibility(!isVisibility);
    if (isVisibility) setInputType((inputGenerator.current.type = "password"));
    else setInputType((inputGenerator.current.type = "text"));
    console.log("component rendered....");
  };
  return (
    <div className="section w-screen flex items-center justify-center">
      <div className="box flex items-center justify-center  bg-emerald-900 w-72 flex-col h-96 gap-2.5">
        <h2 className="text-white heading">Password Generator</h2>
        <div className="passInput relative w-full flex items-center justify-center">
          <input
            type={inputType}
            id="pass"
            name="password"
            ref={inputGenerator}
            className="w-10/12 p-2"
            value={passValue}
            readOnly
          />
          <span className="absolute eye" onClick={showHideToggle}>
            {isVisibility ? <FaEye /> : <FaEyeSlash />}
          </span>{" "}
        </div>
        <input
          type="range"
          defaultValue={range}
          min={2}
          max={20}
          step={2}
          className="w-10/12"
          onChange={(e) => setRange(e.target.value)}
        />
        <div className="number flex flex-row items-center justify-around w-full">
          <span className="text-white">Number</span>
          <input
            type="checkbox"
            id="switch"
            defaultChecked={Number}
            onChange={() => setNumber(!Number)}
          />
          <label htmlFor="switch">Toggle</label>
        </div>{" "}
        <div className="number flex flex-row items-center justify-around w-full">
          <span className="text-white">Character</span>
          <input
            type="checkbox"
            id="switch2"
            defaultChecked={character}
            onChange={() => setCharacter(!character)}
          />
          <label htmlFor="switch2">Toggle</label>
        </div>
        <button className="p-3 text-white border-2" onClick={handleCopy}>
          Copy me
        </button>
      </div>
    </div>
  );
}

export default PassGenerator;
