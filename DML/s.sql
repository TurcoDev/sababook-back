-- Seleccionar todos los libros
SELECT * FROM Libro;

-- Seleccionar el nombre y email de todos los usuarios con rol de 'docente'
SELECT nombre, email FROM Usuario WHERE rol = 'docente';

-- Obtener el título del libro y el comentario de la opinión para un libro específico
SELECT L.título, O.comentario, O.calificacion
FROM Opinión AS O
JOIN Libro AS L ON O.libro_id = L.libro_id
WHERE L.título = 'El gran Gatsby';
 
--Listar todos los libros con sus autores y nivel educativo
SELECT
    libro_id,
    título,
    autor,
    género,
    nivel_educativo
FROM
    Libro
ORDER BY
    título;

--Buscar libro por titulo o autor
SELECT
    libro_id,
    título,
    autor
FROM
    Libro
WHERE
    título ILIKE '%El gran Gatsby%'
    OR autor ILIKE '%F. Scott Fitzgerald%';

--Obtener la lista de usuarios con su rol
SELECT
    usuario_id,
    nombre,
    email,
    rol,
    fecha_registro
FROM
    Usuario
ORDER BY
    fecha_registro DESC;

--Contar cantidad de usuarios por su rol
SELECT
    rol,
    COUNT(*) AS cantidad_usuarios
FROM
    Usuario
GROUP BY
    rol;

--Listar los 10 libros mejor calificados
SELECT
    L.título,
    AVG(O.calificacion) AS calificacion_promedio
FROM
    Libro AS L
JOIN
    Opinión AS O ON L.libro_id = O.libro_id
GROUP BY
    L.libro_id, L.título
ORDER BY
    calificacion_promedio DESC
LIMIT 10;

--Obtener calificacion promedio de un libro
SELECT
    AVG(calificacion) AS calificacion_promedio
FROM
    Opinión
WHERE
    libro_id = libro_id;

--Ver todas las opiniones de un libro con el nombre de usuario
SELECT
    U.nombre AS nombre_usuario,
    O.calificacion,
    O.comentario,
    O.fecha
FROM
    Opinión AS O
JOIN
    Usuario AS U ON O.usuario_id = U.usuario_id
WHERE
    O.libro_id = libro_id
ORDER BY
    O.fecha DESC;


--Obtener todos los comentarios de un foro especifico
SELECT
    U.nombre AS nombre_usuario,
    CF.contenido,
    CF.fecha
FROM
    ComentarioForo AS CF
JOIN
    Usuario AS U ON CF.usuario_id = U.usuario_id
WHERE
    CF.foro_id = foro_id
ORDER BY
    CF.fecha;

--Ver miembros de un club de lectura
SELECT
    U.nombre AS nombre_usuario,
    UCL.rol_en_club,
    UCL.fecha_ingreso
FROM
    UsuarioClubLectura AS UCL
JOIN
    Usuario AS U ON UCL.usuario_id = U.usuario_id
WHERE
    UCL.club_id = club_id;

--Ver todas las medallas obtenidas por un usuario
SELECT
    M.nombre,
    M.descripción,
    UM.fecha_obtenida
FROM
    UsuarioMedalla AS UM
JOIN
    Medalla AS M ON UM.medalla_id = M.medalla_id
WHERE
    UM.usuario_id = usuario_id
ORDER BY
    UM.fecha_obtenida DESC;

--Contar cantidad de opiniones exportadas por un administrador
SELECT
    SUM(cantidad_opiniones_exportadas) AS total_opiniones_exportadas
FROM
    Exportacion
WHERE
    usuario_admin_id = usuario_admin_id;

--Obtener calificacion promedio de libro
SELECT
    AVG(calificacion) AS calificacion_promedio
FROM
    Opinión
WHERE
    libro_id = 1;

--Ver todas las opiniones de un libro con el nombre de usuario
SELECT
    U.nombre AS nombre_usuario,
    O.calificacion,
    O.comentario,
    O.fecha
FROM
    Opinión AS O
JOIN
    Usuario AS U ON O.usuario_id = U.usuario_id
WHERE
    O.libro_id = 2
ORDER BY
    O.fecha DESC;


-- Obtener todos los libros con calificación promedio
SELECT
    L.título,
    L.autor,
    AVG(O.calificacion) AS calificacion_promedio
FROM
    Libro AS L
JOIN
    Opinión AS O ON L.libro_id = O.libro_id
GROUP BY
    L.libro_id, L.título, L.autor;

-- Obtener todos los usuarios que no han completado su perfil
SELECT nombre, email
FROM Usuario
WHERE perfil_completo = FALSE;

-- Obtener todos los comentarios de un foro, con el nombre del usuario
SELECT
    U.nombre AS nombre_usuario,
    CF.contenido,
    CF.fecha
FROM
    ComentarioForo AS CF
JOIN
    Usuario AS U ON CF.usuario_id = U.usuario_id
WHERE
    CF.foro_id = 1;