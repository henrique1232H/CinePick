import { useEffect, useState } from 'react'
import { api } from '../service/api'
import Header from '../components/Header'
import authenticantion from '../service/authenticantion'
import Card from '../components/Card'
export default function App() {

  useEffect(() => {

    const checkAuthentication = async () => {

    try {
      const returnAuth = await authenticantion();
      return returnAuth.data
    } catch (err) {
      alert(err);
    }

    }
    checkAuthentication()
  },[])

  return (
    <>
      <Header />

      <div class={"mt-5 m-3"}>
       <h2 class={"text-4xl text-ink italic"}>Sorteie o <span class={"text-accent"}>filme perfeito</span></h2>
       <p class={"text-xs text-gray-700 font-medium mt-3"}>Defina gênero ou autor de preferência e deixe nossa roleta escolher o filme ideal para a sua noite.</p>

       <Card />
      </div>
    
    </>
  )
}

