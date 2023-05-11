import React, { useEffect, useState } from 'react'
import styles from './GraphicInput.module.scss'
import { VscChromeClose } from 'react-icons/vsc'
import ErrorInputMessage from '../ErrorInputMessage/ErrorInputMessage';
interface GraphicInputProps {
  deleteGraph: (id: string) => void; 
  editGraph: (id: string, text: string) => void;
  id:string,
  index:number,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  error:boolean,
  graphs: {
    id: string;
      name: string;
  }[]
}

const GraphicInput = ({deleteGraph,editGraph,setError,error,id,graphs,index}: GraphicInputProps) => {
  const [inputValue, setInputValue]= useState( '')
  const [errorLocal,setErrorLocal]= useState(false)
  const changeInputValue =(e: React.ChangeEvent<HTMLInputElement>)=> {
    setErrorLocal(false)
    setInputValue(e.target.value)
    editGraph(id,e.target.value)
  }
  useEffect(()=> {
    if(!inputValue) {
      setErrorLocal(true)
    }
    setError(errorLocal)
  },[errorLocal,inputValue])
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{`График ${index+1}`}</p>
      <div className={styles.input_wrapper}>
        <input type="text" value={inputValue} onChange={changeInputValue} className={!errorLocal? styles.input: styles.input_error} placeholder='н.п: доп.слой основание С4'/>
        {graphs.length>1 && <VscChromeClose className={styles.delete_icon}  onClick={()=>deleteGraph(id)}/>}
      </div>
      {errorLocal &&  <ErrorInputMessage>Заполните поле</ErrorInputMessage>}
    </div>
  )
}

export default GraphicInput