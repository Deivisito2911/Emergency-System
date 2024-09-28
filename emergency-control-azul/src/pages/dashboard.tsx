import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import ReportsTable from '../components/tabla-reportes';

interface DashboardViewProps {
    title: string;
}

const DashboardView: React.FC<DashboardViewProps> = () => {
    return (
        <>
        <Header />
        <section className="section">
            <div className="container mt-5">
                <div className="row justify-content-lg-center">
                    <h2 className="section-title">Reportes</h2>
                    <h4 className="section-breadcum">Tabla de Reportes</h4>
                </div>
            </div>
            <div className="container">
                <ReportsTable />
            </div>
        </section>
        <Footer />
        </>
    );
}

export default DashboardView;
