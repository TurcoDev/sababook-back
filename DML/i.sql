-- Insertar un rol
INSERT INTO Rol (nombre_rol) VALUES ('alumno'), ('docente'), ('administrador');

-- Insertar usuarios con diferentes roles
INSERT INTO Usuario (nombre, email, contrasena, rol, perfil_completo) VALUES
('Ana García', 'ana.garcia@email.com', 'hashed_pass_123', 'docente', TRUE),
('Juan Pérez', 'juan.perez@email.com', 'hashed_pass_456', 'alumno', FALSE),
('Laura Martínez', 'laura.martinez@email.com', 'hashed_pass_789', 'administrador', TRUE);

-- Insertar libros
INSERT INTO Libro (titulo, autor, género, nivel_educativo) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 'Realismo mágico', 'Secundario'),
('El principito', 'Antoine de Saint-Exupéry', 'Fábula', 'Primario'),
('1984', 'George Orwell', 'Distopía', 'Secundario');

-- Insertar opiniones
INSERT INTO Opinion (usuario_id, libro_id, calificacion, comentario) VALUES
(1, 2, 5, 'Un libro esencial para todas las edades.'),
(2, 3, 4, 'Me hizo pensar mucho en la sociedad actual.'),
(1, 1, 5, 'Una lectura obligatoria de la literatura universal.');

-- Más usuarios
INSERT INTO Usuario (nombre, email, contrasena, rol, perfil_completo, avatar_url) VALUES
('Pedro Gómez', 'pedro.gomez@email.com', 'hashed_pass_001', 'alumno', TRUE, 'https://ejemplo.com/avatars/pedro.jpg'),
('Sofía Torres', 'sofia.torres@email.com', 'hashed_pass_002', 'docente', TRUE, 'https://ejemplo.com/avatars/sofia.jpg');

-- Más libros
INSERT INTO Libro (titulo, autor, género, descripcion, portada_url, nivel_educativo) VALUES
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Novela', 'Una de las obras más destacadas de la literatura española.', 'https://ejemplo.com/portadas/quijote.jpg', 'Universitario'),
('Fahrenheit 451', 'Ray Bradbury', 'Ciencia ficción', 'Una sociedad donde los libros están prohibidos.', 'https://ejemplo.com/portadas/fahrenheit.jpg', 'Secundario');

-- Más opiniones
INSERT INTO Opinion (usuario_id, libro_id, calificacion, comentario) VALUES
(2, 4, 3, 'Demasiado largo y complejo para mí.'),
(3, 5, 5, 'Un clásico que te hace reflexionar sobre la libertad de expresión.'),
(4, 5, 4, 'Me encantó la trama, pero me hubiera gustado un final diferente.');

--Medallas, foros y clubes de lectura
-- Insertar datos en la tabla Medalla
-- Estos son los tipos de medallas que un usuario puede obtener.
INSERT INTO Medalla (nombre, descripcion, tipo_accion) VALUES
('Lector Compulsivo', 'Por leer 10 libros en un año.', 'lectura'),
('Crítico Literario', 'Por escribir 50 opiniones sobre libros.', 'Opinion'),
('Pionero del Foro', 'Por crear el primer foro de debate.', 'foro'),
('Miembro de Club', 'Por unirse a un club de lectura.', 'club');

-- Insertar datos en la tabla Foro
-- Se crean algunos foros con un usuario como creador.
INSERT INTO Foro (titulo, descripcion, creador_id) VALUES
('Debate sobre "1984"', 'Análisis en profundidad de los temas de la novela de Orwell.', 1),
('Recomendaciones de fantasía', 'Comparte tus libros de fantasía favoritos.', 2);

-- Insertar datos en la tabla ClubLectura
-- Se establecen clubes de lectura con sus fechas y oradores.
INSERT INTO ClubLectura (nombre, descripcion, fecha_inicio, fecha_fin, orador) VALUES
('Club de Ciencia Ficción', 'Nos reunimos una vez al mes para debatir un clásico del género.', '2025-10-01', '2026-03-01', 'Prof. Eva Lópe'),
('Aventuras Literarias', 'Para los amantes de las novelas de aventura y viaje.', '2025-11-15', NULL, 'Dr. Marco Polo');

--Tablas intermedias
-- Insertar datos en UsuarioMedalla
-- Se otorgan medallas a usuarios específicos.
INSERT INTO UsuarioMedalla (usuario_id, medalla_id) VALUES
(1, 1),  -- El usuario 1 (Ana García) obtiene la medalla de 'Lector Compulsivo'.
(2, 4),  -- El usuario 2 (Juan Pérez) obtiene la medalla de 'Miembro de Club'.
(3, 3),  -- El usuario 3 (Laura Martínez) obtiene la medalla de 'Pionero del Foro'.
(4, 2);  -- El usuario 4 (Pedro Gómez) obtiene la medalla de 'Crítico Literario'.

-- Insertar datos en ComentarioForo
-- Los usuarios comentan en los foros creados.
INSERT INTO ComentarioForo (foro_id, usuario_id, contenido) VALUES
(1, 2, 'Me parece que el Gran Hermano es una metáfora muy relevante hoy en día.'),
(1, 4, 'Estoy de acuerdo. El control del pensamiento es un tema que sigue vigente.'),
(2, 3, 'Recomiendo "El nombre del viento". ¡Es una obra maestra!');

-- Insertar datos en UsuarioClubLectura
-- Se unen usuarios a los clubes de lectura.
INSERT INTO UsuarioClubLectura (usuario_id, club_id, rol_en_club) VALUES
(1, 1, 'miembro'),
(2, 1, 'miembro'),
(3, 2, 'líder');


-- Exportacion
-- Insertar un registro de exportación de opiniones
-- Un administrador (usuario_id = 3) exportó 150 opiniones en formato CSV.
INSERT INTO Exportacion (usuario_admin_id, cantidad_opiniones_exportadas, formato_archivo, estado) VALUES
(3, 150, 'CSV', 'completado');

-- Insertar otro registro de exportación de opiniones
-- El mismo administrador exportó un set diferente de opiniones en formato XML.
INSERT INTO Exportacion (usuario_admin_id, cantidad_opiniones_exportadas, formato_archivo, estado) VALUES
(3, 220, 'XML', 'completado');

-- Insertar un registro de exportación que tuvo un error
-- Otro administrador (suponiendo que existe un usuario_id = 5) intentó una exportación que falló.
INSERT INTO Exportacion (usuario_admin_id, cantidad_opiniones_exportadas, formato_archivo, estado) VALUES
(5, 0, 'JSON', 'error');