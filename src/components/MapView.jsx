import React, { useRef, useState, useEffect } from "react"

import OSM from 'ol/source/OSM';
import {Style, Icon, Fill, Stroke} from 'ol/style';
import * as olProj from 'ol/proj';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature';
import {Map as OlMap} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Overlay from 'ol/Overlay';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';

import MapViewContext from "./MapViewContext";
import "./MapView.scss";


const Map = ({locations}) => {
  const mapRef = useRef();
  const popupRef = useRef();
  const [map, setMap] = useState(null);
  const [clickedMarker, setClickedMarker] = useState(null);

  useEffect(() => {
    if (!locations) return;
    const overlay = new Overlay({
      element: popupRef.current,
      autoPan: {
        animation: { duration: 250 },
      },
    });
    const vectorLayer = createVectorLayer(locations);
    let options = {
     view: new View({
        center:[0,0], //getLocation(locations),
        zoom: 10,
        maxZoom: 12,
        showFullExtent:true
      }),
      layers: [
        new TileLayer({source: new OSM()}),
        vectorLayer,
      ],
      controls: [],
      overlays: [overlay]
    };
    let mapObject = new OlMap(options);
    mapObject.setTarget(mapRef.current);
    mapObject.getView().fit(vectorLayer.getSource().getExtent(), {
      size: mapObject.getSize(),
      padding: [50,50,50,50],
    });
    // lines https://stackoverflow.com/questions/9765224/draw-line-between-two-points-using-openlayers
    //https://openstreetmap.be/en/projects/howto/openlayers.html
    mapObject.on('singleclick', function (event) {
      if (mapObject.hasFeatureAtPixel(event.pixel) === true) {
        vectorLayer.getFeatures(event.pixel).then(function (features) {
          const feature = features.length ? features[0] : undefined;
          setClickedMarker(feature.get('name'));
          overlay.setPosition(event.coordinate);
        })
      } else {
          setClickedMarker(null);
          overlay.setPosition(undefined)
          // closer.blur();
      }
    });

    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, [locations]);
  return (
    <div className="map-view">
      <MapViewContext.Provider value={{ map }}>
        <div ref={mapRef} className="ol-map">
        <div ref={popupRef} className="ol-popup">{clickedMarker}</div>
        </div>
      </MapViewContext.Provider>
    </div>
  )
}
export default Map;


const createVectorLayer = (locations) => {
  const featureMarkers = getUniqueCoordinates(locations).map(location => {
    const feature = new Feature({
      geometry: new Point(olProj.fromLonLat([location.longitude,location.latitude])),
      name: `${location.city}, ${location.country}`
    });
    feature.setStyle(
      new Style({
        image: new Icon({
          crossOrigin: 'anonymous',
          src: '/bigdot.png',
          scale: 0.2,
        }),
      }));
    return feature;
  })
  
  const featureLines = locations.map((location, i) => {
    if (i === 0) return null;
    const points = [ [locations[i-1].longitude, locations[i-1].latitude], [location.longitude, location.latitude] ];

    for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
      points[pointIndex] = olProj.transform(points[pointIndex], 'EPSG:4326', 'EPSG:3857');
    }

    const featureLine = new Feature({
      geometry: new LineString(points)
    });
    featureLine.setStyle(
      new Style({
        fill: new Fill({ color: '#00FF00', weight: 4 }),
        stroke: new Stroke({ color: '#FF0000', width: 4 })
      })
    )
    return featureLine;
  }).filter(feature => feature !== null);



  return new VectorLayer({
    source: new VectorSource({features:[...featureMarkers, ...featureLines]})
  });
}

const  getUniqueCoordinates = (stories) => {
  // get unique stories filtering on story.locationPK
  const uniqueCoordinates = stories.filter((story, index, self) =>
    index === self.findIndex((t) => (
      t.locationPK === story.locationPK
    ))
  );
  return uniqueCoordinates;
}