import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../contexts/carrinhoCompras";
import Cart from "./Carrinho.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Medicamentos() {
  const [mostraModal, setMostraModal] = useState(false);
  const [products, setMedicamentos] = useState([]);
  const { itensCarrinho, adicionarAoCarrinho, removerDoCarrinho } = useContext(CartContext);

  const toggle = () => {
    setMostraModal(!mostraModal);
  };

  async function getMedicamentos() {
    const response = await fetch("http://localhost:3333/api/produto/todos");
    const data = await response.json();
    setMedicamentos(data.produto);
  }

  useEffect(() => {
    getMedicamentos();
  }, []);

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
        backgroundColor: "#fff",
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
        backgroundColor: "#000",
        color: "#fff",
      },
    });

  const handleremoverDoCarrinho = (product) => {
    removerDoCarrinho(product);
    notificacaoRemovidoCarrinho(product);
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
                      adicionarAoCarrinho(product);
                    }}
                  >
                    +
                  </button>
                  <p className="text-gray-600">
                    {itensCarrinho.find((item) => item.id === product.id).qtde}
                  </p>
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
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Cart mostraModal={mostraModal} toggle={toggle} />
    </div>
  );
}