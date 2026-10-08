require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const user = await prisma.appUser.findUnique({ where: { username: 'mf02' }, select: { id: true } });
  if (!user) throw new Error('Conta mf02 não encontrada.');
  await prisma.appUser.update({ where: { id: user.id }, data: { nome: 'GABRIEL' } });
  const requests = await prisma.purchaseRequest.updateMany({
    where: { OR: [{ usuarioId: user.id }, { solicitante: { equals: 'gabriel', mode: 'insensitive' } }] },
    data: { solicitante: 'GABRIEL' }
  });
  console.log(JSON.stringify({ accountUpdated: true, requestsUpdated: requests.count }));
})().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
