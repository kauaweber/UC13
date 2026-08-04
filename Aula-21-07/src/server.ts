import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const PORT: number = 4000;

app.use(express.json());

// 🔹 Middleware para registrar a hora da requisição
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Requisição feita em: ${new Date().toISOString()}`);
  next();
});

// 🔹 Middleware que bloqueia requisições entre 00h e 06h
app.use((req: Request, res: Response, next: NextFunction) => {
  const hora = new Date().getHours();

  if (hora >= 0 && hora < 6) {
    return res.status(403).json({
      mensagem: 'Servidor indisponível entre 00h e 06h.'
    });
  }

  next();
});

// 🔹 GET /
app.get('/', (req: Request, res: Response): Response => {
  return res.status(200).send('Servidor está funcionando perfeitamente 🚀');
});

// 🔹 GET /meunome
app.get('/meunome', (req: Request, res: Response): Response => {
  return res.status(200).send('Olá, meu nome é Kaua Weber!');
});

// 🔹 GET /sobre
app.get('/sobre', (req: Request, res: Response): Response => {
  return res.status(200).json({
    nome: 'Kaua Weber',
    idade: 16,
    descricao: 'Estudante de Desenvolvimento de Sistemas.'
  });
});

// 🔹 GET /usuarios
app.get('/usuarios', (req: Request, res: Response): Response => {
  return res.status(200).json({
    mensagem: 'Lista de usuários'
  });
});

// 🔹 POST /usuarios
app.post('/usuarios', (req: Request, res: Response): Response => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({
      mensagem: 'Nome é obrigatório!'
    });
  }

  return res.status(201).json({
    mensagem: `Usuário ${nome} criado com sucesso!`
  });
});

// 🔹 POST /comentarios
app.post('/comentarios', (req: Request, res: Response): Response => {
  const { texto } = req.body;

  if (!texto || texto.trim() === '') {
    return res.status(400).json({
      mensagem: 'O texto é obrigatório!'
    });
  }

  return res.status(201).json({
    mensagem: 'Comentário recebido com sucesso!'
  });
});

// 🔹 PUT /usuarios/:id
app.put('/usuarios/:id', (req: Request, res: Response): Response => {
  return res.status(200).json({
    mensagem: 'Usuário atualizado completamente!'
  });
});

// 🔹 PATCH /usuarios/:id
app.patch('/usuarios/:id', (req: Request, res:Response): Response => {
  return res.status(200).json({
    mensagem: 'Usuário atualizado parcialmente!'
  });
});

// 🔹 DELETE /usuarios/:id
app.delete('/usuarios/:id', (req: Request, res: Response): Response => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      mensagem: 'ID não enviado!'
    });
  }

  return res.status(204).send();
});

// 🔹 DELETE /comentarios/:id
app.delete('/comentarios/:id', (req: Request, res: Response): Response => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      mensagem: 'ID não enviado!'
    });
  }

  return res.status(204).send();
});

// 🔹 Inicia o servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});