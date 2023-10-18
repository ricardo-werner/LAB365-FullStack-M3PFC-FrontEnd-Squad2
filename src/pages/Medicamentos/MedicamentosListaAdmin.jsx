import React, { useState, useEffect } from "react";
import { api } from "../../service/api";
import { toast } from "react-toastify";

export default MedicamentosListaAdmin = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(20);
  const [pesquisar, setPesquisar] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
  const [selecionarMedicamentoId, setSelecionarMedicamentoId] = useState("");
  const [totalMedicamentos, setTotalMedicamentos] = useState(0);
  const [medicamentoEditado, setMedicamentoEditado] = useState({
    nomeCompleto: "",
    email: "",
    cpf: "",
    telefone: "",
    tipoUsuario: "",
  });
  const [medicamentoOriginal, setMedicamentoOriginal] = useState({});

  console.log(selecionarMedicamentoId, "selecionarMedicamentoId");
  const getInfoMedicamento = async (medicamentoId) => {
    setSelecionarMedicamentoId(medicamentoId);

    try {
      const response = await api.get(`/comprador/admin/${medicamentoId}`);
      const infoMedicamento = response.data;
      setMedicamentoOriginal(infoMedicamento);
      setMedicamentoEditado(infoMedicamento);
      setAbrirModal(true);
    } catch (error) {
      console.error("Erro ao carregar informações do medicamento:", error);
    }
  };

  useEffect(() => {
    // Função para buscar usuários do banco de dados com filtro e paginação
    const fetchMedicamentos = async () => {
      const offset = (paginaAtual - 1) * itensPorPagina;

      try {
        const response = await api.get(`/produto/${offset}/${itensPorPagina}`, {
          params: { nomeCompleto: pesquisar },
        });

        if (Array.isArray(response.data.resultados)) {
          setMedicamentos(response.data.resultados);
          setTotalMedicamentos(response.data.contar);
        } else {
          console.log("Dados da Api não são um array", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchMedicamentos();
  }, [paginaAtual, itensPorPagina, pesquisar]);

  // Função para salvar as alterações no modal de edição
  const handleSalvarAlteracoes = async () => {
    const dadosAlterados = {};
    for (const campo in medicamentoEditado) {
      if (medicamentoEditado[campo] !== medicamentoOriginal[campo]) {
        dadosAlterados[campo] = medicamentoEditado[campo];
      }
    }

    try {
      const response = await api.patch(
        `/comprador/admin/${selecionarMedicamentoId}`,
        dadosAlterados
      );

      if (response.status === 204) {
        toast.success("Alterações salvas com sucesso.");
        setAbrirModal(false);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Função para fechar o modal de edição
  const handleFecharModal = () => {
    setAbrirModal(false);
    setMedicamentoEditado({
      nomeCompleto: "",
      email: "",
      cpf: "",
      telefone: "",
      tipoUsuario: "",
    });
    setMedicamentoOriginal({});
  };

  const handlePesquisar = (e) => {
    setPesquisar(e.target.value);
    setPaginaAtual(1);
  };

  return (
    <section className="lista-medicamentos pb-20 px-20">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">
        Medicamentos Cadastrados
      </h3>

      <input
        className="py-2 px-3 mb-4 border rounded w-80"
        type="text"
        placeholder="Filtrar por Nome"
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
          {medicamentos.map((usuario) => (
            <tr key={usuario.id} className="border border-slate-300">
              <td>{usuario.id}</td>
              <td>{usuario.cpf}</td>
              <td>{usuario.nomeCompleto}</td>
              <td>{usuario.dataNascimento}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.tipoUsuario}</td>
              <td>
                <button onClick={() => getInfoMedicamento(usuario.id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination flex justify-between mt-4 ">
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
          disabled={paginaAtual * itensPorPagina >= totalMedicamentos}
        >
          Próximo
        </button>
      </div>

      {abrirModal && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md shadow w-7/12">
            <h3 className="text-lg font-semibold text-slate-500 mb-4">
              Editar Usuário
            </h3>
            <div>
              <label htmlFor="email" className="text-slate-600 mb-2 mt-3">
                Email:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="email"
                placeholder="Email"
                value={medicamentoEditado.email}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="cpf" className="text-slate-600 mb-2 mt-3">
                CPF:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="cpf"
                placeholder="CPF"
                value={medicamentoEditado.cpf}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    cpf: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="telefone" className="text-slate-600 mb-2 mt-3">
                Telefone:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="telefone"
                placeholder="Telefone"
                value={medicamentoEditado.telefone}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    telefone: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="tipoUsuario" className="text-slate-600 mb-2 mt-3">
                Tipo de Usuário:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="tipoUsuario"
                placeholder="Tipo de Usuário"
                value={medicamentoEditado.tipoUsuario}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    tipoUsuario: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-5 mt-5">
              <button
                onClick={handleSalvarAlteracoes}
                className="text-green-800 font-semibold bg-[#25D296] hover:bg-[#12b97f]  py-[9px] px-14 rounded"
              >
                SALVAR
              </button>
              <button
                onClick={handleFecharModal}
                className="bg-red-300 hover:bg-red-400 py-[9px] px-14 rounded text-red-800 font-semibold"
              >
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
