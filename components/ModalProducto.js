import {useState, useEffect } from 'react'; // Tendremos un state local, que no viajara por ningún componente
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero} from '../helpers';

const ModalProducto = () => {

  const { producto, handleChangeModal, handleAgregarPedido, pedido } = useQuiosco();
  const [cantidad, setCantidad] = useState(1); // cuando el usuario presione, tendra por default un 1
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      // En JavaScript, el método find() se utiliza para buscar un elemento en un array que cumpla con una condición específica y devuelve el primer elemento que la cumple.
      const productoEdicion = pedido.find(
        (pedidoState) => pedidoState.id === producto.id
      );
  
      setEdicion(true);
      setCantidad(productoEdicion.cantidad);
    }
  }, [producto, pedido]);
  // Comprobar si el Modal Actual esta en el pedido
  // el método some() se utiliza para verificar si al menos un elemento de un array cumple con una condición específica.
  // if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
  //   setEdicion(true); 
  // } else {
  //   console.log('NO existe');
  // }


  return (
    <div className="md:flex gap-10">
          <div className="md:w-1/3">
              <Image width={300} 
                     height={400} 
                  alt={`imagen producto ${producto.nombre}`}
                  src={`/assets/img/${producto.imagen}.jpg`} />
              {/* proucto.imagen, viene desde el state */}
          </div>
          
          <div className="md:w-2/3">
          <div className="flex justify-end">
                <button onClick={ handleChangeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <h1 className="text-3xl font-bold mt-5">
                {producto.nombre}
              </h1>
              
              <p className="mt-5 font-black text-5xl text-amber-500">
                 {formatearDinero(producto.precio)}
              </p>

        <div className="flex gap-4 mt-5">
          {/* ponemos type button, porque por default siempre es submit */}
          <button type="button" onClick={() => {
            if (cantidad <= 1) return;
            setCantidad(cantidad - 1);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <p className="text-3xl">{cantidad}</p>

          <button type="button" onClick={() => {
            if (cantidad >= 5) return; // no le permite comprar tantos
            setCantidad(cantidad + 1);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </div>

        <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-fold uppercase rounded"
          onClick={() => handleAgregarPedido({ ...producto, cantidad })}>
          {/* producto, cantidad lo pasamos como un objeto
              todo dentro del obj producto, para eso copiar todo lo que hay en producto ...producto */}
          
          {/* en el caso de que edicion este como true o false haz lo siguiente */}
          {edicion ? 'Guardar Cambios' : 'Añadir Pedido'}
        </button>

      </div>
    </div>
  )
}

export default ModalProducto