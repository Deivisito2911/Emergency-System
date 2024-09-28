import React, { useState, useEffect } from 'react';
import Navbar from '../src/components/navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormularioAfectados from '../src/components/FormularioAfectados';
import { getIncidenciaById, patchIncidencia } from './api/incidencias';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { afectadoSchema } from './validation/incidencia.shemas';
import { Afectado } from '../src/types';
import { Link, useNavigate } from 'react-router-dom';
const RecepcionAfectados: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [afectados, setAfectados] = useState<Afectado[]>([]);
  const [cantidadAfectados, setCantidadAfectados] = useState<number>(0); // Estado para almacenar la cantidad de afectados

  useEffect(() => {
    const fetchIncidencia = async () => {
      try {
        const response = await getIncidenciaById(id!);
        if (response.status===200) {
          const data = response.data;
          const cantidadAfectados = data.cantidad_afectados; // Obtener la cantidad de afectados
          setCantidadAfectados(cantidadAfectados); // Almacenar la cantidad de afectados en el estado
          const initialAfectados = data.afectados.map(() => ({
            id: '',
            cedula: '',
            nombre: '',
            apellido: '',
            fecha_de_nacimiento: '',
            sexo: '',
            afecciones: '',
            estado: '',
            tipo_sangre: '',
          }));
          setAfectados(initialAfectados);
        } else {
          toast.error('Error al obtener los datos de la incidencia', {
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al conectar con el servidor', {
          position: 'top-right',
        });
      }
    };

    fetchIncidencia();
  }, [id]);

  const handleAfectadoChange = (index: number, data: Afectado) => {
    const nuevosAfectados = [...afectados];
    nuevosAfectados[index] = data;
    setAfectados(nuevosAfectados);
  };

  const navigate = useNavigate()

  const handleClick = () => {
    setTimeout(() => {
      navigate('/gestion');
    }, 3000); // 3000 milisegundos = 3 segundos
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      afectadoSchema.array().parse(afectados);

     // console.log('Datos enviados:', { afectados });

      const response = await patchIncidencia(id!, { afectados });
      if (response.status===200) {
        toast.success('Afectados registrados exitosamente!', {
          position: 'top-right',
        });
      } else {
        const errorData = response.data;
        toast.error(
          'Error al registrar afectados: ' + JSON.stringify(errorData),
          {
            position: 'top-right',
          }
        );
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

  console.log(cantidadAfectados)

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="p-6">
        <div className="container mx-8">
          <div className="flex justify-between items-center mb-12 mt-10">
            <div className="ml-12">
              <h1 className="text-4xl font-bold text-color-text-main">
                Agregar afectados
              </h1>
            </div>
            <div className="mr-20">
              <p className="text-lg font-bold text-color-text-main">
                Usuario (a) ...
              </p>
            </div>
          </div>

          <div className="bg-background-body w-11/12 mx-auto rounded-xl shadow-custom">
            <form onSubmit={handleSubmit} className="p-4 sm:p-8">
              {[...Array(cantidadAfectados)].map((_, index) => (
                <FormularioAfectados
                  key={index}
                  initialValues={afectados[index]}
                  onChange={(data) => handleAfectadoChange(index, data)}
                />
              ))}
              <div className="flex justify-center pt-16 pb-12">
                <button
                  type="submit"
                  className="rounded-md w-1/3 h-10 bg-background-button text-color-text-nav font-bold text-lg"
                  onClick={handleClick}
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

export default RecepcionAfectados;
