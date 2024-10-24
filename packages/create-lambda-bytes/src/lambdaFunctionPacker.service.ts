import { TezosToolkit } from '@mavrykdynamics/taquito'
import { execSync } from 'child_process';
import * as fs from 'fs'
import * as path from 'path'; // Import the 'path' module for path handling

import { generateProxyContract } from './lambdaFunctionLibrary'

const packLambdaFunction = async (
    tezos: TezosToolkit,
    governanceProxyContractAddress: string,
    lambdaFunction: Array<any>
) => {
    const governanceProxyInstance = await tezos.contract.at(governanceProxyContractAddress);
    const param = governanceProxyInstance.methods.dataPackingHelper(lambdaFunction).toTransferParams();
    if (param.parameter) {
        const paramValue = param.parameter.value;
        const lambdaEntrypointType = await governanceProxyInstance.entrypoints.entrypoints.dataPackingHelper;

        const packed = await tezos.rpc.packData({
            data: paramValue,
            type: lambdaEntrypointType
        }).catch(e => console.error('error:', e));

        var packedParam;
        if (packed) {
            packedParam = packed.packed;
        } else {
            throw `packing failed`;
        }
    }
    return packedParam;
};

function getLigo(
    isDockerizedLigo: boolean,
    ligoVersion: string,
) {
    const pwd = process.cwd();
    let pathToLigo = 'ligo';
    if (isDockerizedLigo) {
        pathToLigo = `docker run --platform=linux/amd64 -v ${pwd}:${pwd} -w ${pwd} --rm -i mavrykdynamics/ligo:${ligoVersion}`;
    }

    try {
        execSync(`${pathToLigo} --help`);
    } catch (err) {
        console.error(err);
        throw new Error('Failed to execute LIGO compiler');
    }

    return pathToLigo;
}

const compileLambdaFunctionContract = async (
    contractPath: string = "",
    ligoVersion: string = "0.60.0",
) => {
    const ligo = getLigo(true, ligoVersion);

    const jsonFormat = execSync(
        `${ligo} compile contract "${contractPath}" --michelson-format json --protocol kathmandu`,
        {
            maxBuffer: 1024 * 1024,
            timeout: 1024 * 1024,
        },
    ).toString();

    // Get the lambda function from the compiled code
    return JSON.parse(jsonFormat)[2].args[0][1].args[0];
};

export const getLambdaFunction = async (
    rpc: string,
    governanceProxyContractAddress: string,
    lambdaFunctionName: string,
    lambdaFunctionParameters: Array<any> = []
) => {
    // Generate the contract code
    const generatedContract: string = generateProxyContract(
        lambdaFunctionName,
        lambdaFunctionParameters
    );

    // Write the result to the output file
    const outputFile: string = path.resolve(process.cwd(), "governanceProxyLambdaFunction.ligo");
    fs.writeFileSync(outputFile, generatedContract);

    // Start the compiling process
    const lambdaFunctionJson = await compileLambdaFunctionContract(outputFile);
    const tezos: TezosToolkit = new TezosToolkit(rpc);
    const packedLambdaFunction = await packLambdaFunction(tezos, governanceProxyContractAddress, lambdaFunctionJson);

    // Reset the file
    fs.writeFileSync(outputFile, "");

    return packedLambdaFunction;
};