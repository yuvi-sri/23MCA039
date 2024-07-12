import React,{useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const[result,setResult]=useState(null);
  const fetch=async(id)=>{
    try
    {
      const result=await axios.get(`http://localhost:5000/calci/id`);
      setResult(result.data);
    }
    catch(error)
    {
      console.error("error");
    }
  };
  return (
    <div>
    <h1>Average Calculator HTTP Microservice</h1>
    <button onClick={()=>fetch('p')}>Prime Numbers</button>
    <button onClick={()=>fetch('e')}>Even Numbers</button>
    <button onClick={()=>fetch('r')}>Random Numbers</button>
    <button onClick={()=>fetch('f')}>Fibonacci</button>
    {result && (
      <div>
        <h2>Numbers:{result.calci}</h2>
        <h2>Average:{}</h2>
        </div>
    )}


    </div>
   

  );
}

export default App;
