-- Tabla: Rol
-- El rol se define fuera de Usuario para permitir una gestión más flexible.
CREATE TABLE Rol (
    rol_id SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla: Usuario
-- Contiene la información básica de todos los usuarios.
CREATE TABLE Usuario (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    rol VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    perfil_completo BOOLEAN DEFAULT FALSE,
    avatar_url TEXT
);

-- Tabla: Libro
-- Almacena los datos de los libros.
CREATE TABLE Libro (
    libro_id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    género VARCHAR(100),
    descripcion TEXT,
    portada_url TEXT,
    nivel_educativo VARCHAR(50)
);

-- Tabla: Lista
-- Define listas temáticas o de lectura.
CREATE TABLE Lista (
    lista_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Medalla
-- Cataloga las medallas que los usuarios pueden ganar.
CREATE TABLE Medalla (
    medalla_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    tipo_accion VARCHAR(50),
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: ClubLectura
-- Almacena la información de los clubes de lectura.
CREATE TABLE ClubLectura (
    club_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    orador VARCHAR(255)
);