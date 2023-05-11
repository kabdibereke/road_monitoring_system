import Button from '../../ui/Button/Button';
import styles from './Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import SignIn from '../../components/Modals/SignIn/SignIn';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import SignUp from '../../components/Modals/SignUp/SignUp';
const Header = () => {
  const [signInModal, setSignInModal] =useState(false)
  const [signUpModal, setSignUpModal] =useState(false)
  const {pathname} = useLocation()
  const [user] = useAuthState(auth);
  const [signOut]  = useSignOut(auth);

  const navigate = useNavigate();
  return (
    <>
    <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
              {pathname!='/' &&   <>
              <Button onClick={()=>navigate(`/`)} className={styles.go_back_without_text} appearance='ghost' arrow='left'>
            </Button>
            <Button onClick={()=>navigate(`/`)} className={styles.go_back_with_text}  appearance='ghost' arrow='left'>
              Вернуться назад
              
            </Button>
              </>
            
            }
          
              <div className={styles.btn_wrapper}> 
                 {!user ? <>
                  <Button appearance='primary' className={styles.btn} onClick={()=>setSignUpModal(true)}>
                  Создать аккаунт
                  </Button>
                  <Button appearance='ghost'  className={styles.btn} onClick={()=>setSignInModal(true)} >
                    Войти
                  </Button>
                 </> : <Button appearance='ghost'  className={styles.btn} onClick={async () => {
                      await signOut();
                    }} >
                    Выйти
                  </Button>}
              </div>
          </div>
        </div>
    </header>
    <SignIn setIsOpen={setSignInModal} isOpen={signInModal}/>
    <SignUp setIsOpen={setSignUpModal} isOpen={signUpModal}/>
    </>
  )
}

export default Header