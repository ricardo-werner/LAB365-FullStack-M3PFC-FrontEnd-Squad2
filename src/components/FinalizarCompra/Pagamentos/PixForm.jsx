export function Pix() {
    return (
        <div className='mt-3'>
            <h3>Formulário de Pix</h3>
            <div className="container col-12 m-1">
                <div className="body">
                    <p className="text">Dados para a realização de um Pix</p>
                </div>
                <div>
                    <div className='mt-3'>
                        <label htmlFor="celular">Celular</label>
                        <input type="text" id="celular" />
                    </div>
                    <div>
                        <label htmlFor="cpf-cnpj">CPF/CNPJ:</label>
                        <input type="text" id="cpf-cnpj" />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" />
                    </div>
                </div>
            </div>
        </div>
    );
}