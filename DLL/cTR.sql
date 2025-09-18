-- Tabla: RecursoEducativo
-- Recursos adicionales asociados a un libro específico.
CREATE TABLE RecursoEducativo (
    recurso_id SERIAL PRIMARY KEY,
    libro_id INTEGER REFERENCES Libro(libro_id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    descripción TEXT
);

-- Tabla: ListaLectura
-- Lista de lectura creada por un docente.
CREATE TABLE ListaLectura (
    lista_id INTEGER REFERENCES Lista(lista_id),
    docente_id INTEGER REFERENCES Usuario(usuario_id),
    descripción TEXT,
    nivel VARCHAR(50),
    fecha_creación TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (lista_id, docente_id)
);

-- Tabla: Opinión
-- Opiniones y calificaciones de los libros.
CREATE TABLE Opinión (
    opinion_id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuario(usuario_id),
    libro_id INTEGER REFERENCES Libro(libro_id),
    calificacion SMALLINT CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Foro
-- Foros de discusión creados por usuarios.
CREATE TABLE Foro (
    foro_id SERIAL PRIMARY KEY,
    título VARCHAR(255) NOT NULL,
    descripción TEXT,
    creador_id INTEGER REFERENCES Usuario(usuario_id),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: ComentarioForo
-- Comentarios dentro de los foros.
CREATE TABLE ComentarioForo (
    comentario_id SERIAL PRIMARY KEY,
    foro_id INTEGER REFERENCES Foro(foro_id) ON DELETE CASCADE,
    usuario_id INTEGER REFERENCES Usuario(usuario_id),
    contenido TEXT NOT NULL,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Exportacion
-- Registro de las exportaciones de datos.
CREATE TABLE Exportacion (
    exportacion_id SERIAL PRIMARY KEY,
    fecha_exportacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    usuario_admin_id INTEGER REFERENCES Usuario(usuario_id),
    cantidad_opiniones_exportadas INTEGER,
    formato_archivo VARCHAR(50),
    estado VARCHAR(50)
);

-- Tabla: UsuarioClubLectura
-- Tabla intermedia para la relación entre usuarios y clubes de lectura.
CREATE TABLE UsuarioClubLectura (
    usuario_id INTEGER REFERENCES Usuario(usuario_id),
    club_id INTEGER REFERENCES ClubLectura(club_id),
    fecha_ingreso TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    rol_en_club VARCHAR(50),
    PRIMARY KEY (usuario_id, club_id)
);

-- Tabla: UsuarioMedalla
-- Tabla intermedia para la relación entre usuarios y medallas.
CREATE TABLE UsuarioMedalla (
    usuario_id INTEGER REFERENCES Usuario(usuario_id),
    medalla_id INTEGER REFERENCES Medalla(medalla_id),
    fecha_obtenida TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, medalla_id)
);