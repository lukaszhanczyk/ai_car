class NeuralNetwork{
    constructor(neuronCounts){
        this.levels=[];
        for(let i = 0; i < neuronCounts.length - 1; i++){
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i+1]));
        }
    }

    static feed(givenInputs, network){
        let outputs = Level.feed(givenInputs, network.levels[0]);
        for(let i = 1; i < network.levels.length; i++){
            outputs = Level.feed(outputs, network.levels[i]);
        }
        return outputs;
    }

    static mutate(network, amount= 1){
        network.levels.forEach(level => {
            Level.mutate(level, amount);
        });
    }
}