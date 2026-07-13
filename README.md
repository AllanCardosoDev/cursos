# Relatório do Projeto e Planejamento de Desenvolvimento: EAD CBMAM

Este documento descreve detalhadamente o estado atual da plataforma de ensino a distância (EAD) do **Corpo de Bombeiros Militar do Amazonas (CBMAM)**, a arquitetura de comportamento do sistema e o plano de ação técnico para a conclusão das funcionalidades.

---

## 1. Relatório Técnico do que foi Produzido

O projeto está estruturado em duas camadas principais localizadas em `/cursos`:

### A. Backend (Pasta `/backend`)
*   **Servidor Node.js (Express):** Implementado em `backend/server.js`, oferecendo um servidor REST para tratamento de requisições.
*   **Banco de Dados MySQL:**
    *   Conexão gerenciada através do arquivo `backend/db/database.js`.
    *   Script de inicialização estruturada em `backend/db/init.js`, que cria as seguintes tabelas automaticamente se não existirem:
        *   `users`: Perfis de alunos (Cadetes/Bombeiros) e administradores (Majores/Capitães).
        *   `courses`: Catálogo principal de disciplinas.
        *   `modules`: Blocos de conteúdo curricular de cada curso.
        *   `lessons`: Aulas individuais associadas aos módulos, com suporte a referências a manuais PDF e conteúdo teórico.
        *   `quizzes`: Perguntas objetivas dos exames.
        *   `user_progress`: Controle de conclusão de aulas por aluno.
        *   `quiz_attempts`: Histórico de tentativas de provas com notas detalhadas.
        *   **Novas Tabelas Adicionadas (Fase de Planejamento):** `user_notes` (anotações), `user_bookmarks` (favoritos), `lesson_comments` (fórum), `activities` & `activity_registrations` (calendário prático), `notifications` & `user_notifications` (avisos), e `course_nps` (satisfação).
*   **Rotas e Regras de Segurança:**
    *   **Autenticação JWT:** Middleware em `backend/src/middleware/auth.js` garante que apenas usuários autenticados acessem conteúdos confidenciais e audita suas permissões por função (`role`).
    *   **API `/api/auth`:** Cadastro e Login com criptografia `bcryptjs` para senhas.
    *   **API `/api/courses`:** Listagem de cursos, detalhes do curso (incluindo progresso individual de lições e tentativas de exames) e submissão/correção automática de respostas de avaliações.

### B. Frontend SPA (Raiz de `/cursos`)
*   **Interface Estática de Alta Fidelidade:** Construída no arquivo `index.html` e estilizada em `styles.css`. O design apresenta uma estética escura (*dark theme*), moderna e dinâmica, alinhada com as melhores práticas de UX.
*   **Mecanismo SPA e Simulações em JS (`app.js`):** Script completo que orquestra a interatividade do frontend com dados simulados e persistência temporária via `localStorage`:
    *   **Dashboard Operacional:** Exibição dinâmica de níveis de XP do militar, dias consecutivos de acesso (*streak days*), barra de nível e avisos recentes.
    *   **Sala de Aula Avançada:** Player de vídeo, visualizador dinâmico de apostilas PDF (utilizando a biblioteca **PDF.js**), seção de anotações dinâmicas da instrução e área de discussão.
    *   **Analytics do Painel Admin:** Monitoramento estatístico de alunos ativos, taxas de conclusão e notas.
    *   **Gerador de Prova por IA:** Interface preparada para receber textos doutrinários e gerar exames de múltipla escolha via API externa.
    *   **Calendário e Inscrições:** Cadastro e controle de vagas em atividades de salvamento de campo.

---

## 2. Comportamento e Arquitetura do Sistema

O projeto deve se portar como uma aplicação **Full-Stack cliente-servidor nativa**, assegurando persistência e segurança integrada:

```
┌─────────────────────────────────┐
│     Interface do Usuário        │
│   (React SPA / HTML Client)     │
└───────────────┬─────────────────┘
                │ HTTP / HTTPS
                │ Headers: Authorization (JWT Bearer)
                ▼
┌─────────────────────────────────┐
│       API Express (Node.js)     │
│   (Middlewares, JWT, Controllers)│
└───────────────┬─────────────────┘
                │ SQL Queries
                ▼
┌─────────────────────────────────┐
│         Banco MySQL             │
│  (Persistência Centralizada)    │
└─────────────────────────────────┘
```

1.  **Segurança dos Dados:** Nenhuma informação confidencial, anotações ou progresso de curso deverá residir exclusivamente no navegador (`localStorage`). O frontend enviará todas as interações do aluno à API Express, que auditará as permissões via JWT.
2.  **Ambiente de Produção (IIS + PM2):**
    *   O backend rodará na porta **4000** como serviço gerenciado pelo PM2.
    *   O frontend rodará na porta **3000** (ou diretamente mapeado pelo IIS).
    *   O IIS gerencia o proxy reverso e SSL usando as regras de reescrita do arquivo `web.config`.

---

## 3. Planejamento das Próximas Etapas

### Fase 1: Finalização das Tabelas do Banco de Dados
*   [x] Atualização de `init.js` com tabelas de anotações, favoritos, comentários, atividades práticas e notificações.
*   [x] Script de carga inicial (Seed) atualizado para atividades práticas e avisos.
*   [ ] Execução do script para sincronização estrutural no servidor MySQL.

### Fase 2: Expansão de Rotas da API Backend
*   [ ] **Rotas de Interação do Aluno:**
    *   `GET/POST /api/notes/:lessonId` - Salvar e buscar anotações de aulas.
    *   `GET/POST/DELETE /api/bookmarks` - Favoritar/desfavoritar aulas.
    *   `GET/POST /api/comments/:lessonId` - Comentários e fórum de aula.
    *   `POST /api/nps/:courseId` - Notas NPS.
*   [ ] **Rotas do Calendário de Atividades:**
    *   `GET/POST /api/activities` - Visualização e criação de atividades práticas presenciais.
    *   `POST /api/activities/:id/signup` - Inscrição do aluno com validação de limite de vagas.
*   [ ] **Rotas de Notificação e Perfil:**
    *   `GET /api/notifications` - Recebimento de alertas e notificações por usuário.
    *   `PUT /api/notifications/:id/read` - Marcação de lido.
    *   `GET /api/users/profile` - Perfil consolidado, histórico, conquistas (badges) e nível de XP.
    *   `GET /api/users/ranking` - Tabela de classificação baseada em XP.

### Fase 3: Integração do Frontend
*   [ ] **Mapeamento de Requisições:** Substituir os acessos a dados em memória no `app.js` por requisições `fetch()` destinadas ao backend.
*   [ ] **Tratamento de Tokens:** Implementar armazenamento do JWT no `localStorage` após login de sucesso, enviando-o no cabeçalho de todas as chamadas.
*   [ ] **Refatoração:** Organizar scripts de dependência e scripts de deploy automatizados no arquivo `package.json` raiz para uso direto do comando de deploy do CBMAM (`deploy_ead.php`).
