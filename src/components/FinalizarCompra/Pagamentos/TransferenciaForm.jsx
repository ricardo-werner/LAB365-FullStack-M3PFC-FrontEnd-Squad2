export function Transferencia() {
    return (
        <div className='mt-3'>
            <h3>Dados para Transferência Bancária</h3>
            <div className="container col-12 m-1">
                <div className="body">
                    <p className="text">Anote os dados abaixo para realizar uma transferência bancária</p>
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
                        <label htmlFor="banco">Banco:</label>
                        <input type="text" id="banco" />
                    </div>
                    <div>
                        <label htmlFor="agencia">Agência:</label>
                        <input type="text" id="agencia" />
                    </div>
                    <div>
                        <label htmlFor="conta">Conta:</label>
                        <input type="text" id="conta" />
                    </div>
                    <div>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Tipo de Conta
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" >Corrente</a></li>
                                <li><a className="dropdown-item" >Poupança</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}