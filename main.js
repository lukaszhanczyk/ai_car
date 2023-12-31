const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;

const carCtx = carCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2,carCanvas.width * 0.9);

const N = 1000;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i = 0; i < cars.length; i++){
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if(i !== 0){
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }
    }
}

const traffic=[
    new Car(road.getLaneCenter(1),-100,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(0),-300,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(2),-300,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(0),-500,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(1),-500,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(1),-700,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(2),-700,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(1),-900,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(0),-1100,40,60,"DUMMY",0),
    new Car(road.getLaneCenter(2),-1100,40,60,"DUMMY",0),
];

animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    location.reload();
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i = 1; i <= N; i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(){
    for(let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders, []);
    }
    for(let i = 0; i < cars.length; i++){
        cars[i].update(road.borders, traffic);
    }

    let newBestCar = cars.find( c => {
      return c.y === Math.min(...cars.map(c => c.y ))
    });

    if (newBestCar.y < bestCar.y){
        bestCar = newBestCar;
        save();
    }

    carCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar. y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for(let i=0; i < traffic.length; i++){
        traffic[i].draw(carCtx,"green");
    }
    carCtx.globalAlpha = 0.1;
    for(let i=0; i < cars.length; i++){
        cars[i].draw(carCtx,"grey");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "black" , true);

    carCtx.restore();
    requestAnimationFrame(animate);
}