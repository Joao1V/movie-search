import {Modal} from "react-bootstrap";
import {useState} from "react";
import {generateObjectListTable} from "../utils/functions.js";

const ModalGenerateTable = (props) => {
    const { show, onHide, onListMovies } = props;
    const [movieText, setMovieText] = useState('');

    const generateTable = () => {
        const movieArray = generateObjectListTable(movieText)

        onListMovies(movieArray);
        onHide();
        setMovieText("");
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Buscar filmes</Modal.Title>
            </Modal.Header>
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