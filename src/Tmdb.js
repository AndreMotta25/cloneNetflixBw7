/*
    esse arquivo vai ser responsavel
    por lidar com qualquer requisao ao tmdb
    Logo nao vamos ficar fazendo requisoes 
    a api em varios arquivos, vamos centralizar
    toda a parte responsavel pela requisao 
    aqui nesse arquivo.
    Assim esse arquivo vai mandar os dados 
    da api para aplicacao. Fazemos isso pq 
    torna a manutencao mais pratica, qualquer 
    coisa que quisermos mudar, vamos ter que mudar so aqui  
*/
const API_KEY = "addfde10479ca5484c627ca2216b109f";
const API_BASE = "https://api.themoviedb.org/3";

/*
    - originais da netflix
    - recomendados
    - em alta(top rated)
    - acao
    - comedia
    - terror
    - documentarios
    - romance
*/
const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};
export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais do netflix",
        items: await basicFetch(
          `/discover/tv/?with_network=213&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Recomendados para voce",
        items: await basicFetch(
          `/trending/all/week?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "toprated",
        title: "Em alta",
        items: await basicFetch(
          `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "action",
        title: "acao",
        items: await basicFetch(
          `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comedia",
        items: await basicFetch(
          `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentarios",
        items: await basicFetch(
          `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "Romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "horror",
        title: "terror",
        items: await basicFetch(
          `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`
        ),
      },
    ];
  },
};

/*
ai uma previa do meu novo projeto, vai pegar o css de muitos sites, ta no comeco ainda , mas vejo muito potencial para ele. 
quer saber mais, da um pulo la no meu git. 
*/
