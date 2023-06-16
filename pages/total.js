import { useEffect, useCallback } from "react"; 
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import {formatearDinero} from '../helpers';

export default function Total() {

    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco();

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3 ;
        // confirmar el pedido, si hay algo true or false
    }, [pedido, nombre]); // esta función solo se ejecuta cuando pedido cambia

    useEffect(() => {
        comprobarPedido();
    }, [pedido, comprobarPedido]);

   

    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu Pedio a Continuación</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label htmlFor="nombre" 
                           className="block uppercase text-slate-800 font-bold text-xl">
                        Nombre
                    </label>

                    <input id="nombre" 
                           type="text" 
                           className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                           value={nombre}
                           onChange={e => setNombre(e.target.value)}/> 
                </div>

                <div className="mt-10">
                    <p className="text-2xl">
                    Total a pagar: {''} <span className="font-bold">{formatearDinero(total)}</span>
                    </p>
                </div>

                <div className="mt-5">
                    {/* mandar a llamar la función si esta como true pone esos estilos y si no cambia el estilo */}
                    <input type="submit" 
                           className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600'}
                                      w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`} 
                        value="Confirmar Pedido"
                        disabled={comprobarPedido()} />
                </div>
            </form>
        </Layout>
    )
}