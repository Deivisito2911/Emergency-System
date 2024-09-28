// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NxLogin } from './modules/login-page/nx-login';
import { AppContextProvider } from './core/contexts/app/app-context-provider';

export function App() {
  return (
    <AppContextProvider>
      <NxLogin title="emergency-login" />
    </AppContextProvider>
  );
}

export default App;
