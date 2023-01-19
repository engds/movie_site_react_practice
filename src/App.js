import {useState, useEffect} from "react";

import './App.css';

import MovieCard from "./MovieCard";

import SearchIcon from "./search.svg";

const API_URL ='http://www.omdbapi.com/?i=tt3896198&apikey=eb81cae';

// const movie1 = {
//     "Title": "Mr. Bones 3: Son of Bones",
//     "Year": "2022",
//     "imdbID": "tt19763032",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BZDA1Y2QwYzQtNDMyYy00MDM3LWFmZjQtMjQzMTRiMTQ3ZGE4XkEyXkFqcGdeQXVyMTAxNDM3MzIz._V1_SX300.jpg"
// }

const App = ()=>{

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('mr bones');
    },[]);

    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                placeholder="Search for  movies"
                value ={searchTerm}
                onChange = {(e)=>setSearchTerm(e.target.value)}
                >
                </input>

                <img src={SearchIcon}
                    alt = "search" 
                    onClick ={()=>{searchMovies(searchTerm)}} />
            </div>


            {movies?.length>0
                ?(
                <div className="container">
                    {movies.map((movie)=>(
                        <MovieCard movie={movie} />
                    ))}
                    
                </div>
                ):
                (
                    <div className="empty">
                        <h2> No Movies found</h2>
                    </div>
                )
            }
            

           
        </div>
    );
}

export default App;