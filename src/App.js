/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Router from './Router/Routes'
import Header from './shared/component/header/index.jsx'
import Registration from './shared/component/registration'
import List from './views/datalist'

export default function App () {
  const queryClient = new QueryClient()

  return (

   <QueryClientProvider client={queryClient}>
      <Router/>
    </QueryClientProvider>
  )
}
