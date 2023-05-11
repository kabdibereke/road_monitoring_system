import React, { useEffect, useState } from 'react'
import styles from './TableInput.module.scss'
import { ref, update } from 'firebase/database'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { auth } from '../../../firebase';
import { VscCheck,VscChromeClose } from "react-icons/vsc";
interface Props {
  
    initialValue:number
    value1:string,
    value2: string
}

const TableInput = ({initialValue, value1, value2, ...props}:Props ) => {
    const [isActive, setIsActive]= useState(false)
    const [text, setText] = useState('')
    const [user, loading, error] = useAuthState(auth);
    const {pathname} = useLocation()
   
    useEffect(()=>{
        if(initialValue) {
            setText(initialValue.toString())
        }
    },[initialValue])
   
    const editText=()=> {
        if(user) {
            update(ref(db, `${pathname.substring(1)}/${value1}`), {
                [value2]: +text
            });
          setIsActive(false)
          toast.success("Сохранено")
        }
    }
    
    const handleInput=(event:any )=> {
        if(event.detail === 2) {
            if(user) {
                setIsActive(true)
                toast.warn("Вводить только числа и точку",
                {
                    autoClose: 2000,
                })
            }else {
                toast.error('Для редактирования необходимо авторизоваться', {
             
                  autoClose: 1000,
                  
                  });
            }
        }
    }

    function handleNumberKeyDown(event:React.KeyboardEvent<HTMLInputElement>) {
        const keyCode = event.keyCode || event.which;
        if(keyCode===13) {
            editText()
            return 
        }
        if (event.key=='.' ||  keyCode === 8 || (keyCode >= 48 && keyCode <= 57)|| (keyCode >= 96 && keyCode <= 105)) {
          return true
        } else {
          event.preventDefault();
          toast.warn("Вводить только числа и точку",
          {
             autoClose: 1000,
         })
        }
        
    }

  return (
   <>
   
   {isActive ? <div className={styles.input_wrapper}>
   <input type='text' value={text}   onChange={(e)=> setText(e.target.value)}  onKeyDown={handleNumberKeyDown}
    />
    <VscCheck className={styles.input_close} onClick={editText}/>
    <VscChromeClose className={styles.input_close} onClick={()=>setIsActive(false)}/>
   </div>:<div className={styles.text} onClick={handleInput}>{initialValue}</div> }
   
   </>
  )
}

export default TableInput