import { z } from "zod";

export const denuncianteSchema = z.object({
    id: z.string().uuid(),
    nombre: z.string().nonempty({ message: "El nombre es obligatorio" }),
    telefono:z.string().regex(/^\d+$/, { message: "El número de telefono no puede contener números negativos o caracteres no numéricos" }).nonempty({message: 'El numero de telefono es obligatorio'}),
    cedula: z.string()
    .regex(/^\d*$/, { message: "La cédula no puede contener números negativos o caracteres no numéricos" })
    .optional()
});

export const incidenteSchema = z.object({
    lugar: z.string().nonempty({ message: "El lugar del incidente es obligatorio" }),
    cantidad_afectados: z.number().nonnegative({ message: "La cantidad de afectados debe ser un número positivo" }),
    tipo: z.string().nonempty({ message: "El tipo de incidencia es obligatorio" }),
    descripcion: z.string().optional()
});

export const afectadoSchema = z.object({
    id: z.string().uuid(),
    nombre: z.string().nonempty({ message: "El nombre es obligatorio" }),
    apellido: z.string().nonempty({ message: "El apellido es obligatorio" }),
    fecha_de_nacimiento: z.string().nonempty({message: "La fecha de nacimiento es obligatoria"}),
    estado: z.string().nonempty({message: 'El estado del afectado es obligatorio'}),
    cedula: z.string().regex(/^\d*$/, { message: "La cédula no puede contener números negativos o caracteres no numéricos" }).optional(),
    tipo_sangre: z.string().optional(),
    afecciones: z.string().optional(),
    sexo: z.string().optional(),
});