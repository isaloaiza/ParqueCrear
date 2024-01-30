// Mapa.js
// Mapa.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function Mapa({ parqueaderos, onDeleteParqueadero }) {
  const [markers, setMarkers] = useState(() => {
    const storedMarkers = localStorage.getItem('markersData');
    return storedMarkers ? JSON.parse(storedMarkers) : [];
  });

  useEffect(() => {
    // Guardar marcadores en localStorage cada vez que 'markers' cambia
    localStorage.setItem('markersData', JSON.stringify(markers));
  }, [markers]);

  useEffect(() => {
    // Verificar si parqueaderos no es undefined o null
    if (parqueaderos) {
      // Crear nuevos marcadores solo para los parqueaderos que no tienen marcador asociado
      const nuevosMarkers = parqueaderos.map((parqueadero) => ({
        id: parqueadero.id,
        position: [parqueadero.lat, parqueadero.lng],
        info: parqueadero.info,
      }));

      // Actualizar el estado de los marcadores
      setMarkers(nuevosMarkers);
    }
  }, [parqueaderos]);

  const handleDeleteParqueadero = (id) => {
    // Eliminar el marcador correspondiente al parqueadero eliminado
    setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== id));

    // Llamar a la función de eliminación de parqueadero
    onDeleteParqueadero(id);
  };

  return (
    <div style={{ height: '400px' }}>
      <MapContainer center={[4.5236039, -75.7090892]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
       {markers.map((marker) => (
  <Marker key={marker.id} position={marker.position}>
    <Popup>
      {marker.info}
      <Link to="/infoParqueadero">
        <Button color="primary">Información parqueadero</Button>
      </Link>
    </Popup>
  </Marker>
))}

        
      </MapContainer>
    </div>
  );
}

export default Mapa;
