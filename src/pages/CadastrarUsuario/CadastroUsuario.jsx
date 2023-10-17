import React from 'react';
import FormCadastrarUsuario from '../../components/FormCadastroUsuario/FormCadastroUsuario';
import { ListaUsuarios } from '../../components/ListaUsuario/ListaUsuario';

const CadastroUsuario = () => {
  return (
    <div>
      <FormCadastrarUsuario />
      <ListaUsuarios />
    </div>
  );
};

export default CadastroUsuario;
