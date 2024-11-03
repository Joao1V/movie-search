import { useState, useEffect } from 'react';
import axios from 'axios';
import {apiKey} from "./keys.js";
import ModalGenerateTable from "./components/ModalGenerateTable.jsx";

import {Table} from "react-bootstrap";
import ModalMovieDetails from "./components/ModalMovieDetails.jsx";
import moment from "moment";
import {getStorage, setStorage} from "./utils/storage.js";
import {Form} from "react-bootstrap";
import {copyToClipboard} from "./utils/functions.js";
import {ToastContainer} from "react-toastify";

const STORAGE_MOVIES = "movies";
const STORAGE_MOVIES_DONE = "movies_done";

const MovieSearch = () => {
    const [movies, setMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [dataGenres, setDataGenres] = useState([]);

    const [show, setShow] = useState(false);
    const [modalMovieDetails, setModalMovieDetails] = useState(false);

    const getMovieDetail = async (movieName) => {
        try {
            const searchResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: apiKey,
                    query: movieName,
                    language: 'pt-BR'
                }
            });

            if (searchResponse.data.results && searchResponse.data.results.length > 0) {
                const aux = []
                searchResponse.data.results.forEach(movie => {
                    const details = {
                        title: movie.title,
                        description: movie.overview,
                        release_date: moment(movie.release_date).format('DD/MM/YYYY'),
                        image: movie.poster_path,
                        genre_ids:movie.genre_ids,
                        genre: []
                    }
                    if (movie.genre_ids.length > 0) {
                        movie.genre_ids.forEach(id => {
                            const found = dataGenres.find((item) => item.id === id);
                            details.genre.push(found);
                        })
                    }
                    aux.push(details)
                })

                setModalMovieDetails(true);
                setMovieDetails([...aux]);

            } else {
                alert(`Filme não encontrado: ${movieName}`);
            }
        } catch (error) {
            alert(`Erro ao buscar: ${movieName}`);
        }
    };

    const handleChecked = (index) => {
        const cachedMoviesDone = getStorage(STORAGE_MOVIES_DONE);

        const aux = movies;
        const position = aux[index]
        position.checked = !movies[index].checked;

        if (position.checked) {
           position.updated_at = moment().format('DD/MM/YYYY HH:mm:ss');
        } else {
           position.updated_at = null;
        }

        aux[index] = position;

        if (cachedMoviesDone && cachedMoviesDone?.length > 0) {
            const index = cachedMoviesDone.findIndex((item) => item.name === position.name);

            if (index !== -1) {
                cachedMoviesDone.splice(index, 1);
            } else {
                cachedMoviesDone.push(position);
            }

            console.log(cachedMoviesDone)
            setStorage(STORAGE_MOVIES_DONE, cachedMoviesDone);
        } else {
            setStorage(STORAGE_MOVIES_DONE, [{...aux[index]}]);
        }

        setStorage(STORAGE_MOVIES, aux)
        setMovies([...aux]);
    }

    const fetchGenres = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
                params: {
                    api_key: apiKey,
                    language: 'pt-BR'
                }
            });
            setDataGenres(response.data.genres);
        } catch (error) {
            console.error('Erro ao buscar gêneros:', error);
        }
    };

    useEffect(() => {
        fetchGenres();
        const cachedMovies = getStorage(STORAGE_MOVIES);
        if (cachedMovies) {
            setMovies(cachedMovies)
        }
    }, []);
    return (
        <div className={"container mt-5"}>
            <ToastContainer />

            <h2 className={"text-center"}>Buscador de filmes</h2>
            <div className={"d-flex justify-content-end"}>
                <button onClick={() => setShow(true)}>Gerar tabela</button>
            </div>
            <ModalGenerateTable show={show}
                                onHide={() => setShow(false)}
                                onListMovies={(e) => {
                                    setStorage(STORAGE_MOVIES, e)
                                    setMovies(e)
                                }}
            />
            <ModalMovieDetails show={modalMovieDetails}
                               data={movieDetails}
                               onHide={() => setModalMovieDetails(false)}
            />

            {movies.length > 0 && (
                <div>
                    <h3>Filmes</h3>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome do Filme</th>
                            <th className={"text-center"} style={{ width: "10%" }}>Ação</th>
                            <th style={{ width: "2%" }}>Concluído</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map((item, index) => {
                            const movieName = item.name

                            return (
                                <tr key={index} className={"align-middle"}>
                                    <td>
                                        <div className={"d-flex align-items-center gap-2 "}>
                                            <span className={item.checked ? "text-decoration-line-through text-success" : ""}>{movieName}</span>
                                            <i className="bi bi-copy" onClick={() => copyToClipboard(movieName)} style={{cursor:"pointer"}}></i>
                                        </div>
                                    </td>
                                    <td className={""}>
                                        <div className={"d-flex align-items-center gap-2 justify-content-center"}>
                                            <button onClick={() => getMovieDetail(movieName)}>
                                                <i className={"bi bi-search"}></i>
                                            </button>
                                        </div>
                                    </td>

                                    <td className={"text-center"}>
                                        <Form.Check className={"check-30"}
                                                    checked={item.checked}
                                                    onChange={() => {
                                                        handleChecked(index)
                                                    }}
                                                    aria-label={`option ${index}`}
                                        />
                                    </td>

                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MovieSearch;