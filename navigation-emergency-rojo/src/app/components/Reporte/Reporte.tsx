import React, { useState, useEffect } from 'react';
import './Reporte.scss';
import { Form, Button, Alert, FormLabel } from 'react-bootstrap';
import {
  createReporteRequest,
  getEmbarcaciones,
  getAlertaByEmbarcacionId,
} from '../../../api/reporte';
import { Embarcacion } from '../../../api/reporte';

type FormData = {
  fecha_reporte: string;
  tipo_emergencia: string;
  latitud: string;
  longitud: string;
  descripcion: string;
  embarcacionId: string;
  alertaId: string;
};

const Reporte: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fecha_reporte: '',
    tipo_emergencia: '',
    latitud: '',
    longitud: '',
    descripcion: '',
    embarcacionId: '',
    alertaId: '',
  });

  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
  const [alertaUUID, setAlertaUUID] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<
    'success' | 'danger' | undefined
  >(undefined);

  useEffect(() => {
    const fetchEmbarcaciones = async () => {
      try {
        const res = await getEmbarcaciones();
        const data = await res.json();
        setEmbarcaciones(data);
      } catch (error) {
        console.error('Error fetching embarcaciones:', error);
      }
    };

    fetchEmbarcaciones();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === 'embarcacionId') {
      try {
        const res = await getAlertaByEmbarcacionId(value);
        const data = await res.json();
        if (res.status >= 200 && res.status < 300) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            alertaId: data.id,
          }));
          setAlertaUUID(data.id);
        } else {
          setFormData((prevFormData) => ({ ...prevFormData, alertaId: '' }));
          setAlertaUUID(null);
        }
      } catch (error) {
        console.error('Error fetching alerta:', error);
        setFormData((prevFormData) => ({ ...prevFormData, alertaId: '' }));
        setAlertaUUID(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar campos requeridos
    const requiredFields: (keyof FormData)[] = [
      'fecha_reporte',
      'tipo_emergencia',
      'latitud',
      'longitud',
      'descripcion',
      'embarcacionId',
    ];
    const errors: string[] = [];
    requiredFields.forEach((field) => {
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
      const res = await createReporteRequest(formData);
      const data = await res.json();

      if (res.status >= 200 && res.status < 300) {
        console.log(data);
        setMessage('El reporte se ha registrado correctamente');
        setMessageType('success');
      } else {
        setMessage('Hubo un error al registrar el reporte');
        setMessageType('danger');
      }
    } catch (error) {
      console.error('Error al registrar el reporte:', error);
      setMessage('Hubo un error al registrar el reporte');
      setMessageType('danger');
    }

    setTimeout(() => {
      setMessage(null);
      setMessageType(undefined);
    }, 3000); // Oculta el mensaje después de 3 segundos
  };

  useEffect(() => {
    if (formErrors.length > 0) {
      const timer = setTimeout(() => {
        setFormErrors([]);
      }, 3000); // Oculta los errores después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [formErrors]);

  return (
    <div className="reporte-form">
      <div className="reporte-card">
        <div className="reporte-card-body">
          <h2 className="reporte-card-title">Registrar Reporte</h2>
          <br />
          {message && (
            <div className="reporte-alert-container">
              <Alert variant={messageType}>{message}</Alert>
            </div>
          )}
          {formErrors.length > 0 && (
            <div className="reporte-alert-container">
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
            <div className="reporte-row">
              <div className="reporte-col-md-6">
                <FormLabel className="label">Descripción *</FormLabel>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  className="reporte-form-control"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  name="descripcion"
                  isInvalid={formErrors.includes(
                    'El campo descripcion es requerido.'
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  La descripción es requerida.
                </Form.Control.Feedback>

                <FormLabel className="label">Tipo de Emergencia *</FormLabel>
                <Form.Select
                  className="formSelectTipoEmergencia"
                  aria-label="Selecciona el tipo de emergencia"
                  value={formData.tipo_emergencia}
                  onChange={handleSelectChange}
                  name="tipo_emergencia"
                  isInvalid={formErrors.includes(
                    'El campo tipo_emergencia es requerido.'
                  )}
                >
                  <option value="" disabled>
                    Selecciona un tipo
                  </option>
                  <option value="Hundimiento">Hundimiento</option>
                  <option value="Hombre al Agua">Hombre al Agua</option>
                  <option value="Incendio">Incendio</option>
                  <option value="Explosión">Explosión</option>
                  <option value="Avería Mecánica">Avería Mecánica</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  El tipo de emergencia es requerido.
                </Form.Control.Feedback>

                <br />
                <FormLabel className="label">Latitud *</FormLabel>
                <Form.Control
                  type="text"
                  placeholder="Latitud"
                  className="reporte-form-control"
                  value={formData.latitud}
                  onChange={handleInputChange}
                  name="latitud"
                  isInvalid={formErrors.includes(
                    'El campo latitud es requerido.'
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  La latitud es requerida.
                </Form.Control.Feedback>

                <FormLabel className="label">Longitud *</FormLabel>
                <Form.Control
                  type="text"
                  placeholder="Longitud"
                  className="reporte-form-control"
                  value={formData.longitud}
                  onChange={handleInputChange}
                  name="longitud"
                  isInvalid={formErrors.includes(
                    'El campo longitud es requerido.'
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  La longitud es requerida.
                </Form.Control.Feedback>
              </div>
              <div className="reporte-col-md-6">
                <FormLabel className="label">Fecha del Reporte *</FormLabel>
                <Form.Control
                  type="date"
                  placeholder="Fecha del Reporte"
                  className="reporte-form-control"
                  value={formData.fecha_reporte}
                  onChange={handleInputChange}
                  name="fecha_reporte"
                  isInvalid={formErrors.includes(
                    'El campo fecha_reporte es requerido.'
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  La fecha del reporte es requerida.
                </Form.Control.Feedback>

                <FormLabel className="label">ID de la Embarcación *</FormLabel>
                <select
                  className="reporte-form-select"
                  aria-label="Selecciona una embarcación"
                  value={formData.embarcacionId}
                  onChange={handleSelectChange}
                  name="embarcacionId"
                  required
                >
                  <option value="" disabled>
                    Selecciona una embarcación
                  </option>
                  {embarcaciones.map((embarcacion) => (
                    <option key={embarcacion.id} value={embarcacion.id}>
                      {embarcacion.nombre} - {embarcacion.id}
                    </option>
                  ))}
                </select>
                <Form.Control.Feedback type="invalid">
                  El ID de la embarcación es requerido.
                </Form.Control.Feedback>

                <FormLabel className="label">ID de la Alerta *</FormLabel>
                <Form.Control
                  type="text"
                  placeholder="ID de la Alerta"
                  className="reporte-form-control"
                  value={alertaUUID || ''}
                  readOnly
                  disabled={!alertaUUID}
                />
                <Form.Control.Feedback type="invalid">
                  El ID de la Alerta es Requerido.
                </Form.Control.Feedback>
              </div>
            </div>
            <Button type="submit" className="reporte-submit-button">
              Registrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reporte;
