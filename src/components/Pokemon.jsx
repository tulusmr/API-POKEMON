import React, { useEffect, useState } from 'react'

function Pokemon() {
  const [pokemonList,setPokomenList]=useState([]);
  const [loading,setLoading] = useState(true)
  const [detail,setDetail] = useState(false)
  const [dataDetail,setDataDetail] = useState([])
  const [prevURL,setPrevUrl] = useState('')
  const [nextURL,setNextUrl] = useState('')
  const [apiUrl,setApiUrl] = useState('https://pokeapi.co/api/v2/pokemon')

  async function getAllPokemon(){
        const resData = await fetch(apiUrl);
        const jsonData = await resData.json();

        setPrevUrl(jsonData.previous|| '')
        setNextUrl(jsonData.next|| '')

        let pokemonDetail = []
        jsonData.results.map(async(item,index)=>{
            const resDataDetail = await fetch(item.url);
            const jsonDataDetail = await resDataDetail.json();
            console.log(jsonDataDetail)
            pokemonDetail[index] = jsonDataDetail
            setPokomenList([...pokemonDetail])
        })
       
    }

    function pokemonDetail(){
        return(
        <div className='detail'onClick={()=>setDetail(false)}>
            <div className="item">
                <div className="image">
                <img src={dataDetail.sprites.other.dream_world.front_default} />
                </div>
                <div className="title">
                    {dataDetail.name}
                </div>
                <div className="abilities">
                    {
                        dataDetail.abilities.map((item,index)=>{
                            return(
                                <span key={index}>{item.ability.name}</span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        )
    }

    useEffect(()=>{
        getAllPokemon();
        setLoading(false)
    },[apiUrl])
    console.log(pokemonList)
  return (
    <div className='wrapper'>
        <div className='content'>
            {
                loading && (<div className='loading'>tunggu jangan kemana-mana, halaman sedang load...</div>)
            }
            {
                detail && pokemonDetail()
            }
            <div className="grid">
                {
                    pokemonList.map((item,index)=>{
                        return(
                            <div className='item' key={index}onClick={()=>{setDetail(true);setDataDetail(item)}}>
                                <div className='image'><img src={item.sprites.front_default}/></div>
                                <div className='title'>{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>

            {
                prevURL && (
                    <div className="pagination-left">
                        <button onClick={()=>{setApiUrl(prevURL)}}>&laquo;</button>
                    </div>
                )
            }

{
                nextURL && (
                    <div className="pagination-right">
                        <button onClick={()=>{setApiUrl(nextURL)}}>&raquo;</button>
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default Pokemon