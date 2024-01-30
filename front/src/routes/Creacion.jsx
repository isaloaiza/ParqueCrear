// App.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Mapa from '../js/Mapa';

function App() {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('parqueaderosData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [markers, setMarkers] = useState([]);

  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({
    id: 0,
    parqueadero: '',
    direccion: '',
    longitud: 0,
    latitud: 0,
    puestos: 0,
  });
  const [parqueaderos, setParqueaderos] = useState([]);

  useEffect(() => {
    // Guardar datos en localStorage cada vez que 'data' cambia
    localStorage.setItem('parqueaderosData', JSON.stringify(data));
  }, [data]);

  const mostrarModalActualizar = (dato) => {
    setForm(dato);
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
    // Generar un nuevo ID al abrir el modal de inserción
    const nuevoId = data.length > 0 ? Math.max(...data.map((dato) => dato.id)) + 1 : 1;
    setForm({ ...form, id: nuevoId });
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = (dato) => {
    const arreglo = data.map((registro) =>
      dato.id === registro.id
        ? {
            ...registro,
            parqueadero: dato.parqueadero,
            direccion: dato.direccion,
            longitud: dato.longitud,
            latitud: dato.latitud,
            puestos: dato.puestos,
          }
        : registro
    );
    setData(arreglo);
    setModalActualizar(false);
  };

  const eliminar = (dato) => {
    const opcion = window.confirm(`Estás seguro que deseas Eliminar el elemento ${dato.id}`);
    if (opcion) {
      const arreglo = data.filter((registro) => dato.id !== registro.id);
      setData(arreglo);
      setModalActualizar(false);
    }
  };

  const insertar = () => {
    const valorNuevo = { ...form, id: data.length + 1 };
  
    setData([...data, valorNuevo]);
  
    const nuevoParqueadero = {
      parqueadero: valorNuevo.parqueadero,
      lat: parseFloat(valorNuevo.latitud),
      lng: parseFloat(valorNuevo.longitud),
      puestos: valorNuevo.puestos,
      info: `Información sobre ${valorNuevo.parqueadero}`,
    };
  
    setParqueaderos([...parqueaderos, nuevoParqueadero]);
    setMarkers([...markers, { position: [nuevoParqueadero.lat, nuevoParqueadero.lng], info: nuevoParqueadero.info }]);
  
    setModalInsertar(false);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Container>
        <br />
        <Link to="/Dashboard">
          <Button color="primary">Regresar</Button>
        </Link>
        <Button color="success" onClick={mostrarModalInsertar}>
          Crear
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Parqueadero</th>
              <th>Dirección</th>
              <th>Longitud</th>
              <th>Latitud</th>
              <th>Puestos</th>
            </tr>
          </thead>

          <tbody>
            {data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.parqueadero}</td>
                <td>{dato.direccion}</td>
                <td>{dato.longitud}</td>
                <td>{dato.latitud}</td>
                <td>{dato.puestos}</td>
                <td>
                  <Button color="primary" onClick={() => mostrarModalActualizar(dato)}>
                    Editar
                  </Button>{' '}
                  <Button color="danger" onClick={() => eliminar(dato)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Mapa parqueaderos={parqueaderos} />

      {/* Modal de Actualización */}
      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>ID:</label>
            <input className="form-control" readOnly type="text" value={form.id} />
          </FormGroup>

          <FormGroup>
            <label>Parqueadero: </label>
            <input
              className="form-control"
              name="parqueadero"
              type="text"
              onChange={handleChange}
              value={form.parqueadero}
            />
          </FormGroup>

          <FormGroup>
            <label>Dirección: </label>
            <input
              className="form-control"
              name="direccion"
              type="text"
              onChange={handleChange}
              value={form.direccion}
            />
          </FormGroup>

          <FormGroup>
            <label>Longitud: </label>
            <input
              className="form-control"
              name="longitud"
              type="number"
              onChange={handleChange}
              value={form.longitud}
            />
          </FormGroup>

          <FormGroup>
            <label>Latitud: </label>
            <input
              className="form-control"
              name="latitud"
              type="number"
              onChange={handleChange}
              value={form.latitud}
            />
          </FormGroup>
          <FormGroup>
            <label>Puestos: </label>
            <input
              className="form-control"
              name="puestos"
              type="number"
              onChange={handleChange}
              value={form.puestos}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => editar(form)}>
            Editar
          </Button>
          <Button color="danger" onClick={cerrarModalActualizar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal de Inserción */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Parqueadero</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>ID: </label>
            <input className="form-control" readOnly type="text" value={form.id} />
          </FormGroup>

          <FormGroup>
            <label>Parqueadero: </label>
            <input
              className="form-control"
              name="parqueadero"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Dirección: </label>
            <input
              className="form-control"
              name="direccion"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Longitud: </label>
            <input
              className="form-control"
              name="longitud"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Latitud: </label>
            <input
              className="form-control"
              name="latitud"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Puestos: </label>
            <input
              className="form-control"
              name="puestos"
              type="number"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={insertar}>
            Insertar
          </Button>
          <Button color="danger" onClick={cerrarModalInsertar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
