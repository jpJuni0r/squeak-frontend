import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.squeak-test.fsmi.uni-karlsruhe.de",
  documents: "src/**/*.tsx",
  generates: {
    "src/model/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        strictScalars: true,
        scalars: {
          AccountingPositionId: "string",
          Cursor: "unknown",
          Date: "string",
          DateTime: "string",
          DepositId: "string",
          DocumentId: "string",
          ExaminerId: "string",
          FacultyId: "string",
          LectureId: "string",
          Money: "number",
          OrderId: "string",
          PrinterId: "string",
          RequestId: "string",
          Semester: "string",
          TransactionId: "string",
          UUID: "string",
          Upload: "unknown",
          UploadId: "string",
          Url: "string",
        },
      },
    },
    "src/model/generated/schma.graphql": {
      plugins: ["schema-ast"]
    },
  },
  ignoreNoDocuments: true,
};

export default config;
