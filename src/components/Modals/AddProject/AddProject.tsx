import React, { useState } from 'react'
import Modal from '../../../ui/Modal/Modal'
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../ui/Button/Button';
import styles from './AddProject.module.scss'
import ErrorInputMessage from '../../../ui/ErrorInputMessage/ErrorInputMessage';
import Input from '../../../ui/Input/Input';
import { useLocation } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase';
import { toast } from 'react-toastify';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { IFormInputs, IOpenModal } from '../../../interface/interface';


const AddProject = ({setIsOpen,isOpen}: IOpenModal) => {
  
    const [id,setId]=useState(new Date().getTime())
    //@ts-ignore
    const cyrillicToTranslit = new CyrillicToTranslit();
    const { register, formState: { errors }, handleSubmit,reset } = useForm<IFormInputs>();
 
    const onSubmit: SubmitHandler<IFormInputs> = async (data)=> {
        let translit = cyrillicToTranslit.transform(data.nameProject.replace(/№/g,''),'_');
        try {
              await set(ref(db, `${id+"-"+translit}`), {
                do: {
                  1111111111111: {
                    id: 1111111111111,
                    constructive: null,
                    projectLeft: null,
                    projectRight: null,
                    doneLeft: null,
                    doneRight: null,
                    todayRight: null,
                    todayLeft: null,
                    yesterdayLeft: null,
                    yesterdayRight: null,
                    project: 0,
                    done: 0,
                    today: 0,
                    yesterday: 0,
                    type: 'oneRoadway',
                  },
                },
                graph: {
                  '1111111111111-Правая сторона': {
                    '0ЩМА00': [
                      {
                        isDones: false,
                        name: '0ЩМА00',
                        num: 0,
                      },
                      {
                        isDones: false,
                        name: '0ЩМА00',
                        num: 1,
                      },
                    ],
                  },
                },
                material: {
                  1111111111111: {
                    id: 1111111111111,
                    done: 0,
                    today: 0,
                    yesterday: 0,
                    project: 0,
                    type: 'unit',
                    unit: 'currentUnit',
                  },
                },
              });
              setId(new Date().getTime())
              toast.success('Объект создан', {autoClose: 1000});
              reset()
        } catch (error:any) {
        toast.error('Что-то пошло не так попробуйте позже', {autoClose: 1000});
       }      
    }
    
  
  
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input error={errors.nameProject} name={"nameProject"} register ={register} placeholder={'н.п.Реконструкция коридора Астана-Караганда'}  title={'Наименования проекта'} parametrs ={{ required: true, maxLength: 80 }}  type={'text'}/>
            {errors.nameProject && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            <Button className={styles.btn} appearance='primary' type='submit'>Добавить</Button>
        </form>
    </Modal>
  )
}

export default AddProject
