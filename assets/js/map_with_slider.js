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
                extent: [-180, -80, 180, 80],
                center: [0, 10],
                zoom: 1.0,
                minZoom: 1.0,
                maxZoom: 8
            }),
            target: "map",
            renderer: ["canvas", "dom"],
        });

        var createShiptracks = function() {
            var trackLayer = new ol.layer.Vector({
                title: 'shiptracks',
                source: new ol.source.Vector({
                    url: '/assets/files/daily_shiptrack_files/' + dayParameter() + '_shiptracks.geojson',
                    // url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=' + dayParameter(),
                    format: new ol.format.GeoJSON({geometryName: 'geometry'}),
                    wrapX: false
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
        const selectStyle = new ol.style.Style({
          fill: new ol.style.Fill({
            color: '#eeeeee',
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 0.7)',
            width: 2,
          }),
        });

        const info = document.getElementById('info');

        let selected = null;
        map.on('pointermove', function (e) {
          if (selected !== null) {
            selected.setStyle(undefined);
            selected = null;
          }

          map.forEachFeatureAtPixel(e.pixel, function (f) {
            selected = f;
            selectStyle.getFill().setColor(f.get('COLOR') || '#eeeeee');
            f.setStyle(selectStyle);
            return true;
          });

          if (selected) {
            info.innerHTML = selected.get('MODIS_tile');
          } else {
            // info.innerHTML = '&nbsp;'; // Don't blank out the info once we move off the track
          }


            });
        });
});