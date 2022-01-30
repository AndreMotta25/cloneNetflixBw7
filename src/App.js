import "./App.css";
import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRows from "./components/MovieRows/MovieRows";

function App() {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let listAll = await Tmdb.getHomeList();
      console.log(listAll);
      setMovieList(listAll);
    };
    loadAll();
  }, []);
  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRows key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}

export default App;

/*
  Na linha 17, eu utilizo um map, mas perceba que este map nao tem chaves, mesmo n tendo so uma linha, isso pq colocamos a div 
  detro de um (), o parenteses vai englobar a div e seus filhos como se fossem so um elemento.

  Eu acho que o async e muito util para quando temos varias requisoes assincronas, ele acaba com o uso do promisse.all, 
  pq tipo assim, o async, vai tornar um codigo assincrono em "sincrono", entao, toda vez que a funcao basicFetch for 
  executada, a mesma vai ter que acabar para a proxima comecar(assim eu presumo) 
*/
