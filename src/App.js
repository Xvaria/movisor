import React, {useEffect, useState} from 'react';
import Popup from './components/popup';
import './App.css';

function App() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState('Batman');
  const [btnpop, setBtnpop] = useState(false);
  const [todos, setTodos] = useState();
  const fetchApi = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=71241934&s=${movie}&page=${page}&type=movie`);
    console.log(response.statusText);
    const responseJSON = await response.json();
    setTodos(responseJSON);
    console.log(responseJSON);
  }

  useEffect(() => {
    fetchApi()
  }, [page]);

  useEffect(() => {
    fetchApi()
  }, [count]);

  return (
    <div className="App">
      <div className="header">
        <h1>Movisor</h1>
        <div className="searcher">
          <label>
            <input type="text" placeholder="Write title or word" onChange={e => setMovie(e.target.value)}/>
          </label>
          <a onClick={() => setCount(count + 1)}>Search</a>
        </div>
      </div>
      <ul>
        {!todos ? 'Cargando...' :
          todos.Search.map((todo, index) => {
            return (
              <li onClick={() => setBtnpop(true)}>
                <h1>{todo.Title}</h1>
                <img src={todo.Poster}/>
                <h2>{todo.Type}</h2>
                <h3>{todo.Year}</h3>
              </li>
            )
          })
        }
      </ul>
      <Popup trigger={btnpop} setTrigger={setBtnpop}>
      </Popup>
      <div className="btn-pages">
        <button onClick={page > 1 ? () => setPage(page - 1) : () => setPage(1)}>Prev</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
