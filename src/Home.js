import { useEffect, useRef, useState } from "react";


const Home = () => {
   const emptyArr=['','','',''];
   const refs=[useRef(),useRef(),useRef(),useRef()];
       const [inputs,setInputs]=useState(emptyArr);
       const [missing,setMissing]=useState(emptyArr);
       let CODE='1234'
   useEffect(()=>{
   refs[0].current.focus();
   },[])
   const handleInputChange=(e,index)=>{
   let val=e.target.value;
   if(!Number(val))
      return;
    if(index<inputs.length-1)
      {
        refs[index+1].current.focus();
      }
    let copyInputs=[...inputs];
        copyInputs[index]=val;
        setInputs(copyInputs);
   }
  const handleOnKeyDown=(e,index)=>{
    if(e.keyCode===8)
      {
        let copyinput=[...inputs];
        copyinput[index]='';
        setInputs(copyinput);
        if(index>0)
          {
            refs[index-1].current.focus();
          }

      }
  }
  const handlePaste=(e)=>
    {
      let data=e.clipboardData.getData("text");
      console.log(data);
      if(!Number(data)||data.length!==inputs.length)
        return;
      const pestCode=data.split('');
      setInputs(pestCode);
      refs[inputs.length-1].current.focus();
    }
    const handleSubmit=()=>{
     let missed=inputs.map((item,i)=>{
      if(item==='')
        {
          return i;
        }
     }).filter((item)=>item||item===0)
     console.log(missed);
     setMissing(missed);
     if(missed.length)
      return;
     let userInput=inputs.join('');
     let isMatch=userInput===CODE;
     let msg=isMatch?'opt is Metch':'otp is not match';
     alert(msg)
    }
  return(
         <>
  <div className="container">
    <h1>Two Factor Code Input</h1>

    <div className="input-element">
      {
        emptyArr.map((item,i)=>{
          return(
            <>
            <input
            value={inputs[i]}
            ref={refs[i]}
            onChange={(e)=>{handleInputChange(e,i)}}
            onKeyDown={(e)=>{handleOnKeyDown(e,i)}}
            onPaste={handlePaste}
            type="text" 
            maxLength='1'
            className={missing.includes(i)?'error':''}
            />
            </>
          )
        })
      }
    </div>
    <button onClick={handleSubmit}>Submit</button>
  </div>
      
       </>

  )
}

export default Home;