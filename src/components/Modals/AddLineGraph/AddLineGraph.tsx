import styles from './AddLineGraph.module.scss'
import Modal from '../../../ui/Modal/Modal'
import { useForm, SubmitHandler } from "react-hook-form";
import Input from '../../../ui/Input/Input';
import ErrorInputMessage from '../../../ui/ErrorInputMessage/ErrorInputMessage';
import { useState } from 'react';
import Button from '../../../ui/Button/Button';
import GraphicInput from '../../../ui/GraphicInput/GraphicInput';
import { useLocation } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase';
import { IFormInputs, IOpenModal } from '../../../interface/interface';

 
  
const AddLineGraph = ({setIsOpen,isOpen}: IOpenModal) => {
    const {pathname} = useLocation()
    const [graphs,setGraphs] = useState([
        {
        id:'1',
        name:''
        }   
    ])
    const [id,setId]=useState(new Date().getTime())
    const [error,setError]=useState(false)
    const { register, formState: { errors }, handleSubmit,reset } = useForm<IFormInputs>();
 
    const onSubmit: SubmitHandler<IFormInputs> =(data)=> {
      let flag=true
      graphs.forEach(item=> {
          if(item.name=='') {
              flag=false
          }
      })
      if(flag) {
        graphs.forEach(async (item,index)=> {
            for (let i=+data.initial; i<=+data.last; i++) {
                await set(ref(db, `${pathname.substring(1)}/graph/` + id+'-'+data.nameGraph+ `/${index+item.name}`+ `/${i}`), {
                    isDones:false,
                    num:i,
                    name: index+item.name
                });
            }
            
        })
        reset()
        setId(new Date().getTime())
        setIsOpen(false)
        setGraphs([{
            id:'1',
            name:''
        }])
      }
      
    }
    
    const addGraph =()=> {
      let id = Math.random().toString()
      let newGraph = {
          id,
          name:''
      }
      setGraphs([...graphs, newGraph])
    }
    const editGraph= (id:string, text:string)=> {
        let newArr = graphs.map(item=> {
            if(id==item.id) {
                return {...item, name:text }
            }
            return item
        })

        setGraphs(newArr)
        console.log(graphs)
    }
    const deleteGraph=(id:string)=> {
        let newArr = graphs.filter(item=> item.id!==id)
        setGraphs(newArr)
    }
  return (
    <Modal setOpen={setIsOpen} open={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input error={errors.nameGraph} name={"nameGraph"} register ={register} placeholder={'н.п: Правая сторона/Фрезерование и т.д.'}  title={'Наименования графика'} parametrs ={{ required: true, maxLength: 20 }}  type={'text'}/>
            {errors.nameGraph && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            <Input   type="number" error={errors.initial} name={"initial"} register ={register} placeholder={'Вводить только цифры н.п:0'}  title={'Начальный ПК'} parametrs ={{ required: true, min: 0}}  />
            {errors.initial && <ErrorInputMessage>Заполните поле</ErrorInputMessage>}
            <Input   type="number" error={errors.last} name={"last"} register ={register} placeholder={'Вводить только цифры н.п:422'}  title={'Конечный ПК'} parametrs ={{ required: true, min: 0}}  />
            {errors.last && <ErrorInputMessage>Заполните  поле</ErrorInputMessage>}
            {graphs.map((graph,index)=> {
              return <GraphicInput key={graph.id} setError={setError}  error={error} graphs={graphs} index={index} id={graph.id} editGraph={editGraph} deleteGraph={deleteGraph} />
            })}
           <Button className={styles.btn} appearance='ghost' type='button' onClick={addGraph}> Добавить График </Button>
           <Button className={styles.btn} appearance='primary' type='submit'>Добавить</Button>
        </form>
    </Modal>
  )
}

export default AddLineGraph