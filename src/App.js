import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./App.css";

class App extends React.Component {
  
  state = {
    isLoading: true,
    movie:[]
  }

  // async await getMovies 함수에게 조금 시간이 필요하고 기다려달라고 요청하는것이다.
  getMovies = async () => {
    const {
      data:{
        data:{ movies }
      }
    } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
    this.setState({
      movies:movies,
      isLoading: false
    });
  } // getMoives

  componentDidMount() {
    this.getMovies();
  } // compnentDidMount

  render() {
    const {isLoading,movies} = this.state;
    return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map(movie=>(
            <Movie 
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </section>
    );
  } // render
}

export default App;
