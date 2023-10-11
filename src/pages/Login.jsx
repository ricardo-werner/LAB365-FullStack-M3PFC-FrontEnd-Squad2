import axios from "axios";
import "./Login.css";

export const Login = () => {
  const { authenticated, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, senha);

    //Configurar cabeçalho das requisições
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    navigate("/Dashboard");

    if (response.status === 401) {
      alert("Login ou senha inválidos!!!!");
    }
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
