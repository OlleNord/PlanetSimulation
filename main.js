canvas = document.getElementById("c");
ctx = canvas.getContext("2d");

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
window.addEventListener("mousedown", (e) => {
    planets.push(new Planet(e.clientX, e.clientY, UNIT/80, 10, "red"));

});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let UNIT = (canvas.width + canvas.height)/2
console.log(UNIT)

let planets = [];
class Planet {
    constructor(x, y, r, mass, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.mass = mass;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
    }
}
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: UNIT/100,
    color: "white",
    dx: 0,
    dy: 0
}
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    planets.forEach(planet => {
        planet.draw();
        player.dx += (planet.mass)/10 * (planet.x - player.x);
        player.dy += (planet.mass)/10 * (planet.y - player.y);
        player.x += (player.dx/1000)/planets.length;
        player.y += (player.dy/1000)/planets.length;
    });
    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.r, player.r);
    requestAnimationFrame(update);
}
update();