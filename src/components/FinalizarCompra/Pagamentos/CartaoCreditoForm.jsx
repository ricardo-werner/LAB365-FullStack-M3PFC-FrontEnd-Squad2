import Card from '@mui/material/Card';
import Contaniner from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export function CartaoCredito() {
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
                        label="Número do Cartão"
                        variant="standard"
                        required
                    />
                    <TextField
                        label="Nome no Cartão"
                        variant="standard"
                        required
                    />
                    <TextField
                        type='number'
                        label="Data de Validade"
                        variant="standard"
                        required
                    />
                    <TextField
                        type='number'
                        label="CVV"
                        variant="standard"
                        required
                    />
                </Stack>
            </Contaniner>
        </Card>
    );
}





//export function CartaoCredito() {
//     return (
//         <div className='mt-3'>
//             <h3>Formulário do Cartão de Crédito</h3>
//             <div className="container col-12 m-1">
//                 <div className="body">
//                     <p className="text">Preencha os dados do seu cartão de crédito</p>
//                 </div>
//                 <div>
//                     <div className='mt-3'>
//                         <label htmlFor="numeroCartao">Número de Cartão:</label>
//                         <input type="text" id="numeroCartao" />
//                     </div>
//                     <div>
//                         <label htmlFor="nomeCartao">Nome no Cartão:</label>
//                         <input type="text" id="nomeCartao" />
//                     </div>
//                     <div>
//                         <label htmlFor="dataValidade">Data de Validade:</label>
//                         <input type="text" id="dataValidade" />
//                     </div>
//                     <div>
//                         <label htmlFor="cvv">CVV (Código de Verificação):</label>
//                         <input type="text" id="cvv" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }