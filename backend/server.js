import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/auth.routes.js';
import coursesRoutes from './src/routes/courses.routes.js';
import usersRoutes from './src/routes/users.routes.js';
import notesRoutes from './src/routes/notes.routes.js';
import bookmarksRoutes from './src/routes/bookmarks.routes.js';
import commentsRoutes from './src/routes/comments.routes.js';
import activitiesRoutes from './src/routes/activities.routes.js';
import notificationsRoutes from './src/routes/notifications.routes.js';
import npsRoutes from './src/routes/nps.routes.js';

// Configuração do __dirname compatível com ESM e CJS
const currentDir = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = typeof __dirname !== 'undefined'
  ? path.resolve(currentDir, '../uploads')
  : path.resolve(currentDir, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

app.use(cors());
app.use(express.json());

// Middleware para normalizar caminhos do IIS (iisnode URL rewrite)
app.use((req, res, next) => {
  if (req.url.startsWith('/cursos/backend')) {
    req.url = req.url.replace('/cursos/backend', '');
  }
  next();
});

// Servir uploads estaticamente
app.use('/uploads', express.static(uploadsDir));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/bookmarks', bookmarksRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/nps', npsRoutes);

// Rota de Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EAD CBMAM API rodando' });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor' });
});

// Exporta o app para ser usado pelo iisnode ou para testes
export default app;

// Se rodado diretamente ou via iisnode (produção), inicia o servidor
if (process.env.NODE_ENV !== 'production' || process.env.IISNODE_VERSION) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta/pipe ${PORT}`);
  });
}
