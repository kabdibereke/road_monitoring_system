import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../../ui/Modal/Modal'
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../ui/Button/Button';
import styles from './SignUp.module.scss'
import ErrorInputMessage from '../../../ui/ErrorInputMessage/ErrorInputMessage';
import Input from '../../../ui/Input/Input';
import emailjs from "@emailjs/browser";
import { IFormInputs, IOpenModal } from '../../../interface/interface';
import { toast } from 'react-toastify';


const SignUp = ({setIsOpen,isOpen}: IOpenModal) => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm<IFormInputs>();
    const onSubmit: SubmitHandler<IFormInputs> = async (data)=> {
      emailjs
        .send(
          "service_n336yno",
          "template_xyxhlpg",
          //@ts-ignore
          data,
          "WDejzSAbLUCwQnBoy",
        )
        .then(
          (result) => {
            if(result.status==200) {
              toast.success('Заявка успешно отправлена', {autoClose: 1000});
              reset()
            }
          },
          (error) => {
            toast.error('Что-то пошло не так попробуйте позже', {autoClose: 1000});
          },
        );

    }
    
  
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
        <>
        <p className={styles.text}>Ваша заявка будет рассмотрена в течение 24 часов. В случае одобрения на электронную почту будет отправлена дополнительная информация</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input error={errors.email}  name={"email"} register ={register} placeholder={'Введите свой настощий email'}  title={'Email'} parametrs ={{ required: "Заполните  поле", pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Некорректный Email"
            } }}  type={'text'}/>
            {errors.email && <ErrorInputMessage>{errors.email.message}</ErrorInputMessage>}
            <Input error={errors.firstName}   name={"firstName"} register ={register} placeholder={'Джон'}  title={'Имя'} parametrs ={{ required: true, maxLength: 80 }}  type={'text'}/>
            {errors.firstName && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            <Input error={errors.lastName}   name={"lastName"} register ={register} placeholder={'Дойл'}  title={'Фамилия'} parametrs ={{ required: true, maxLength: 80 }}  type={'text'}/>
            {errors.lastName && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            <Input error={errors.major}   name={"major"} register ={register} placeholder={'Начальник участка'}  title={'Должность'} parametrs ={{ required: true, maxLength: 80 }}  type={'text'}/>
            {errors.major && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            <Input error={errors.companyName}   name={"companyName"} register ={register} placeholder={'ТОО "СП КазГерСтрой'}  title={'Организация'} parametrs ={{ required: true, maxLength: 80 }}  type={'text'}/>
            {errors.companyName && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            
            <Button className={styles.btn} appearance='primary' type='submit'>Отправить</Button>
        </form>
        </>
    </Modal>
  )
}

export default SignUp