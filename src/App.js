import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

//Chip8 Emulator entirely using hooks 

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
    //instructions are 2 bytes 
    //each byte is 8 bits 
    //each hex digit is 4 bits 
    //extract args
    let first = instruction & 15;
    instruction = instruction >> 4; 
    let second = instruction & 15;
    instruction = instruction >> 4; 
    let third = instruction & 15; 
    let args_list = [first, second, third]; 
    //extract opcode
    instruction = instruction >> 4; 
    let op = instruction; 
    return {
      opcode: op, 
      args: args_list, 
    }; 
  }

  function OneCycle(){
    //fetch the next instruction 
    let next_inst = memory[pc];

    //decode instruction 
    let {opcode, args} = decode(next_inst); 

    //execute instruction 
    switch(opcode){
      case 0:
        //clear display
        if(args[0] === 0){

        }
        //set PC to top of stack and decrement stack pointer
        else{

        }
        break; 
      case 1:
        //1NNN
        //set PC to NNN
        break; 
      case 2:
        //2NNN
        //increment stack pointer, put NNN on top of stack, set PC = NNN
        break;
      case 3:
        //3XKK
        break; 
      case 4:
        //4XKK
        break; 
      case 5:
        //5XY0
        break; 
      case 6:
        //6XKK
        break; 
      case 7:
        //7XKK
        break; 
      case 8:
        //8XYN
        if(args[0] === 0){

        }
        else if(args[0] === 1){

        }
        else if(args[0] === 2){

        }
        else if(args[0] === 3){
          
        }
        else if(args[0] === 4){
          
        }
        else if(args[0] === 5){
          
        }
        else if(args[0] === 6){
          
        }
        else if(args[0] === 7){
          
        }
        else if(args[0] === 0xE){

        }
        else{
          console.log("error in opcode 8"); 
        }
        break;
      case 9:
        //9XY0
        break; 
      case 10:
        //ANNN
        break; 
      case 11:
        //BNNN
        break; 
      case 12:
        //CXKK
        break; 
      case 13:
        //DXYN
        break; 
      case 14:
        //EXNN
        break; 
      case 15:
        //FXNN
        break; 
    }

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
