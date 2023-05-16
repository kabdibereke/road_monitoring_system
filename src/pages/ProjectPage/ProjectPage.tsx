import { useState } from 'react'
import Button from '../../ui/Button/Button'
import styles from './ProjectPage.module.scss'
import AddLineGraph from '../../components/Modals/AddLineGraph/AddLineGraph'
import Graphic from '../../components/Graphic/Graphic'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Table from '../../components/Table/Table'
import TableMaterial from '../../components/TableMaterial/TableMaterial'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { useLocation } from 'react-router-dom'
const ProjectPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user] = useAuthState(auth);
  const {pathname} = useLocation()
  const [isEmpty, setIsEmpty]= useState(false)
   //@ts-ignore
   const cyrillicToTranslit = new CyrillicToTranslit();
  return (
    <>
    <div className={styles.wrapper}>
    {pathname!='/' &&  <p className={styles.project_name}>{cyrillicToTranslit.reverse(pathname.substring(15).replace(/_/g, ' '))}</p>}
       {user &&  <Button appearance='primary' onClick={()=>setOpenModal(true)}>
            Добавить Линейный график
        </Button>}
        <AddLineGraph setIsOpen={setOpenModal} isOpen={openModal}/>
        <Graphic />
        <Table  />
        <TableMaterial  />
        <ToastContainer autoClose={500} closeOnClick={false} draggable={false}/>
    </div>
    
    </>
  )
}

export default ProjectPage