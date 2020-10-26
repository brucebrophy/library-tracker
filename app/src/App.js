import { UserContextProvider } from './contexts/UserContext';
import Routes from './components/Routes';

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
