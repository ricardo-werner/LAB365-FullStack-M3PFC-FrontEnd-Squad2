import { useState, useEffect, useContext } from 'react';

import { TbPigMoney } from 'react-icons/tb';
import { BsFillBarChartFill } from 'react-icons/bs';
import { api } from '../../service/api';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalQuantidadeVendida, setTotalQuantidadeVendida] = useState(0);
  const [produtosEmEstoque, setProdutosEmEstoque] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(20);
  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState();
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const dashboardResponse = await api.get(
        `/vendas/admin/dashboard`,
        config
      );
      setTotalVendas(dashboardResponse.data.totalVendas.toFixed(2) || '0.00');
      setTotalQuantidadeVendida(
        dashboardResponse.data.totalQuantidadeVendida || 0
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Função para buscar os produtos em estoque do usuário
  const fetchProdutosEmEstoque = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const offset = (paginaAtual - 1) * itensPorPagina;
      const produtosResponse = await api.get(
        `produto/${offset}/${itensPorPagina}`,
        config
      );

      const produtosFiltrados = produtosResponse.data.resultado.filter(
        (produto) => produto.usuarioId === user.id
      );

      setProdutosFiltrados(produtosFiltrados);
      setQuantidadeTotalProdutos(produtosFiltrados.length);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchProdutosEmEstoque();
  }, [paginaAtual, itensPorPagina, user]);

  return (
    <section className="admin-dashboard w-full h-screen flex pt-10 px-20 ">
      <div className="mx-auto max-w-4xl">
        <div className="results pb-14 text-center">
          <div className="flex justify-between mb-10">
            <h2 className="text-slate-700 text-3xl font-semibold ">
              Resultado das suas Vendas
            </h2>
          </div>
          <div className="flex justify-around m-auto columns-2 gap-8 max-w-4xl">
            <div className="flex items-center gap-3 border-2 p-4 rounded w-[23rem] text-center ">
              <div className="p-3  rounded-full bg-[#8754ec]  max-h-[68px]">
                <TbPigMoney className="text-4xl text-[#c6b2f1]" />
              </div>
              <div className="grid gap-3">
                <h3 className="text-lg font-semibold text-slate-500">
                  Total de vendas
                </h3>
                <p className="text-3xl font-bold text-[#6B32DA]">
                  {totalVendas}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-2 p-4 rounded w-[22.07rem] text-center ">
              <div className="p-3 rounded-full bg-[#25D296]  max-h-[68px]">
                <BsFillBarChartFill className="text-4xl text-[#b3e9d6]" />
              </div>
              <div className="grid gap-3">
                <h3 className="text-lg font-semibold text-slate-500">
                  Quantidade Vendida
                </h3>
                <p className="text-3xl font-bold text-[#1dbd85] ">
                  {totalQuantidadeVendida}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl m-auto">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Produtos em Estoque
          </h3>

          {produtosFiltrados && produtosFiltrados.length > 0 ? (
            <table className="table-auto w-full">
              <thead className="">
                <tr className="border-2 border-slate-300 text-slate-500">
                  <th className=" font-medium">ID</th>
                  <th className=" font-medium">Nome do Produto</th>
                  <th className=" font-medium">Preço Unitário</th>
                  <th className=" font-medium">Qtd em Estoque</th>
                </tr>
              </thead>
              <tbody className="">
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.id} className="border border-slate-300">
                    <td className="py-1">{produto.id}</td>
                    <td className="py-1">{produto.nomeProduto}</td>
                    <td className="py-1">{produto.precoUnitario}</td>
                    <td className="py-1">{produto.totalEstoque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum produto em estoque.</p>
          )}
        </div>
        <div className="pagination flex justify-between mt-4 pb-10">
          <button
            className="py-[9px] pl-10 pr-10 hover:border hover:border-green-500 rounded"
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual <= 1}
          >
            Anterior
          </button>
          <span>{paginaAtual}</span>
          <button
            className="py-[9px] pr-10 pl-10 hover:border hover:border-green-500 rounded"
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual * itensPorPagina >= quantidadeTotalProdutos}
          >
            Próximo
          </button>
        </div>
      </div>
    </section>
  );
};
