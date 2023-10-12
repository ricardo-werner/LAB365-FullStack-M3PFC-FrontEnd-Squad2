export function CartaoCredito() {
    return (
        <div className='mt-3'>
            <h3>Formulário do Cartão de Crédito</h3>
            <div className="container col-12 m-1">
                <div className="body">
                    <p className="text">Preencha os dados do seu cartão de crédito</p>
                </div>
                <div>
                    <div className='mt-3'>
                        <label htmlFor="numeroCartao">Número de Cartão:</label>
                        <input type="text" id="numeroCartao" />
                    </div>
                    <div>
                        <label htmlFor="nomeCartao">Nome no Cartão:</label>
                        <input type="text" id="nomeCartao" />
                    </div>
                    <div>
                        <label htmlFor="dataValidade">Data de Validade:</label>
                        <input type="text" id="dataValidade" />
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV (Código de Verificação):</label>
                        <input type="text" id="cvv" />
                    </div>
                </div>
            </div>
        </div>
    );
}