import React, { useEffect, useState } from 'react'
import Modal from '../../../ui/Modal/Modal';
import Button from '../../../ui/Button/Button';
import styles from './AddMaterial.module.scss'
import { useLocation } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase';
import { toast } from 'react-toastify';
import Dropdown from '../../../ui/Dropdown/Dropdown';
import {bitum, cement, materials, rubbles, unit} from '../../../mock'
import { IMaterial, IOpenModal } from '../../../interface/interface';


const AddMaterial = ({setIsOpen,isOpen}: IOpenModal) => {
    const [unitType, setUnitType] =useState(unit[0])
    const {pathname} = useLocation()
    const [materialName, setMaterialName] =useState(materials[0])
    const [materialType, setMaterialType]=useState('')
    const [materialPush, setMaterialPush]= useState<IMaterial>({} as IMaterial)
    const [id,setId]=useState(new Date().getTime())
    useEffect(()=> {
        setMaterialPush({
            id:id,
            done: 0,
            doneOnDay: 0,
            doneOnYear: 0,
            planOnYear: 0,
            project: 0,
            type: materialName+' '+materialType,
            unit: unitType,
        })
        if(materialName == 'Щебень') setMaterialType(rubbles[0])
        if(materialName == 'Цемент') setMaterialType(cement[0])
        if(materialName == 'Битум') setMaterialType(bitum[0])

    },[unitType,materialName,materialType])


    const onSubmit = async ()=> {
        try {
            await set(ref(db, `${pathname.substring(1)}/material/` + id), materialPush);
            setId(new Date().getTime())
            setMaterialPush({} as IMaterial)
            setMaterialType('')
            setMaterialName('')
            setUnitType('')
            toast.success('Материал добавлен', {autoClose: 1000});
            setIsOpen(false)
        } catch (error:any) {
            toast.error('Что-то пошло не так попробуйте позже', {autoClose: 1000});
        }   

    }
   
  
    return (
        <Modal setOpen={setIsOpen} open={isOpen}>
            <div>
                <Dropdown selected={materialName} setSelected={setMaterialName} type={materials}/>
                {materialName=='Щебень' && <Dropdown selected={materialType} setSelected={setMaterialType} type={rubbles}/> }
                {materialName=='Цемент' && <Dropdown selected={materialType} setSelected={setMaterialType} type={cement}/> }
                {materialName=='Битум' && <Dropdown selected={materialType} setSelected={setMaterialType} type={bitum}/> }
                <Dropdown selected={unitType} setSelected={setUnitType} type={unit}/>
                <Button className={styles.btn} appearance='primary' onClick={onSubmit}>Добавить</Button>
            </div>
    
        </Modal>
    )
}

export default AddMaterial