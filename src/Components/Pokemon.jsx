import { useEffect } from 'react'
import './Pokemon.css'
import { useState } from 'react';
import { PokemonCard } from './Pokemoncards';
export const Pokemon = () => {
    const [Pokemon, setPokemon] = useState([]);
    const [loading, setloaading] = useState(true)
    const [error, seterror] = useState(null);
    const [search, setSearch] = useState("");


    //gettinng data 
    //multiples promises 
    // fetching urls from api json using map
    const API = "https://pokeapi.co/api/v2/pokemon?limit=24";
    const fectPokemon = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            // console.log(data)
            const detailedPokemonData = data.results.map(async (curr) => {
                const res = await fetch(curr.url);
                const data = await res.json();
                return data
            }

            )
            const detailedResponses = await Promise.all(detailedPokemonData)
            console.log(detailedResponses)
            setPokemon(detailedResponses);

        }
        catch (error) {
            console.log(error)
            setloaading(false)


        }
    }
    useEffect(() => {
        fectPokemon()
    }, [])



    if (!loading) {
        <div>
            <h1>Loading</h1>
        </div>
    }
    if (!error) {
        <div>
            <h1>error</h1>
        </div>
    }

    //search 
    const searchContainer = Pokemon.filter((curr) => 

        curr.name.toLowerCase().includes(search.toLowerCase())

    
    )


    return (

        <section className='container'>
            <header className='Header'>
                <h1>Let's catch Pokemon</h1>
                <div className="pokemon-search">
                <input type='text' placeholder='searchPokemon' value={search} onChange={(e) => setSearch(e.target.value)} ></input>
            </div>

            </header>
            
            <div className='second'>
                <ul className='cards'>
                    {

                        searchContainer.map((currPokemon) => {
                            return (
                                <PokemonCard key={currPokemon.id} pokemondata={currPokemon} />
                            )





                        }
                        )
                    }

                </ul>
            </div>



        </section>
    )
}