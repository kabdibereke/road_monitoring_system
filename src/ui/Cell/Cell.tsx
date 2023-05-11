import { useState } from "react"
import styles from './Cell.module.scss'
import { update,ref } from "firebase/database"
import { auth, db } from "../../../firebase"
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { useAuthState } from 'react-firebase-hooks/auth';
interface CellProps {
  num:number
  isDone:boolean
 
  main: string
  names:string
}
const Cell = ({num,main,names,isDone}: CellProps) => {
  const {pathname} = useLocation()
    const [isDoneLocal,setIsDoneLocal]= useState(isDone)
    const [user, loading, error] = useAuthState(auth);
    let editDone =()=> {
      update(ref(db, `${pathname.substring(1)}/graph/${main}/${names}/` + num ), {
        isDones: !isDone
      });
      
    }

    const handleClick=()=> {
     if(user) {
      setIsDoneLocal(!isDoneLocal)
      editDone()
     }else {
        toast.error('Для редактирования необходимо авторизоваться', {
          autoClose: 1000,
        });
     }
    }
  return (
   <>
      <div className={isDone? styles.cell_done: styles.cell} onClick={handleClick}>
          
          </div>
         
    </>
  )
}

export default Cell