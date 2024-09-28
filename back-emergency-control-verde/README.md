# Sistema de Registro de Emergencias Telefonicas

**Para correr el proyecto exitosamente, se debe copiar el archivo .example.env, editar su nombre para que nada mas se llame .env y poner las credenciales personales correspondientes para la conexion con la base de datos. Tambien el .env en la raiz del proyecto de ser necesario.**

Antes de iniciar la aplicación, debe correr en su SGBD el script de SQL alojado en el archivo **createDatabases.sql** para crear las bases de datos necesarias y crear los datos mínimos necesarios para iniciar sesión y poder ejecutar operaciones.
Finalmente, para correr la app debe iniciar también los servicios de autenticación, usando para todo los siguientes comandos,**cada uno en terminales diferentes** si desea ver los logs de la consola:

`npx nx serve emergency-auth`
`npx nx serve back-emergency-control-verde`

Una vez hecho esto debe ingresar a la URl http://antecion911udone.web.app/ para utilizar el sistema desplegado y funcionando.

## Plugin de new relic

Basta con iniciar la aplicacion para que se empiece a enviar la informacion a New Relic. Si ademas se quiere ver otra informacion como el estado del host y el rendimiento de la base de datos, va a necesitar instalar los agentes especializados de infraestructura de New Relic en su maquina local. El archivo **mysql-config.yml** debe agregarse a al directorio "C:\Program Files\New Relic\newrelic-infra\integrations.d" para poder monitorear la base de datos en la que corre la aplicacion.

## Testing

Para ver la cobertura de codigo del proyecto debe ejecutar ` npx nx test back-emergency-control-verde --coverage` en su terminal, esto generara el directorio '../coverage' que contendra un html con graficos que explicaran la cobertura de codigo del proyecto
