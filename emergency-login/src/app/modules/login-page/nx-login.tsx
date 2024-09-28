import LogoMD from '../../atoms/logos/logo';
import { LoginForm } from './components/LoginForm';

export function NxLogin({ title }: { title: string }) {
  return (
    <div className="flex justify-center items-center h-screen bg-sky-800 ">
      <div className="flex flex-col p-5 bg-sky-900 rounded-lg  w-full shadow-md md:w-2/5 ">
        <div className="mx-3 my-6 md:px-12">
          <LogoMD />
        </div>
        <div className="w-full max-w-full md:px-12">
          <LoginForm />
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 UDONE. Todos los derechos reservados. V 0.0.1
          </p>
        </div>
      </div>
    </div>
  );
}

export default NxLogin;
