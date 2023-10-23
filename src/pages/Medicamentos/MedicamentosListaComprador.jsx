import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../contexts/carrinhoCompras";
import Cart from "../Carrinho/Carrinho.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../service/api";

export default function MedicamentosListaComprador() {
  const [mostraModal, setMostraModal] = useState(false);
  const [products, setMedicamentos] = useState([]);
  const { itensCarrinho, adicionarAoCarrinho, removerDoCarrinho } =
    useContext(CartContext);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(20);
  const [pesquisar, setPesquisar] = useState("");
  const [totalMedicamentos, setTotalMedicmentos] = useState(0);

  const toggle = () => {
    setMostraModal(!mostraModal);
  };

  useEffect(() => {
    // Função para buscar usuários do banco de dados com filtro e paginação
    const getMedicamentos = async () => {
      const offset = (paginaAtual - 1) * itensPorPagina;

      try {
        const response = await api.get(`produto/${offset}/${itensPorPagina}`, {
          params: { nomeProduto: pesquisar },
        });

        console.log(response, "response");

        if (Array.isArray(response.data.resultado)) {
          setMedicamentos(response.data.resultado);
          setTotalMedicmentos(response.data.contar);
        } else {
          console.log("Dados da Api não são um array", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
      }
    };

    getMedicamentos();
  }, [paginaAtual, itensPorPagina, pesquisar]);

  console.log(totalMedicamentos, "wwww");
  const notificacaoAdicionadoCarrinho = (item) =>
    toast.success(`${item.nomeProduto} adicionado ao carrinho!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "rgb(32,193,148)",
        color: "#000",
      },
    });

  const notificacaoRemovidoCarrinho = (item) =>
    toast.error(`${item.nomeProduto} removido do carrinho!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "rgb(32,193,148)",
        color: "#000",
      },
    });

  const handleremoverDoCarrinho = (product) => {
    removerDoCarrinho(product);
    notificacaoRemovidoCarrinho(product);
  };

  const handlePesquisar = (e) => {
    setPesquisar(e.target.value);
    setPaginaAtual(1);
  };

  return (
    <div className="flex flex-col justify-center bg-gray-100">
      <ToastContainer />
      <div className="flex justify-between items-center px-20 py-5">
        <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
          Produtos
        </h1>
        {!mostraModal && (
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Carrinho de Compras ({itensCarrinho.length})
          </button>
        )}
        <input
          type="text"
          placeholder="Filtrar por Nome do Medicamento"
          value={pesquisar}
          onChange={handlePesquisar}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg px-10 py-10"
          >
            <img
              src={product.imagemProduto}
              alt={product.nomeProduto}
              className="rounded-md h-48"
            />
            <div className="mt-4">
              <h1 className="text-lg uppercase font-bold">
                {product.nomeProduto}
              </h1>
              <p className="mt-2 text-gray-600">R${product.precoUnitario}</p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              {!itensCarrinho.find((item) => item.id === product.id) ? (
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    adicionarAoCarrinho(product);
                    notificacaoAdicionadoCarrinho(product);
                  }}
                >
                  Adicionar ao Carrinho
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      const itemCarrinho = itensCarrinho.find(
                        (item) => item.id === product.id
                      );
                      if (itemCarrinho.qtde === 1) {
                        handleremoverDoCarrinho(product);
                      } else {
                        removerDoCarrinho(product);
                      }
                    }}
                  >
                    -
                  </button>
                  <p className="text-gray-600">
                    {itensCarrinho.find((item) => item.id === product.id).qtde}
                  </p>
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                      adicionarAoCarrinho(product);
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual <= 1} // Desabilita o botão Anterior se estiver na primeira página
        >
          Anterior
        </button>
        <span>{paginaAtual}</span>
        <button
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          disabled={paginaAtual >= totalMedicamentos}
        >
          Próximo
        </button>
      </div>
      <Cart mostraModal={mostraModal} toggle={toggle} />
    </div>
  );
}
