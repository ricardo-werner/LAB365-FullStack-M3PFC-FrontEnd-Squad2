import "./Entrega.css";

export function Endereco() {
    return (
        <div className="form-floating">
            <select className="form-select " id="floatingSelect">
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        <label className="labelAdress"  htmlFor="floatingSelect">Selecione o Endereço</label>
</div>
        
    );
}


