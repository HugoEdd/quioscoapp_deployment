import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
// toast nos permite mandar a llamar el toast de ciertos eventos

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]); // agregaremos multiples elementos, inicial como vacío
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter();
    // definir una categoria por defecto
    // const [paso, setPaso] = useState(1); lo cambiamos en pasos.js

    const obtenerCategorias = async () => {
        // recuerda la api pertenece al mismo dominio
        const { data } = await axios('/api/categorias');
        setCategorias(data);
    }

    useEffect(() => {
        obtenerCategorias()
    }, []);

    // definir categoria actual, por medio del useEffect. En el useEffect de arriba ya tiene las categorias
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]);

    // cada que cambie pedido que se vaya calculando, para eso useEffect
    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);

        setTotal(nuevoTotal);
    }, [pedido])

    const handleClickCategoria = id => {
        // filtrar la info dependiendo del id que estamos recibiendo
        const categoria = categorias.filter(cat => cat.id === id);
        setCategoriaActual(categoria[0]);
        // en cualquier categoria que demos click, siempre lo llevemos hacia esa determinada página
        router.push('/');
    }

    // Esta funcion solo se va a encargar de settear el producto
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    // no va a tomar nada por que eso ya lo tenemos en el state
    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {
        // comprobar SI el producto que estamos agregando ya esta en el state
        if(pedido.some(productoState => productoState.id === producto.id)) {
            // SI el producto ya existe - ACTUALIZAR LA CANTIDAD
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);

            setPedido(pedidoActualizado);
            // Cuando actualizamo tambien tenemos el toast
            toast.success('Guardado Correctamente');

        } else {
            setPedido([...pedido, producto]);
            toast.success('Agregado al Pedido');
        }
        // copia de lo que hay en pedido, y despues le agregamos el producto
        // la copia de producto vendra sin categoriaId no Imagen
   
        setModal(false); // asegurarnos que el modelo este como false
    }

    // const handleChangePaso = paso => {
    //     setPaso(paso);
    // }
    const handleEditarCantidades = id => {
        // setModal lo contrario que hay en Modal
        // esto es un arrayMethod por lo tanto nos devuelve un arreglo, por eso lo de la posicion[0]
        const productoActualizar = pedido.filter(producto => producto.id === id);
        setProducto(productoActualizar[0])
        setModal(!modal)
        // este metodo selecciona uno del arreglo y lo extrae, obviamente el que coincida
    }

    const handleEliminarProducto = id => {
        // este metodo lo saca del arreglo, no como el de editar que filtra esa coincidencia
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);
    }

     const colocarOrden = async(e) => {
        //  al estar aqui en el context, tenemos acceso a todo el state
        e.preventDefault();
        // ? Establecer conexión con el endpoint
        try{
           await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()});
            // axios por default hace la petición get, en el post el segungo argumento son los datos, siempre debe de ser como obj, y debe de cumplir el modelo de PRISMA que definimos

            // Resetear la app cuando ya se finalizo la orden
            setCategoriaActual(categorias[0]); // si estaba en galletas antes de finalizar pedido lo regresa a la primera que es cafe
            setPedido([]); // reinicia el pedido
            setNombre('');
            setTotal(0);

            toast.success('Pedido Realizado Correctamente');

            setTimeout(() => {
                router.push('/');
            }, 3000);


        } catch(error){
            console.log(error);
        }
        

    }

    return (
        <QuioscoContext.Provider value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            handleAgregarPedido,
            pedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total
            // paso,
            // handleChangePaso
        }}>
         {/* children para que sean los componentes hijos de este proyecto */}
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
  
export default QuioscoContext