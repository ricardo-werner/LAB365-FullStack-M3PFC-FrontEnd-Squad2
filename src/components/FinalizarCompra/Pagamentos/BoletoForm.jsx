export function Boleto() {
    return (
        <div className='mt-3'>
            <h3>Formulário de Boleto</h3>
            <div className="container col-12 m-1">
                <div className="body">
                    <p className="text">Preencha os dados para gerar o seu boleto</p>
                </div>
                <div>
                    <div className='mt-3'>
                        <label htmlFor="nomeCompleto">Nome/Razão Social Completo:</label>
                        <input type="text" id="nomeCompleto" />
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