#!/bin/bash

MODEL_NAME="Qwen3-14B-Q4_K_M"

echo "Starting Ollama..."

ollama serve &

sleep 5


if ollama list | grep -q "$MODEL_NAME"; then
    echo "Model already exists. Skip creation."
else
    echo "Creating model..."

    ollama create $MODEL_NAME \
        -f /Modelfile

    echo "Model created."
fi


wait