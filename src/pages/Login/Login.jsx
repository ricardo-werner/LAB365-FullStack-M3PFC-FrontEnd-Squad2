import "./login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export const Login = () => {
  const { authenticated, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, senha);
  };

  return (
    <div id="login">
      <h1>Acesse o Sistema</h1>
      <form className="formLogin" onSubmit={handleSubmit}>
        <label>
          Login
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
        </label>
        <br></br>
        <label>
          Senha
          <input
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
          />
        </label>
        <button type="submit">Acessar</button>
      </form>
    </div>
  );
};
