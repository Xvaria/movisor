import React, {useEffect, useState} from 'react';
import Popup from './components/popup';
import './App.css';

function App() {
  const [page, setPage] = useState({pag: 1, count: 0});
  const [movie, setMovie] = useState('Batman');
  const [btnpop, setBtnpop] = useState({value: false, title: '', count: 0});
  const [todos, setTodos] = useState();
  const fetchApi = async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=71241934&s=${movie}&page=${page.pag}&type=movie`);
    console.log(response.statusText);
    const responseJSON = await response.json();
    setTodos(responseJSON);
  }

  useEffect(() => {
    fetchApi()
  }, [page.pag]);

  useEffect(() => {
    fetchApi()
  }, [page.count]);

  return (
    <div className="App">
      <div className="header">
        <h1>Movisor</h1>
        <div className="searcher">
          <label>
            <input type="text" placeholder="Write title or word" onChange={e => setMovie(e.target.value)}/>
          </label>
          <a onClick={() => setPage({pag: 1, count: page.count + 1})}>Search</a>
        </div>
      </div>
      <ul>
        {!todos ? 'Cargando...' :
          todos.Search.map((todo, index) => {
            return (
              <li onClick={() => setBtnpop({value: true, title: todo.Title, count: btnpop.count + 1})}>
                <h1>{todo.Title}</h1>
                <img src={todo.Poster}/>
                <h2>{todo.Type}</h2>
                <h3>{todo.Year}</h3>
              </li>
            )
          })
        }
      </ul>
      <Popup trigger={btnpop.value} setTrigger={setBtnpop} value={btnpop.title} count={btnpop.count}>
      </Popup>
      <div className="btn-pages">
        <button onClick={page.pag > 1 ? () => setPage({pag: page.pag - 1}) : () => setPage({pag: 1})}>Prev</button>
        <button onClick={() => setPage({pag: page.pag + 1})}>Next</button>
      </div>
    </div>
  );
}

export default App;
