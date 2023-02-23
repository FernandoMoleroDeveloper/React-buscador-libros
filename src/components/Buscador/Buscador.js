import "./Buscador.css";
import React from "react";
import { useDebounce } from "use-debounce";

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";


const Buscador = () => {

    const [booksList, setBooksList] = React.useState([]);
    const [filter, setFilter] = React.useState("");
    const [filterWithTime] = useDebounce(filter, 500);

    React.useEffect(() => {

        
        filterWithTime.length > 3 ? 
        fetch(`${API_URL}${filterWithTime}`)
            .then((response) => response.json())
            .then((data) => {
                setBooksList(data);
            }) : setBooksList("");
    }, [filterWithTime]);

    return (
        <div className="books">
            
            <p className="books__title">Buscador de libros:</p>

            <input type="text"
                className="books__input"
                placeholder="Escribe el título de un libro"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}>
            </input>

            <table className="books__table">
                <thead>
                    <tr className="books__row">
                        <th className="books__titles">Autores</th>
                        <th className="books__titles">Título</th>
                        <th className="books__titles">Portada</th>
                        <th className="books__titles">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {booksList.length === 0 ? (
                        <tr className="books__row">
                            <td className="books__field"></td>
                            <td className="books__field"></td>
                            <td className="books__field"></td>
                            <td className="books__field"></td>
                        </tr>
                    ) : (
                        booksList.items.map((book) => (
                            <tr key={book.id} className="books__row">
                                <td className="books__field">{book.volumeInfo.authors === undefined ? "Autor desconocido" : book.volumeInfo.authors + " "}</td>
                                <td className="books__field">{book.volumeInfo.title === undefined ? "Título desconocido" : book.volumeInfo.title}</td>
                                <td className="books__field">{book.volumeInfo.imageLinks === undefined ? "Sin imagen" : <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Portada"/>}</td>
                                <td className="books__field">{book.volumeInfo.description === undefined ? "Sin descripción" : book.volumeInfo.description}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Buscador;