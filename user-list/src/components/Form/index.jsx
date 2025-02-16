/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef } from "react";
import "./style.css"

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    const URL = "http://localhost:8800/";

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.data_nascimento.value
        ) {
            return alert("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
                .put(URL + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => alert(data))
                .catch(({ data }) => alert(data, "Erro ao atualizar usuário"));
        } else {
            await axios
                .post(URL, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => alert(data))
                .catch(({ data }) => alert(data, "Erro ao criar usuário"));
        }

        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <form ref={ref} onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input name="nome" type="text" />
            </div>
            <div>
                <label>E-mail:</label>
                <input name="email" type="email" />
            </div>
            <div>
                <label>Telefone:</label>
                <input name="fone" type="tel" />
            </div>
            <div>
                <label>Data de Nascimento:</label>
                <input name="data_nascimento" type="date" />
            </div>

            <button type="submit">SALVAR</button>
        </form>
    );
};

export default Form;