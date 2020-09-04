import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';


function Chippy(){
  [memory, changeMemory] = useState(Uint8Array(4096).fill(0)); 
  [data_registers, changeDataReg] = useState(Uint8Array(16).fill(0)); 
  [address_resgiter, changeAddrReg] = useState(0); 
  [stack, changeStack] = useState(Uint16Array(16).fill(0)); 
  [stack_pointer, changeStackPointer] = useState(-1); 
  [pc, changePC] = useState(0x200); 
  [dt, changeDT] = useState(0); 
  [st, changeST] = useState(0); 

  function decode(instruction){

  }

  function OneCycle(){
    //fetch the next instruction 
    let next_inst = memory[pc];

    //decode instruction 
    let {opcode, args} = decode(next_inst); 

    //execute instruction 
    

  }

}















function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
