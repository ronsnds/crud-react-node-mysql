import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import Grid from "./components/Grid";

function App() {
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const URL = "http://localhost:8800";

    const getUsers = async () => {
        try {
            const res = await axios.get(URL);
            setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [setUsers]);

    return (
        <>
            <main>
                <h2>USUÁRIOS</h2>
                <Form
                    onEdit={onEdit}
                    setOnEdit={setOnEdit}
                    getUsers={getUsers}
                />
                <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
            </main>
        </>
    );
}

export default App;
