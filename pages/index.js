// import { PrismaClient } from "@prisma/client";
import Layout from "../layout/Layout";
import Producto from "../components/Producto";
import useQuiosco from "../hooks/useQuiosco";

export default function Home() {

  const { categoriaActual } = useQuiosco();

  return (
    // pagina={`Menú ${categoriaActual.nombre}`} va ir cambiando el titulo segun la categoría en donde nos encontremos
    // el optional chaning, el obj puede estar vacio, o puede que no, eso evita el error
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2
           xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map(producto => (
        <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    
    </Layout>
  );
}

 // ! Prisma client no puede correr en el navegador
  // useEffect(() => {
  //   const consultarDB = async () => {
  //     const prisma = new PrismaClient();
  //     const categorias = await prisma.categoria.findMany();
  //     console.log(categorias);
  //   }
  //   consultarDB();
  // }, []);

  // Consultar DB
/*export default function Home({ categorias }) {
export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const categorias = await prisma.categoria.findMany();
  return {
    props: {
      categorias,
    },
  }
}*/
// PROFE: Vamos a utilizar getServerSideProps, cuando en el componente(categorias) quieras mostrar los resultados
// la API la vamos a utilizar cuando queramos tener información que queramos colocar en el state, y queramos tenerla disponoble en nuestro state