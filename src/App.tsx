import { useEffect, useState } from "react"
import Layout from "./Layout/Layout"
import ProjectPage from "./pages/ProjectPage/ProjectPage"
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase'
import { Routes, Route,Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import { MoonLoader } from "react-spinners";
function App() {
  const [siteList, setSiteList]= useState<string[]>([])
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState(false)
  useEffect(()=> {
    setLoading(true)
    try {
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val()
        if (data !== null) {
          setSiteList(Object.keys(data))
          setLoading(false)
        }
      });
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  },[])

  return (
    <Layout>
      { loading? <MoonLoader
          color="#274C77"
          size={100}
          className='spinner'
          /> :  <Routes>
          {siteList.map(item=> {
            return <Route key={item} path={`${item}`} element={ <ProjectPage />} />
          })}
          <Route path="/"  element={<MainPage siteList={siteList} />}/>
			 </Routes>}
     
    </Layout>
  )
}

export default App
