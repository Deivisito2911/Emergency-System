import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReporteById, updateReporte } from '../../../api/reporte';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditReporte.scss';

interface Reporte {
  id: string;
  fecha_reporte: string;
  tipo_emergencia: string;
  latitud: string;
  longitud: string;
  descripcion: string;
  embarcacionId: string;
  alertaId: string;
}

const EditReporte: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchReporte = async () => {
      if (id) {
        try {
          const response = await getReporteById(id);
          const data = await response.json();
          setReporte(data);
        } catch (error) {
          console.error('Error fetching embarcacion:', error);
        }
      }
    };

    fetchReporte();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReporte(
      (prevState) =>
        ({
          ...prevState,
          [name]: value,
        } as Reporte)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (reporte) {
        await updateReporte(reporte);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate('/table-reporte');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating reporte:', error);
    }
  };

  return (
    <div className="container mt-5 bg-white p-4 rounded shadow-sm">
      <h2 className="text-center mb-4">Editar Reporte</h2>
      {showMessage && (
        <div className="alert alert-success" role="alert">
          Cambios guardados con éxito!
        </div>
      )}
      {reporte && (
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="fecha_reporte" className="form-label">
                  Fecha del Reporte
                </label>
                <input
                  type="date"
                  className="form-control custom-input"
                  id="fecha_reporte"
                  name="fecha_reporte"
                  value={reporte.fecha_reporte}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa la Fecha
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="tipo_emergencia" className="form-label">
                  Tipo de Emergencia
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="tipo_embarcacion"
                  name="tipo_reporte"
                  value={reporte.tipo_emergencia}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa el tipo de Emergencia
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="latitud" className="form-label">
                  Latitud
                </label>
                <input
                  type="number"
                  className="form-control custom-input"
                  id="latitud"
                  name="latitud"
                  value={reporte.latitud}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa la Latitud
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="longitud" className="form-label">
                  Longitud
                </label>
                <input
                  type="number"
                  className="form-control custom-input"
                  id="longitud"
                  name="longitud"
                  value={reporte.longitud}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa la Longitud
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripcion
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="descripcion"
                  name="descripcion"
                  value={reporte.descripcion}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, ingresa la descripcion.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="embarcacionId" className="form-label">
                  ID de la Embarcacion
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="embarcacionId"
                  name="embarcacionId"
                  value={reporte.embarcacionId}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="alertaId" className="form-label">
                  ID de la Alerta
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="alertaId"
                  name="alertaId"
                  value={reporte.alertaId}
                  onChange={handleInputChange}
                  disabled
                />
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

export default EditReporte;