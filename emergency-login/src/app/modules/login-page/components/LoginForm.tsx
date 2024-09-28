import { useContext, useState } from 'react';
import { InputField } from '../../../atoms/inputs/input-field';
import { fetchLoginInApp } from '../../../core/api/login';
import {
  UserFormType,
  UserLoginFormTypeShema,
  defaultValues,
} from '../../../core/types/FormLoginType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../core/contexts/app/app-context';
import { KeyIcon } from '@heroicons/react/24/solid';

export function LoginForm() {
  const { showError, showInfo } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const methods = useForm<UserFormType>({
    defaultValues,
    resolver: zodResolver(UserLoginFormTypeShema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const loginInApp = async (data: UserFormType) => {
    try {
      //setLoading(true);
      await fetchLoginInApp(data);
      showInfo('Pronto sera Redireccionado');
    } catch (e) {
      const { message } = e as Error;
      showError(message);
      setLoading(false);
    }
  };
  const onFormError = () => ({});

  return (
    <form
      className="  rounded px-1 pt-1 pb-1 mb-10"
      onSubmit={handleSubmit(loginInApp, onFormError)}
    >
      <div className="mb-4">
        <InputField
          type="text"
          name="email"
          placeholder="user@emergencias-udo.com"
          errors={errors.email}
          label="Email"
          register={register}
        />
      </div>
      <div className="mb-6">
        <InputField
          type="password"
          name="password"
          placeholder="*******"
          errors={errors.password}
          label="Password"
          register={register}
        />
      </div>
      <div className="flex items-center justify-center mt-16">
        {loading && (
          <>
            <KeyIcon className="animate-spin h-5 w-5 mr-3 text-lg text-white"></KeyIcon>{' '}
            <span className="text-lg text-white">Verificando Acceso</span>
          </>
        )}
        {!loading && (
          <button
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Entrar
          </button>
        )}
      </div>
    </form>
  );
}
