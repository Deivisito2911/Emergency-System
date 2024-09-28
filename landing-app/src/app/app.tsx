import { sessionValidator } from '@emgencias-udo/lib/shared-react-auth';
import NxWelcome from './nx-welcome';
import { useEffect, useState } from 'react';

export function App() {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    //if (!isAuth) sessionValidator().then(() => setIsAuth(true));
  }, [isAuth]);

  return <div>{isAuth && <NxWelcome title="landing-app" />}</div>;
}

export default App;
