import './App.css';
import FinalizarCompraCard from '../src/components/FinalizarCompra/FinalizarCompraCard';
import Medicamentos from './pages/Medicamentos/Medicamentos';
import MedicamentoCreate from './pages/Medicamentos/MedicamentoCreate';

function App() {

  return (

    <div className='App'>
      <div>
        <Medicamentos />
        <FinalizarCompraCard />
        <MedicamentoCreate />
      </div>

      {/*<AppRouter />*/}

    </div>

  )
}

export default App