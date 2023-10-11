import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../contexts/carrinhoCompras.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart({ mostraModal, toggle }) {
  const { itensCarrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, valorTotalCarrinho } =
    useContext(CartContext);

  const notifyRemovedFromCart = (item) =>
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

  const notificacaoLimparCarrinho = () =>
    toast.error(`Carrinho esvaziado!`, {
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
    notifyRemovedFromCart(product);
  };

  return (
    mostraModal && (
      <div className="flex-col flex items-center fixed inset-0 left-1/4 bg-white dark:bg-black gap-8  p-10  text-black dark:text-white font-normal uppercase text-sm">
        <ToastContainer />
        <h1 className="text-2xl font-bold">Carrinho de Compras</h1>
        <div className="absolute right-16 top-10">
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Fechar
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {itensCarrinho.map((item) => (
            <div className="flex justify-between items-center" key={item.id}>
              <div className="flex gap-4">
                <img
                  src={item.imagemProduto}
                  alt={item.nomeProduto}
                  className="rounded-md w-24 h-24"
                />
                <div className="flex gap-8 justify-center">
                  <h1 className="text-lg font-bold">{item.nomeProduto}</h1>
                  <p className="text-gray-600">R${item.precoUnitario}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    adicionarAoCarrinho(item);
                  }}
                >
                  +
                </button>
                <p>{item.qtde}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    const itemCarrinho = itensCarrinho.find(
                      (product) => product.id === item.id
                    );
                    if (itemCarrinho.qtde === 1) {
                      handleremoverDoCarrinho(item);
                    } else {
                      removerDoCarrinho(item);
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        {itensCarrinho.length > 0 ? (
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: R$ {valorTotalCarrinho()}</h1>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => {
                limparCarrinho();
                notificacaoLimparCarrinho();
              }}
            >
              Limpar Carrinho
            </button>
          </div>
        ) : (
          <h1 className="text-lg font-bold">Seu carrinho está vazio</h1>
        )}
      </div>
    )
  );
}

Cart.propTypes = {
  mostraModal: PropTypes.bool,
  toggle: PropTypes.func,
};
