import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, senha } = e.target.elements;
    try {
      const response = await axios.post(
        "http://localhost:3333/api/usuario/login",
        {
          email: email.value,
          senha: senha.value,
        }
      );
      if (response.status === 200) {
        alert("Login realizado com sucesso");
        localStorage.setItem("token", response.data.token);

        //Configurar cabeçalho das requisições
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }
      if (response.status === 401) {
        alert("Login ou senha inválidos!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Acesse o Sistema</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Login
          <input name="email" type="email" placeholder="E-mail" />
        </label>
        <br></br>
        <label>
          Senha
          <input name="senha" type="password" placeholder="Senha" />
        </label>
        <button type="submit">Acessar</button>
      </form>
    </div>
  );
};
