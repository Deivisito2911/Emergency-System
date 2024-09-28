import {
  EmergencyMap,
  EmergencyMapInput,
  MarkerIconEnum,
  Markers,
} from '@emgencias-udo/lib/emergency-maps';
import { useState } from 'react';
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function NxWelcome({ title }: { title: string }) {
  const initMarkers: Markers[] = [
    {
      id: '1',
      latitud: 10.98,
      longitud: -64.0944,
      tipoEmergencia: MarkerIconEnum.Forestal,
    },
  ];
  const [markers, setMarkers] = useState([...initMarkers])
  const [latLong, setlatLong] = useState({longitud: 0, latitud:0})

  const addMarker = () =>{
    setMarkers([...markers, {
      id: '1',
      tipoEmergencia: MarkerIconEnum.Forestal,
      ...latLong
    }])
  }

  return (
    <>
      <div>
        MAPA {JSON.stringify(markers)}
        <EmergencyMap markers={markers}></EmergencyMap>
      </div>
      <div className='map-container'>
        INPUT <button onClick={addMarker}> agregar </button>
        <EmergencyMapInput
          onMarkerAdd={(longitud, latitud ) => {
            setlatLong({ latitud, longitud });
          }}
        ></EmergencyMapInput>
        
      </div>
    </>
  );
}

export default NxWelcome;
