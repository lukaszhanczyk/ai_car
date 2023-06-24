
class Level{
    constructor(inputCount,outputCount){
        this.neurons = new Array(outputCount)
        this.outputs = new Array(outputCount);

        for(let i = 0; i < this.neurons.length; i++){
            this.neurons[i] = new Neuron(inputCount);
        }
    }

    static feed(givenInputs, level){
        for(let i = 0; i < level.neurons.length; i++){
            level.outputs[i] = Neuron.output(givenInputs, level.neurons[i]);
        }

        return level.outputs;
    }

    static mutate(level, amount){
        level.neurons.forEach(neuron => {
            Neuron.mutate(neuron, amount)
        });
    }

}