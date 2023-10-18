import React, { useEffect, useState } from 'react';
import { api } from '../../service/api';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export const ListarVendas = () => {
  const { user } = useContext(AuthContext);
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(user.id,"vendassss")

  useEffect(() => {
    if (!user) {
      return;
    }

    const listarVendas = async () => {
      try {
        const response = await api.get(`/venda/listarId/${user.id}`);
        setVendas(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    listarVendas();
  }, [user]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Vendas do Administrador: {user.nome}</h1>
      {vendas.map((venda) => (
        <div key={venda.id} className="card">
          <h2>Nome do produto: {venda.nomeProduto}</h2>
          <p>Quantidade de itens vendidos: {venda.quantidade}</p>
          <p>Preço unitário: R$ {venda.precoUnitario}</p>
          <p>Valor total da venda: R$ {venda.valorTotal}</p>
          <img src={venda.imagemProduto} alt={venda.nomeProduto} />
        </div>
      ))}
    </div>
  );
};
