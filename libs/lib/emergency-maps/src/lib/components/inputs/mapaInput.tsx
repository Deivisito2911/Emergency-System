import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import { LONGITUD_INICIAL, LATITUD_INICIAL, ZOOM_INICIAL } from '../../types/default-values';
import '../../../assets/shortcode.scss';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

interface MapaInputProps {
    onMarkerAdd: (longitude: number, latitude: number) => void;
}

export const EmergencyMapInput: React.FC<MapaInputProps> = ({ onMarkerAdd }) => {
    const [viewState, setViewState] = useState({
        longitude: LONGITUD_INICIAL,
        latitude: LATITUD_INICIAL,
        zoom: ZOOM_INICIAL
    });
    const defaultPin = { longitude: LONGITUD_INICIAL, latitude: LATITUD_INICIAL }
    const [marker, setMarker] = useState<{ longitude: number; latitude: number } | null>(defaultPin);

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

                {marker && (
                    <Marker
                        draggable 
                        longitude={marker.longitude} 
                        latitude={marker.latitude} 
                        onDragEnd={updateMarkerOnDragEnd}
                    />
                )}

                <div className="map-cross"> <PlusIcon className="map-cross" /> </div>
                <button onClick={setMarkerAtCurrentView} className="btn btn-input">
                    <MapPinIcon className="iconos-tabla" />
                </button>
            </MapGL>
        </>
    );
};
