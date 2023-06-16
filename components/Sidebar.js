import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {

  const { categorias } = useQuiosco(); // llamamos el hook de useQuiosco

  return (
      <>
          {/* ponemos solo /assets por que apunta directamente a public */}
          <Image width={300} height={100} src="/assets/img/logo.svg"
           alt="imagen logotipo" />

          {/* utilizar la API para consumir los componentes, puede ser con fetch o con axios */}
        <nav className="mt-10">
          {/* recuerda categoria es el prop */}
        {categorias.map(categoria => (
          <Categoria
            key={categoria.id}
            categoria={categoria}/>
        ))}
        </nav>
    </>
  )
}

export default Sidebar