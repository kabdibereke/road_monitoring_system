import { redirect, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button/Button'
import styles from './ProjectCard.module.scss'
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { BsTrash3 } from "react-icons/bs";
import ConfirmDelete from '../Modals/ConfirmDelete/ConfirmDelete';
import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { toast } from 'react-toastify';
import { auth, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const ProjectCard = ({site}: {site: string}) => {
   //@ts-ignore
  const cyrillicToTranslit = new CyrillicToTranslit();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const deleteSite = async (site:string)=> {
    await remove(ref(db, `${site}`))
    toast.success('Удалено', {
        autoClose:1000
    })  
  }
  return (
    <div className={styles.wrapper}>
        <p className={styles.title}>
        {site.length>2?  cyrillicToTranslit.reverse(site.substring(14).replace(/_/g, ' ')): cyrillicToTranslit.reverse(site)}
        </p>
       <div className={styles.btns}>
        <Button onClick={()=>navigate(`/${site}`)} appearance='ghost' arrow='right'>Перейти</Button>
        {user && <Button onClick={()=>setOpenModal(true)} appearance='ghost' > <BsTrash3/> </Button>}
       </div>
       <ConfirmDelete setIsOpen={setOpenModal} text={'Вы действительно хотите удалить данный участок'} isOpen={openModal} deleteGraphic={()=>deleteSite(site)}/>
    </div>
  )
}

export default ProjectCard