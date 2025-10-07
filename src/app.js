const listaLecturaRoutes = require('./src/routes/listaLectura.routes');
app.use('/api/listas-lectura', listaLecturaRoutes);

const listaRoutes = require('./src/routes/lista.routes');
app.use('/api/listas', listaRoutes);

const userRoutes = require('./src/routes/user.routes');
app.use('/api/user', userRoutes);
