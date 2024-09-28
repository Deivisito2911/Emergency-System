import React, { useState, useEffect, useCallback, useRef } from 'react';
import MapGL, { Marker, Popup, MapRef } from 'react-map-gl';
import markerIcons, { DEFAULT_ICON } from './markerIcons';
import FilterMap from './filterMap';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Markers } from '../types';
import { LATITUD_INICIAL, LONGITUD_INICIAL, ZOOM_INICIAL } from '../types/default-values';
import '../../assets/shortcode.scss';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

interface MarkersMapProps {
  markers: Markers[];
}

export const EmergencyMap: React.FC<MarkersMapProps> = ({ markers }) => {
  const [viewState, setViewState] = useState({
    longitude: LONGITUD_INICIAL,
    latitude: LATITUD_INICIAL,
    zoom: ZOOM_INICIAL,
  });

  const [filteredMarkers, setFilteredMarkers] = useState<Markers[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Markers | null>(null);
  const [selectedByFilter, setSelectedByFilter] = useState<Set<string>>(
    new Set()
  );
  const mapRef = useRef<MapRef>(null);

  const filterMarkersOnViewport = useCallback(() => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();
    const visibleMarkers = markers.filter(
      (marker) =>
        bounds.contains([marker.longitud, marker.latitud]) &&
        (selectedByFilter.size === 0 ||
          selectedByFilter.has(marker.tipoEmergencia))
    );

    setFilteredMarkers(visibleMarkers);
  }, [markers, selectedByFilter]);

  useEffect(() => {
    filterMarkersOnViewport();
  }, [viewState, filterMarkersOnViewport, selectedByFilter]);

  const handleFilterChange = (type: string) => {
    setSelectedByFilter((prevTypes) => {
      const newTypes = new Set(prevTypes);
      if (newTypes.has(type)) {
        newTypes.delete(type);
      } else {
        newTypes.add(type);
      }
      return newTypes;
    });
  };

  const markerTypes = Array.from(
    new Set(markers.map((marker) => marker.tipoEmergencia.toString()))
  );

  return (
    <div style={{ position: 'relative' }}>
      <MapGL
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100%', height: '500px' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        {filteredMarkers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.longitud}
            latitude={marker.latitud}
            anchor="bottom"
            onClick={() => setSelectedMarker(marker)}
          >
            <img
              src={markerIcons[marker.tipoEmergencia] || DEFAULT_ICON}
              alt={`Incendio tipo ${marker.tipoEmergencia}`}
              style={{ cursor: 'pointer' }}
            />
          </Marker>
        ))}
        {selectedMarker && (
          <Popup
            longitude={selectedMarker.longitud}
            latitude={selectedMarker.latitud}
            onClose={() => setSelectedMarker(null)}
            closeOnClick={true}
            anchor="left"
          >
            <div className="popup-content">
              <h3>{selectedMarker.tipoEmergencia}</h3>
              <strong>ID:</strong>
              <p>{selectedMarker.id}</p>
              <strong>Latitud:</strong>
              <p>{selectedMarker.latitud}</p>
              <strong>Longitud:</strong>
              <p>{selectedMarker.longitud}</p>
            </div>
          </Popup>
        )}
      </MapGL>
      <FilterMap
        types={markerTypes}
        selectedTypes={selectedByFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};
