import { useAuthState } from 'react-firebase-hooks/auth';
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import AddProjectCard from '../../ui/AddProjectCard/AddProjectCard'
import styles from './MainPage.module.scss'
import { auth } from '../../../firebase';
import { ToastContainer } from 'react-toastify';


const MainPage = ({siteList}:{ siteList: string[]; }) => {
  const [user] = useAuthState(auth);
  return (
    <>
    <div className={styles.wrapper}>
        {siteList.map((site,index)=> {
            return <ProjectCard key={index} site={site}/>
        })}
        {user && <AddProjectCard/>}
    </div>
     <ToastContainer autoClose={500} closeOnClick={false} draggable={false}/>
    </>
  )
}

export default MainPage