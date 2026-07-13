// Middleware de upload de PDF com validação dupla:
//   1) fileFilter (MIME type declarado pelo cliente)
//   2) pós-escrita: confere os 5 magic bytes (%PDF-) lendo o arquivo salvo.
//      Se não for PDF de verdade, apaga o arquivo e retorna 400.

import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export const apostilasDir =
  typeof __dirname !== 'undefined'
    ? path.resolve(currentDir, '../../../uploads/apostilas')
    : path.resolve(currentDir, '../../../../uploads/apostilas');

export const capaDir =
  typeof __dirname !== 'undefined'
    ? path.resolve(currentDir, '../../../uploads')
    : path.resolve(currentDir, '../../../../uploads');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Storage default (pode ser sobrescrito no destino da chamada).
function diskStorage(dirName) {
  const targetDir =
    dirName === 'apostilas' ? apostilasDir : capaDir;
  ensureDir(targetDir);
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, targetDir),
    filename: (req, file, cb) => {
      const safe = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, safe + path.extname(file.originalname));
    },
  });
}

function pdfFileFilter(req, file, cb) {
  if (file.mimetype === 'application/pdf') return cb(null, true);
  cb(new Error('Apenas arquivos PDF são permitidos.'));
}

/**
 * Middleware que valida os magic bytes (%PDF-) do arquivo recém-salvo.
 * Aplica-se APÓS o multer ter finalizado a escrita.
 */
export function validatePdfMagicBytes(req, res, next) {
  if (!req.file) return next();
  const filePath = req.file.path;
  try {
    const fd = fs.openSync(filePath, 'r');
    const buf = Buffer.alloc(5);
    fs.readSync(fd, buf, 0, 5, 0);
    fs.closeSync(fd);
    if (buf.toString('utf8') !== '%PDF-') {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'Arquivo não é um PDF válido.' });
    }
    next();
  } catch (err) {
    if (fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch (_) {}
    }
    return res.status(500).json({ message: 'Erro ao validar o arquivo enviado.' });
  }
}

/**
 * Factory de um multer configurado para PDFs.
 * @param {Object} opts
 * @param {'apostilas'|'capa'} [opts.destino='capa']
 *        'apostilas' → grava em /uploads/apostilas/<aulaId>/<ts>.pdf (opcional; pode ser customizado)
 * @param {string} [opts.subdir] subpasta adicional (ex.: `${aulaId}`)
 * @param {number} [opts.maxBytes=25*1024*1024] limite em bytes
 */
export function pdfUpload({
  destino = 'capa',
  subdir = '',
  maxBytes = 25 * 1024 * 1024,
} = {}) {
  const baseDir = destino === 'apostilas' ? apostilasDir : capaDir;
  const finalDir = subdir ? path.join(baseDir, subdir) : baseDir;
  ensureDir(finalDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, finalDir),
    filename: (req, file, cb) => {
      const safe = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, safe + path.extname(file.originalname));
    },
  });

  return multer({
    storage,
    fileFilter: pdfFileFilter,
    limits: { fileSize: maxBytes, files: 1 },
  });
}
