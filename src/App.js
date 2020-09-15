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
          changePC(stack[stack_pointer]); 
          let new_sp = stack_pointer - 1; 
          changeStackPointer(new_sp); 
        }
        break; 
      case 1:
        //1NNN
        let new_addr = (args[2] << 8) + (args[1] << 4) + args[0]; 
        changePC(new_addr); 
        break; 
      case 2:
        //2NNN
        //increment stack pointer, put NNN on top of stack, set PC = NNN
        let new_addr = (args[2] << 8) + (args[1] << 4) + args[0];
        let new_sp = stack_pointer + 1; 
        let new_stack = stack.slice(); 
        new_stack[new_sp] = new_addr; 
        changePC(new_addr); 
        changeStackPointer(new_sp); 
        changeStack(new_stack); 
        break;
      case 3:
        //3XKK
        let reg_val = data_registers[args[2]]; 
        let comp_val = (args[1] << 4) + args[0]; 
        if(reg_val == comp_val){
          changePC(pc + 2);   
        }
        break; 
      case 4:
        //4XKK
        let reg_val = data_registers[args[2]]; 
        let comp_val = (args[1] << 4) + args[0]; 
        if(reg_val != comp_val){
          changePC(pc + 2);   
        }
        break; 
      case 5:
        //5XY0
        let reg_one = data_registers[args[2]]; 
        let reg_two = data_registers[args[1]]; 
        if(reg_one == reg_two){
          changePC(pc + 2); 
        }
        break; 
      case 6:
        //6XKK
        let new_reg = data_registers.slice();
        let new_val = (args[1] << 4) + args[0];
        new_reg[args[2]] = new_val;
        changeDataReg(new_reg); 
        break; 
      case 7:
        //7XKK
        let new_reg = data_registers.slice();
        let new_val = (args[1] << 4) + args[0];
        new_reg[args[2]] += new_val;
        changeDataReg(new_reg); 
        break; 
      case 8:
        //8XYN
        let new_reg = data_registers.slice(); 
        if(args[0] === 0){ 
          new_reg[args[2]] = new_reg[args[1]]; 
        }
        else if(args[0] === 1){
          new_reg[args[2]] = new_reg[args[1]] | new_reg[args[2]]; 
        }
        else if(args[0] === 2){
          new_reg[args[2]] = new_reg[args[1]] & new_reg[args[2]]; 
        }
        else if(args[0] === 3){           
          new_reg[args[2]] = new_reg[args[1]] ^ new_reg[args[2]]; 
        }
        else if(args[0] === 4){          
          let result = (new_reg[args[2]] + new_reg[args[1]]) % 256; 
          new_reg[args[0xF]] = (new_reg[args[2]] > 0b11111111 - new_reg[args[1]]) ? 1 : 0;  
          new_reg[args[2]] = result; 
        }
        else if(args[0] === 5){          
          new_reg[0xF] = (new_reg[args[2]] > new_reg[args[1]]) ? 1 : 0; 
          new_reg[args[2]] = (new_reg[args[2]] - new_reg[args[1]]) % 256; 
        }
        else if(args[0] === 6){           
          new_reg[0xF] = (new_reg[args[2]] & 0b1 === 1) ? 1 : 0; 
          new_reg[args[2]] /= 2; 
        }
        else if(args[0] === 7){          
          new_reg[0xF] = (new_reg[args[1]] > new_reg[args[2]]) ? 1 : 0; 
          new_reg[args[2]] = new_reg[args[1]] - new_reg[args[2]]; 
        }
        else if(args[0] === 0xE){
           new_reg[0xF] = ((new_reg[args[2]] >> 7) === 1) ? 1 : 0;
           new_reg[args[2]] *= 2; 
        }
        else{
          console.log("error in opcode 8"); 
        }
        changeDataReg(new_reg); 
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
