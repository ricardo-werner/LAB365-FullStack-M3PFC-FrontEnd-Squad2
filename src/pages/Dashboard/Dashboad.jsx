import { useState, useEffect } from 'react';

import { TbPigMoney } from 'react-icons/tb';
import { BsFillBarChartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';


export default function AdminDashboard() {
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalQuantidadeVendida, setTotalQuantidadeVendida] = useState(0);
  const [produtosEmEstoque, setProdutosEmEstoque] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };

        // Faz a chamada assíncrona para buscar os dados do Dashboard
        const [dashboardResponse, produtosResponse] = await Promise.all([
          api.get(`/vendas/admin/dashboard`, config),
          api.get(`/produtos/admin`, config),
        ]);

        setProdutosEmEstoque(produtosResponse.data);
        setTotalVendas(dashboardResponse.data.totalVendas.toFixed(2) || '0.00');
        setTotalQuantidadeVendida(
          dashboardResponse.data.totalQuantidadeVendida || 0
        );
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <section className="admin-dashboard w-full h-screen flex pt-20 px-20">
      <div className="sideBar">
        <h3>Sidebar</h3>
        <button onClick={handleLogout}>Sair</button>
      </div>
      <div className="mx-auto">
        <div className="results max-w-3xl pb-14 text-center">
          <h2 className="text-slate-700 text-3xl font-semibold mb-10">
            Resultado das suas Vendas
          </h2>
          <div className="flex justify-around m-auto columns-2 gap-8 max-w-3xl">
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
        <div className="max-w-3xl m-auto">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Produtos em Estoque
          </h3>
          {produtosEmEstoque.produtos &&
          produtosEmEstoque.produtos.length > 0 ? (
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
                {produtosEmEstoque.produtos.map((produto) => (
                  <tr key={produto.id} className="border border-slate-300">
                    <td>{produto.id}</td>
                    <td>{produto.nomeProduto}</td>
                    <td>{produto.precoUnitario}</td>
                    <td>{produto.totalEstoque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum produto em estoque.</p>
          )}
        </div>
      </div>
    </section>
  );
}
