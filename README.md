# MF Alocação de Estoque com Prisma

## Requisitos
- Node.js 20 ou superior
- Docker Desktop com Compose
6. Ao iniciar com `npm.cmd start`, o servidor aplica automaticamente `prisma db push`: cria tabelas ausentes e reutiliza a estrutura compativel que ja existe, sem aceitar perda de dados.
7. Para importar os itens da planilha no banco antes do primeiro acesso, `npm.cmd run db:setup` continua disponivel como opcao.
1. Copie `.env.example` para `.env`.
2. Inicie o PostgreSQL: `docker compose up -d postgres`.
3. No PowerShell, instale as dependências: `npm.cmd install`.
4. Se o npm solicitar aprovação de scripts, permita os scripts do Prisma: `npm.cmd install-scripts approve @prisma/client @prisma/engines prisma`.
5. Gere o cliente: `npm.cmd run prisma:generate`.
6. Crie as tabelas e importe os itens: `npm.cmd run db:setup`.
7. Inicie o servidor: `npm.cmd start`.
8. Acesse `http://localhost:3000`.

O Prisma grava estoque e contagens no PostgreSQL. Os registros locais existentes são migrados para o banco na primeira conexão de cada unidade. Sem conexão, as alterações ficam no dispositivo e entram em uma fila local; o app tenta sincronizá-las quando a rede ou o servidor voltar. Para sincronizar dispositivos, abra o app pelo mesmo servidor, publicado em HTTPS para acesso externo.

## Solicitação de compra
O módulo permite registrar pedidos, consultar solicitações compartilhadas, filtrar por status e atualizar o andamento. As solicitações criadas offline entram na fila local e são enviadas ao servidor quando a conexão voltar. Após atualizar o schema, aplique as tabelas com `npm.cmd run db:push` e gere o cliente com `npm.cmd run prisma:generate`.

## Login e perfis
Configure no arquivo `.env` as senhas dos dois administradores e dos três usuários (mínimo de 12 caracteres) e defina `AUTH_SECRET` com um segredo aleatório de pelo menos 32 caracteres. O servidor cria/atualiza essas cinco contas ao iniciar. Administradores podem aprovar, rejeitar, concluir e excluir solicitações; usuários podem editar alocações e enviar pedidos, e veem apenas as solicitações que criaram. Depois de atualizar o Prisma, aplique o schema com `npm.cmd run db:push` e reinicie o servidor.
As credenciais locais iniciais ficam no `.env` (arquivo ignorado pelo Git); troque as senhas antes de disponibilizar o servidor a outras pessoas. Para HTTPS, configure `COOKIE_SECURE=true`.

## Instalar no Android, iPhone, tablet ou computador
O aplicativo pode ser instalado como PWA pelo navegador, sem uma loja de aplicativos. Primeiro publique este servidor em um endereço HTTPS acessível aos dispositivos. Compartilhe esse endereço: no Android, abra no Chrome e use **Instalar aplicativo**; no iPhone/iPad, abra no Safari, toque em **Compartilhar** e depois em **Adicionar à Tela de Início**. Em computadores, use a opção de instalação exibida pelo Chrome/Edge. O endereço `http://localhost:3000` só funciona no próprio computador e não serve como link de download para outros dispositivos.
