const map = L.map('map', { 
    center: [38.889784, -77.009096], 
    zoom: 17
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
}).addTo(map);   // on by default

const topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
});

const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

//
// KEEP all the base map layers
//

// Add the following
const house_bldgs = [
    { name: "Rayburn House Office Building",   coords: [38.886802, -77.010550] },
    { name: "Longworth House Office Building", coords: [38.886802, -77.008501] },
    { name: "Cannon House Office Building",    coords: [38.886802, -77.006846] }
]

const iconic_bldgs = [
    {name: "United States Capitol Building",   coords: [38.889808, -77.009075]},
    {name: "United States Supreme Court",      coords: [38.890629, -77.004416]}
]
 
const senate_bldgs = [
    { name: "Russell Senate Office Building",  coords: [38.892869, -77.006840] },
    { name: "Dirksen Senate Office Building",  coords: [38.892869, -77.005175] },
    { name: "Hart Senate Office Building",     coords: [38.892869, -77.004212] }
];

function svgIcon(color) {
    return L.divIcon({
        className: 'poi-icon',
        html: `
            <svg width="25" height="32" viewBox="0 0 25 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.5 12.5 32 12.5 32S25 21.5 25 12.5C25 5.6 19.4 0 12.5 0z"
                    fill="${color}" stroke="#1c2b24" stroke-width="1"/>
                <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
            </svg>`,
        iconSize:    [25, 32],  // match SVG's width/height
        iconAnchor:  [12, 32],  // the pinpoint — where the actual coordinate is at
        popupAnchor: [0, -28]   // where a popup opens relative to iconAnchor
    });
}

const HOUSE_COLOR    = '#a6531c';
const ICONIC_COLOR = '#1fbf78';
const SENATE_COLOR    = '#1f78bf'

const house_line = [
    [38.887460, -77.010475],
    [38.887941, -77.010072],
    [38.888880, -77.009820]
];

const senate_line = [
    [38.890685, -77.008278],
    [38.891804, -77.007599],
    [38.892105, -77.006889],
    [38.892132, -77.005912],
    [38.892132, -77.005030],
    [38.892266, -77.004526],
    [38.892466, -77.004282],
    [38.892708, -77.004169],
    [38.892884, -77.004169]
]

L.polyline(house_line, { color: '#a6531c', weight: 4 }).addTo(map);
L.polyline(senate_line, { color: '#a6531c', weight: 4 }).addTo(map);

// coordinates are counterclockwise
// polygon with holes
// make sure the exterior is counterclockwise and all interiors are clockwise
const supreme_court = [
    // Outer ring
    [
        [38.891046, -77.003922], // NE
        [38.891046, -77.004960], // NW
        [38.890769, -77.004960], // INNER
        [38.890769, -77.005124], // OUTER
        [38.890491, -77.005124], // OUTER
        [38.890491, -77.004960], // INNER
        [38.890211, -77.004960], // SW
        [38.890211, -77.003922], // SE
        [38.890491, -77.003922], // INNER
        [38.890491, -77.003758], // OUTER
        [38.890769, -77.003758], // OUTER
        [38.890769, -77.003922]  // INNER
    ],
    // NE hole
    [
        [38.890923, -77.004072],
        [38.890773, -77.004072],
        [38.890773, -77.004279],
        [38.890923, -77.004279]
    ],
    // NW hole
    [
        [38.890923, -77.004601],
        [38.890773, -77.004601],
        [38.890773, -77.004805],
        [38.890923, -77.004805]
    ],
    // SW hole
    [
        [38.890474, -77.004601],
        [38.890324, -77.004601],
        [38.890324, -77.004805],
        [38.890474, -77.004805]
    ],
    // SE hole
    [
        [38.890474, -77.004072],
        [38.890324, -77.004072],
        [38.890324, -77.004279],
        [38.890474, -77.004279]
    ]
]

// multipolygon
const dirksen_hart = 
[
    // Dirksen Building
    [
        // First ring (Exterior)
        [
            [38.893473, -77.004671],
            [38.893473, -77.005663],
            [38.892229, -77.005663],
            [38.892229, -77.004671]
        ],
        // Second ring (Northern hole)
        [
            [38.893284, -77.004955],
            [38.892982, -77.004955],
            [38.892982, -77.005175],
            [38.893284, -77.005175]
        ],
        // Third ring (Southern hole)
        [
            [38.892731, -77.004955],
            [38.892431, -77.004955],
            [38.892431, -77.005312],
            [38.892731, -77.005312]
        ]
    ],
    // Hart Building
    [
        // First ring (only one)
        [
            [38.893481, -77.004110],
            [38.893481, -77.004671],
            [38.892215, -77.004671],
            [38.892215, -77.004110],
            [38.892547, -77.004110],
            [38.892547, -77.003785],
            [38.892750, -77.003785],
            [38.892750, -77.003697],
            [38.892952, -77.003697],
            [38.892952, -77.003785],
            [38.893153, -77.003785],
            [38.893153, -77.004110]
        ]
    ]
]

// 1. Make 3 layer groups for the points

const houseLayer = L.layerGroup(
  house_bldgs.map(f => L.marker(f.coords, { icon: svgIcon(HOUSE_COLOR) })) // construct a new array
).addTo(map);

const iconicLayer = L.layerGroup(
  iconic_bldgs.map(f => L.marker(f.coords, { icon: svgIcon(ICONIC_COLOR) })) // construct a new array
).addTo(map);

const senateLayer = L.layerGroup(
  senate_bldgs.map(f => L.marker(f.coords, { icon: svgIcon(SENATE_COLOR) })) // construct a new array
).addTo(map);

// 2. Create one layer group for both subway lines
const linesLayer = L.layerGroup([
    L.polyline(house_line, { color: '#a6531c', weight: 4 }),
    L.polyline(senate_line, { color: '#a6531c', weight: 4 })
]);

// 3. Create one layer group for all buildings
const polygon_style = {color: '#1f6f78', fillColor: '#1f6f78', fillOpacity: 0.25};

const buildingLayer = L.layerGroup([
    L.polygon(supreme_court, polygon_style),
    L.polygon(dirksen_hart, polygon_style)
])

// 4. Create the control with all layers
L.control.layers(
    { "Streets": streets, "Topographic": topo, "Satellite": satellite, "OpenStreetMap": osm },
    { "House Offices": houseLayer, "Landmark Sites": iconicLayer, "Senate Offices": senateLayer, 
        "Capitol Subway System": linesLayer, "Buildings": buildingLayer }
).addTo(map);

[1, 2, 3].map(i=>(i*3))
// [3, 6, 9]


