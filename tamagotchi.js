class Tamagotchi {
    constructor(nombre) {
        this.nombre = nombre;
        this.hambre = 100;
        this.felicidad = 100;
        this.limpieza = 100;
        this.energia = 100;
        this.experiencia = 0;
        this.nivel = 1; // Nuevo atributo
        this.decoraciones = []; // Atributo para las decoraciones
        this.fechaCreacion = new Date();
        this.estadoActual = new Normal();
        this.observers = [];
        this.init();
    }

    init() {
        setInterval(() => {
            this.hambre -= 5;
            this.felicidad -= 3;
            this.limpieza -= 2;
            this.energia -= 4;
            this.actualizarEstado();
            this.notifyObservers();
        }, 2000);
    }

    alimentar() {
        this.estadoActual.alimentar(this);
        this.notifyObservers();
    }

    jugar() {
        this.estadoActual.jugar(this);
        this.notifyObservers();
    }

    limpiar() {
        this.estadoActual.limpiar(this);
        this.notifyObservers();
    }

    dormir() {
        this.estadoActual.dormir(this);
        this.notifyObservers();
    }

    actualizarEstado() {
        if (this.hambre < 25) {
            this.cambiarEstado(new Hambriento());
            alert(`¡Alimentar Tamagotchi! El estado ha cambiado a Hambriento.`);
        } else if (this.felicidad < 25) {
            this.cambiarEstado(new Triste());
            alert(`El estado del Tamagotchi ha cambiado a Triste. ¡Presta atención!`);
        } else if (this.limpieza < 25) {
            this.cambiarEstado(new Sucio());
            alert(`El estado del Tamagotchi ha cambiado a Sucio. ¡Presta atención!`);
        } else if (this.energia < 25) {
            this.cambiarEstado(new Cansado());
            alert(`El estado del Tamagotchi ha cambiado a Cansado. ¡Presta atención!`);
        } else {
            this.cambiarEstado(new Normal());
        }
    }

    cambiarEstado(nuevoEstado) {
        this.estadoActual = nuevoEstado;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }

    aumentarExperiencia() {
        this.experiencia += 20;
        if (this.experiencia >= 100) {
            this.experiencia = 0;
            this.subirNivel();
        }
    }

    subirNivel() {
        if (this.nivel < 3) {
            this.nivel += 1;
            this.aplicarDecoracion();
        }
    }

    aplicarDecoracion() {
        let decoracion;
        switch (this.nivel) {
            case 2:
                decoracion = new SombreroDecorator(this);
                break;
            case 3:
                decoracion = new BastonDecorator(this);
                break;
            case 4:
                decoracion = new MascaraDecorator(this);
                break;
            default:
                break;
        }
        if (decoracion) {
            this.decoraciones.push(decoracion);
            decoracion.decorar();
        }
    }
}


class TamagotchiSingleton {
    constructor() {
        if (!TamagotchiSingleton.instance) {
            TamagotchiSingleton.instance = new Tamagotchi("Tamagotchi Singleton");
        }
    }

    static getInstance() {
        if (!TamagotchiSingleton.instance) {
            TamagotchiSingleton.instance = new Tamagotchi("Tamagotchi Singleton");
        }
        return TamagotchiSingleton.instance;
    }
}
class Estado {
    constructor(nombre) {
        this.nombre = nombre;
    }

    mostrarMensaje(mensaje) {
        const mensajesDiv = document.getElementById('mensajes');
        mensajesDiv.innerText = mensaje;
    }

    alimentar(tamagotchi) {
        throw new Error("Método no implementado");
    }

    jugar(tamagotchi) {
        throw new Error("Método no implementado");
    }

    limpiar(tamagotchi) {
        throw new Error("Método no implementado");
    }

    dormir(tamagotchi) {
        throw new Error("Método no implementado");
    }
}
class Normal extends Estado {
    constructor() {
        super("Normal");
    }

    alimentar(tamagotchi) {
        tamagotchi.hambre += 5;
        if (tamagotchi.hambre > 100) tamagotchi.hambre = 100;
        tamagotchi.aumentarExperiencia();
        this.mostrarMensaje("Alimentado: Hambre aumentado en 5");
    }

    jugar(tamagotchi) {
        tamagotchi.felicidad += 5;
        if (tamagotchi.felicidad > 100) tamagotchi.felicidad = 100;
        tamagotchi.aumentarExperiencia();
        this.mostrarMensaje("Jugado: Felicidad aumentada en 5");
    }

    limpiar(tamagotchi) {
        tamagotchi.limpieza += 5;
        if (tamagotchi.limpieza > 100) tamagotchi.limpieza = 100;
        tamagotchi.aumentarExperiencia();
        this.mostrarMensaje("Limpieza: Limpieza aumentada en 5");
    }

    dormir(tamagotchi) {
        tamagotchi.energia += 5;
        if (tamagotchi.energia > 100) tamagotchi.energia = 100;
        tamagotchi.aumentarExperiencia();
        this.mostrarMensaje("Dormido: Energía aumentada en 5");
    }
}


class Hambriento extends Estado {
    constructor() {
        super("Hambriento");
    }

    alimentar(tamagotchi) {
        tamagotchi.hambre = 100;
        tamagotchi.cambiarEstado(new Normal());
        tamagotchi.aumentarExperiencia();
        this.mostrarMensaje("Alimentado: Hambre al 100%, estado cambiado a Normal");
    }

    jugar(tamagotchi) {
        this.mostrarMensaje("Quiero comer");
    }

    limpiar(tamagotchi) {
        this.mostrarMensaje("Tengo hambre");
    }

    dormir(tamagotchi) {
        this.mostrarMensaje("Dame de comer ya!!!!");
    }
}

class Triste extends Estado {
    constructor() {
        super("Triste");
    }

    alimentar(tamagotchi) {
        this.mostrarMensaje("Estoy triste no quiero comer");
    }

    jugar(tamagotchi) {
        tamagotchi.felicidad = 100;
        tamagotchi.cambiarEstado(new Normal());
        this.mostrarMensaje("Jugado: Felicidad al 100%, estado cambiado a Normal");
        tamagotchi.aumentarExperiencia();
    }

    limpiar(tamagotchi) {
        this.mostrarMensaje("Quiero jugar");
    }

    dormir(tamagotchi) {
        this.mostrarMensaje("Quiero jugar");
    }
}

class Sucio extends Estado {
    constructor() {
        super("Sucio");
    }

    alimentar(tamagotchi) {
        this.mostrarMensaje("Estoy sucio, limpiame");
    }

    jugar(tamagotchi) {
        this.mostrarMensaje("Necesito limpieza");
    }

    limpiar(tamagotchi) {
        tamagotchi.limpieza = 100;
        tamagotchi.cambiarEstado(new Normal());
        this.mostrarMensaje("Limpieza: Limpieza al 100%, estado cambiado a Normal");
        tamagotchi.aumentarExperiencia();
    }

    dormir(tamagotchi) {
        this.mostrarMensaje("Estoy sucio");
    }
}

class Cansado extends Estado {
    constructor() {
        super("Cansado");
    }

    alimentar(tamagotchi) {
        this.mostrarMensaje("Quiero dormir");
    }

    jugar(tamagotchi) {
        this.mostrarMensaje("Quiero dormir");
    }

    limpiar(tamagotchi) {
        this.mostrarMensaje("Necesito dormir");
    }

    dormir(tamagotchi) {
        tamagotchi.energia = 100;
        this.mostrarMensaje("Dormido: Energía al 100%, estado cambiado a Normal en 10 segundos");
        tamagotchi.aumentarExperiencia();
        setTimeout(() => {
            tamagotchi.cambiarEstado(new Normal());
            this.mostrarMensaje("Despierto: Estado cambiado a Normal");
        }, 10000); // 10 segundos
    }
}
class Decorator {
    constructor(tamagotchi) {
        this.tamagotchi = tamagotchi;
    }

    decorar() {
        throw new Error("Método no implementado");
    }
}

class SombreroDecorator extends Decorator {
    decorar() {
        const tamagotchiImage = document.getElementById('tamagotchiImage');
        tamagotchiImage.src = 'sombrero.png';
    }
}

class BastonDecorator extends Decorator {
    decorar() {
        const tamagotchiImage = document.getElementById('tamagotchiImage');
        tamagotchiImage.src = 'baston.png';
    }
}

class MascaraDecorator extends Decorator {
    decorar() {
        const tamagotchiImage = document.getElementById('tamagotchiImage');
        tamagotchiImage.src = 'mascara.png';
    }
}
class TamagotchiObserver {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const tamagotchi = TamagotchiSingleton.getInstance();
            tamagotchi.addObserver(this);

            // Manejo de botones
            const alimentarButton = document.getElementById('alimentar');
            const jugarButton = document.getElementById('jugar');
            const limpiarButton = document.getElementById('limpiar');
            const dormirButton = document.getElementById('dormir');

            alimentarButton.addEventListener('click', () => tamagotchi.alimentar());
            jugarButton.addEventListener('click', () => tamagotchi.jugar());
            limpiarButton.addEventListener('click', () => tamagotchi.limpiar());
            dormirButton.addEventListener('click', () => tamagotchi.dormir());

            this.update(tamagotchi);
        });
    }

    update(tamagotchi) {
        document.getElementById('barraHambre').firstElementChild.style.width = tamagotchi.hambre + '%';
        document.getElementById('barraFelicidad').value = tamagotchi.felicidad;
        document.getElementById('barraLimpieza').value = tamagotchi.limpieza;
        document.getElementById('barraEnergia').value = tamagotchi.energia;
        document.getElementById('barraExperiencia').value = tamagotchi.experiencia;
        document.getElementById('nivel').innerText = `Nivel: ${tamagotchi.nivel}`;

        const tamagotchiImage = document.getElementById('tamagotchiImage');
        switch (tamagotchi.estadoActual.nombre) {
            case 'Hambriento':
                tamagotchiImage.src = 'hambriento.png';
                break;
            case 'Triste':
                tamagotchiImage.src = 'triste.png';
                break;
            case 'Sucio':
                tamagotchiImage.src = 'sucio.png';
                break;
            case 'Cansado':
                tamagotchiImage.src = 'cansado.png';
                break;
            default:
                tamagotchiImage.src = 'normal.png';
        }

        tamagotchi.decoraciones.forEach(decoracion => decoracion.decorar());

        const estadoDiv = document.getElementById('estado');
        estadoDiv.innerText = `Estado: ${tamagotchi.estadoActual.nombre}`;
    }
}

// Inicialización del Observer
new TamagotchiObserver();
    