import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "../graph/schema.graphqls",
    documents: ["src/**/*.tsx", "src/**/*.ts"],
    generates: {
        "src/gql/client.ts": {
            plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
            config: {
                rawRequest: true
            },
        }
    }
};

export default config;
