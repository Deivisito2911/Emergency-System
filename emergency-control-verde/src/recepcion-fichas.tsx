import React, { useState, useEffect } from 'react';
import Navbar from '../src/components/navbar';
import añadir from '../public/img/add.png';
import { DatosGestionFichas, Afectado } from './types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormularioDenunciante from '../src/components/FormularioDenunciante';
import FormularioIncidente from '../src/components/FormularioIncidente';
import FormularioAfectados from './components/FormularioAfectados';
import { denuncianteSchema, incidenteSchema, afectadoSchema } from './validation/incidencia.shemas';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getIncidenciaById, patchIncidencia } from '../src/api/incidencias';
import { z } from "zod";


const RecepcionFichas: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [incidencia, setIncidencia] = useState<DatosGestionFichas | null>(null);
  const [afectados, setAfectados] = useState<Afectado[]>([]);

  const navigate = useNavigate()

  const handleClick = () => {
    setTimeout(() => {
      navigate('/gestion');
    }, 3000); // 3000 milisegundos = 3 segundos
  };

  useEffect(() => {
    const fetchIncidencia = async () => {
      try {
        const response = await getIncidenciaById(id!);
        if (response.status === 200) {
          const data = response.data;
          setIncidencia(data);
          setAfectados(data.afectados || []);
        } else {
          toast.error('Error al obtener los datos de la incidencia', {
            position: 'top-right',
          });
        }
      } catch (error) {
        toast.error('Error al conectar con el servidor', {
          position: 'top-right',
        });
      }
    };

    fetchIncidencia();
  }, [id]);

  const handleDenuncianteChange = (data: any) => {
    setIncidencia((prev) => (prev ? { ...prev, denunciante: data } : prev));
  };

  const handleIncidenteChange = (data: any) => {
    setIncidencia((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const handleAfectadoChange = (index: number, data: Afectado) => {
    const nuevosAfectados = [...afectados];
    nuevosAfectados[index] = data;
    setAfectados(nuevosAfectados);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!incidencia) {
      toast.error('Error: No hay datos de la incidencia', {
        position: 'top-right',
      });
      return;
    }
  
    try {
      const { fecha, operador, ...datosEnvio } = {
        ...incidencia,
        afectados,
      };
  
      // Validación del denunciante
      denuncianteSchema.parse(incidencia.denunciante);
  
      // Validación del incidente
      incidenteSchema.parse({
        lugar: incidencia.lugar,
        cantidad_afectados: incidencia.cantidad_afectados,
        tipo: incidencia.tipo,
        descripcion: incidencia.descripcion,
      });
  
      // Validación de los afectados
      afectadoSchema.array().parse(afectados);
  
      console.log('Datos enviados:', datosEnvio); // Log para verificar los datos
  
      const response = await patchIncidencia(id!, datosEnvio);
      if (response.status === 200) {
        toast.success('Ficha actualizada exitosamente!', {
          position: 'top-right',
        });
      } else {
        const errorData = response.data;
        toast.error(
          'Error al actualizar la ficha: ' + JSON.stringify(errorData),
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
  
  if (!incidencia) return <div>Loading...</div>;

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="p-6">
        <div className="container mx-8">
          <div className="flex justify-between items-center mb-12 mt-10">
            <div className="ml-12">
              <h1 className="text-4xl font-bold text-color-text-main">
                Editar ficha (Ficha #)
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
              <div className="flex justify-end items-center mt-6">
                <Link to={`/agregar-afectados/${id}`} style={{ color: 'black' }}>
                  Agregar afectados
                  <img
                    src={añadir}
                    alt="add"
                    className="w-5 h-5 cursor-pointer"
                  />
                </Link>
              </div>
              <FormularioDenunciante
                initialValues={incidencia.denunciante}
                onChange={handleDenuncianteChange}
              />
              <FormularioIncidente
                initialValues={incidencia}
                onChange={handleIncidenteChange}
              />
              {afectados.map((afectado, index) => (
                <FormularioAfectados
                  key={index}
                  initialValues={afectado}
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

export default RecepcionFichas;
