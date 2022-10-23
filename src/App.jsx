import { useEffect, useState } from 'react'
import axios from 'axios'
import './assets/style.css'

function App() {
  const [char, setChar] = useState([])

  useEffect(() =>{
    const fetchData = async () => {
      try{
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character`)
        setChar(data.results)
      }catch(error){
        console.error(error);
      }
    }
    fetchData()
  },[])

  return (
    <div className="App">
      <div className="results">
        {char.map(char => (
          <div>
            <img src={char.image} alt={char.name}/>
            {char.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App