import { useLocation } from 'react-router-dom'
import styles from './Table.module.scss'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useRef, useState } from 'react'
import { auth, db } from '../../../firebase'
import { onValue, ref, remove } from 'firebase/database'
import Button from '../../ui/Button/Button'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import AddConstructive from '../Modals/AddConstructive/AddConstructive'
import { VscChromeClose } from 'react-icons/vsc'
import TableInput from '../../ui/TableInput/TableInput'
import { IConstructive } from '../../interface/interface'
import { motion } from 'framer-motion'



const Table = () => {
  const {pathname} = useLocation()
  const tableRef = useRef(null);
  const [constructive,setConstructive] = useState<IConstructive[]>([])
  const [user, loading, error] = useAuthState(auth);
  const [openModal, setOpenModal] = useState(false);

  useEffect(()=> {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        setConstructive([])
        setConstructive(Object.values(data[pathname.substring(1)]['do']) )
      }
  });
  },[pathname])

  const deleteConstructive=(id:string)=> {
    remove(ref(db, `${pathname.substring(1)}/do/${id}`));
  }
  return (
    <>
    <div className={styles.btns}>
      <DownloadTableExcel
                      filename="users table"
                      sheet="users"
                      currentTableRef={tableRef.current}
      ><Button appearance='primary'>Скачать Excel</Button></DownloadTableExcel>
     {user &&   <Button appearance='ghost' onClick={()=>setOpenModal(true)}>Добавить конструктив</Button>}
    </div>
   <motion.div className={styles.wrapper}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}>
   <table className={styles.table} ref={tableRef}>
        <thead >
            <tr >
                <th>Конструктив</th>
                <th>Cторона	</th>
                <th>По проекту, м</th>
                <th>Выполнено, м</th>
                <th>Остаток, м</th>
                <th>{`Выполнено за ${new Date(new  Date().setDate(new Date().getDate()-1)).toLocaleString().substring(0,10)}, м`}</th>
                <th>{`Выполнено за ${new  Date().toLocaleString().substring(0,10)}, м`}</th>
                
            </tr>
        </thead>
        <tbody>
            {constructive.map((item,index)=> {
              if(index!==0) {
                return (
                  item.type=='twoRoadway'? 
                  <>
                    <tr key={index}>
                      <th className={styles.th}>{item.constructive}
                      {user && <VscChromeClose className={styles.icon} onClick={()=>deleteConstructive(item.id)}/>}
                      </th>
                      <td>Правая</td>
                      <td><TableInput initialValue={item.projectRight!} value1={`do/${item.id}`}  value2={'projectRight'} /></td>
                      <td><TableInput initialValue={item.doneRight!} value1={`do/${item.id}`}  value2={'doneRight'} /></td>
                      <td>{item.projectRight!-item.doneRight!}</td>
                      <td><TableInput initialValue={item.yesterdayRight!} value1={`do/${item.id}`} reset value3={item.todayRight!} value2={'yesterdayRight'} /></td>
                      <td><TableInput initialValue={item.todayRight!} value1={`do/${item.id}`}  value3={'today'}  reset value2={'todayRight'} /></td>
                    
                    </tr>
                    <tr key={index}>
                      <th></th>
                      <td>Левая</td>
                      <td><TableInput   initialValue={item.projectLeft!} value1={`do/${item.id}`}  value2={'projectLeft'} /></td>
                      <td><TableInput   initialValue={item.doneLeft!} value1={`do/${item.id}`}  value2={'doneLeft'} /></td>
                      <td>{item.projectLeft!-item.doneLeft!}</td>
                      <td><TableInput initialValue={item.yesterdayLeft!} value1={`do/${item.id}`} reset value3={item.todayLeft!} value2={'yesterdayLeft'} /></td>
                      <td><TableInput initialValue={item.todayLeft!} value1={`do/${item.id}`}  value3={'today'}  reset value2={'todayLeft'} /></td>
                    </tr>
                  </>: 
                    <tr key={index}>
                      <th  className={styles.th}>{item.constructive}
                      {user && <VscChromeClose className={styles.icon} onClick={()=>deleteConstructive(item.id)}/>}</th>
                      <td>Вся ширина</td>
                      <td><TableInput   initialValue={item.project!} value1={`do/${item.id}`}  value2={'project'} /></td>
                      <td><TableInput   initialValue={item.done!} value1={`do/${item.id}`}  value2={'done'} /></td>
                      <td>{item.project!-item.done!}</td>
                      <td><TableInput initialValue={item.yesterday!} value1={`do/${item.id}`} reset value3={item.today!} value2={'yesterday'} /></td>
                      <td><TableInput initialValue={item.today!} value1={`do/${item.id}`}  value3={'today'}  reset value2={'today'} /></td>
                    </tr>
              )
            })}
              }
        </tbody>
    </table>
   </motion.div>
    <AddConstructive setIsOpen={setOpenModal} isOpen={openModal}/>
    </>
  )
}

export default Table
