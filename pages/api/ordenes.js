import {PrismaClient} from '@prisma/client';

export default async function handler(req, res) {
    // recuerda esto corre en el request, por eso tiene acceso a req y res
    const prisma = new PrismaClient(); // aquí tenemos acceso a todos los métodos de prisma

    // Obtener ordenes
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    });
    // traer las que no estan completas
    res.status(200).json(ordenes);

    // Crear ordenes
    if(req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha, 
            }
        }) 
    
        res.status(200).json(orden);
    }
   
}

// npx prisma migrate dev - crea una nueva migración