//01:40:00 VALIDACION DE DATOS
//ÉSTE MODULO VALIDA TODO EL INGRESO PARA CADA CAMPO (REQUERIMIENTOS/LARGO/TIPO_CARACTERES)
//INVESTIGAR MÁS

import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "invalid Email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at last 6 characters",
    }),
});
// 01:44:54
export const loginSchema = z.object({
  /*username: z.string({
    required_error: "Username is required",
  }),*/
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "invalid Email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at last 6 characters",
    }),
});