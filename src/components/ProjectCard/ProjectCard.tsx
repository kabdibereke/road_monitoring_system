import { redirect, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button/Button'
import styles from './ProjectCard.module.scss'
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const ProjectCard = ({site}: {site: string}) => {
   //@ts-ignore
  const cyrillicToTranslit = new CyrillicToTranslit();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
        <p className={styles.title}>
        {site.length>2?  cyrillicToTranslit.reverse(site.substring(14).replace(/_/g, ' ')): cyrillicToTranslit.reverse(site)}
        </p>
        <Button onClick={()=>navigate(`/${site}`)} appearance='ghost' arrow='right'>Перейти</Button>
    </div>
  )
}

export default ProjectCard