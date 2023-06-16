// otro lugar donde podemos ejecutar el código de prisma
// Esta parte siempre corre del lado de servidor - no incrementan el tamaño de tu archivo , cuando ingresamos a api/categorias - nos trae un respuesta como json
// la API corre aqui en la carpeta con el mismo nombre o en la funcion getServerSideProps que esta en index
// PRISMA no va a funcionar cuando quieras utilizar la bd en el cliente
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
    
  // const prisma = new PrismaClient(); se puede poner aqui y el resultado es el mismo
  // include se va a traer los campos que esten relacionados
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    }
  });

  res.status(200).json(categorias)
}

// PROFE: Vamos a utilizar getServerSideProps, cuando en el componente(categorias) quieras mostrar los resultados
// la API la vamos a utilizar cuando queramos tener información que queramos colocar en el state, y queramos tenerla disponoble en nuestro state