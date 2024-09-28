import { z, object } from "zod";

export const UserLoginFormTypeShema = object({
  email: z.string().email('Introduzca un email valido'),
  password: z.string().min(6, 'La contraseña debe ser mayor a 6 caracteres'),
});

export type UserFormType = z.infer<typeof UserLoginFormTypeShema>;

export const defaultValues:UserFormType = {
  email: "",
  password: ""
}