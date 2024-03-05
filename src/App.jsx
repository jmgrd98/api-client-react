import { useState } from 'react'
import Header from './components/Header';
import Request from './components/Request';
import Response from './components/Response';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header  />

      <div className='flex h-full'>
        <Sidebar />
        <main className="flex gap-5 h-full items-center w-full justify-between p-5">
    
        <Request />
        <Response />
          
        </main>
        </div>
    </div>
  )
}

export default App
