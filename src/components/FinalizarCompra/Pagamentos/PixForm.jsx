import Card from '@mui/material/Card';
import Contaniner from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export function Pix() {
    return (
        <Card sx={{
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
                        type='number'
                        label="Celular"
                        variant="standard"
                        required
                    />
                    <TextField
                        label="CPF / CNPJ"
                        variant="standard"
                        required
                    />
                    <TextField
                        type='email'
                        label="E-mail"
                        variant="standard"
                        required
                    />
                </Stack>
            </Contaniner>
        </Card>
    );
}




// export function Pix() {
//     return (
//         <div className='mt-3'>
//             <h3>Formulário de Pix</h3>
//             <div className="container col-12 m-1">
//                 <div className="body">
//                     <p className="text">Dados para a realização de um Pix</p>
//                 </div>
//                 <div>
//                     <div className='mt-3'>
//                         <label htmlFor="celular">Celular</label>
//                         <input type="text" id="celular" />
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