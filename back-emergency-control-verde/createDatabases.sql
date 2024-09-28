SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION CREATE DATABASE IF NOT EXISTS `emergencyusers`;

USE `emergencyusers`;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO
    user (id, username, password)
VALUES (
        NULL,
        'alejandro7@emergencias-udo.com',
        'alejandro7'
    );

COMMIT;

START TRANSACTION;

SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `emergencias`;

USE `emergencias`;

-- Estructura de tabla para la tabla `afectado`
CREATE TABLE IF NOT EXISTS `afectado` (
    `id` varchar(255) NOT NULL,
    `cedula` varchar(255) NOT NULL,
    `nombre` varchar(255) NOT NULL,
    `apellido` varchar(255) NOT NULL,
    `fecha_de_nacimiento` datetime NOT NULL,
    `sexo` varchar(255) NOT NULL,
    `afecciones` varchar(250) NOT NULL,
    `estado` varchar(255) NOT NULL,
    `tipo_sangre` varchar(255) NOT NULL,
    `incidenciaCodigo` varchar(36) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_9bcb38a5d33e37b2995b317e16e` (`incidenciaCodigo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Volcado de datos para la tabla `afectado`
INSERT INTO
    `afectado` (
        `id`,
        `cedula`,
        `nombre`,
        `apellido`,
        `fecha_de_nacimiento`,
        `sexo`,
        `afecciones`,
        `estado`,
        `tipo_sangre`,
        `incidenciaCodigo`
    )
VALUES (
        'beb1fdc2-aae9-48e5-b8f1-cb1b6ae0bd3c',
        '301231413',
        'Lewis',
        'Hamilton',
        '2002-07-18 05:41:40',
        'M',
        'Invalido',
        'Vivo',
        'A+',
        '46f11618-06b7-424d-ba4e-1ab28085d64b'
    ),
    (
        '0a3e2d6e-6edb-4c5f-b50c-8e57a79c8ec7',
        '302112233',
        'Valtteri',
        'Bottas',
        '2001-08-28 10:15:00',
        'M',
        'Asma',
        'vivo',
        'B+',
        '56721618-78b7-424d-ba4e-2cd28085d123'
    ),
    (
        'f89cbb0d-fbb4-4a3a-b0ef-5b8c79c76c28',
        '301445566',
        'Carlos',
        'Sainz',
        '2000-09-01 14:22:30',
        'M',
        'Alergias',
        'Vivo',
        'O-',
        'ab9a6718-48c3-4e19-a045-2cd28085d456'
    );

-- Estructura de tabla para la tabla `denunciante`
CREATE TABLE IF NOT EXISTS `denunciante` (
    `id` varchar(255) NOT NULL,
    `cedula` varchar(255) NOT NULL,
    `nombre` varchar(255) NOT NULL,
    `telefono` varchar(255) NOT NULL,
    `incidenciaCodigo` varchar(36) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `REL_14833aa520d2cb61aa50c8b2fc` (`incidenciaCodigo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Volcado de datos para la tabla `denunciante`
INSERT INTO
    `denunciante` (
        `id`,
        `cedula`,
        `nombre`,
        `telefono`,
        `incidenciaCodigo`
    )
VALUES (
        'a448b71c-47a9-4365-8a8f-d001cbe68cf4',
        '30230276',
        'George Russell',
        '04127222453',
        '46f11618-06b7-424d-ba4e-1ab28085d64b'
    ),
    (
        '1b2c3d4e-5f6a-7b8c-9d0e-123456789012',
        '303445566',
        'Lando Norris',
        '04126789012',
        '56721618-78b7-424d-ba4e-2cd28085d123'
    ),
    (
        '2a3b4c5d-6e7f-8g9h-0i1j-234567890123',
        '304556677',
        'Charles Leclerc',
        '04125678901',
        'ab9a6718-48c3-4e19-a045-2cd28085d456'
    );

-- Estructura de tabla para la tabla `incidencia`
CREATE TABLE IF NOT EXISTS `incidencia` (
    `codigo` varchar(255) NOT NULL,
    `fecha` datetime(6) NOT NULL DEFAULT current_timestamp(6),
    `tipo` varchar(255) NOT NULL,
    `lugar` varchar(255) NOT NULL,
    `cantidad_afectados` int(11) NOT NULL,
    `descripcion` varchar(255) NOT NULL,
    `operadorCedula` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`codigo`),
    KEY `FK_ad260e810344a0fc057b25eeac5` (`operadorCedula`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Volcado de datos para la tabla `incidencia`
INSERT INTO
    `incidencia` (
        `codigo`,
        `fecha`,
        `tipo`,
        `lugar`,
        `cantidad_afectados`,
        `descripcion`,
        `operadorCedula`
    )
VALUES (
        '46f11618-06b7-424d-ba4e-1ab28085d64b',
        '2024-10-10 23:53:00.000000',
        'Incendio',
        'Villa Rosa',
        1,
        'Lewis chocó el optra contra una gasolinera a altas horas de la noche ',
        '22650420'
    ),
    (
        '56721618-78b7-424d-ba4e-2cd28085d123',
        '2024-11-05 14:30:00.000000',
        'Incedio',
        'Avenida Principal',
        1,
        'Valtteri tuvo un accidente con su motocicleta',
        '40404013'
    ),
    (
        'ab9a6718-48c3-4e19-a045-2cd28085d456',
        '2024-12-12 18:15:00.000000',
        'Naufragio',
        'Playa Norte',
        1,
        'Carlos fue rescatado en la playa después de una emergencia en el mar',
        '50505014'
    );

-- Estructura de tabla para la tabla `incidencia_organismos_organismo`
CREATE TABLE IF NOT EXISTS `incidencia_organismos_organismo` (
    `incidenciaCodigo` varchar(36) NOT NULL,
    `organismoCodigo` varchar(36) NOT NULL,
    PRIMARY KEY (
        `incidenciaCodigo`,
        `organismoCodigo`
    ),
    KEY `IDX_21d6787e5505692363d042ceb0` (`incidenciaCodigo`),
    KEY `IDX_8bcf0766590ecc1a9d6ce0d0ca` (`organismoCodigo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Volcado de datos para la tabla `incidencia_organismos_organismo`
INSERT INTO
    `incidencia_organismos_organismo` (
        `incidenciaCodigo`,
        `organismoCodigo`
    )
VALUES (
        '46f11618-06b7-424d-ba4e-1ab28085d64b',
        'c15b099e-dba3-4a61-b3e7-67490bb14dd5'
    ),
    (
        '56721618-78b7-424d-ba4e-2cd28085d123',
        'c15b099e-dba3-4a61-b3e7-67490bb14dd5'
    ),
    (
        'ab9a6718-48c3-4e19-a045-2cd28085d456',
        '92095b54-4acc-43cf-826d-ac462b9ddea3'
    );

-- Estructura de tabla para la tabla `operador`
CREATE TABLE IF NOT EXISTS `operador` (
    `cedula` varchar(255) NOT NULL,
    `nombre` varchar(255) NOT NULL,
    `apellido` varchar(255) NOT NULL,
    `fecha_de_nacimiento` datetime NOT NULL,
    `sexo` varchar(255) NOT NULL,
    `telefono` varchar(255) NOT NULL,
    `correo` varchar(255) NOT NULL,
    `fecha_de_contratacion` datetime NOT NULL,
    `direccion` varchar(255) NOT NULL,
    `telefono_fijo` varchar(255) NOT NULL,
    PRIMARY KEY (`cedula`),
    UNIQUE KEY `IDX_ff94c9797c295dcbb85086147e` (`telefono`),
    UNIQUE KEY `IDX_b6ee6d8c20995e702741efe27f` (`correo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Volcado de datos para la tabla `operador`
INSERT INTO
    `operador` (
        `cedula`,
        `nombre`,
        `apellido`,
        `fecha_de_nacimiento`,
        `sexo`,
        `telefono`,
        `correo`,
        `fecha_de_contratacion`,
        `direccion`,
        `telefono_fijo`
    )
VALUES (
        '22650420',
        'Alejandro',
        'Marcano',
        '1995-05-12 00:00:00',
        'M',
        '04123456789',
        'alejandro7@emergencias-udo.com',
        '2024-01-15 09:00:00',
        'Calle Falsa 123',
        '04123456789'
    ),
    (
        '40404013',
        'Luis',
        'Garcia',
        '1983-06-22 00:00:00',
        'M',
        '04167890123',
        'luis.garcia@example.com',
        '2024-02-20 08:30:00',
        'Avenida Siempre Viva 456',
        '04167890123'
    ),
    (
        '50505014',
        'Maria',
        'Lopez',
        '1990-07-10 00:00:00',
        'F',
        '04198765432',
        'maria.lopez@example.com',
        '2024-03-18 09:45:00',
        'Boulevard de los Sueños Rotos 789',
        '04198765432'
    );

-- Estructura de tabla para la tabla `organismo`
CREATE TABLE IF NOT EXISTS `organismo` (
    `codigo` varchar(255) NOT NULL,
    `nombre` varchar(255) NOT NULL,
    `correo` varchar(255) NOT NULL,
    `telefono` varchar(255) NOT NULL,
    PRIMARY KEY (`codigo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Volcado de datos para la tabla `organismo`
INSERT INTO
    `organismo` (
        `codigo`,
        `nombre`,
        `correo`,
        `telefono`
    )
VALUES (
        '92095b54-4acc-43cf-826d-ac462b9ddea3',
        'Sistema de atencion de naufragios',
        'equiporojo2024@gmail.com',
        '04167778182'
    ),
    (
        'c15b099e-dba3-4a61-b3e7-67490bb14dd5',
        'Sistemas de atención de incendios',
        'grupoazul69@gmail.com',
        '04125788542'
    );

-- Añadir restricciones de clave foránea para las tablas

-- Filtros para la tabla `afectado`
ALTER TABLE `afectado`
ADD CONSTRAINT `FK_9bcb38a5d33e37b2995b317e16e` FOREIGN KEY (`incidenciaCodigo`) REFERENCES `incidencia` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Filtros para la tabla `denunciante`
ALTER TABLE `denunciante`
ADD CONSTRAINT `FK_14833aa520d2cb61aa50c8b2fc9` FOREIGN KEY (`incidenciaCodigo`) REFERENCES `incidencia` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Filtros para la tabla `incidencia`
ALTER TABLE `incidencia`
ADD CONSTRAINT `FK_ad260e810344a0fc057b25eeac5` FOREIGN KEY (`operadorCedula`) REFERENCES `operador` (`cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Filtros para la tabla `incidencia_organismos_organismo`
ALTER TABLE `incidencia_organismos_organismo`
ADD CONSTRAINT `FK_21d6787e5505692363d042ceb01` FOREIGN KEY (`incidenciaCodigo`) REFERENCES `incidencia` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `FK_8bcf0766590ecc1a9d6ce0d0cad` FOREIGN KEY (`organismoCodigo`) REFERENCES `organismo` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;