$(document).ready(function () {
  //your code here

    $(function() {

        // Selected day to show on the map
        var day = new Date(2005,3,22)

        // GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
        // Date.toISOString returns YYYY-MM-DDTHH:MM:SSZ. Split at the "T" and
        // take the date which is the first part.
        var dayParameter = function() {
            return day.toLocaleDateString('en-CA');
        };
        const westcoast = [-120, 30]

        var map = new ol.Map({
            view: new ol.View({
                maxResolution: 0.5625,
                projection: ol.proj.get("EPSG:4326"),
                extent: [-180, -90, 180, 90],
                center: westcoast,
                zoom: 3,
                maxZoom: 8
            }),
            target: "map",
            renderer: ["canvas", "dom"],
        });

        var createShiptracks = function() {
            var trackLayer = new ol.layer.Vector({
                title: 'shiptracks',
                source: new ol.source.Vector({
                    url: '/assets/files/example_shiptracks_' + dayParameter() + '.geojson',
                    // url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=' + dayParameter(),
                    format: new ol.format.GeoJSON({geometryName: 'geometry'})
                }),
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'black',
                        width: 2,
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255,0,0,0.0)',
                    })
                })
            });
            return trackLayer;
        }

        var update = function() {
            clearLayers();

            // Add the new layer for the selected time
            map.addLayer(createBasemap());
            // Add point layer to the top
            map.addLayer(createShiptracks());

            // Update the day label
            $("#datepicker").datepicker( "refresh" );
        };

        var clearLayers = function() {
            var activeLayers = map.getLayers().getArray();
            for ( var i = 0; i < activeLayers.length; i++ ) {
                var activeLayer = activeLayers[i];
                if (activeLayer.get("title") === "shiptracks") {
                    var iter = activeLayer.getSource().getFeatures().values();
                    while (!(entry = iter.next()).done) {
                        activeLayer.getSource().removeFeature(entry.value);
                    }
                }
                map.removeLayer(activeLayer);
            }
        };

        var createBasemap = function() {
            var source = new ol.source.WMTS({
                url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME='+dayParameter(),
                layer: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
                format: 'image/jpeg',
                matrixSet: '250m',
                tileGrid: new ol.tilegrid.WMTS({
                  origin: [-180., 90.],
                  resolutions: [
                    0.5625,
                    0.28125,
                    0.140625,
                    0.0703125,
                    0.03515625,
                    0.017578125,
                    0.0087890625,
                    0.00439453125,
                    0.002197265625
                  ],
                  matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                  tileSize: 512
                })
              });

              var layer = new ol.layer.Tile({
                source: source,
                extent: [-180, -90, 180, 90]
              });
            return layer;
        };

        $( "#datepicker" ).datepicker({
          dateFormat: "yy-mm-dd",
          changeYear: true,
          changeMonth: true,
          // defaultDate: day,
          yearRange: "2002:2022",
          onSelect: function(dateText, inst) {
              // var dateAsString = dateText; //the first parameter of this function
              day = $(this).datepicker( 'getDate' ); //the getDate method
              update()
          }
        }).datepicker( "setDate", day );

        update();

        /// Hover styling
        const featureOverlay = new ol.layer.Vector({
          source: new ol.source.Vector(),
          map: map,
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'rgba(255, 255, 255, 0.7)',
              width: 2,
            }),
          }),
        });

        let highlight;
        const displayFeatureInfo = function (pixel) {
          const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
          });

          const info = document.getElementById('info');
          if (feature) {
            info.innerHTML = feature.get('brightness_temperature') || '&nbsp;';
          } else {
            // info.innerHTML = '&nbsp;';  // Don't clear the label if we move off it
          }

          if (feature !== highlight) {
            if (highlight) {
              featureOverlay.getSource().removeFeature(highlight);
            }
            if (feature) {
              featureOverlay.getSource().addFeature(feature);
            }
            highlight = feature;
          }
        };

        map.on('pointermove', function (evt) {
          if (evt.dragging) {
            return;
          }
          const pixel = map.getEventPixel(evt.originalEvent);
          displayFeatureInfo(pixel);
        });

        map.on('click', function (evt) {
          displayFeatureInfo(evt.pixel);
        });


    });
});