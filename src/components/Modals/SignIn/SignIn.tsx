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
    const [checkError,setCheckError]= useState(false)
    const [
        signInWithEmailAndPassword,
        user,
        error
      ] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit,reset } = useForm<IFormInputs>();
 
    const onSubmit: SubmitHandler<IFormInputs> = async (data)=> {
        await signInWithEmailAndPassword(data.email, data.password)
       
    }
    
    useEffect(()=> {
        if(error) {
            setCheckError(error)
            setTimeout(()=> {
                setCheckError(false)
            },3000)
        }
    },[error])
    useEffect(()=> {
        if(user) {
          reset()
          setIsOpen(false)
        }
      },[user])
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
       
        <form onSubmit={handleSubmit(onSubmit)}>
            {checkError && <ErrorInputMessage >Неправильный логин и/или пароль</ErrorInputMessage>}
            <Input error={errors.email}  name={"email"} register ={register} placeholder={'test@test.com'}  title={'Email'} parametrs ={{ required: "Заполните  поле", pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Некорректный Email"
            } }}  type={'text'}/>
            {errors.email && <ErrorInputMessage>{errors.email.message}</ErrorInputMessage>}
            <Input error={errors.password}   name={"password"} register ={register} placeholder={'password'}  title={'Пароль'} parametrs ={{ required: true, maxLength: 80 }}  type={'text'}/>
            {errors.password && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            <Button className={styles.btn} appearance='primary' type='submit'>Войти</Button>
        </form>
    </Modal>
  )
}

export default SignIn