import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Selector from '../inputs/selector';
import TextInput from '../inputs/TextInput';
import MapaInput from '../../components/mapaInput';
import Message from '../Message';

import { tiposIncendio, prioridadesIncendio, magnitudesIncendio, estatusIncendio, MunicipiosNE } from '../../pages/data/opcionesSelectorIncendio';
import { useInput } from '../hooks/UseInput';
import { sendFireIncidentReport } from "../../services/fireIncidentsService";
import { MapIcon } from '@heroicons/react/24/outline';

interface ReporteIncendioFormProps {
    onSubmit: () => void;
}

const ReporteIncendioForm: React.FC<ReporteIncendioFormProps> = ({ onSubmit }) => {
    const [showMapa, setShowMapa] = useState(true);
    const [latitudeInput, setLatitudeInput] = useState<string>('');
    const [longitudeInput, setLongitudeInput] = useState<string>('');

    const [tipoIncendio, setTipoIncendio] = useState<string>(tiposIncendio[0].value);
    const [prioridadIncendio, setPrioridadIncendio] = useState<string>(prioridadesIncendio[0].value);
    const [magnitudIncendio, setMagnitudIncendio] = useState<string>(magnitudesIncendio[0].value);
    const [estatusIncendioValue, setEstatusIncendio] = useState<string>(estatusIncendio[0].value);
    const [MunicipioNE, setMunicipioNE] = useState<string>(MunicipiosNE[0].value);
    const nombreReportante = useInput('');
    const tituloReporte = useInput('');

    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const navigate = useNavigate();

    const handleMarkerAdd = (lon: number, lat: number) => {
        setLongitudeInput(lon.toString());
        setLatitudeInput(lat.toString());
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const incidentData = {
            titulo: tituloReporte.value,
            tipoIncendio,
            prioridad: prioridadIncendio,
            magnitud: magnitudIncendio,
            estatus: estatusIncendioValue,
            depBomberos: MunicipioNE,
            telefonoReportante: e.currentTarget['telefono-reportante'].value,
            nombreReportante: nombreReportante.value,
            notas: e.currentTarget['descripcion-incendio'].value,
            latitud: latitudeInput,
            longitud: longitudeInput
        };

        try {
            await sendFireIncidentReport(incidentData);
            setMessage({ type: 'success', text: 'Reporte enviado con éxito' });
            onSubmit();
            setTimeout(() => { navigate('/'); }, 3000);
        } catch (error) {
            const errorMessage = (error as Error).message;
            setMessage({ type: 'error', text: `Error al enviar el reporte: ${errorMessage}` });
        }
    };

    function toggleMapaUbicacion() {
        setShowMapa(!showMapa)
    }

    return (
        <>
        <div className="container">
            {message && (
                <Message
                    type={message.type}
                    message={message.text}
                    onClose={() => setMessage(null)}
                />
            )}
        </div>
        <div className="form-container d-flex justify-content-between">
            <form id="reporte-incendio" onSubmit={handleFormSubmit}>
                <div className="row g-5">
                    <div className="col-auto">
                        <TextInput
                            id="titulo-reporte"
                            name="titulo-reporte"
                            label="Titulo del Reporte"
                            placeholder="Ingresa el titulo del reporte"
                            value={tituloReporte.value}
                            onChange={tituloReporte.onChange}
                            required
                        />
                    </div>
                    <div className="col-auto">
                        <Selector
                            id="tipo-incendio"
                            name="tipo-incendio"
                            label="Tipo de Incendio"
                            options={tiposIncendio}
                            value={tipoIncendio}
                            onChange={setTipoIncendio}
                            required
                        />
                    </div>
                </div>
                <div className="row g-5 pt-4">
                    <div className="col-auto">
                        <Selector
                            id="prioridad-incendio"
                            name="prioridad-incendio"
                            label="Prioridad del Incendio"
                            options={prioridadesIncendio}
                            value={prioridadIncendio}
                            onChange={setPrioridadIncendio}
                            required
                        />
                    </div>
                    <div className="col-auto">
                        <Selector
                            id="magnitud-incendio"
                            name="magnitud-incendio"
                            label="Magnitud del Incendio"
                            options={magnitudesIncendio}
                            value={magnitudIncendio}
                            onChange={setMagnitudIncendio}
                            required
                        />
                    </div>
                </div>
                <div className="row g-5 pt-4">
                    <div className="col-auto">
                        <Selector
                            id="estatus-incendio"
                            name="estatus-incendio"
                            label="Estatus del Incendio"
                            options={estatusIncendio}
                            value={estatusIncendioValue}
                            onChange={setEstatusIncendio}
                            required
                        />
                    </div>
                    <div className="col-auto">
                        <Selector
                            id="dep-bomberos"
                            name="dep-bomberos"
                            label="Dep. Bomberos Asignado"
                            options={MunicipiosNE}
                            value={MunicipioNE}
                            onChange={setMunicipioNE}
                            required
                        />
                    </div>
                </div>
                <div className="row g-5 pt-4">
                    <div className="col-auto">
                        <TextInput
                            id="latitud"
                            name="latitud"
                            label="Latitud"
                            placeholder="Ingresa la latitud del incendio"
                            value={latitudeInput}
                            onChange={(e) => setLatitudeInput(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="col-auto">
                        <TextInput
                            id="longitud"
                            name="longitud"
                            label="Longitud"
                            placeholder="Ingresa la longitud del incendio"
                            value={longitudeInput}
                            onChange={(e) => setLongitudeInput(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                </div>
                <small id="coordsHelpBlock" className="form-text text-muted">
                    Las coordenadas son colocadas automáticamente al designar un marcador.
                </small>
                <div className="form-section">
                    <h3 className="form-title">Información Adicional</h3>
                </div>
                <div className="row g-5 pt-4">
                    <div className="col-auto">
                        <label htmlFor="telefono-reportante">Número telefónico del reportante *</label>
                        <input className="form-control" type="phone" name="telefono-reportante" placeholder="(0412) 596 5833" id="telefono-reportante" required />
                    </div>
                    <div className="col-auto">
                        <TextInput
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            placeholder="Ingresa nombre del reportante"
                            value={nombreReportante.value}
                            onChange={nombreReportante.onChange}
                        />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-auto">
                        <label htmlFor="descripcion-incendio">Notas del Incendio *</label>
                        <textarea className="form-control" name="descripcion-incendio" placeholder="Proporciona todos los detalles posibles con respecto al incendio." id="descripcion-incendio" />
                    </div>
                </div>
            </form>
            <div className="map-container">
                <button onClick={toggleMapaUbicacion} className="btn btn-form btn-light boton-mapa mb-3">
                    <MapIcon className="iconos-tabla" />
                </button>
                {showMapa && <MapaInput onMarkerAdd={handleMarkerAdd} />}
            </div>
        </div>
        </>
    );
};

export default ReporteIncendioForm;