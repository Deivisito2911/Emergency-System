import React, { useEffect, useState } from 'react';

import Header from '../components/header';
import Footer from '../components/footer';
import ReporteIncendioForm from '../components/forms/ReporteIncendioForm';

interface ReporteIncendioProps {
    title: string;
}

const ReporteIncendio: React.FC<ReporteIncendioProps> = () => {
    useEffect(() => {
        document.title = 'Reporte Incendio';
    }, []);
    const handleSubmit = () => {
        console.log('Formulario enviado');
    };

    return (
        <>
        <Header />
        <section className="section">
            <div className="container mt-5">
                    <div className="row justify-content-lg-center">
                        <h2 className="section-title">Reporte de Incendio</h2>
                        <h4 className="section-breadcum">Reportes</h4>
                        <div className="container mt-3">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <ReporteIncendioForm 
                                                    onSubmit={handleSubmit}
                                                />
                                            </div>
                                            <div className="form-actions d-flex justify-content-center mt-4">
                                                <a href="/" className="btn btn-form btn-light me-4">Cancelar</a>
                                                <button type="submit" form="reporte-incendio" className="btn btn-form btn-primary">Enviar reporte</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        <Footer />
        </>
    );
}

export default ReporteIncendio;