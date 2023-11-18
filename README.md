# Noir `verify_proof` Input Generation Tool

The _gen_artifacts.js_ script generates _proof_, _verification_key_ and _key_hash_ of the Noir program under _/circuits/_, which can then be used as inputs for the [`verify_proof`](https://noir-lang.org/standard_library/recursion) function in a subsequent Noir program that recursively verifies this program.

## Steps

1. Run `npm install` from the project root to install all dependencies.

2. Run `node ./scripts/gen_artifacts.js` from the project root to retrieve:

- _proofAsFields_
- _vkAsFields_
- _vkHash_
