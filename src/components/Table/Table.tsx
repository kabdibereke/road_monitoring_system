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
   <div className={styles.wrapper}>
   <table className={styles.table} ref={tableRef}>
        <thead >
            <tr >
                <th>Конструктив</th>
                <th>Cторона	</th>
                <th>По проекту</th>
                <th>Выполнено</th>
                <th>Остаток</th>
                <th>Выполнено за день</th>
            </tr>
        </thead>
        <tbody>
            {constructive.map((item,index)=> {
              return (
                  item.type=='twoRoadway'? 
                  <>
                    <tr key={index}>
                      <th className={styles.th}>{item.constructive}
                      {user && <VscChromeClose className={styles.icon} onClick={()=>deleteConstructive(item.id)}/>}
                      </th>
                      <td>Правая</td>
                      <td><TableInput   initialValue={item.projectRight!} value1={`do/${item.id}`}  value2={'projectRight'} /></td>
                      <td><TableInput   initialValue={item.doneRight!} value1={`do/${item.id}`}  value2={'doneRight'} /></td>
                      <td>{item.projectRight!-item.doneRight!}</td>
                      <td>{item.restRight}</td>
                    </tr>
                    <tr key={index}>
                      <th></th>
                      <td>Левая</td>
                      <td><TableInput   initialValue={item.projectLeft!} value1={`do/${item.id}`}  value2={'projectLeft'} /></td>
                      <td><TableInput   initialValue={item.doneLeft!} value1={`do/${item.id}`}  value2={'doneLeft'} /></td>
                      <td>{item.projectLeft!-item.doneLeft!}</td>
                      <td>{item.restLeft}</td>
                    </tr>
                  </>: 
                    <tr key={index}>
                      <th  className={styles.th}>{item.constructive}
                      {user && <VscChromeClose className={styles.icon} onClick={()=>deleteConstructive(item.id)}/>}</th>
                      <td>Вся ширина</td>
                      <td><TableInput   initialValue={item.project!} value1={`do/${item.id}`}  value2={'project'} /></td>
                      <td><TableInput   initialValue={item.done!} value1={`do/${item.id}`}  value2={'done'} /></td>
                      <td>{item.project!-item.done!}</td>
                      <td>{item.rest}</td>
                    </tr>
              )
            })}
        </tbody>
    </table>
   </div>
    <AddConstructive setIsOpen={setOpenModal} isOpen={openModal}/>
    </>
  )
}

export default Table