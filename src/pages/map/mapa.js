function initMap() {

    const clinica = { lat: -23.527, lng: -46.611 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: clinica,
    });

    const marker = new google.maps.Marker({
        position: clinica,
        map: map,
    });
}
window.initMap = initMap;
