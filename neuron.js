class Neuron {
    constructor(inputCount) {
        this.inputs =new Array(inputCount);
        this.weights =new Array(inputCount);
        this.bias = 0

        Neuron.randomize(this);
    }

    static randomize(neuron){
        for(let i = 0; i < neuron.weights.length; i++){
            neuron.weights[i] = Math.random() * 2 - 1;
        }
        neuron.bias = Math.random() * 2 - 1;
    }

    static mutate(neuron, amount){
        neuron.bias = lerp(
            neuron.bias,
            Math.random()*2-1,
            amount
        );
        for(let i=0;i<neuron.weights.length;i++){
            neuron.weights[i] = lerp(
                neuron.weights[i],
                Math.random()*2-1,
                amount
            );
        }

    }

    static output(givenInputs, neuron) {
        for(let i = 0; i < neuron.inputs.length; i++){
            neuron.inputs[i] = givenInputs[i];
        }

        let sum = 0;
        for(let i = 0; i < neuron.inputs.length; i++){
            sum += neuron.inputs[i] * neuron.weights[i];
        }

        if(sum + neuron.bias > 0){
            return 1;
        }
        return 0;
    }
}