import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './tableReporte.scss';
import { deleteReporte, getReportes } from '../../../api/reporte';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

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

const columns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void
) => [
  {
    name: 'ID',
    selector: (row: Reporte) => row.id,
    sortable: true,
  },
  {
    name: 'Fecha de Reporte',
    selector: (row: Reporte) => row.fecha_reporte,
    sortable: true,
  },
  {
    name: 'Tipo de Emergencia',
    selector: (row: Reporte) => row.tipo_emergencia,
    sortable: true,
  },
  {
    name: 'Latitud',
    selector: (row: Reporte) => row.latitud,
    sortable: true,
  },
  {
    name: 'Longitud',
    selector: (row: Reporte) => row.longitud,
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: Reporte) => row.descripcion,
    sortable: true,
  },
  {
    name: 'ID de Embarcacion',
    selector: (row: Reporte) => row.embarcacionId,
    sortable: true,
  },
  {
    name: 'ID de la Alerta',
    selector: (row: Reporte) => row.alertaId,
    sortable: true,
  },
  {
    name: 'Acciones',
    cell: (row: Reporte) => (
      <div>
        <FaEdit
          onClick={() => handleEdit(row.id)}
          style={{ cursor: 'pointer', marginRight: '10px' }}
        />
        <FaTrashAlt
          onClick={() => handleDelete(row.id)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    ),
  },
];

const TableReporte: React.FC = () => {
  const [data, setData] = useState<Reporte[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState<Reporte[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await getReportes();
        const data = await response.json();
        console.log('Fetched data:', data); // Verifica que los datos se están recibiendo
        setData(data);
        setFilteredItems(data); // Inicialmente muestra todos los datos
      } catch (error) {
        console.error('Error fetching embarcaciones:', error);
      }
    };

    fetchReportes();
  }, []);

  useEffect(() => {
    const lowercasedFilter = filterText.toLowerCase();
    if (!filterText) {
      setFilteredItems(data); // Si no hay texto de búsqueda, mostrar todos los datos
    } else {
      setFilteredItems(
        data.filter(
          (item) =>
            (item.id && item.id.toLowerCase().includes(lowercasedFilter)) ||
            (item.fecha_reporte &&
              item.fecha_reporte.toLowerCase().includes(lowercasedFilter)) ||
            (item.tipo_emergencia &&
              item.tipo_emergencia.toLowerCase().includes(lowercasedFilter)) ||
            (item.latitud &&
              item.latitud
                .toString()
                .toLowerCase()
                .includes(lowercasedFilter)) ||
            (item.longitud &&
              item.longitud
                .toString()
                .toLowerCase()
                .includes(lowercasedFilter)) ||
            (item.descripcion &&
              item.descripcion.toLowerCase().includes(lowercasedFilter)) ||
            (item.embarcacionId &&
              item.embarcacionId.toLowerCase().includes(lowercasedFilter)) ||
            (item.alertaId &&
              item.alertaId.toString().toLowerCase().includes(lowercasedFilter))
        )
      );
    }
  }, [filterText, data]);
  const handleEdit = (id: string) => {
    navigate(`/editreporte/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
      try {
        await deleteReporte(id);
        setData(data.filter((item) => item.id !== id));
        setFilteredItems(filteredItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting reporte:', error);
      }
    }
  };

  return (
    <div className="cont-table">
      <div className="input-table">
        <h3 style={{ textAlign: 'center' }}>Reportes</h3>
        <input
          type="text"
          placeholder="Buscar"
          className="inputTable"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredItems}
        pagination
        noHeader
        className="dataTable"
      />
    </div>
  );
};

export default TableReporte;
