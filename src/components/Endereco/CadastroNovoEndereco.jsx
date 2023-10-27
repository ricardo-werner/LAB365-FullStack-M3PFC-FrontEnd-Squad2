import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../service/api";
import {
  pegarDetalheEndereco,
  pegarLatLongPeloCEP,
} from "../../service/viaCep";
import { formataCEP } from "../../utils/validacoes";

const formDadosIniciais = {
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
  lat: "",
  long: "",
};

const camposForm = [
  { name: "cep", label: "CEP", type: "text" },
  { name: "estado", label: "Estado", type: "text" },
  { name: "cidade", label: "Cidade", type: "text" },
  { name: "bairro", label: "Bairro", type: "text" },
  { name: "logradouro", label: "Logradouro", type: "text" },
  { name: "numero", label: "Número", type: "text" },
  { name: "complemento", label: "Complemento", type: "text" },
  { name: "lat", label: "Latitude", type: "text" },
  { name: "long", label: "Longitude", type: "text" },
];

export const FormCadastrarNovoEndereco = ({ onAdressCreated, onClose }) => {
  const [formData, setFormData] = useState(formDadosIniciais);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //aplica mascaras
    if (name === "cep") {
      setFormData({ ...formData, [name]: formataCEP(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCepBlur = async (e) => {
    const { value } = e.target;
    const soNumeroCEP = value.replace(/\D/g, "");

    if (soNumeroCEP.length === 8) {
      try {
        const enderecoData = await pegarDetalheEndereco(soNumeroCEP);
        const latLongData = await pegarLatLongPeloCEP(soNumeroCEP);

        if (enderecoData) {
          // Preencha os campos de endereço independentemente dos dados de latLongData
          const juntarData = {
            ...formData,
            estado: enderecoData.uf,
            cidade: enderecoData.localidade,
            bairro: enderecoData.bairro,
            logradouro: enderecoData.logradouro,
          };

          if (latLongData) {
            // Se latLongData existir, preencha os campos de latitude e longitude
            juntarData.lat = latLongData.lat;
            juntarData.long = latLongData.long;
          }
          setFormData(juntarData);
        } else {
          toast.error("CEP não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do endereço:", error);
        toast.error("Erro ao buscar detalhes do endereço");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataemMascaras = {
      ...formData,
      cep: formData.cep.replace(/\D/g, ""),
    };

    try {
      const response = await api.post(
        "/usuario/novo-endereco", //Ajustar API
        formDataemMascaras
      );
      if (response.status === 200) {
        toast.success("Endereço cadastrado com sucesso!");
        setFormData(formDadosIniciais);
        onAdressCreated();
        onClose();
      } else {
        toast.error(response.data.message); // Exibe a mensagem de erro da API em outros casos
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        toast.error("Erro ao cadastrar o endereço", error.response); // Erro genérico
      }
    }
  };

  return (
    <section className=" flex py-20 px-20">
      <form onSubmit={handleSubmit} className="mx-auto w-full">
        <h4 className="text-slate-700 text-3xl font-semibold mb-10  text-center">
          Cadastrar Endereço
        </h4>
        <div>
          <div className="endereco-section grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3">
            {camposForm.map((campo) => (
              <div key={campo.name} className="grid">
                <label className="text-slate-500 mb-2">{campo.label}</label>
                <div className="password-input">
                  <input
                    type={campo.type}
                    name={campo.name}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    onBlur={campo.name === "cep" ? handleCepBlur : null}
                    className="py-2 px-3 rounded border flex w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <button
            type="submit"
            className="text-black-800 font-bold bg-[#25D296] py-[9px] px-20 rounded lg:w-auto"
          >
            CADASTRAR
          </button>
        </div>
      </form>
    </section>
  );
};
