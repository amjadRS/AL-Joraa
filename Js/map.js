// ==========================
// CONFIG
// ==========================
const branches = [
    {
        key: "sweileh",
        lat: 32.02413402813099,
        lng: 35.83891983264243,
        name: "الجرعة الدوائية",
        branch: "فرع صويلح",
        pharmacist: "الجرعة الدوائية",
        phone1: "065372224",
        phone2: "0797014737",
        address: "صويلح - شارع الأميرة هيا - جانب العيادات الطبية"
    },
    {
        key: "sweileh2", 
        lat: 32.026627452433665,
        lng: 35.83674936681523,
        name: "الجرعة الدوائية",
        branch: "فرع صويلح",
        pharmacist: "المهارة الدوائية",
        phone1: "065372226",
        address: "صويلح - شارع الأميرة هيا - مقابل كازية جو بترول"
    },
    {
        key: "shafa-bdran", 
        lat: 32.052398661220586,
        lng: 35.877968094311605,
        name: "الجرعة الدوائية",
        branch: "فرع شفا-بدران",
        pharmacist: "سما ابو نصير الدوائية",
        phone1: "0797587765",
        address: "ابو نصير - السوق التجاري"
    },
    {
        key: "shafa-bdran2", 
        lat:  32.05658950522039,
        lng: 35.9123154290289,
        name: "الجرعة الدوائية",
        branch: "فرع شفا-بدران",
        pharmacist: "الجرعة الدوائية ",
        phone1: "065249522",
        address: "ابو نصير -  بعد دوار الحجاج"
    },
    {
        key: "alsalt",  
        lat:  32.0691875578107,
        lng:  35.71874916147663,
        name: "الجرعة الدوائية",
        branch: " فرع السلط ",
        pharmacist: "الجرعة الدوائية جسر زي",
        phone1: "053552223",
        address: "السلط - شارع الامير حمزة - جسر زي"
    },
    {
        key: "alsalt2", 
        lat:  32.0444867484455,
        lng:  35.71992289714334,
        name: "الجرعة الدوائية",
        branch: " فرع السلط ",
        pharmacist: "الجرعة الدوائية - الخندق",
        phone1: "053552224",
        address: "السلط - وادي الحلبي - مثلث الخندق"
    },
    {
        key: "alsalt3",  
        lat:  32.05073519999999,
        lng:  35.72866758465501,
        name: "الجرعة الدوائية",
        branch: " فرع السلط ",
        pharmacist: "الجرعة الدوائية - البحيرة",
        phone1: "053556365",
        address: "السلط - البحيرة - قرب مدرسة عائشة"
    },
    {
        key: "alhussen",   
        lat:  31.969119296738267,
        lng:  35.92574921349126,
        name: "الجرعة الدوائية",
        branch: " فرع مخيم الحسين",
        pharmacist: "الجرعة الدوائية",
        phone1: "064636369",
        address: "مخيم الحسين - مقابل الياسوري للتموين "
    },
];


// ==========================
// GET BRANCH FROM URL
// ==========================
const params = new URLSearchParams(window.location.search);
const branchKey = params.get("branch");

// اختيار الفرع
const currentBranch = branches.find(b => b.key === branchKey) || branches[0];

// LOCATION
const LOCATION = currentBranch;


// ==========================
// HELPER FUNCTION (إخفاء/إظهار الحقول)
// ==========================
function setField(value, textId, rowId) {
    const row = document.getElementById(rowId);
    const text = document.getElementById(textId);

    if (value && value.toString().trim() !== "") {
        text.innerText = value;
        row.style.display = "flex"; // غيّرها لـ block إذا تصميمك مختلف
    } else {
        row.style.display = "none";
    }
}


// ==========================
// UPDATE INFO BOX
// ==========================
document.getElementById("pharmacistName").innerText =
    " اسم الصيدلية : " + (LOCATION.pharmacist || "");

// استخدم الدالة لكل الحقول
setField(LOCATION.phone1, "phone1", "phone1Row");
setField(LOCATION.phone2, "phone2", "phone2Row");
setField(LOCATION.address, "address", "addressRow");


// ==========================
// INIT MAP
// ==========================
const map = L.map('map', {
    zoomControl: false
}).setView([LOCATION.lat, LOCATION.lng], 16);


// Zoom control
L.control.zoom({
    position: 'bottomleft'
}).addTo(map);


// ==========================
// TILE LAYER
// ==========================
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);


// ==========================
// MARKER
// ==========================
const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

L.marker([LOCATION.lat, LOCATION.lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`
        <b>${LOCATION.name || ""}</b><br>
        ${LOCATION.branch || ""}
    `)
    .openPopup();


// ==========================
// CIRCLE
// ==========================
L.circle([LOCATION.lat, LOCATION.lng], {
    color: '#b02a37',
    fillColor: '#b02a37',
    fillOpacity: 0.2,
    radius: 200
}).addTo(map);


// ==========================
// INTERACTIONS
// ==========================
map.scrollWheelZoom.enable();
map.dragging.enable();

if (window.innerWidth < 768) {
    map.scrollWheelZoom.disable();
}


// ==========================
// GOOGLE MAPS LINK
// ==========================
const googleMapsUrl = `https://www.google.com/maps?q=${LOCATION.lat},${LOCATION.lng}`;
document.querySelector('.map-link').href = googleMapsUrl;


// ==========================
// FIX MAP RENDER
// ==========================
setTimeout(() => {
    map.invalidateSize();
}, 100);