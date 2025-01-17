import { useState } from 'react'

import LoginPage from "./Login/LoginPage"
import Layout from './Home/Layou'
import TournamentCard  from './Tournament/TournamentCard'
function App() {
{/* <LoginPage/>    */}
{<Layout>
        <div className='p-4'>
          <TournamentCard/>
        </div>
      </Layout>}
  return (
      <LoginPage/> 
  )
}

export default App
