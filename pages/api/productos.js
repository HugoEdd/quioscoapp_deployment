import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
    
  // const prisma = new PrismaClient(); se puede poner aqui y el resultado es el mismo
    const productos = await prisma.producto.findMany({
        where: {
          categoriaId: 1,
      }
  });

    res.status(200).json(productos);
}
