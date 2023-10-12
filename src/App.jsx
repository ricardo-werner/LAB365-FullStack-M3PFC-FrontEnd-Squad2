import './App.css';
import FinalizarCompraCard from '../src/components/FinalizarCompra/FinalizarCompraCard';


import Medicamentos from './pages/Medicamentos/Medicamentos';

function App() {

  return (
    <div className='App'>
      <div>
        <Medicamentos />
        <FinalizarCompraCard />
      </div>

      {/*<AppRouter />*/}

    </div>
  )
}

export default App
