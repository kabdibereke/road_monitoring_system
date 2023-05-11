import React, { useState } from 'react'
import Modal from '../../../ui/Modal/Modal'
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../ui/Button/Button';
import styles from './AddConstructive.module.scss'
import ErrorInputMessage from '../../../ui/ErrorInputMessage/ErrorInputMessage';
import Input from '../../../ui/Input/Input';
import { useLocation } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase';
import { toast } from 'react-toastify';
import Dropdown from '../../../ui/Dropdown/Dropdown';
import { IFormInputs, IOpenModal } from '../../../interface/interface';

const type = ['Вся ширина' , 'Правая/Левая']
  
const AddConstructive = ({setIsOpen,isOpen}: IOpenModal) => {
    const {pathname} = useLocation()
    const [id,setId]=useState(new Date().getTime())
    const [selected, setSelected] = useState(type[0])
    const { register, formState: { errors }, handleSubmit,reset } = useForm<IFormInputs>();
 
    const onSubmit: SubmitHandler<IFormInputs> = async (data)=> {
        try {
            if(selected==type[0]) {
                await set(ref(db, `${pathname.substring(1)}/do/` + id), {
                    id: id.toString(),
                    constructive: data.constructiveName,
                    projectLeft: null,
                    projectRight: null,
                    doneLeft: null,
                    doneRight: null,
                    restRight: null,
                    restLeft: null,
                    frontLeft: null,
                    frontRight: null,
                    project:0,
                    done:  0,
                    rest: 0,
                    front:0 ,
                    type:'oneRoadway'
                })
            }
            if(selected==type[1]) {
                await set(ref(db, `${pathname.substring(1)}/do/` + id), {
                    id: id.toString(),
                    constructive: data.constructiveName,
                    projectLeft: 0,
                    projectRight: 0,
                    doneLeft: 0,
                    doneRight: 0,
                    restRight: 0,
                    restLeft: 0,
                    frontLeft: 0,
                    frontRight: 0,
                    project: null,
                    done:  null,
                    rest: null,
                    front: null,
                    type:'twoRoadway'
                })
            }
              
              setId(new Date().getTime())
              toast.success('Конструктив создан', {autoClose: 1000});
              
              reset()
              setIsOpen(false)
        } catch (error:any) {
        toast.error('Что-то пошло не так попробуйте позже', {autoClose: 1000});
       }      
    }
    
  
  
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input error={errors.constructiveName} name={"constructiveName"} register ={register} placeholder={'н.п.C4'}  title={'Наименования работы'} parametrs ={{ required: true, maxLength: 80 }}  type={'text'}/>
            {errors.constructiveName && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            <Dropdown selected={selected} setSelected={setSelected} type={type}/>
            <Button className={styles.btn} appearance='primary' type='submit'>Добавить</Button>
        </form>
    </Modal>
  )
}

export default AddConstructive