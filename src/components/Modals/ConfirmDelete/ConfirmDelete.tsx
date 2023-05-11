import React from 'react'
import Modal from '../../../ui/Modal/Modal'
import Button from '../../../ui/Button/Button';
import styles from './ConfirmDelete.module.scss'
import { IOpenModal } from '../../../interface/interface';
interface IDeleteModal extends IOpenModal {
    deleteGraphic: () => void;

}

const ConfirmDelete = ({setIsOpen,isOpen,deleteGraphic}: IDeleteModal) => {

    const handleDelete =()=> {
        deleteGraphic()  
        setIsOpen(false)
    }
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
        <>
            <p className={styles.title}>Вы дейтивительно хотите удалить данный график</p>
            <Button className={styles.btn} onClick={handleDelete} appearance="primary">Удалить</Button>
            <Button className={styles.btn} onClick={()=>setIsOpen(false)} appearance="ghost">Отмена</Button>
        </>
    </Modal>
  )
}

export default ConfirmDelete