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
      <Layout>
        <div className='p-4'>
          <TournamentCard/>
        </div>
      </Layout>   
  )
}

export default App
