import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmbarcacionById, updateEmbarcacion } from '../../../api/alerta';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditEmbarcacion.scss';

interface Embarcacion {
  id: string;
  nombre: string;
  tipo_embarcacion: string;
  tipo_material: string;
  capacidad_maxima: string;
  peso_embarcacion: string;
  fecha_fabricacion: string;
  cantidad_motor: string;
}

const EditEmbarcacion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [embarcacion, setEmbarcacion] = useState<Embarcacion | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchEmbarcacion = async () => {
      if (id) {
        try {
          const response = await getEmbarcacionById(id);
          const data = await response.json();
          setEmbarcacion(data);
        } catch (error) {
          console.error('Error fetching embarcacion:', error);
        }
      }
    };

    fetchEmbarcacion();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmbarcacion(
      (prevState) =>
        ({
          ...prevState,
          [name]: value,
        } as Embarcacion)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (embarcacion) {
        await updateEmbarcacion(embarcacion);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate('/table-embarcacion');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating embarcacion:', error);
    }
  };

  return (
    <div className="container mt-5 bg-white p-4 rounded shadow-sm">
      <h2 className="text-center mb-4">Editar Embarcación</h2>
      {showMessage && (
        <div className="alert alert-success" role="alert">
          Cambios guardados con éxito!
        </div>
      )}
      {embarcacion && (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="nombre"
                  name="nombre"
                  value={embarcacion.nombre}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa el nombre.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="tipo_embarcacion" className="form-label">
                  Tipo de Embarcación:
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="tipo_embarcacion"
                  name="tipo_embarcacion"
                  value={embarcacion.tipo_embarcacion}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa el tipo de embarcación.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="tipo_material" className="form-label">
                  Tipo de Material:
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="tipo_material"
                  name="tipo_material"
                  value={embarcacion.tipo_material}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa el tipo de material.
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="capacidad_maxima" className="form-label">
                  Capacidad Máxima:
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="capacidad_maxima"
                  name="capacidad_maxima"
                  value={embarcacion.capacidad_maxima}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa la capacidad máxima.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="peso_embarcacion" className="form-label">
                  Peso de la Embarcación:
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="peso_embarcacion"
                  name="peso_embarcacion"
                  value={embarcacion.peso_embarcacion}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa el peso de la embarcación.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="fecha_fabricacion" className="form-label">
                  Fecha de Fabricación:
                </label>
                <input
                  type="date"
                  className="form-control custom-input"
                  id="fecha_fabricacion"
                  name="fecha_fabricacion"
                  value={embarcacion.fecha_fabricacion}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa la fecha de fabricación.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="cantidad_motor" className="form-label">
                  Cantidad de Motores:
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="cantidad_motor"
                  name="cantidad_motor"
                  value={embarcacion.cantidad_motor}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa la cantidad de motores.
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-30 mt-3 mx-auto d-block"
          >
            Guardar Cambios
          </button>
        </form>
      )}
    </div>
  );
};

export default EditEmbarcacion;
