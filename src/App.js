import "./App.css";
import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRows from "./components/MovieRows/MovieRows";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Header from "./components/Header/Header";
function App() {
  const [featuredData, setFeaturedData] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [blackHeader, setBlackHeader] = useState(false);
  // busca os dados da api
  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let listAll = await Tmdb.getHomeList();
      console.log(listAll);
      setMovieList(listAll);
      // pegando o featured
      let originals = listAll.filter((movie) => movie.slug === "originals");
      /*
        eu preferia usar o min e max, mas esse tambem serve, digamos que o random retorne 0.7, vamos 
        multiplica-lo por 9 e teremos 6,3 e como vamos arrendondar teremos 6, o valor nunca sera maior que 9
      */
      let randomChosen = Math.floor(
        Math.random() * originals[0].items.results.length - 1
      );
      let chosen = originals[0].items.results[randomChosen];
      let choseInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(choseInfo);
    };
    loadAll();
  }, []);
  // remove o evento de scroll do windows
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRows key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito com{" "}
        <span role="img" aria-label="coracao">
          ❤️
        </span>
        pela B7Web.
        <br /> Direitos de imagem para netflix
        <br />
        Dados pego do site TheMoviedb.org
      </footer>
      {/* faz o carregamento */}
      {movieList.length <= 0 && (
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" />
        </div>
      )}
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
