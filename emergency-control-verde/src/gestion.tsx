import React from "react";
import Table from "./components/DataTable";
import Navbar from "./components/navbar";
import '../public/style/general.css'
 
const Gestion: React.FC = () => {
    return (
        <div className=" min-h-screen">
            <Navbar />
            <main className="p-6">
                <div className="flex justify-between items-center mb-8 mt-10">
                    <div className="ml-36">
                        <h1 className="text-4xl font-bold text-color-text-main">Recepcion de Llamada</h1>
                    </div>
                    <div className="mr-20">
                        <p className="text-lg text-color-text-main">Usuario (a) ...</p>
                    </div>
                </div>
                <div className="w-5/6 bg-white mx-auto mt-4 p-6 rounded-lg shadow-custom">
                    <Table />
                </div>
            </main>
        </div>
    );
}; 

export default Gestion;
