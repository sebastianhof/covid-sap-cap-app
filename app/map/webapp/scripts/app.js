var circles = [];
var mapboxAccessToken = 'pk.eyJ1Ijoic2ViYXN0aWFuaG9mIiwiYSI6ImNrODc3N2VnYjA2bmkzZW9paWQ1OTczbGoifQ.FN2MheiR-FbXIqalc294bA';
var timeFormatter = d3.timeFormat('%Y-%m-%dt%H:%M:%S');
var numberFormatter = d3.format(",");

var properties = [{
        code: 'Confirmed',
        desc: 'Confirmed cases'
    },
    {
        code: 'Deaths',
        desc: 'Deaths'
    },
    {
        code: 'Recovered',
        desc: 'Recovered cases'
    }
];
var currProperty = 'Confirmed';
var ProvinceState = 'Province';
var CountryRegion = 'Country';

var theMap = L.map('map', {
    maxZoom: 14
});
theMap.attributionControl.addAttribution('COVID-19 (2019-nCoV) <a href="https://github.com/CSSEGISandData/COVID-19">JHU CSSE</a>');
theMap.attributionControl.addAttribution('Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Map data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>');

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(theMap);
// center of map 
// Walldorf Germany
theMap.setView([49.30637, 8.64236], 4);

var radiusScale = d3.scaleLinear().domain([0, 200]).range([7, 70]).clamp(true);
var colorScale = d3.scaleSequential(d3.interpolateOrRd).domain([0, 100]);

function renderCircles() {
    circles.forEach(function (c) {
        c.remove();
    })
    circles = [];

    theData.features.forEach(function (feature) {
        var c = L.circleMarker(
            [feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                radius: radiusScale(feature.properties[currProperty] * 0.001),
                color: colorScale(feature.properties[currProperty]),
                fillColor: colorScale(feature.properties[currProperty]),
                fillOpacity: 0.5
            });
        c.addTo(theMap);
        if (feature.properties[ProvinceState] !== "") {
            c.bindTooltip('<h3>' + feature.properties[ProvinceState] + '</h3> - ' + feature.properties[CountryRegion] + '<br><br><b>' + currProperty + ': </b>' + numberFormatter(feature.properties[currProperty]) + '<br>' + '<b>Death: </b>' + numberFormatter(feature.properties.Deaths) + '<br>' + '<b>Recovered: </b>' + numberFormatter(feature.properties.Recovered));
        } else {
            c.bindTooltip('<h3>' + feature.properties[CountryRegion] + '</h3><br><b>' + currProperty + ': </b>' + numberFormatter(feature.properties[currProperty]) + '<br>' + '<b>Death: </b>' + numberFormatter(feature.properties.Deaths) + '<br>' + '<b>Recovered: </b>' + numberFormatter(feature.properties.Recovered));
        }
        circles.push(c);
    });
}

function fetchData() {
    var url = '/geojson';
    d3.json(url).then(function (response) {

        if (response == null)
            return;

        theData = response;
        renderCircles();
    });
}

fetchData();