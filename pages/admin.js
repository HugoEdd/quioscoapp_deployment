import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from "../layout/AdminLayout";
import Orden from '../components/Orden';

export default function Admin() {

    // este fetcher es una forma en la que se conecte hacia tu api, siempre va a ser una funcion
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data);
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100});
    // isLoading por defecto viene como true, pero ya que se hace la consulta pasa a false

    // console.log(data);
    // console.log(error);
    // console.log(isLoading);

    return (
        // le pone el titulo arriba a la pagina pagina={'Admin'}
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-2xl my-10">Administra las ordenes</p>

            {data && data.length ? data.map(orden => 
                <Orden key={orden.id} orden={orden} />
            ) : <p>No hay ordenes pendientes </p>}
        </AdminLayout>
    )
}

// useSWR es hook especialmente diseñado para consultar API´S u obtener información
// fetcher la forma en la cual nos vamos a conectar hacia la api
// este hook igual deja que la app actue los cambios en tiempo real, esa config va despues de fetcher que va a ser un obj
// refresca la pagina para que ya no vayamos a otra pagina a hacer los cambios, practicamente esta función nos actualiza el state