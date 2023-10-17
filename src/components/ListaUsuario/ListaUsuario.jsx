import React, { useState, useEffect } from 'react';
import { api } from '../../service/api';
export const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(20);
  const [pesquisar, setPesquisar] = useState('');
  const [abrirModal, setAbrirModal] = useState(false);
  const [selecionaUsuarioId, setSelecionaUsuarioId] = useState('');
  const [usuarioEditado, setUsuarioEditado] = useState({});
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  useEffect(() => {
    // Função para buscar usuários do banco de dados com filtro e paginação
    const fetchUsuarios = async () => {
      const offset = (paginaAtual - 1) * itensPorPagina;

      try {
        const response = await api.get(
          `/comprador/admin/${offset}/${itensPorPagina}`,
          { params: { nomeCompleto: pesquisar } }
        );

        if (Array.isArray(response.data.resultados)) {
          setUsuarios(response.data.resultados);
          setTotalUsuarios(response.data.contar);
        } else {
          console.log('Dados da Api não são um array', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, [paginaAtual, itensPorPagina, pesquisar]);

  // Função para abrir o modal de edição
  const handleEditUsuario = (usuarioId) => {
    setAbrirModal(true);
    setSelecionaUsuarioId(usuarioId);
  };

  // Função para salvar as alterações no modal de edição
  const handleSalvarAlteracoes = async () => {
    try {
      const response = await api.patch(
        `/comprador/admin/${selecionaUsuarioId}`,
        usuarioEditado
      );
      console.log('Alterações salvas com sucesso:', response.data);
      setAbrirModal(false);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  // Função para fechar o modal de edição
  const handleCloseModal = () => {
    setAbrirModal(false);
  };

  const handlePesquisar = (e) => {
    setPesquisar(e.target.value);
    setPaginaAtual(1);
  };

  const hasNextPage = () => {
    const currentPageEnd = paginaAtual * itensPorPagina;
    return currentPageEnd < totalUsuarios;
  };

  return (
    <div className="lista-usuarios">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">
        Usuários Cadastrados
      </h3>

      <input
        type="text"
        placeholder="Filtrar por Nome Completo"
        value={pesquisar}
        onChange={handlePesquisar}
      />

      <table className="table-auto w-full">
        <thead>
          <tr className="border-2 border-slate-300 text-slate-500">
            <th>ID</th>
            <th>CPF</th>
            <th>Nome Completo</th>
            <th>Data Nascimento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Tipo Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border border-slate-300">
              <td>{usuario.id}</td>
              <td>{usuario.cpf}</td>
              <td>{usuario.nomeCompleto}</td>
              <td>{usuario.dataNascimento}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.tipoUsuario}</td>
              <td>
                <button onClick={() => handleEditUsuario(usuario.id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          disabled={paginaAtual  >= totalUsuarios} 
        >
          Próximo
        </button>
      </div>

      {abrirModal && (
        <div className="modal">
          <h3>Editar Usuário</h3>
          <input
            type="text"
            placeholder="Nome Completo"
            value={usuarioEditado.nomeCompleto}
            onChange={(e) =>
              setUsuarioEditado({
                ...usuarioEditado,
                nomeCompleto: e.target.value,
              })
            }
          />
          {/* Adicione inputs para outros campos editáveis */}
          <button onClick={handleSalvarAlteracoes}>SALVAR</button>
          <button onClick={handleCloseModal}>FECHAR</button>
        </div>
      )}
    </div>
  );
};
