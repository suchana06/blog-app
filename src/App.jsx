import variables from './conf/conf.js'
import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js'
import { Header, Footer } from './components/index.js'
function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        if (data) dispatch(login({ data }));
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          TODOS
          {/* TODO:  <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App
