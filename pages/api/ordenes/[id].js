import {PrismaClient} from '@prisma/client';

export default async function handler(req, res) {

    const prisma = new PrismaClient();

    if (req.method === 'POST') {
        // aquí ya tenemos el id que queremos actualizar
        const { id } = req.query
        
        const ordenActualizada = await prisma.orden.update({
            // el where indica que vamos a actualizar, despues de eso le decimos que es lo queremos que se actualice
            where: {
                id: parseInt(id)
            },
            data: {
                estado: true
            }
        })
        res.status(200).json(ordenActualizada);
        // esto lo muestra en la consola del navegador
    }
}