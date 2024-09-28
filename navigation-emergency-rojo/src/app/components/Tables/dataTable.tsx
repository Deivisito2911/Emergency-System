import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './table.scss';
import { getEmbarcaciones, deleteEmbarcacion } from '../../../api/alerta';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Asegúrate de que esto esté importado correctamente

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

const columns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void
) => [
  {
    name: 'ID',
    selector: (row: Embarcacion) => row.id,
    sortable: true,
  },
  {
    name: 'Nombre',
    selector: (row: Embarcacion) => row.nombre,
    sortable: true,
  },
  {
    name: 'Tipo',
    selector: (row: Embarcacion) => row.tipo_embarcacion,
    sortable: true,
  },
  {
    name: 'Material',
    selector: (row: Embarcacion) => row.tipo_material,
    sortable: true,
  },
  {
    name: 'Capacidad',
    selector: (row: Embarcacion) => row.capacidad_maxima,
    sortable: true,
  },
  {
    name: 'Peso(t)',
    selector: (row: Embarcacion) => row.peso_embarcacion,
    sortable: true,
  },
  {
    name: 'Fecha Fabricación',
    selector: (row: Embarcacion) => row.fecha_fabricacion,
    sortable: true,
  },
  {
    name: 'Cantidad Motores',
    selector: (row: Embarcacion) => row.cantidad_motor,
    sortable: true,
  },
  {
    name: 'Acciones',
    cell: (row: Embarcacion) => (
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

const Table: React.FC = () => {
  const [data, setData] = useState<Embarcacion[]>([]);
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState<Embarcacion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmbarcaciones = async () => {
      try {
        const response = await getEmbarcaciones();
        const data = await response.json();
        console.log('Fetched data:', data); // Verifica que los datos se están recibiendo
        setData(data);
        setFilteredItems(data); // Inicialmente muestra todos los datos
      } catch (error) {
        console.error('Error fetching embarcaciones:', error);
      }
    };

    fetchEmbarcaciones();
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
            (item.nombre &&
              item.nombre.toLowerCase().includes(lowercasedFilter)) ||
            (item.tipo_embarcacion &&
              item.tipo_embarcacion.toLowerCase().includes(lowercasedFilter)) ||
            (item.tipo_material &&
              item.tipo_material.toLowerCase().includes(lowercasedFilter)) ||
            (item.capacidad_maxima &&
              item.capacidad_maxima
                .toString()
                .toLowerCase()
                .includes(lowercasedFilter)) ||
            (item.peso_embarcacion &&
              item.peso_embarcacion
                .toString()
                .toLowerCase()
                .includes(lowercasedFilter)) ||
            (item.fecha_fabricacion &&
              item.fecha_fabricacion
                .toLowerCase()
                .includes(lowercasedFilter)) ||
            (item.cantidad_motor &&
              item.cantidad_motor
                .toString()
                .toLowerCase()
                .includes(lowercasedFilter))
        )
      );
    }
  }, [filterText, data]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm('¿Estás seguro de que quieres eliminar esta embarcación?')
    ) {
      try {
        await deleteEmbarcacion(id);
        setData(data.filter((item) => item.id !== id));
        setFilteredItems(filteredItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Error deleting embarcacion:', error);
      }
    }
  };

  return (
    <div className="cont-table">
      <div className="input-table">
        <h3 style={{ textAlign: 'center' }}>Embarcaciones</h3>
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

export default Table;