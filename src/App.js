import React, { Component, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { useDispatch } from 'react-redux'
import { fetchRefresh } from './redux/slices/userSlice'
import Questionnaire from './views/pages/questionnaire/Questionnaire'
import GetTask from './views/pages/task/GetTask'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Task = React.lazy(() => import('./views/pages/task/Task'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRefresh())
    setInterval(() => {
      dispatch(fetchRefresh())
    }, 1000 * 60 * 15)
  }, [])

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/profile/:id" name="User by id" element={<Register />} />
          <Route exact path="/questionnaire/:id" name="Anketa" element={<Questionnaire />} />
          <Route exact path="/task" name="Task" element={<Task />} />
          <Route exact path="/task/:id" name="Task by id" element={<Task />} />
          <Route exact path="/getTask/:id" name="Task by id" element={<GetTask />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
