import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8000/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: "", poster: "" });

  const getMovies = async () => {
    try {
      const res = await axios.get(API_URL);
      setMovies(res.data);
    } catch (error) {
      console.log("Ошибка, при получении филмов");
    }
  };

  const createMovies = async () => {
    if (!newMovie.title.trim() || !newMovie.poster.trim()) return;
    try {
      await axios.post(API_URL, newMovie);
      setNewMovie({ title: "", poster: "" });
      getMovies();
    } catch (error) {
      console.log("Ошибка, при создании филмов");
    }
  };

  const deleteMovies = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getMovies();
    } catch (error) {
      console.log("Ошибка, при удалении филмов");
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-3xl text-center mb-5">Каталог любимых фильмов</h1>

      <div className="flex flex-col gap-2 w-80 mx-auto mb-10">
        <input
          type="text"
          placeholder="Название фильма"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Ссылка на постер"
          value={newMovie.poster}
          onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
          className="border p-2"
        />
        <button onClick={createMovies} className="bg-blue-500 text-white p-2">
          Добавить фильм
        </button>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white border p-3 w-60">
            <img src={movie.poster} alt={movie.title} className="w-full h-80" />
            <h2 className="text-xl my-2">{movie.title}</h2>
            <button
              onClick={() => deleteMovies(movie.id)}
              className="bg-red-500 text-white p-2 w-full"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
