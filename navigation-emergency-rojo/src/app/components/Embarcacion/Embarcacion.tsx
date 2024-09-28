import React, { useState, useEffect } from 'react';
import PaypalButton from '../Paypal/PaypalButton';
import './Embarcacion.scss';
import { Form, Button, Alert } from 'react-bootstrap';
import { createEmbarcacionRequest } from '../../../api/embarcacion';

type FormData = {
  nombre: string;
  tipo_embarcacion: string;
  tipo_material: string;
  capacidad_maxima: string;
  peso_embarcacion: string;
  fecha_fabricacion: string;
  cantidad_motor: string;
};

const Embarcacion: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    tipo_embarcacion: '',
    tipo_material: '',
    capacidad_maxima: '',
    peso_embarcacion: '',
    fecha_fabricacion: '',
    cantidad_motor: '',
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<
    'success' | 'danger' | undefined
  >(undefined);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (formErrors.length > 0) {
      const timer = setTimeout(() => {
        setFormErrors([]);
      }, 3000); // Oculta los Errores Después de 3 Segundos
      return () => clearTimeout(timer);
    }
  }, [formErrors]);

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar campos requeridos
    const requiredFields: (keyof FormData)[] = [
      'nombre',
      'tipo_embarcacion',
      'tipo_material',
      'capacidad_maxima',
      'peso_embarcacion',
      'fecha_fabricacion',
      'cantidad_motor',
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

    // Si no hay errores, enviar el Formulario
    try {
      const res = await createEmbarcacionRequest(formData);
      const data = await res.json();

      if (res.status >= 200 && res.status < 300) {
        console.log(data);
        setMessage('La embarcación se ha registrado correctamente');
        setMessageType('success');
      } else {
        setMessage('Hubo un error al registrar la embarcación');
        setMessageType('danger');
      }
    } catch (error) {
      console.error('Error al registrar la embarcación:', error);
      setMessage('Hubo un error al registrar la embarcación');
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
          <h3 className="card-title">Registrar Embarcación</h3>
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
            <div className="row gx-4">
              <div className="col-md-6 mb-4">
                <Form.Group controlId="formNombre">
                  <Form.Label className="label">Nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el Nombre"
                    value={formData.nombre}
                    onChange={handleStringChange}
                    name="nombre"
                    isInvalid={formErrors.includes(
                      'El campo nombre es requerido.'
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    El nombre es requerido.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Group controlId="formTipoEmbarcacion">
                  <Form.Label className="label">
                    Tipo de Embarcación *
                  </Form.Label>
                  <Form.Select
                    aria-label="Floating label select example"
                    value={formData.tipo_embarcacion}
                    onChange={handleSelectChange}
                    name="tipo_embarcacion"
                    isInvalid={formErrors.includes(
                      'El campo tipo_embarcacion es requerido.'
                    )}
                  >
                    <option value="" disabled>
                      Selecciona un tipo
                    </option>
                    <option value="Carga de Pasajero">Carga de Pasajero</option>
                    <option value="Buque Portacontenedores">
                      Buque Portacontenedores
                    </option>
                    <option value="Bote Pesquero">Bote Pesquero</option>
                    <option value="Buque Cisterna">Buque Cisterna</option>
                    <option value="Embarcacion de Vela">
                      Embarcacion de Vela
                    </option>
                    <option value="Submarino">Submarino</option>
                    <option value="Yate">Yate</option>
                    <option value="Granelero">Granelero</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    El tipo de embarcación es requerido.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Group controlId="formTipoMaterial">
                  <Form.Label className="label">Tipo de Material *</Form.Label>
                  <Form.Select
                    aria-label="Floating label select example"
                    value={formData.tipo_material}
                    onChange={handleSelectChange}
                    name="tipo_material"
                    isInvalid={formErrors.includes(
                      'El campo tipo_material es requerido.'
                    )}
                  >
                    <option value="" disabled>
                      Selecciona un tipo
                    </option>
                    <option value="Aluminio">Aluminio</option>
                    <option value="Fibra de vidrio">Fibra de vidrio</option>
                    <option value="Acero">Acero</option>
                    <option value="Madera">Madera</option>
                    <option value="Ferrocemento">Ferrocemento</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    El tipo de material es requerido.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Group controlId="formCapacidadMaxima">
                  <Form.Label className="label">
                    Capacidad Máxima de Carga *
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.capacidad_maxima}
                    onChange={handleNumberChange}
                    name="capacidad_maxima"
                    placeholder="Ingrese la Capacidad Maxima de Carga"
                    isInvalid={formErrors.includes(
                      'El campo capacidad_maxima es requerido.'
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    La capacidad máxima es requerida.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Group controlId="formPesoEmbarcacion">
                  <Form.Label className="label">
                    Peso de Embarcación *
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.peso_embarcacion}
                    onChange={handleNumberChange}
                    name="peso_embarcacion"
                    placeholder="Ingrese el Peso"
                    isInvalid={formErrors.includes(
                      'El campo peso_embarcacion es requerido.'
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    El peso de la embarcación es requerido.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Group controlId="formFechaFabricacion">
                  <Form.Label className="label">
                    Fecha de Fabricación *
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.fecha_fabricacion}
                    onChange={handleStringChange}
                    name="fecha_fabricacion"
                    isInvalid={formErrors.includes(
                      'El campo fecha_fabricacion es requerido.'
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    La fecha de fabricación es requerida.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-4">
                <Form.Group controlId="formCantidadMotor">
                  <Form.Label className="label">
                    Cantidad de Motores *
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.cantidad_motor}
                    onChange={handleNumberChange}
                    name="cantidad_motor"
                    placeholder="Ingrese la Cantidad de Motores"
                    isInvalid={formErrors.includes(
                      'El campo cantidad_motor es requerido.'
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    La cantidad de motores es requerida.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-4">
                <div className="mt-3">
                  <label className="label">Agregar un Método de Pago *</label>
                  <PaypalButton
                    totalValue={'100'}
                    invoice={'Gastos en impuestos'}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="btn-primary mt-3"
              id="submit-button"
            >
              Registrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Embarcacion;