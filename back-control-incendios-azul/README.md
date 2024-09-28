# 📋 Sistema de Registro de Reportes de Incendios 🔥

Bienvenido al **Sistema de Registro de Reportes de Incendios**. Este README te guiará para correr el proyecto exitosamente. 🛠️

## 🌟 Primeros Pasos

1. **Configuración del Archivo `.env`**:
   - Copia el archivo `.example.env`.
   - Renombra el archivo copiado a `.env`.
   - Edita el archivo `.env` con tus credenciales personales correspondientes para la conexión con la base de datos. 🗝️

## 🚀 Iniciar la Aplicación

Para correr la aplicación, debes iniciar también los servicios de autenticación. Usa los siguientes comandos, **cada uno en terminales diferentes** si deseas ver los logs de la consola:

```bash
npx nx serve emergency-auth
npx nx serve emergency-login
npx nx serve back-control-incendios-azul
npx nx serve emergency-control-azul
```

Alternativamente, puedes correr en **2 terminales separadas** los siguientes comandos:

```bash
npx nx run-many -t serve --projects=emergency-login,emergency-auth
npx nx run-many -t serve --projects=emergency-control-azul,back-control-incendios-azul
```

## 🧪 Testing

Para ver la cobertura de código del proyecto, ejecuta el siguiente comando en tu terminal:

```bash
npx nx test back-control-incendios-azul --coverage
```

Esto generará el directorio `../coverage` que contendrá un archivo HTML con gráficos que explicarán la cobertura de código del proyecto. 📊

---

¡Gracias por usar el Sistema de Registro de Reportes de Incendios! Si tienes alguna pregunta o problema, no dudes en contactarnos. 📞👩‍🚒👨‍🚒