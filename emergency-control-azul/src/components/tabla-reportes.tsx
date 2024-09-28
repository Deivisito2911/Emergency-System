import React, { useEffect, useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { getIncidents } from "../services/fireIncidentsService";
import TextInput from './inputs/TextInput';
import { Incident } from '../types';

const ReportsTable: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const itemsPerPage = 5;

  useEffect(() => {
    const loadIncidents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getIncidents();
        setIncidents(response);
      } catch (error) {
        const errorMessage = (error as Error).message;
        alert(`Error al obtener los reportes: ${errorMessage}`);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadIncidents();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const filteredIncidents = incidents.filter((incident) =>
    incident.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedIncidents = filteredIncidents.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="filtros-tabla d-flex">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-secondary button-filtro dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filtros
          </button>
        </div>
        <div className="col-auto">
          <TextInput
            id="busqueda-tabla"
            name="busqueda-tabla"
            label="Buscar"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="table-responsive card">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Caso de Incendio</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Tipo de Incendio</th>
              <th>Descripcion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {selectedIncidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.titulo}</td>
                <td>{incident.prioridad}</td>
                <td>{incident.estatus}</td>
                <td>{incident.tipoIncendio}</td>
                <td>{incident.notas}</td>
                <td>
                  <a href="#" className="verReporte">
                    <EyeIcon className="iconos-tabla" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between px-4 mb-3">
          <button type="button" className="btn btn-primary" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={startIndex + itemsPerPage >= filteredIncidents.length}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportsTable;
