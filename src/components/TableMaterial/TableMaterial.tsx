import { useLocation } from 'react-router-dom'
import styles from './TableMaterial.module.scss'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useRef, useState } from 'react'
import { auth, db } from '../../../firebase'
import { onValue, ref, remove } from 'firebase/database'
import Button from '../../ui/Button/Button'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { VscChromeClose } from 'react-icons/vsc'
import TableInput from '../../ui/TableInput/TableInput'
import AddMaterial from '../Modals/AddMaterial/AddMaterial'
import { IMaterial } from '../../interface/interface'


const TableMaterial = () => {
  const [user, loading, error] = useAuthState(auth);
  const {pathname} = useLocation()
  const tableRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [materials, setMaterials]= useState<IMaterial[]>([])
  useEffect(()=> {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val()
      if (data !== null) {
        setMaterials([])
        setMaterials(Object.values(Object.values(data[pathname.substring(1)]['material'])))
       
      }
  });
  },[pathname])
  
  const deleteMaterial=(id:number)=> {
    remove(ref(db, `${pathname.substring(1)}/material/${id}`));
  }
  return (
    <>
    <div className={styles.btns}>
      <DownloadTableExcel
                      filename="users table"
                      sheet="users"
                      currentTableRef={tableRef.current}
      ><Button appearance='primary'>Скачать Excel</Button></DownloadTableExcel>
      {user &&  <Button appearance='ghost' onClick={()=>setOpenModal(true)}>Добавить материал</Button>}
    </div>
    <div className={styles.wrapper}>
    <table className={styles.table} ref={tableRef}>
        <thead >
            <tr >
                <th>Наименование ДСМ</th>
                <th>Ед.изм	</th>
                <th>По проекту</th>
                <th>Выполнено</th>
                <th>Остаток</th>
                <th>План на текущий год</th>
                <th>Выполнено в текущем году</th>
                <th>Выполнено за день</th>
            </tr>
        </thead>
        <tbody>
            {materials.map((item,index)=> {
              return (
                <tr key={index}>
                  <th  className={styles.th}>{item.type}
                  {user && <VscChromeClose className={styles.icon} onClick={()=>deleteMaterial(item.id)}/>}</th>
                  <td>{item.unit!}</td>
                  <td><TableInput   initialValue={item.project!} value1={`material/${item.id}`}  value2={'project'} /></td>
                  <td><TableInput   initialValue={item.done!} value1={`material/${item.id}`}  value2={'done'} /></td>
                  <td>{item.project!-item.done!}</td>
                  <td>
                  <TableInput   initialValue={item.planOnYear!} value1={`material/${item.id}`}  value2={'planOnYear'} />
                  </td>
                  <td>
                  <TableInput   initialValue={item.doneOnYear!} value1={`material/${item.id}`}  value2={'doneOnYear'} />
                   </td>
                  <td>
                  <TableInput   initialValue={item.doneOnDay!} value1={`material/${item.id}`}  value2={'doneOnDay'} />
                   </td>
                </tr>
              )
            })}
        </tbody>
    </table>
    </div>
    <AddMaterial setIsOpen={setOpenModal} isOpen={openModal}/>
    </>
  )
}

export default TableMaterial