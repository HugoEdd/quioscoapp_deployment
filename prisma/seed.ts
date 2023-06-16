// TIENE la extension de ts mas que nada para instalar la dependencia ts-node
import { categorias } from './data/categorias';
import { productos } from './data/productos';
import { PrismaClient } from '@prisma/client';
// importa ambos archivos y ya podremos acceder a los objetos para agregar a la bd
// prisma client siempre que queramos hacer una operacion en la bd

const prisma = new PrismaClient()

const main = async () : Promise<void> => {
    try {
        // automaticamente prisma tiene los modelos - minuscula
        await prisma.categoria.createMany({
            // dentro de categoria va a agregar todas las categorias que estan en data
           data: categorias
        })
        
        await prisma.producto.createMany({
           data: productos
       })
    } catch (error) {
        console.log(error);
    }
}
main(); // npm i ts-node instalar esa dependencia para correr ts

// ejecutar el seed en consola npx prisma db seed - antes declararlo en package.json