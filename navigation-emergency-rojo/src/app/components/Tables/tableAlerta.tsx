import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './tableAlerta.scss';
import { getAlertas, deleteAlerta } from '../../../api/alerta';
import { FaTrashAlt } from 'react-icons/fa';

interface Alerta {
  id: string;
  descripcion: string;
}

const columns = (handleDelete: (id: string) => void) => [
  {
    name: 'ID',
    selector: (row: Alerta) => row.id,
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: Alerta) => row.descripcion,
    sortable: true,
  },
  {
    name: 'Acciones',
    cell: (row: Alerta) => (
      <div>
        <FaTrashAlt
          onClick={() => handleDelete(row.id)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    ),
  },
];

const TableAlerta: React.FC = () => {
  const [data, setData] = useState<Alerta[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState<Alerta[]>([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const response = await getAlertas();
        const data = await response.json();
        console.log('Fetched data:', data); // Verifica que los datos se están recibiendo
        setData(data);
        setFilteredItems(data); // Inicialmente muestra todos los datos
      } catch (error) {
        console.error('Error fetching alertas:', error);
      }
    };

    fetchAlertas();
  }, []);

  useEffect(() => {
    const lowercasedFilter = filterText.toLowerCase();
    if (!filterText) {
      setFilteredItems(data); // Si no hay texto de búsqueda, mostrar todos los datos
    } else {
      setFilteredItems(
        data.filter(
          (item) =>
            (item.id &&
              item.id.toLowerCase().includes(lowercasedFilter)) ||
            (item.descripcion &&
              item.descripcion.toLowerCase().includes(lowercasedFilter))
        )
      );
    }
  }, [filterText, data]);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta alerta?')) {
      try {
        await deleteAlerta(id);
        setData(data.filter((item) => item.id !== id));
        setFilteredItems(filteredItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting alerta:', error);
      }
    }
  };

  return (
    <div className="cont-table">
      <div className="input-table">
        <h3 style={{ textAlign: 'center' }}>Alertas</h3>
        <input
          type="text"
          placeholder="Buscar"
          className="inputTable"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns(handleDelete)}
        data={filteredItems}
        pagination
        noHeader
        className="dataTable"
      />
    </div>
  );
};

export default TableAlerta;
