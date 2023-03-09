import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Registration from '../shared/component/registration'
import List from '../views/datalist'

function Router () {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<List/>}/>
        <Route path='/registration' element={<Registration/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default Router
