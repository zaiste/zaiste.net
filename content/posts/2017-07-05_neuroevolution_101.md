
+++
date = 2017-07-05T00:00:00.000Z


title = "Neuroevolution 101"
topics = [ "ai", "101" ]

+++

[Neuroevolution](https://en.wikipedia.org/wiki/Neuroevolution) is a subfield within artificial intelligence and [machine learning](https://en.wikipedia.org/wiki/Machine_learning) that consists of trying to trigger an evolutionary process inside a computer similar to the one that produced in human brains. Neuroevolution seeks to develop the means of evolving neural networks through [evolutionary algorithms](https://en.wikipedia.org/wiki/Evolutionary_algorithm). In short, it aims to evolve brains inside computers.

[Deep learning](https://en.wikipedia.org/wiki/Deep_learning) allows computer to accomplish tasks such as recognizing images and controlling autonomous vehicles or video game characters often surpassing human performance. Deep learning is possible thanks to [Artificial neural network](https://en.wikipedia.org/wiki/Artificial_neural_network) (ANNs).  Artificial Neural Networks are roughly inspired by biology and specifically by the structure of the brain.

The brain is the inspiration for AI because is the definitive base of intelligence: intuitively, AI should resemble the brain. Brains are built with neurons: tiny cells that send signals to each other over connections. Connected neurons constitute a network i.e. a neural network. Artificial neural networks may have many layers of neurons which is why they are called « deep ». Artificial Neural Network is a try to simulate a collection of neuron-like components that send signals to each other by writing programs: this produces a mechanism similar to what happens in brains. Connecting a bunch of neuron-like elements to each other and letting them share signals does not produce intelligence, it's a matter of how the neurons are connected (the overall architecture of the brain itself).

A neuron that strongly influences another neuron is said to connect to its partner with a *strong weight*. The weights of connections determine how neurons influence each other, producing a pattern of neural activation across a neural network in response to inputs to the network  To get an intelligent network, it's not only about how neurons are connected but also what these connection weights should be.

These days ANNs tend to have millions of connections, so deciding their weights manually is rather impossible. Instead, ANNs should learn the best weights for a task on their own. Each training allows for the network to assign the more appropriate weights to answer questions correctly. A common approach to such weight shifting is called [stochastic gradient descent](https://en.wikipedia.org/wiki/Stochastic_gradient_descent) (with [backpropagation](https://en.wikipedia.org/wiki/Backpropagation) being a form of it): it works only when the connections are already provided.

In deep learning, connections are established manually by researchers who decide what the architecture should be while in for natural brains it is the evolution that makes it happen. The evolution of brains in nature is, for that reason, the only example of any known process in the universe actually producing something strongly intelligent. Neuroevolution tries to trigger a similar process inside a computer. In short, deep learning focuses on using existing connections and to program an ANN to learn, while neuroevolution focuses on the origin of the architecture of the brain itself. The process of neuroevolution is to keep selecting increasingly fit ANNs as parents to produce new ANNs: the core idea of neuroevolution is essentially just breeding.

The fixed-topology algorithms of the '80s and '90s were unable to produce larger ANNs: a limitation that diverges from nature. Topology and weight evolving ANNs (i.e. TWEANNs) allow the architecture (topology) of a parent ANN to be slightly changed in its offspring e.g. by adding a new connection or a new neuron. NeuroEvolution of Augmenting Topologies (NEAT) is an improvement over a TWEANN algorithm. NEAT can evolve increasingly complex ANNs through a series of innovations that sidestep the typical TWEANN challenges.
