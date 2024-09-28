import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { Denunciante } from '../types';
import { initialDenuncianteValues } from '../initialValue';

interface FormularioDenuncianteProps {
  onChange: (data: any) => void;
  initialValues?: Denunciante;
}

const FormularioDenunciante: React.FC<FormularioDenuncianteProps> = ({
  onChange,
  initialValues,
}) => {
  const [denunciante, setDenunciante] = useState<Denunciante>(
    initialValues || initialDenuncianteValues
  );

  useEffect(() => {
    if (initialValues) {
      setDenunciante(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDenunciante = { ...denunciante, [name]: value };
    setDenunciante(updatedDenunciante);
    onChange(updatedDenunciante);
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
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

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
        <label className="pb-4 text-color-text-main">
          Nombre del denunciante*
        </label>
        <motion.input
          name="nombre"
          type="text"
          whileFocus="focus"
          variants={inputVariants}
          initial="blur"
          value={denunciante.nombre}
          onChange={handleChange}
          className="border border-gray-800 rounded p-2 outline-none text-black"
          required
        />
      </motion.div>
      <motion.div className="flex flex-col" variants={itemVariants}>
        <label className="pb-4 text-color-text-main">Nro. de Telefono*</label>
        <motion.input
          name="telefono"
          type="number"
          whileFocus="focus"
          variants={inputVariants}
          initial="blur"
          value={denunciante.telefono}
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
          value={denunciante.cedula}
          onChange={handleChange}
          className="border border-gray-800 rounded p-2 outline-none text-black"
        />
      </motion.div>
    </motion.div>
  );
};

export default FormularioDenunciante;
