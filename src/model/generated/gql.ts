/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery examiners {\n  examiners {\n    id\n    name\n    validated\n    displayName\n    institute \n  }\n}\n": types.ExaminersDocument,
    "\nquery faculties {\n    faculties {\n        id\n        displayName\n    }\n}\n": types.FacultiesDocument,
    "\nmutation createLecture(\n  $data: LectureInput!\n  $validated: Boolean!\n) {\n   createLecture(data: $data, validated: $validated) {\n    __typename\n    ... on Lecture {\n      id\n    }\n    ... on InvalidIdError {\n      errorCode\n      msg\n    }\n    ... on GeneralError {\n      errorCode\n      msg\n    }\n    ... on StringTooLargeError {\n      errorCode\n      msg\n    }\n    ... on Error {\n      errorCode\n      msg\n    }\n  }\n}\n": types.CreateLectureDocument,
    "\nmutation updateLecture(\n  $lectureId: LectureId!\n  $data: LectureUpdateInput!\n) {\n  updateLecture(\n    lectureId: $lectureId\n    data: $data\n  ) {\n    ... on Lecture {\n      id\n    }\n    ... on InvalidIdError {\n      msg\n    }\n    ... on StringTooLargeError {\n      msg\n    }\n    ... on Error {\n      msg\n    }\n  }\n}\n": types.UpdateLectureDocument,
    "\nquery lectures {\n  lectures {\n    id\n    displayName\n    validated\n    aliases\n    comment\n    faculty {\n      id\n      displayName\n    }\n    availableRewards\n  }\n  faculties {\n    id\n    displayName\n  }\n}\n": types.LecturesDocument,
    "\nmutation printDocuments(\n  $documentList: [DocumentId!]!,\n  $deposits: [[LectureId!]!]!,\n  $tag: String!,\n  $totalPrice: Money!,\n  $printerId: PrinterId!,\n  $accountingPositionId: AccountingPositionId!,\n  $donation: Money!\n  $printFrontpage: Boolean!\n) {\n  printDocuments(\n    documentList: $documentList,\n    deposits: $deposits,\n    tag: $tag,\n    totalPrice: $totalPrice,\n    printerId: $printerId,\n    accountingPositionId: $accountingPositionId,\n    donation: $donation,\n    printFrontpage: $printFrontpage,\n  ) {\n    __typename\n    ... on TransactionList {\n      transactions {\n        id\n        value\n        associatedTag\n        transactionType\n        timestamp\n        lectures {\n          id\n          displayName\n        }\n      }\n    }\n    ... on InvalidIdError {\n      errorCode\n      msg\n    }\n    ... on StringTooLargeError {\n      errorCode\n      msg\n    }\n    ... on PriceError {\n      errorCode\n      msg\n    }\n    ... on GeneralError {\n      errorCode\n      msg\n    }\n  }\n}\n": types.PrintDocumentsDocument,
    "\nquery price(\n  $documents: [DocumentId!]!,\n  $numOralExamDeposits: Int!\n) {\n  price(\n    documents: $documents,\n    numOralExamDeposits: $numOralExamDeposits,\n  )\n}\n": types.PriceDocument,
    "\nquery filterMeta {\n  examiners {\n    id\n    name\n    validated\n    prename\n    institute\n    displayName\n  }\n  lectures {\n    id\n    displayName\n    validated\n    comment\n    aliases\n    faculty {\n      id\n      displayName\n    }\n    availableRewards\n  }\n}\n": types.FilterMetaDocument,
    "\nquery documents($filters: [DocumentFilter!]!) {\n  documents(filters: $filters, count: 10) {\n    results {\n      __typename\n      id\n      date\n      semester\n      public\n      publicComment\n      publishedOn\n      downloadable\n      rating\n      numPages\n      examiners {\n        id\n        name\n        displayName\n      }\n      lectures {\n        id\n        displayName\n      }\n    }\n    cursor\n    totalAvailable\n  }\n}\n": types.DocumentsDocument,
    "\nmutation createOrder(\n  $tag: String,\n  $documents: [DocumentId!]!,\n) {\n  createOrder(\n    tag: $tag,\n    documents: $documents\n  ) {\n    __typename\n    ... on Order {\n      id\n      tag\n    }\n    ... on InvalidIdError {\n      msg\n    }\n    ... on StringTooLargeError {\n      msg\n    }\n    ... on GeneralError {\n      msg\n    }\n  }\n}\n": types.CreateOrderDocument,
    "\nquery siteConfiguration {\n  config {\n    siteName\n    printers {\n      id\n      name\n      accountingPositions {\n        id\n        name\n      }\n    }\n    currency {\n      code\n      symbol\n      minorDigits\n    }\n  }\n}\n": types.SiteConfigurationDocument,
    "\nmutation login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    __typename\n    ... on Error {\n      msg\n    }\n    ... on Credentials {\n      token\n      user {\n        username\n        displayName\n      }\n      permissions\n    }\n    ... on GeneralError {\n      msg\n    }\n  }\n}": types.LoginDocument,
    "\nquery permissions {\n  me {\n    permissions\n  }\n}\n": types.PermissionsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery examiners {\n  examiners {\n    id\n    name\n    validated\n    displayName\n    institute \n  }\n}\n"): (typeof documents)["\nquery examiners {\n  examiners {\n    id\n    name\n    validated\n    displayName\n    institute \n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery faculties {\n    faculties {\n        id\n        displayName\n    }\n}\n"): (typeof documents)["\nquery faculties {\n    faculties {\n        id\n        displayName\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation createLecture(\n  $data: LectureInput!\n  $validated: Boolean!\n) {\n   createLecture(data: $data, validated: $validated) {\n    __typename\n    ... on Lecture {\n      id\n    }\n    ... on InvalidIdError {\n      errorCode\n      msg\n    }\n    ... on GeneralError {\n      errorCode\n      msg\n    }\n    ... on StringTooLargeError {\n      errorCode\n      msg\n    }\n    ... on Error {\n      errorCode\n      msg\n    }\n  }\n}\n"): (typeof documents)["\nmutation createLecture(\n  $data: LectureInput!\n  $validated: Boolean!\n) {\n   createLecture(data: $data, validated: $validated) {\n    __typename\n    ... on Lecture {\n      id\n    }\n    ... on InvalidIdError {\n      errorCode\n      msg\n    }\n    ... on GeneralError {\n      errorCode\n      msg\n    }\n    ... on StringTooLargeError {\n      errorCode\n      msg\n    }\n    ... on Error {\n      errorCode\n      msg\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation updateLecture(\n  $lectureId: LectureId!\n  $data: LectureUpdateInput!\n) {\n  updateLecture(\n    lectureId: $lectureId\n    data: $data\n  ) {\n    ... on Lecture {\n      id\n    }\n    ... on InvalidIdError {\n      msg\n    }\n    ... on StringTooLargeError {\n      msg\n    }\n    ... on Error {\n      msg\n    }\n  }\n}\n"): (typeof documents)["\nmutation updateLecture(\n  $lectureId: LectureId!\n  $data: LectureUpdateInput!\n) {\n  updateLecture(\n    lectureId: $lectureId\n    data: $data\n  ) {\n    ... on Lecture {\n      id\n    }\n    ... on InvalidIdError {\n      msg\n    }\n    ... on StringTooLargeError {\n      msg\n    }\n    ... on Error {\n      msg\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery lectures {\n  lectures {\n    id\n    displayName\n    validated\n    aliases\n    comment\n    faculty {\n      id\n      displayName\n    }\n    availableRewards\n  }\n  faculties {\n    id\n    displayName\n  }\n}\n"): (typeof documents)["\nquery lectures {\n  lectures {\n    id\n    displayName\n    validated\n    aliases\n    comment\n    faculty {\n      id\n      displayName\n    }\n    availableRewards\n  }\n  faculties {\n    id\n    displayName\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation printDocuments(\n  $documentList: [DocumentId!]!,\n  $deposits: [[LectureId!]!]!,\n  $tag: String!,\n  $totalPrice: Money!,\n  $printerId: PrinterId!,\n  $accountingPositionId: AccountingPositionId!,\n  $donation: Money!\n  $printFrontpage: Boolean!\n) {\n  printDocuments(\n    documentList: $documentList,\n    deposits: $deposits,\n    tag: $tag,\n    totalPrice: $totalPrice,\n    printerId: $printerId,\n    accountingPositionId: $accountingPositionId,\n    donation: $donation,\n    printFrontpage: $printFrontpage,\n  ) {\n    __typename\n    ... on TransactionList {\n      transactions {\n        id\n        value\n        associatedTag\n        transactionType\n        timestamp\n        lectures {\n          id\n          displayName\n        }\n      }\n    }\n    ... on InvalidIdError {\n      errorCode\n      msg\n    }\n    ... on StringTooLargeError {\n      errorCode\n      msg\n    }\n    ... on PriceError {\n      errorCode\n      msg\n    }\n    ... on GeneralError {\n      errorCode\n      msg\n    }\n  }\n}\n"): (typeof documents)["\nmutation printDocuments(\n  $documentList: [DocumentId!]!,\n  $deposits: [[LectureId!]!]!,\n  $tag: String!,\n  $totalPrice: Money!,\n  $printerId: PrinterId!,\n  $accountingPositionId: AccountingPositionId!,\n  $donation: Money!\n  $printFrontpage: Boolean!\n) {\n  printDocuments(\n    documentList: $documentList,\n    deposits: $deposits,\n    tag: $tag,\n    totalPrice: $totalPrice,\n    printerId: $printerId,\n    accountingPositionId: $accountingPositionId,\n    donation: $donation,\n    printFrontpage: $printFrontpage,\n  ) {\n    __typename\n    ... on TransactionList {\n      transactions {\n        id\n        value\n        associatedTag\n        transactionType\n        timestamp\n        lectures {\n          id\n          displayName\n        }\n      }\n    }\n    ... on InvalidIdError {\n      errorCode\n      msg\n    }\n    ... on StringTooLargeError {\n      errorCode\n      msg\n    }\n    ... on PriceError {\n      errorCode\n      msg\n    }\n    ... on GeneralError {\n      errorCode\n      msg\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery price(\n  $documents: [DocumentId!]!,\n  $numOralExamDeposits: Int!\n) {\n  price(\n    documents: $documents,\n    numOralExamDeposits: $numOralExamDeposits,\n  )\n}\n"): (typeof documents)["\nquery price(\n  $documents: [DocumentId!]!,\n  $numOralExamDeposits: Int!\n) {\n  price(\n    documents: $documents,\n    numOralExamDeposits: $numOralExamDeposits,\n  )\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery filterMeta {\n  examiners {\n    id\n    name\n    validated\n    prename\n    institute\n    displayName\n  }\n  lectures {\n    id\n    displayName\n    validated\n    comment\n    aliases\n    faculty {\n      id\n      displayName\n    }\n    availableRewards\n  }\n}\n"): (typeof documents)["\nquery filterMeta {\n  examiners {\n    id\n    name\n    validated\n    prename\n    institute\n    displayName\n  }\n  lectures {\n    id\n    displayName\n    validated\n    comment\n    aliases\n    faculty {\n      id\n      displayName\n    }\n    availableRewards\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery documents($filters: [DocumentFilter!]!) {\n  documents(filters: $filters, count: 10) {\n    results {\n      __typename\n      id\n      date\n      semester\n      public\n      publicComment\n      publishedOn\n      downloadable\n      rating\n      numPages\n      examiners {\n        id\n        name\n        displayName\n      }\n      lectures {\n        id\n        displayName\n      }\n    }\n    cursor\n    totalAvailable\n  }\n}\n"): (typeof documents)["\nquery documents($filters: [DocumentFilter!]!) {\n  documents(filters: $filters, count: 10) {\n    results {\n      __typename\n      id\n      date\n      semester\n      public\n      publicComment\n      publishedOn\n      downloadable\n      rating\n      numPages\n      examiners {\n        id\n        name\n        displayName\n      }\n      lectures {\n        id\n        displayName\n      }\n    }\n    cursor\n    totalAvailable\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation createOrder(\n  $tag: String,\n  $documents: [DocumentId!]!,\n) {\n  createOrder(\n    tag: $tag,\n    documents: $documents\n  ) {\n    __typename\n    ... on Order {\n      id\n      tag\n    }\n    ... on InvalidIdError {\n      msg\n    }\n    ... on StringTooLargeError {\n      msg\n    }\n    ... on GeneralError {\n      msg\n    }\n  }\n}\n"): (typeof documents)["\nmutation createOrder(\n  $tag: String,\n  $documents: [DocumentId!]!,\n) {\n  createOrder(\n    tag: $tag,\n    documents: $documents\n  ) {\n    __typename\n    ... on Order {\n      id\n      tag\n    }\n    ... on InvalidIdError {\n      msg\n    }\n    ... on StringTooLargeError {\n      msg\n    }\n    ... on GeneralError {\n      msg\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery siteConfiguration {\n  config {\n    siteName\n    printers {\n      id\n      name\n      accountingPositions {\n        id\n        name\n      }\n    }\n    currency {\n      code\n      symbol\n      minorDigits\n    }\n  }\n}\n"): (typeof documents)["\nquery siteConfiguration {\n  config {\n    siteName\n    printers {\n      id\n      name\n      accountingPositions {\n        id\n        name\n      }\n    }\n    currency {\n      code\n      symbol\n      minorDigits\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    __typename\n    ... on Error {\n      msg\n    }\n    ... on Credentials {\n      token\n      user {\n        username\n        displayName\n      }\n      permissions\n    }\n    ... on GeneralError {\n      msg\n    }\n  }\n}"): (typeof documents)["\nmutation login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    __typename\n    ... on Error {\n      msg\n    }\n    ... on Credentials {\n      token\n      user {\n        username\n        displayName\n      }\n      permissions\n    }\n    ... on GeneralError {\n      msg\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery permissions {\n  me {\n    permissions\n  }\n}\n"): (typeof documents)["\nquery permissions {\n  me {\n    permissions\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;