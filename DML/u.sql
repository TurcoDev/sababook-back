-- Marcar un usuario como perfil completo
UPDATE Usuario
SET perfil_completo = TRUE
WHERE usuario_id = 2;

-- Actualizar el comentario y la calificación de una Opinion
UPDATE Opinion
SET
    comentario = 'Una obra maestra, aunque es una lectura densa.',
    calificacion = 4
WHERE opinion_id = 3;