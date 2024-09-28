import React, { useState } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

interface MapaInputProps {
    onMarkerAdd: (longitude: number, latitude: number) => void;
}

const MapaInput: React.FC<MapaInputProps> = ({ onMarkerAdd }) => {
    const [viewState, setViewState] = useState({
        longitude: -64.0944,
        latitude: 10.98,
        zoom: 8.8
    });
    const [marker, setMarker] = useState<{ longitude: number; latitude: number } | null>(null);

    const updateMarker = (longitude: number, latitude: number) => {
        const newMarker = { longitude, latitude };
        setMarker(newMarker);
        onMarkerAdd(longitude, latitude);
    };

    const setMarkerAtCurrentView = () => {
        updateMarker(viewState.longitude, viewState.latitude);
    };

    const updateMarkerOnDragEnd = (event: any) => {
        const {lng, lat} = event.lngLat;
        updateMarker(lng, lat);
    }

    return (
        <>
            <MapGL
                mapboxAccessToken={MAPBOX_TOKEN}
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            >
                <NavigationControl />

                {marker && (
                    <Marker
                        draggable 
                        longitude={marker.longitude} 
                        latitude={marker.latitude} 
                        onDragEnd={updateMarkerOnDragEnd}
                    />
                )}

                <div className="map-cross"> <PlusIcon className="map-cross" /> </div>
            </MapGL>
            <button onClick={setMarkerAtCurrentView} className="btn btn-form btn-light boton-mapa mt-3">
                <MapPinIcon className="iconos-tabla" />
            </button>
        </>
    );
};

export default MapaInput;
