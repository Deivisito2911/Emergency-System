import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import editIcon from '../../public/img/edit.png';
import { getIncidencias } from '../api/incidencias';
import { Link } from 'react-router-dom';
import { DatosGestionFichas } from '../types';

// Definición de las columnas de la tabla
const columns = [
    {
        name: 'Ficha#',
        selector: (row: DatosGestionFichas) => row.codigo,
        sortable: true,
        cell: (row: DatosGestionFichas) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {row.codigo}
                <Link to={`/recepcion-fichas/${row.codigo}/edit`}><img src={editIcon} alt="Editar" style={{ width: '2.5rem', height: '0.9rem' }} /></Link>
            </div>
        )
    },
    {
        name: 'Fecha',
        selector: (row: DatosGestionFichas) => row.fecha,
        sortable: true,
    },
    {
        name: 'Tipo',
        selector: (row: DatosGestionFichas) => row.tipo,
        sortable: true,
    },
    {
        name: 'Lugar',
        selector: (row: DatosGestionFichas) => row.lugar,
        sortable: true,
    },
    {
        name: 'Nº de afectados',
        selector: (row: DatosGestionFichas) => row.cantidad_afectados,
        sortable: true,
    },
    {
        name: 'Denunciante',
        selector: (row: DatosGestionFichas) => row.denunciante.nombre,
        sortable: true,
    },
    {
        name: 'Operador',
        selector: (row: DatosGestionFichas) => row.operador.nombre,
        sortable: true,
    },
];

const Table: React.FC = () => {
    // Estado para los datos, el texto del filtro y el filtro select
    const [data, setData] = useState<DatosGestionFichas[]>([]);
    const [filterText, setFilterText] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filteredItems, setFilteredItems] = useState<DatosGestionFichas[]>([]);

    // Obtener los datos de la API al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getIncidencias();
                const datos = response.data;
                setData(datos);
                setFilteredItems(datos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Actualizar los elementos filtrados cuando el texto del filtro o el filtro select cambian
    useEffect(() => {
        const lowercasedFilter = filterText.toLowerCase();
        setFilteredItems(data.filter(item =>
            (item.codigo.toString().toLowerCase().includes(lowercasedFilter) ||
            item.fecha.toLowerCase().includes(lowercasedFilter) ||
            item.tipo.toLowerCase().includes(lowercasedFilter) ||
            item.lugar.toLowerCase().includes(lowercasedFilter) ||
            item.cantidad_afectados.toString().toLowerCase().includes(lowercasedFilter) ||
            item.denunciante.nombre.toLowerCase().includes(lowercasedFilter) ||
            item.operador.nombre.toLowerCase().includes(lowercasedFilter)) &&
            (filterType === '' || item.tipo === filterType)
        ));
    }, [filterText, filterType, data]);

    return (
        <div>
            <div className='cont-table'>
                <div className='input-table'>
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        style={{color: 'black'}}
                    />
                    <select
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                        style={{color: 'black', border: 'none'}}
                    >
                        <option value="">Todos</option>
                        <option value="Incendio">Incendio</option>
                        <option value="Naufragio">Naufragio</option>
                    </select>
                </div>

                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    noHeader
                />
            </div>
        </div>
    );
};

export default Table;
