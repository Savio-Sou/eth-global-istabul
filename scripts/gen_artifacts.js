import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuit/target/simple_test.json" assert { type: "json"}
import * as fs from 'fs';

const backend = new BarretenbergBackend(circuit);
const noir = new Noir(circuit, backend);

// TODO: Generalize the circuit and this
const inputs = {
    hash_path: [
    "0x2f402b1f15a72cbab7f1ac7b405516d3bf8b8b3523d195e317ee8a2cb439c6d0",
    "0x1aefeed2c63a756a3b73ba62d541e8e34d432e038285298efa206ae2f991f188"
    ],
    index: "0",
    proposalId : "0",
    root : "0x24efd4b26f3cac900b34fb1e141a54cb1aa27213f4ff95abe8290b4b6813ae4b",
    secret  : ["1", "10"],
    vote : "1"
};

async function main(inputs) {
    try {
        const { witness } = await noir.execute(inputs);
        const proof = await backend.generateIntermediateProof(witness);
        const { proofAsFields, vkHash, vkAsFields } = await backend.generateIntermediateProofArtifacts(proof, 4);

        let artifacts = {
            'proofAsFields: ': proofAsFields,
            'vkAsFields: ': vkAsFields,
            'vkHash: ': vkHash
        };

        // Convert the artifacts to a JSON string
        const jsonString = JSON.stringify(artifacts, null, 2);

        // Write the JSON string to the file
        fs.writeFileSync('./scripts/out/artifacts.json', jsonString);

        console.log('File written successfully.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Optionally, you can use process.exit() to forcefully exit the script
        process.exit();
    }
}

main(inputs);