import React, { useState } from 'react';
import Navbar from '../src/components/navbar';
import FormularioDenunciante from './components/FormularioDenunciante';
import FormularioIncidente from './components/FormularioIncidente';
import { createIncidencia} from './api/incidencias';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';

import {
  denuncianteSchema,
  incidenteSchema,
} from '../src/validation/incidencia.shemas'; // Importa los esquemas

const Recepcion: React.FC = () => {
  const [denunciante, setDenunciante] = useState({});
  const [incidente, setIncidente] = useState({});
  const [isFocused, setIsFocused] = useState(false); // Estado para controlar el foco

  const handleDenuncianteChange = (data: any) => {
    setDenunciante(data);
  };

  const handleIncidenteChange = (data: any) => {
    setIncidente(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const incidenciaData = {
      ...incidente,
      denunciante: denunciante,
      codigo: uuidv4(),
    };

    // Validar datos
    try {
      denuncianteSchema.parse(denunciante);
      incidenteSchema.parse(incidente);

      console.log('Datos enviados:', incidenciaData); // Log para verificar los datos
      const response = await createIncidencia(incidenciaData);
      if (response.status === 201) {
        toast.success('Incidencia creada exitosamente!', {
          position: 'top-right',
        });
        setTimeout(() => {
          window.location.reload(); // Recarga la página actual después de 1.5 segundos
        }, 1500);
      } else {
        const errorData = JSON.stringify(response);
        toast.error('Error al crear incidencia: ' + JSON.stringify(errorData), {
          position: 'top-right',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message, {
            position: 'top-right',
          });
        });
      } else {
        console.error('Error:', error);
        toast.error('Error al conectar con el servidor', {
          position: 'top-right',
        });
      }
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="p-6">
        <div className="container mx-8">
          <div className="flex justify-between items-center mb-12 mt-10">
            <div className="ml-12">
              <h1 className="text-4xl font-bold text-color-text-main">
                Recepcion de Llamada
              </h1>
            </div>
            <div className="mr-20">
              <p className="text-lg font-bold text-color-text-main">
                Usuario(a)...
              </p>
            </div>
          </div>

          <div className="bg-background-body w-11/12 mx-auto rounded-xl shadow-custom">
            <form onSubmit={handleSubmit} className="p-4 sm:p-8">
              <FormularioDenunciante onChange={handleDenuncianteChange} />
              <FormularioIncidente onChange={handleIncidenteChange} />
              <div className="flex justify-center pt-16 pb-12">
                <button
                  type="submit"
                  className="rounded-md w-1/3 h-10 bg-background-button text-color-text-nav font-bold text-lg"
                >
                  Cargar ficha
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Recepcion;
