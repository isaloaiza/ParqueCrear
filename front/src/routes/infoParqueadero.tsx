import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import Modal from 'react-modal';
import "../assets/parqueadero.css"


interface SeleccionState {
  hora: string;
  fecha: Date | null;
}

interface PuestoParqueo {
  id: number;
  ocupado: boolean;
  imagen: string;
  tipoVehiculo: string;
  placa: string;
  ano: number;
  tiempoReserva: number;
}

function InfoParqueadero() {
  const [seleccion, setSeleccion] = useState<SeleccionState>({
    hora: '',
    fecha: null,
  });

  const [puestosParqueo, setPuestosParqueo] = useState<PuestoParqueo[]>([]);
  const [mostrarPuestos, setMostrarPuestos] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [puestoSeleccionado, setPuestoSeleccionado] = useState<PuestoParqueo | null>(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [datosReserva, setDatosReserva] = useState({
    tipoVehiculo: '',
    placa: '',
    ano: 0,
    tiempoReserva: 0,
  });

  const handleDateChange = (fecha: Date | null) => {
    setSeleccion((prevSeleccion) => ({
      ...prevSeleccion,
      fecha,
    }));
  };

  const handleTimeChange = (hora: string) => {
    setSeleccion((prevSeleccion) => ({
      ...prevSeleccion,
      hora,
    }));
  };

  const confirmarSeleccion = () => {
    const puestosGenerados: PuestoParqueo[] = [
      { id: 1, ocupado: false, imagen: 'https://loscoches.com/wp-content/uploads/2021/07/carros-de-lujo-mustang-gt.jpg', tipoVehiculo: '', placa: '', ano: 0, tiempoReserva: 0 },
      { id: 2, ocupado: false, imagen: 'https://loscoches.com/wp-content/uploads/2021/07/carros-de-lujo-mustang-gt.jpg', tipoVehiculo: '', placa: '', ano: 0, tiempoReserva: 0 },
      // Agrega más información sobre otros puestos de parqueo
    ];

    setPuestosParqueo(puestosGenerados);
    setMostrarPuestos(true);
  };

  const handlePuestoClick = (puesto: PuestoParqueo) => {
    if (!puesto.ocupado) {
      setPuestoSeleccionado(puesto);
      setMostrarFormulario(true);
      setModalIsOpen(true);
    }
  };

  const handleReservaConfirmada = () => {
    if (puestoSeleccionado) {
      // Actualizamos el estado de ocupado para el puesto seleccionado
      const puestosActualizados = puestosParqueo.map((puesto) => {
        if (puesto.id === puestoSeleccionado.id) {
          return {
            ...puesto,
            ocupado: true,
            tipoVehiculo: datosReserva.tipoVehiculo,
            placa: datosReserva.placa,
            ano: datosReserva.ano,
            tiempoReserva: datosReserva.tiempoReserva,
          };
        }
        return puesto;
      });

      setPuestosParqueo(puestosActualizados);
    }

    // Cerramos el modal después de confirmar la reserva
    setModalIsOpen(false);
    setMostrarFormulario(false);
  };

  const handleModalClose = () => {
    // Limpiamos el estado cuando se cierra el modal
    setPuestoSeleccionado(null);
    setModalIsOpen(false);
    setMostrarFormulario(false);
  };

  return (
    <div className="container">
      <h1>Parqueadero</h1>
      <img className="encabezado-img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPj2PewO8FZloY1l0mNSJ3tq_GLPXjSBflg&usqp=CAU"
        alt=""
      />

      <div>
        <label htmlFor="hora"  className="label-hora">Hora:</label>
        <TimePicker
          id="hora"
          value={seleccion.hora}
          onChange={handleTimeChange}
          disableClock={true}
        />
      </div>

      <div className="botones">
        <DatePicker
          selected={seleccion.fecha}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="Seleccionar fecha"
        />
      </div>

      <div>
        <button onClick={confirmarSeleccion}>Confirmar Selección</button>
      </div>

      {mostrarPuestos && (
        <div className="puestos-disponibles">
          <h2>Puestos Disponibles</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {puestosParqueo.map((puesto) => (
              <div
                key={puesto.id}
                style={{
                  margin: '10px',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  padding: '10px',
                  cursor: puesto.ocupado ? 'not-allowed' : 'pointer',
                  
                }}
                onClick={() => handlePuestoClick(puesto)}
              >
                <img  className="imagen-puesto" src={puesto.imagen} alt={`Puesto ${puesto.id}`} />
                {puesto.ocupado ? (
                  <p>Puesto ocupado</p>
                ) : (
                  <p>Puesto disponible</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Confirmar Reserva"
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {mostrarFormulario ? (
          <div>
            <h2>Reservar Puesto</h2>
            <form>
              <label htmlFor="tipoVehiculo">Tipo de Vehículo:</label>
              <input
                type="text"
                id="tipoVehiculo"
                value={datosReserva.tipoVehiculo}
                onChange={(e) =>
                  setDatosReserva({
                    ...datosReserva,
                    tipoVehiculo: e.target.value,
                  })
                }
              />

              <label htmlFor="placa">Placa:</label>
              <input
                type="text"
                id="placa"
                value={datosReserva.placa}
                onChange={(e) =>
                  setDatosReserva({
                    ...datosReserva,
                    placa: e.target.value,
                  })
                }
              />

              <label htmlFor="ano">Año:</label>
              <input
                type="number"
                id="ano"
                value={datosReserva.ano}
                onChange={(e) =>
                  setDatosReserva({
                    ...datosReserva,
                    ano: parseInt(e.target.value, 10),
                  })
                }
              />

              <label htmlFor="tiempoReserva">Tiempo de Reserva (en horas):</label>
              <input
                type="number"
                id="tiempoReserva"
                value={datosReserva.tiempoReserva}
                onChange={(e) =>
                  setDatosReserva({
                    ...datosReserva,
                    tiempoReserva: parseInt(e.target.value, 10),
                  })
                }
              />

              <button type="button" onClick={handleReservaConfirmada}>
                Reservar
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2>¿Desea reservar este puesto?</h2>
            <button onClick={() => setMostrarFormulario(true)}>Sí, reservar</button>
            <button onClick={handleModalClose}>Cancelar</button>
          </div>
        )}
        <button
          onClick={handleModalClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            fontSize: '18px',
          }}
        >
          X
        </button>
      </Modal>
    </div>
  );
}

export default InfoParqueadero;

