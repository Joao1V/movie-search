import {Modal} from "react-bootstrap";
import {useState} from "react";

const ModalGenerateTable = (props) => {
    const { show, onHide, onListMovies } = props;
    const [movieText, setMovieText] = useState('');

    const generateTable = () => {
        const movieArray = movieText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line !== '')
            .map(movieName => ({ name: movieName, checked: false, updated_at: null })); // Formato desejado

        onListMovies(movieArray);
        onHide();
        setMovieText("");
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <textarea
                    rows={15}
                    className={"form-control h-100"}
                    placeholder="Digite os nomes dos filmes, um por linha..."
                    value={movieText}
                    onChange={(e) => setMovieText(e.target.value)}
                />
                <br />
            </Modal.Body>
            <Modal.Footer>
                <button onClick={generateTable}>Gerar Tabela</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalGenerateTable