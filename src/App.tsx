import './App.scss';
import WalletForm from './UI/components/WalletForm/WalletForm.tsx';
import AddressData from './UI/components/AddressData/AddressData.tsx';

function App() {
  return (
    <main className={'mainContainer'}>
      <h1>ETH Transaction Crawler</h1>
      <WalletForm />
      <AddressData />
    </main>
  );
}

export default App;
