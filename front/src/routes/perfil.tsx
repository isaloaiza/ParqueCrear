import { useState } from 'react';
import PortalLayout from '../layout/PortalLayout';
// import '../routes/contac.css'
import { useAuth } from "../Autenticacion/AutProvider"

function MiComponente() {
  const auth = useAuth();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const handleImagenSeleccionada = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagenSeleccionada(e.target.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const eliminarImagen = () => {
    setImagenSeleccionada(null);
  };

  return (
    <div className='perfil'>
      <PortalLayout>
        <h1>Perfil</h1>
        <div className="contenedor-imagen-circular">
          <label htmlFor="input-imagen" className="boton-imagen">
            {imagenSeleccionada ? (
              <img
                src={imagenSeleccionada}
                alt="Imagen seleccionada"
                className="imagen-circular"
              />
            ) : (
              <span className='seleccionar'>+</span>
            )}
          </label>
          <input
            type="file"
            id="input-imagen"
            accept="image/*"
            onChange={handleImagenSeleccionada}
            style={{ display: 'none' }}
          />
        </div>
        {imagenSeleccionada && (
          <button onClick={eliminarImagen}>Cambiar imagen</button>
          
        )}
        <h2>nombre {auth.getUser()?.name || ""}</h2>
        <label htmlFor="Apellido">Apellido</label>
        <input type="text" placeholder="Ingrese apellido" />
        <h2>correo  {auth.getUser()?.username || ""}</h2>
        <label htmlFor="carro">Carro</label>
        <input type="text" placeholder="Ingrese el tipo de carro" />

        <label htmlFor="placa">Placa</label>
        <input type="text" placeholder="Ingrese la placa" />
        <button>Actualizar informacion </button>
      </PortalLayout>
    </div>
   
  );
}

export default MiComponente;