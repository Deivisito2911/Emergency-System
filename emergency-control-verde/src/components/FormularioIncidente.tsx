import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import options from '../../public/options-select.json';
import { Incidente } from '../types';
import { initialIncidenteValues } from '../initialValue';

interface FormularioIncidenteProps {
  onChange: (data: any) => void;
  initialValues?: Incidente;
}

const FormularioIncidente: React.FC<FormularioIncidenteProps> = ({ onChange, initialValues }) => {
  const [incidente, setIncidente] = useState<Incidente>({
    lugar: '',
    cantidad_afectados: undefined,
    tipo: '',
    descripcion: '',
  });

  useEffect(() => {
    if (initialValues) {
      setIncidente(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedIncidente = {
      ...incidente,
      [name]: name === 'cantidad_afectados' ? Number(value) : value,
    };
    setIncidente(updatedIncidente);
    onChange(updatedIncidente);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.5 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
}

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col" variants={itemVariants}>
        <label className="pb-4 text-color-text-main">Lugar del incidente*</label>
        <motion.input
          name="lugar"
          type="text"
          whileFocus="focus"
          variants={inputVariants}
          initial="blur"
          value={incidente.lugar}
          onChange={handleChange}
          className="border border-gray-800 rounded p-2 outline-none text-black"
          required
        />
      </motion.div>
      <motion.div className="flex flex-col" variants={itemVariants}>
        <label className="pb-4 text-color-text-main">Cantidad de afectados*</label>
        <motion.input
          name="cantidad_afectados"
          type="number"
          whileFocus="focus"
          variants={inputVariants}
          initial="blur"
          value={incidente.cantidad_afectados}
          onChange={handleChange}
          className="border border-gray-800 rounded p-2 outline-none text-black"
          required
        />
      </motion.div>
      <motion.div className="flex flex-col" variants={itemVariants}>
        <label className="pb-4 text-color-text-main">Tipo de incidencia*</label>
        <select
          name="tipo"
          value={incidente.tipo}
          onChange={handleChange}
          className="border border-gray-800 rounded p-2 outline-none h-10 text-black"
          required
        >
          <option hidden>Selecciona una opción</option>
          {options.tipoIncidencia.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </motion.div>
      <motion.div className="flex flex-col" variants={itemVariants}>
        <label className="pb-4 text-color-text-main">Descripción</label>
        <textarea
          name="descripcion"
          cols={30}
          rows={4}
          value={incidente.descripcion}
          onChange={handleChange}
          className="p-2 border border-gray-800 rounded outline-none w-full text-black"
        ></textarea>
      </motion.div>
    </motion.div>
  );
};

export default FormularioIncidente;
