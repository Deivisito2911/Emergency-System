import React, { useState, useEffect } from 'react';
import './Alerta.scss';
import { Form, Button, Alert } from 'react-bootstrap';
import { createAlertaRequest, getEmbarcaciones } from '../../../api/alerta';
import { Embarcacion } from '../../../api/alerta';
import dangericon from '../../assets/danger-icon.png';

type FormData = {
  descripcion: string;
  embarcacionId: string;
};

const Alerta: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    descripcion: '',
    embarcacionId: '',
  });

  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'danger' | undefined>(undefined);

  useEffect(() => {
    const fetchEmbarcaciones = async () => {
      try {
        const res = await getEmbarcaciones();
        const data = await res.json();
        console.log("Embarcaciones obtenidas:", data); // Agregado para depuración
        setEmbarcaciones(data);
      } catch (error) {
        console.error('Error fetching embarcaciones:', error);
      }
    };

    fetchEmbarcaciones();
  }, []);

  useEffect(() => {
    if (formErrors.length > 0) {
      const timer = setTimeout(() => {
        setFormErrors([]);
      }, 3000); // Oculta los errores después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [formErrors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      embarcacionId: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar campos requeridos
    const requiredFields: (keyof FormData)[] = ['descripcion', 'embarcacionId'];
    const errors: string[] = [];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors.push(`El campo ${field} es requerido.`);
      }
    });

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    // Si no hay errores, enviar el formulario
    try {
      console.log("Datos del formulario:", formData); // Agregado para depuración
      const res = await createAlertaRequest(formData);
      const data = await res.json();

      if (res.status >= 200 && res.status < 300) {
        console.log(data);
        setMessage('La alerta se ha registrado correctamente');
        setMessageType('success');
      } else {
        setMessage('Hubo un error al registrar la alerta');
        setMessageType('danger');
      }
    } catch (error) {
      console.error('Error al registrar la alerta:', error);
      setMessage('Hubo un error al registrar la alerta');
      setMessageType('danger');
    }

    setTimeout(() => {
      setMessage(null);
      setMessageType(undefined);
    }, 3000); // Oculta el mensaje después de 3 segundos
  };

  return (
    <div className="register-form">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title" style={{ textAlign: 'center' }}>Registrar Alerta</h2>
          <a
            className="danger-icon-link"
            href="https://www.flaticon.es/iconos-gratis/embarcacion"
            title="Embarcacion iconos creados por Freepik - Flaticon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={dangericon} alt="danger icon" className="danger-icon" />
          </a>

          <br />
          {message && (
            <div className="alert-container">
              <Alert variant={messageType}>{message}</Alert>
            </div>
          )}

          {formErrors.length > 0 && (
            <div className="alert-container">
              <Alert variant="danger">
                <ul>
                  {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <Form.Label className='label'>Descripción *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='Ingrese un mensaje de Alerta'
                  className="form-control"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  name="descripcion"
                  isInvalid={formErrors.includes('El campo descripcion es requerido.')}
                />
                <Form.Control.Feedback type="invalid">
                  La descripción es requerida.
                </Form.Control.Feedback>
                <br />
                <Form.Label className='label'>ID de la Embarcación *</Form.Label>
                <div>
                  <Form.Select
                    className="form-select"
                    value={formData.embarcacionId}
                    onChange={handleSelectChange}
                    name="embarcacionId"
                    isInvalid={formErrors.includes('El campo embarcacionId es requerido.')}
                  >
                    <option value="" disabled>Seleccione la Embarcación</option>
                    {embarcaciones.map((embarcacion) => (
                      <option key={embarcacion.id} value={embarcacion.id}>
                        {embarcacion.nombre} - {embarcacion.id}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    El ID de la embarcación es requerido.
                  </Form.Control.Feedback>
                </div>
              </div>
            </div>
            <Button type="submit" className="btn-primary" id="submit-button">Registrar</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Alerta;