function changeImage() {
    var image = document.getElementById('myImage');
    image.src.match('bulb-on') ? image.src = 'bulb-off.png' : image.src = 'bulb-on.png';
}

function sum(a, b) {
    return a + b
}
