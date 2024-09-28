import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Afectado } from "../types";
import options from '../../public/options-select.json';
import { initialAfectadoValues } from "../initialValue";

interface FormularioAfectadoProps {
    onChange: (data: Afectado) => void;
    initialValues?: Afectado;
}

const FormularioAfectados: React.FC<FormularioAfectadoProps> = ({ onChange, initialValues }) => {
    const [afectado, setAfectado] = useState<Afectado>(initialValues || 
        initialAfectadoValues
    );

    useEffect(() => {
        if (initialValues) {
            setAfectado(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedAfectado = { ...afectado, [name]: value };
        setAfectado(updatedAfectado);
        onChange(updatedAfectado);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.3
            }
        }
    };

    const inputVariants = {
        focus: { scale: 1.05, transition: { duration: 0.5 } },
        blur: { scale: 1, transition: { duration: 0.2 } }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <>
            <div className="mt-8 mb-6">
                <h1 className="text-2xl font-bold text-color-text-main">Afectado(s)</h1>
            </div>

            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="flex flex-col" variants={itemVariants}>
                    <label className="pb-4 text-color-text-main">Nombre del afectado*</label>
                    <motion.input 
                        name="nombre" 
                        type="text" 
                        value={afectado.nombre} 
                        onChange={handleChange}
                        whileFocus="focus"
                        variants={inputVariants}
                        initial="blur" 
                        className="border border-gray-800 rounded p-2 outline-none text-black" 
                    />
                </motion.div>
                <motion.div className="flex flex-col" variants={itemVariants}>
                    <label className="pb-4 text-color-text-main">Apellido del afectado*</label>
                    <motion.input 
                        name="apellido" 
                        type="text" 
                        whileFocus="focus"
                        variants={inputVariants}
                        initial="blur"
                        value={afectado.apellido} 
                        onChange={handleChange} 
                        className="border border-gray-800 rounded p-2 outline-none text-black" 
                    />
                </motion.div>
                <motion.div className="flex flex-col" variants={itemVariants}>
                    <label className="pb-4 text-color-text-main">Estado*</label>
                    <select 
                        name="estado" 
                        value={afectado.estado} 
                        onChange={handleChange} 
                        className="border border-gray-800 rounded p-2 outline-none h-10 text-black" 
                        required 
                    >
                        <option hidden>Selecciona una opción</option>
                        {options.EstadoDelAfectado.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </motion.div>
                <motion.div className="flex flex-col" variants={itemVariants}>
                    <label className="pb-4 text-color-text-main">Fecha de nacimiento*</label>
                    <motion.input 
                        name="fecha_de_nacimiento" 
                        type="date" 
                        whileFocus="focus"
                        variants={inputVariants}
                        initial="blur"
                        value={afectado.fecha_de_nacimiento} 
                        onChange={handleChange} 
                        className="border border-gray-800 rounded p-2 outline-none text-black" 
                        required 
                    />
                </motion.div>
                <motion.div className="flex flex-col" variants={itemVariants}>
                    <label className="pb-4 text-color-text-main">Cedula de Identidad</label>
                    <motion.input 
                        name="cedula" 
                        type="number" 
                        whileFocus="focus"
                        variants={inputVariants}
                        initial="blur"
                        value={afectado.cedula} 
                        onChange={handleChange} 
                        className="border border-gray-800 rounded p-2 outline-none text-black" 
                    />
                </motion.div>
                <motion.div className="flex flex-col" variants={itemVariants}>
                    <label className="pb-4 text-color-text-main">Tipo de sangre</label>
                    <select 
                        name="tipo_sangre" 
                        value={afectado.tipo_sangre} 
                        onChange={handleChange} 
                        className="border border-gray-800 rounded p-2 outline-none h-10 text-black"
                    >
                        <option hidden>Selecciona una opción</option>
                        {options.tipoSangre.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </motion.div>
                <motion.div className="flex flex-col" variants={itemVariants}>
                    <label className="pb-4 text-color-text-main">Afecciones</label>
                    <motion.input 
                        name="afecciones" 
                        type="text" 
                        whileFocus="focus"
                        variants={inputVariants}
                        initial="blur"
                        value={afectado.afecciones} 
                        onChange={handleChange} 
                        className="border border-gray-800 rounded p-2 outline-none text-black" 
                    />
                </motion.div>
                <motion.div className="flex flex-col" variants={itemVariants}>
                    <label className="pb-4 text-color-text-main">Sexo</label>
                    <select 
                        name="sexo" 
                        value={afectado.sexo} 
                        onChange={handleChange} 
                        className="border border-gray-800 rounded p-2 outline-none h-10 text-black"
                    >
                        <option hidden>Selecciona una opción</option>
                        {options.sexo.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </motion.div>
            </motion.div>
        </>
    );
}

export default FormularioAfectados;
