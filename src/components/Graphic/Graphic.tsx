import React, { useEffect, useState } from 'react'
import styles from './Graphic.module.scss'
import Cell from '../../ui/Cell/Cell'
import { onValue, ref, remove } from 'firebase/database'
import {auth, db} from '../../../firebase'
import { useLocation } from 'react-router-dom'
import { VscChromeClose } from 'react-icons/vsc'
import ConfirmDelete from '../Modals/ConfirmDelete/ConfirmDelete'
import { IGraphic } from '../../interface/interface'
import { useAuthState } from 'react-firebase-hooks/auth'
import { motion } from 'framer-motion'


const Graphic = () => {
    const [graphic, setGraphic]= useState<IGraphic>({})
    const [openModal, setOpenModal] = useState(false);
    const {pathname} = useLocation()
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
		try {
            onValue(ref(db), (snapshot) => {
                const data = snapshot.val()
                if (data !== null) {
                    setGraphic(data[pathname.substring(1)]['graph'])
                    
                }
            });

        } catch (error:any) {
            console.log(error)
        }

       
	}, [pathname]);
    const deleteGraphic=(id:string)=> {
        remove(ref(db, `${pathname.substring(1)}/graph/${id}`));
    }
  return (
    <>
    {graphic? Object.keys(graphic).map((main,index)=> {
        if(index!==0){
		return (
            <motion.div key={index} className={styles.wrapper}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
           >
                <div className={styles.names_wrapper}>
                    {Object.values(graphic).map((b,i)=> {
                        if(i==index) {
                            return (
                                //@ts-ignore
                                Object.keys(b).map((names,i)=> {
                                return   <p key={i} className={styles.name}>{names.substring(1)}</p>
                                })
                            )
                        }
                        
                    })}
                </div>
                <div  className={styles.table_wrapper} >
                    <div className={styles.title_wrapper}>
                        <p className={styles.title}>
                            {main.substring(14)}
                        </p>
                       {user &&  <VscChromeClose className={styles.delete_icon} onClick={()=>setOpenModal(true)}/>}
                    </div>
                    <div className={styles.count_wrapper}>
                        {Object.values(graphic).map((b,i)=> {
                            if(i==index) {
                                return (
                                    //@ts-ignore
                                    Object.values(b).map((im,id)=> {
                                        if(id==0) {
                                            return (
                                                //@ts-ignore
                                                im.map((item,i)=> {
                                                    return (<div key={i} className={styles.count}>{item.num}</div>)
                                                })
                                            )
                                        }
                                    })
                                )
                            }
                        })}
                    </div>
                    {Object.values(graphic).map((b,i)=> {
                        if(i==index) {
                            return (
                                //@ts-ignore
                                Object.values(b).map(im=> {
                                    return   (
                                        <div className={styles.cell_wrapper}>
                                            {//@ts-ignore
                                            im.map((item,index)=> {
                                                return (<Cell key={index} main={main} names={item.name}  num={item.num} isDone={item.isDones} />)
                                            })}
                                        </div>
                                    )
                                })
                            )
                        }
                    })}
                </div>
                <ConfirmDelete text={'Вы действительно хотите удалить данный график'} setIsOpen={setOpenModal} isOpen={openModal} deleteGraphic={()=>deleteGraphic(main)}/>
            </motion.div>)})
	}: ''}
            
    </>
    
            
  )
}

export default Graphic
