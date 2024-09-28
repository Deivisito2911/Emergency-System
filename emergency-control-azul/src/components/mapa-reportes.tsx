import React, { useState, useEffect, useCallback, useRef } from 'react';
import MapGL, { Marker, Popup, MapRef } from 'react-map-gl';
import { Markers } from '../types';
import markerIcons from './markerIcons';
import FilterMap from './filterMap';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

interface MarkersMapProps {
  markers: Markers[];
}

const MarkersMap: React.FC<MarkersMapProps> = ({ markers }) => {
  const [viewState, setViewState] = useState({
    longitude: -64.0944,
    latitude: 10.98,
    zoom: 9.2,
  });

  const [filteredMarkers, setFilteredMarkers] = useState<Markers[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Markers | null>(null);
  const [selectedByFilter, setSelectedByFilter] = useState<Set<string>>(new Set());
  const mapRef = useRef<MapRef>(null);

  const filterMarkersOnViewport = useCallback(() => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();
    const visibleMarkers = markers.filter((marker) =>
      bounds.contains([marker.longitud, marker.latitud]) &&
      (selectedByFilter.size === 0 || selectedByFilter.has(marker.tipoIncendio))
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

  const markerTypes = Array.from(new Set(markers.map((marker) => marker.tipoIncendio)));

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
              src={markerIcons[marker.tipoIncendio] || 'default-icon-url.png'}
              alt={`Incendio tipo ${marker.tipoIncendio}`}
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
              <h3>{selectedMarker.tipoIncendio}</h3>
              <strong>ID:</strong><p>{selectedMarker.id}</p>
              <strong>Latitud:</strong><p>{selectedMarker.latitud}</p>
              <strong>Longitud:</strong><p>{selectedMarker.longitud}</p>
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

export default MarkersMap;
