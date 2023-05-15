import React, { useEffect, useState } from 'react'
import Modal from '../../../ui/Modal/Modal'
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../ui/Button/Button';
import styles from './SignIn.module.scss'
import ErrorInputMessage from '../../../ui/ErrorInputMessage/ErrorInputMessage';
import Input from '../../../ui/Input/Input';
import { auth } from '../../../../firebase';

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { IFormInputs, IOpenModal } from '../../../interface/interface';


const SignIn = ({setIsOpen,isOpen}: IOpenModal) => {
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);
  
    const { register, formState: { errors }, handleSubmit,reset } = useForm<IFormInputs>();
 
    const onSubmit: SubmitHandler<IFormInputs> = async (data)=> {
        await signInWithEmailAndPassword(data.email, data.password)
       
    }
    
    useEffect(()=> {
        if(user) {
          reset()
          setIsOpen(false)
        }
      },[user])
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
       
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && <ErrorInputMessage >{error.message.substring(10)}</ErrorInputMessage>}
            <p>test@test.com</p>
            <p>qwerty</p>
            <Input error={errors.email}  name={"email"} register ={register} placeholder={'test@test.com'}  title={'Email'} parametrs ={{ required: "Заполните  поле", pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Некорректный Email"
            } }}  type={'text'}/>
            {errors.email && <ErrorInputMessage>{errors.email.message}</ErrorInputMessage>}
            <Input error={errors.password}    name={"password"} register ={register} placeholder={'qwerty'}  title={'Пароль'} parametrs ={{ required: true, maxLength: 80 }}  type={'text'}/>
            {errors.password && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            <Button className={styles.btn} appearance='primary' type='submit'>Войти</Button>
        </form>
    </Modal>
  )
}

export default SignIn