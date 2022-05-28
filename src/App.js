import React, { useState, useEffect } from "react";
import Header from "./components/Header"
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([])
  const [apiUrl, setApiUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextApiUrl, setNextApiUrl] = useState()
  const [prevApiUrl, setPrevApiUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController();

    const loadPokemon = async () => {
      try {
        const res = await axios.get(apiUrl, {
          signal: controller.signal
        })
        console.log({status: res.status, dataCount: res.data.count})
        setLoading(false)
        setNextApiUrl(res.data.next)
        setPrevApiUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
      } catch (e) {
        if(!axios.isCancel(e)) {
          throw e
        }
      }
    }
    loadPokemon()

    return () => {
      controller.abort();
    }

  }, [apiUrl])

  function gotoNextApiUrl() {
    setApiUrl(nextApiUrl)
  }
  function gotoPrevApiUrl() {
    setApiUrl(prevApiUrl)
  }

  if (loading) return 'Loading pokemon...';
  
  return (
    <>
      <Header />
      <PokemonList pokemon={pokemon} />
      <Pagination 
        gotoPrevApiUrl={prevApiUrl ? gotoPrevApiUrl: null}
        gotoNextApiUrl={nextApiUrl ? gotoNextApiUrl : null}
      />
    </>
  );
}

export default App;
