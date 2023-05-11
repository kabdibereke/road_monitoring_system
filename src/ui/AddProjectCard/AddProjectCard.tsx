
import { VscAdd } from 'react-icons/vsc'
import styles from './AddProjectCard.module.scss'
import { useState } from 'react'
import AddProject from '../../components/Modals/AddProject/AddProject'


const AddProjectCard = () => {
   const [openModal, setOpenModal] = useState(false);
  
  return (
   <>
    <div className={styles.wrapper} onClick={()=>setOpenModal(true)}>
    <VscAdd className={styles.icon}/>
     <p className={styles.title}>
        Добавить Проект
     </p>
     
    </div>
    <AddProject isOpen={openModal} setIsOpen={setOpenModal}/>
  
   </>
   )
}

export default AddProjectCard