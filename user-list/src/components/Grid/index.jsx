/* eslint-disable react/prop-types */
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./style.css";

const Grid = ({ users, setUsers, setOnEdit }) => {

    const URL = "http://localhost:8800/";

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete(URL + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                alert(data);
            })
            .catch(({ data }) => alert(data));

        setOnEdit(null);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Fone</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                {users.map((item, i) => (
                    <tr key={i}>
                        <td>{item.nome}</td>
                        <td>{item.email}</td>
                        <td>{item.fone}</td>
                        <td>
                            <button onClick={() => handleEdit(item)}>
                                <FaEdit />
                            </button>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(item.id)}>
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Grid;
