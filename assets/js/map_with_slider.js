$(function() {

    // Seven day slider based off today, remember what today is
    var today = new Date();

    // Selected day to show on the map
    var day = new Date(today.getTime());

    // When the day is changed, cache previous layers. This allows already
    // loaded tiles to be used when revisiting a day. Since this is a
    // simple example, layers never "expire" from the cache.
    var cache = {};

    // GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
    // Date.toISOString returns YYYY-MM-DDTHH:MM:SSZ. Split at the "T" and
    // take the date which is the first part.
    var dayParameter = function() {
        return day.toISOString().split("T")[0];
    };

    var map = new ol.Map({
        view: new ol.View({
            maxResolution: 0.5625,
            projection: ol.proj.get("EPSG:4326"),
            extent: [-180, -90, 180, 90],
            center: [0, 0],
            zoom: 2,
            maxZoom: 8
        }),
        target: "map",
        renderer: ["canvas", "dom"],
    });

    // Coordinates for static points
    var coords = [[25, 58], [0, 0], [45, 14]];

    // // Layer for static points
    // var pointLayer = new ol.layer.Vector({
    //     source: new ol.source.Vector({
    //         features: [new ol.Feature({
    //             geometry: new ol.geom.MultiPoint(coords)
    //         })]
    //     })
    // });

    var features = new ol.format.GeoJSON().readFeatures(geojson);

    features.forEach(function(feature){ feature.setId(undefined) });

    var pointLayer = new ol.layer.Vector({
        title: 'shiptracks',
        source: new ol.source.Vector({
           url: '/assets/files/shiptracks_20050422.geojson',
           // url: 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=' + dayParameter(),
         format: new ol.format.GeoJSON(geometryName='geometry')
        }),
        // style: new ol.style.Style({
        //     stroke: new ol.style.Stroke({
        //       color: 'red',
        //       width: 2,
        //     }),
        //     fill: new ol.style.Fill({
        //       color: 'rgba(255,0,0,0.2)',
        //     })
        //  })
      });


    // Set point style
    var fill = new ol.style.Fill({
        color: [180, 0, 0, 0.3]
    });
    var stroke = new ol.style.Stroke({
        color: [180, 0, 0, 1],
        width: 2
    });

    var pointStyle = new ol.style.Style({
        image: new ol.style.Circle({
            fill: fill,
            stroke: stroke,
            radius: 6
        })
    });

    pointLayer.setStyle(pointStyle);

    var update = function() {
        // Using the day as the cache key, see if the layer is already
        // in the cache.
        var key = dayParameter();
        var layer = cache[key];

        // If not, create a new layer and add it to the cache.
        if ( !layer ) {
            layer = createLayer();
            cache[key] = layer;
        }

        clearLayers();

        // Add the new layer for the selected time
        map.addLayer(layer);
        // Add point layer to the top
        map.addLayer(pointLayer);

        // Update the day label
        $("#day-label").html(dayParameter());
    };

    var clearLayers = function() {
        var activeLayers = map.getLayers().getArray();
        for ( var i = 0; i < activeLayers.length; i++ ) {
            var activeLayer = activeLayers[i];
            if (activeLayer.get("name") === "TileLayer") {
                map.removeLayer(activeLayer);
            }
        }
        map.removeLayer(pointLayer);
    };

    var createLayer = function() {
        var source = new ol.source.WMTS({
            url: "https://map1{a-c}.vis.earthdata.nasa.gov/wmts-geo/wmts.cgi?TIME=" + dayParameter(),
            layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
            format: "image/jpeg",
            matrixSet: "EPSG4326_250m",
            tileGrid: new ol.tilegrid.WMTS({
                origin: [-180, 90],
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
            name: "TileLayer"
        });
        return layer;
    };

    var getDateString = function(date) {
        var date = date.toISOString().split("T")[0];
        var year = date.split("-")[0];
        var month = date.split("-")[1];
        var day = date.split("-")[2];
        return {
            year: year,
            month: month + "/" + year,
            day: day + "/" + month
        };
    };

    update();


    //
    // Slider logic
    //

    var sliderLabels = function(slider, labelType) {
        // Remove previous labels
        $("#day-slider label").remove();

        // Get the options for the slider (specified above)
        var opt = slider.data().uiSlider.options;

        // Get the number of possible values
        var vals = 10;

        // Position the labels
        for (var i = 0; i <= vals; i++) {
            // Get label text
            var labelDay = new Date(today.getTime());
            labelDay.setUTCDate(today.getUTCDate() + (((i / vals) * (opt.max - opt.min)) + opt.min));
            var label = getDateString(labelDay)[labelType];

            // Create a new element and position it with percentages
            var el = $('<label>' + label + '</label>').css('left', (i/vals*100) + '%');

            // Add the element inside #slider
            $("#day-slider").append(el);
        }
    };

    // Slider values are in "days from present".
    $("#day-slider").slider({
        value: 0,
        // 4 months back
        min: -120,
        max: 0,
        step: 1,
        slide: function(event, ui) {
            // Add the slider value (effectively subracting) to today's
            // date.
            var newDay = new Date(today.getTime());
            newDay.setUTCDate(today.getUTCDate() + ui.value);
            day = newDay;
            update();
        }
    }).each(function() {
        sliderLabels($(this), "day");
    });

    // Difference in days between today and slider's current date
    var getDateDiff = function() {
        return Math.ceil((day - today) / (1000 * 3600 * 24));
    };

    // Years option
    $("#yearsOptionBtn").click(function() {
        var dateDiff = getDateDiff();

        $("#day-slider").slider({
            value: dateDiff,
            // 20 years back and forth
            min: dateDiff - 7300,
            max: dateDiff + 7300,
            step: 365
        }).each(function() {
            sliderLabels($(this), "year");
        });
    });

    // Months option
    $("#monthsOptionBtn").click(function() {
        var dateDiff = getDateDiff();

        $("#day-slider").slider({
            value: dateDiff,
            // 20 months back and forth
            min: dateDiff - 600,
            max: dateDiff + 600,
            step: 30
        }).each(function() {
            sliderLabels($(this), "month");
        });
    });

    // Days option
    $("#daysOptionBtn").click(function() {
        var dateDiff = getDateDiff();

        $("#day-slider").slider({
            value: dateDiff,
            // 2 months back and forth
            min: dateDiff - 60,
            max: dateDiff + 60,
            step: 1
        }).each(function() {
            sliderLabels($(this), "day");
        });
    });


    //
    // Drawing logic
    //

    var draw;

    var drawSource = new ol.source.Vector({wrapX: false});
    var drawLayer = new ol.layer.Vector({
        source: drawSource
    });

    $("#drawPointsBtn").click(function() {
        map.addLayer(drawLayer);

        draw = new ol.interaction.Draw({
            source: drawSource,
            type: "Point"
        });
        map.addInteraction(draw);
    });

    $("#cancelDrawingBtn").click(function() {
        map.removeInteraction(draw);
    });

    $("#clearDrawingsBtn").click(function() {
        drawSource.clear();
    });

    $("#saveDrawingsBtn").click(function() {
        var features = drawSource.getFeatures();
        var coordinates = "";

        features.forEach(function(feature) {
           coordinates += feature.getGeometry().getCoordinates() + "\n";
        });

        downloadFile("punktid.txt", coordinates.toString());
    });

    var downloadFile = function(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' +
            encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    };
});
