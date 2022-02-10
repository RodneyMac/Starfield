let CANTIDAD_ESTRELLAS = 300

let estrellas = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for(let i = 0; i < CANTIDAD_ESTRELLAS; i++) {
        estrellas.push(new Estrella());
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0, 60);
    translate(width/2, height/2);
    for(const estrella of estrellas) {
        estrella.dibujar();
    }
}

function Estrella() {
    this.x = random(-150, 150);
    this.y = random(-150, 150);
    this.velocidadObjetivo = random(10);
    this.velocidad = 0;
    this.dibujar = function() {
        stroke("white");
        this.velocidad += 0.05;
        if(this.velocidad > this.velocidadObjetivo) {
            this.velocidad = this.velocidadObjetivo
        }
        strokeWeight(this.velocidad);
        point(this.x, this.y);
        this.mover();
        this.reiniciar();
    }
    this.mover = function() {
        let aceleracion = createVector(this.x, this.y);
        aceleracion.normalize();
        aceleracion.mult(this.velocidad);
        this.x+=aceleracion.x
        this.y+=aceleracion.y
    }
    this.estaFuera = function() {
        if(this.x < -width/2 || this.x > width/2) {
            return true;
        }

        if(this.y < -height/2 || this.y > height/2) {
            return true;
        }
        return false;
    }
    this.reiniciar = function() {
        if(this.estaFuera()) {
            let i = estrellas.indexOf(this);
            estrellas.splice(i, 1);
            estrellas.push(new Estrella());
        }
    }
}