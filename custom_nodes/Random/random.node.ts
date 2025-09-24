import type { IExecuteFunctions } from 'n8n-workflow';

import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IDataObject,
    NodeOperationError,
} from 'n8n-workflow';

import axios from 'axios';

class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'random',
        icon: 'file:icon.svg',
        group: ['transform'],
        version: 1,
        description: 'True Random Number Generator usando Random.org',
        defaults: {
            name: 'Random',
            color: '#6f49fd',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Operação',
                name: 'operation',
                type: 'options',
                options: [
                    {
                        name: 'True Random Number Generator',
                        value: 'trueRandom',
                        description: 'Gera um número verdadeiramente aleatório usando Random.org',
                    },
                ],
                default: 'trueRandom',
                description: 'Escolha a operação',
            },
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                description: 'Valor mínimo (inclusivo). Apenas números inteiros.',
                required: true,
                typeOptions: { integer: true },
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 60,
                description: 'Valor máximo (inclusivo). Apenas números inteiros.',
                required: true,
                typeOptions: { integer: true },
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];

        const executionCount = Math.max(1, items.length);

        for (let i = 0; i < executionCount; i++) {
            const operation = this.getNodeParameter('operation', i) as string;

            if (operation === 'trueRandom') {
                const min = this.getNodeParameter('min', i) as number;
                const max = this.getNodeParameter('max', i) as number;

                // Validações
                if (!Number.isFinite(min) || !Number.isFinite(max)) {
                    throw new NodeOperationError(this.getNode(), 'Os valores Min e Max devem ser números.');
                }
                if (!Number.isInteger(min) || !Number.isInteger(max)) {
                    throw new NodeOperationError(this.getNode(), 'Min e Max devem ser inteiros.');
                }
                if (min > max) {
                    throw new NodeOperationError(this.getNode(), 'Min não pode ser maior que Max.');
                }

                const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

                let randomNumber: number;
                let rawResponse = '';

                try {
                    const resp = await axios.get(url, { responseType: 'text', timeout: 10000 });
                    rawResponse = String(resp.data).trim();
                    randomNumber = parseInt(rawResponse, 10);

                    if (Number.isNaN(randomNumber)) {
                        throw new Error(`Resposta inválida do Random.org: "${rawResponse}"`);
                    }
                } catch (error: any) {
                    throw new NodeOperationError(
                        this.getNode(),
                        `Erro ao chamar Random.org: ${error?.message ?? String(error)}`,
                    );
                }

                returnData.push({
                    random: randomNumber,
                    min,
                    max,
                    raw: rawResponse,
                });
            } else {
                throw new NodeOperationError(this.getNode(), `Operação desconhecida: ${operation}`);
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}

module.exports = { random: Random };
