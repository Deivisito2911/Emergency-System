import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Mapa from '../components/mapa-reportes';
import ReportsTable from '../components/tabla-reportes';
import { getMarkers } from '../services/fireIncidentsService';
import { Markers } from '../types';

const MapaView: React.FC = () => {
  const [markers, setMarkers] = useState<Markers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const data = await getMarkers();
        setMarkers(data);
      } catch (err) {
        setError('Error obteniendo marcadores');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkers();
  }, []);

  return (
    <>
      <Header />
      <section className="section">
        <div className="container mt-5">
          <div className="row justify-content-lg-center">
            <h2 className="section-title">Mapa de Reportes</h2>
            <h4 className="section-breadcrumb">Mapa</h4>
          </div>
        </div>
        {loading ? (
          <div
            className="mb-3"
            style={{ width: '100%', height: '500px', backgroundColor: '#ccc' }}
          ></div>
        ) : error ? (
          <div className="container">{error}</div>
        ) : (
          <Mapa markers={markers} />
        )}
        <div className="container">
          <ReportsTable />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MapaView;
