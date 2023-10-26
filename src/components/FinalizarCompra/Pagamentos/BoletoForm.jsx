import Card from '@mui/material/Card';
import Contaniner from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export const Boleto = () => {
  return (
    <Card
      sx={{
        margin: 2,
        padding: 2,
      }}
    >
      <Contaniner
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Stack
          component="form"
          sx={{
            width: '50vw',
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            label="Nome / Razão Social"
            variant="standard"
            required
          />
          <TextField label="CPF / CNPJ" variant="standard" required />
          <TextField type="email" label="E-mail" variant="standard" required />
        </Stack>
      </Contaniner>
    </Card>
  );
};

// export function Boleto() {
//     return (
//         <div className='mt-3'>
//             <h3>Formulário de Boleto</h3>
//             <div className="container col-12 m-1">
//                 <div className="body">
//                     <p className="text">Preencha os dados para gerar o seu boleto</p>
//                 </div>
//                 <div>
//                     <div className='mt-3'>
//                         <label htmlFor="nomeCompleto">Nome/Razão Social Completo:</label>
//                         <input type="text" id="nomeCompleto" />
//                     </div>
//                     <div>
//                         <label htmlFor="cpf-cnpj">CPF/CNPJ:</label>
//                         <input type="text" id="cpf-cnpj" />
//                     </div>
//                     <div>
//                         <label htmlFor="email">E-mail:</label>
//                         <input type="email" id="email" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
