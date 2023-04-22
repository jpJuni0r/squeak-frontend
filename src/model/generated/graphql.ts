/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** format: UUID string representation */
  AccountingPositionId: string;
  /** format: opaque */
  Cursor: unknown;
  /** Date (isoformat) */
  Date: string;
  /** Date with time (isoformat) */
  DateTime: string;
  /** format: UUID string representation */
  DepositId: string;
  /** format: UUID string representation */
  DocumentId: string;
  /** format: UUID string representation */
  ExaminerId: string;
  /** format: UUID string representation */
  FacultyId: string;
  /** format: UUID string representation */
  LectureId: string;
  /**
   * format: Int (signed)
   * unit: Thousandth of a minor currency unit
   */
  Money: number;
  /** format: UUID string representation */
  OrderId: string;
  /** format: UUID string representation */
  PrinterId: string;
  /** format: UUID string representation */
  RequestId: string;
  /** format: (WS|SS) ?(\d{2}|\d{4}) */
  Semester: string;
  /** format: UUID string representation */
  TransactionId: string;
  UUID: string;
  Upload: unknown;
  /** format: UUID string representation */
  UploadId: string;
  /** format: RFC 3986 URL */
  Url: string;
};

export type AccountingPosition = {
  __typename?: 'AccountingPosition';
  id: Scalars['AccountingPositionId'];
  name: Scalars['String'];
};

export type Actor = {
  __typename?: 'Actor';
  permissions: Array<Permission>;
  user?: Maybe<User>;
};

export type Config = {
  __typename?: 'Config';
  currency: CurrencyConfig;
  documents: DocumentsConfig;
  price: PriceConfig;
  printers: Array<Printer>;
  siteName: Scalars['String'];
};

export type CreateDepositResult = GeneralError | InvalidIdError | StringTooLargeError | Transaction;

export type CreateExaminerResult = Examiner | GeneralError | StringTooLargeError;

export type CreateOrderResult = GeneralError | InvalidIdError | Order | StringTooLargeError;

export type Credentials = {
  __typename?: 'Credentials';
  permissions: Array<Permission>;
  token: Scalars['String'];
  user: User;
};

export type CurrencyConfig = {
  __typename?: 'CurrencyConfig';
  code: Scalars['String'];
  minorDigits: Scalars['Int'];
  symbol: Scalars['String'];
};

/** Different kinds of data that can be referenced in the API. */
export enum DataKind {
  AccountingPosition = 'ACCOUNTING_POSITION',
  Deposit = 'DEPOSIT',
  Document = 'DOCUMENT',
  Examiner = 'EXAMINER',
  Faculty = 'FACULTY',
  Lecture = 'LECTURE',
  Order = 'ORDER',
  Printer = 'PRINTER',
  Upload = 'UPLOAD'
}

/** A deposit entry for oral exams. */
export type Deposit = {
  __typename?: 'Deposit';
  comment?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  id: Scalars['DepositId'];
  lectures: Array<Lecture>;
  /** The identifier that is entered by the user. */
  tag: Scalars['String'];
  value: Scalars['Money'];
};

export type DepositCursor = {
  __typename?: 'DepositCursor';
  cursor?: Maybe<Scalars['Cursor']>;
  results: Array<Deposit>;
  /** Number of available results (starting with the first result). */
  totalAvailable: Scalars['Int'];
};

/**
 * Defines a filter for deposits. The fields have OR semantic, i.e. all
 * elements that satisfy any of the specified fields are returned.
 * At least one field must be present.
 */
export type DepositFilter = {
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Any deposit where one of its lectures is in this list. */
  lectureIds?: InputMaybe<Array<Scalars['LectureId']>>;
  /** Any deposit where the tag matches the given pattern. */
  tag?: InputMaybe<Scalars['String']>;
};

export type DepositInput = {
  comment?: InputMaybe<Scalars['String']>;
  lectureIds: Array<Scalars['LectureId']>;
  tag: Scalars['String'];
};

/**
 * Documents are the central data type of Squeak.
 *
 * A documents usually corresponds to an exam. An exam has an associated date,
 * semester, faculty, examiner(s) and lecture (in some cases, an exam can
 * even belong to multiple lectures). Apart from that, each document has
 * additional associated data (see the respective field documentation).
 *
 * Note that as an interface Document is not instantiated itself,
 * but only its subclasses.
 */
export type Document = {
  date: Scalars['Date'];
  /** Whether the file is publicly downloadable without permissions. */
  downloadable: Scalars['Boolean'];
  examiners: Array<Examiner>;
  faculty: Faculty;
  /**
   * Associated PDF file (might not exist yet).
   *
   * The file is also None if the document is not downloadable and
   * the user doesn't have special permission to download it.
   */
  file?: Maybe<Scalars['Url']>;
  id: Scalars['DocumentId'];
  internalComment?: Maybe<Scalars['String']>;
  lastUpdated: Scalars['DateTime'];
  lectures: Array<Lecture>;
  /** Number of pages of associated file. */
  numPages?: Maybe<Scalars['Int']>;
  /**
   * If not public, the object is only accessible by
   * users with the necessary permissions.
   */
  public: Scalars['Boolean'];
  publicComment?: Maybe<Scalars['String']>;
  publishedOn?: Maybe<Scalars['Date']>;
  /** Rating for student-created documents. */
  rating: Rating;
  semester: Scalars['Semester'];
  type: DocumentType;
  /**
   * True if all associated lectures and examiners are validated. A
   * document must be validated before it can be published.
   */
  validated: Scalars['Boolean'];
};

export type DocumentCursor = {
  __typename?: 'DocumentCursor';
  cursor?: Maybe<Scalars['Cursor']>;
  results: Array<Document>;
  /** Number of available results (starting with the first result). */
  totalAvailable: Scalars['Int'];
};

/**
 * Defines a filter for documents. The fields have OR semantic, i.e. all
 * elements that satisfy any of the specified fields are returned.
 * At least one field must be present.
 *
 * Note that time/date ranges are inclusive.
 */
export type DocumentFilter = {
  documentType?: InputMaybe<Array<DocumentType>>;
  /** Whether the file is publicly downloadable without permissions. */
  downloadable?: InputMaybe<Scalars['Boolean']>;
  examAfter?: InputMaybe<Scalars['Date']>;
  examBefore?: InputMaybe<Scalars['Date']>;
  /** Any document where one of its examiners is in this list. */
  examinerIds?: InputMaybe<Array<Scalars['ExaminerId']>>;
  faculty?: InputMaybe<Scalars['FacultyId']>;
  id?: InputMaybe<Scalars['DocumentId']>;
  /** Any document where one of its lectures is in this list. */
  lectureIds?: InputMaybe<Array<Scalars['LectureId']>>;
  /** Whether the document is publicly visible. */
  public?: InputMaybe<Scalars['Boolean']>;
  publishedAfter?: InputMaybe<Scalars['Date']>;
  publishedBefore?: InputMaybe<Scalars['Date']>;
  rating?: InputMaybe<Array<Rating>>;
  /** Only applied to documents with an associated exam request. */
  requestState?: InputMaybe<Array<RequestState>>;
  semesterAfter?: InputMaybe<Scalars['Semester']>;
  semesterBefore?: InputMaybe<Scalars['Semester']>;
  /** Only applied to documents with an associated upload. */
  uploadState?: InputMaybe<Array<UploadState>>;
  /** Applied to WrittenExams only. */
  writtenSolutionType?: InputMaybe<Array<SolutionType>>;
};

/** Union of possible values of WrittenExamType and OralExamType. */
export enum DocumentType {
  OralExam = 'ORAL_EXAM',
  OralReexam = 'ORAL_REEXAM',
  WrittenExam = 'WRITTEN_EXAM',
  WrittenMock = 'WRITTEN_MOCK'
}

/**
 * A document that is uploaded by a user (e.g. a transcript of an oral exam).
 * The quality of uploads should be checked before accepting them, which is
 * represented by the "state" field that allows to either accept or reject an
 * upload.
 *
 * Note: It is guaranteed that the associated document of an upload always
 * has a non-null file (assuming the correct permissions).
 */
export type DocumentUpload = {
  __typename?: 'DocumentUpload';
  created: Scalars['DateTime'];
  /**
   * The associated deposit, or null if none is specified.
   *
   * This is intended to be set by the creator of the upload, and thus can
   * be expected to be the correct deposit for this upload.
   */
  deposit?: Maybe<Deposit>;
  /** True if a deposit might be returned for this upload. */
  depositAvailable: Scalars['Boolean'];
  document: Document;
  id: Scalars['UploadId'];
  /** True if a reward may be paid out for this upload. */
  rewardAvailable: Scalars['Boolean'];
  state: UploadState;
  /**
   * The identifier that is entered by the user,
   * or null if the upload is anonymous.
   */
  tag?: Maybe<Scalars['String']>;
};

export type DocumentsConfig = {
  __typename?: 'DocumentsConfig';
  /** Document types that are allowed for uploads. */
  allowedUploadTypes: Array<DocumentType>;
};

/**
 * Common interface for all error types in the GQL API. Usually, mutations
 * return an union of all possible errors for the endpoint, where each error
 * implements this interface. The `errorCode` field is used to specify the
 * exact kind of error that occurred. Additionally, a message is provided
 * that describes the error. Generally, clients should map the error code to
 * a client-defined message they want to display to the user. However,
 * the provided message can be used as a fallback in case the client does not
 * know the error code.
 *
 * Important note for clients:
 * This interface allows to add a catch-all when querying the return value of
 * a mutation, by adding "... on Error { ... }" to the query. Because the set
 * of possible errors might change in the future, it is recommandable to do
 * this for all queries (instead of e.g. querying `GeneralError`).
 */
export type Error = {
  errorCode: Scalars['String'];
  msg: Scalars['String'];
};

/**
 * A request for an exam (e.g. towards the examiner). The state is used to
 * track the progress from the initial request until publication.
 *
 * Contains the requested document. Depending on the state of the request,
 * the file of the document might be null.
 */
export type ExamRequest = {
  __typename?: 'ExamRequest';
  created: Scalars['DateTime'];
  document: Document;
  id: Scalars['RequestId'];
  state: RequestState;
};

export type ExamRequestCursor = {
  __typename?: 'ExamRequestCursor';
  cursor?: Maybe<Scalars['Cursor']>;
  results: Array<ExamRequest>;
  /** Number of available results (starting with the first result). */
  totalAvailable: Scalars['Int'];
};

/**
 * Defines a filter for exam requests. The fields have OR semantic, i.e. all
 * elements that satisfy any of the specified fields are returned.
 * At least one field must be present.
 *
 * It is possible to filter by document data via the according field.
 */
export type ExamRequestFilter = {
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Applies the filter to the associated document of the exam request. */
  document?: InputMaybe<DocumentFilter>;
  state?: InputMaybe<Array<RequestState>>;
};

export type Examiner = {
  __typename?: 'Examiner';
  /** Combines prename, surname and institute (if available). */
  displayName: Scalars['String'];
  id: Scalars['ExaminerId'];
  institute?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  prename?: Maybe<Scalars['String']>;
  validated: Scalars['Boolean'];
};

export type ExaminerInput = {
  institute?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  prename?: InputMaybe<Scalars['String']>;
};

/** Represents the faculty where a lecture is located. */
export type Faculty = {
  __typename?: 'Faculty';
  displayName: Scalars['String'];
  id: Scalars['FacultyId'];
};

/** The uploaded file is too large and thus rejected by the server. */
export type FileTooLargeError = Error & {
  __typename?: 'FileTooLargeError';
  errorCode: Scalars['String'];
  /** Maximum allowed file size in kilobytes. */
  maximumFileSize: Scalars['Int'];
  msg: Scalars['String'];
};

/** General error without specific fields. */
export type GeneralError = Error & {
  __typename?: 'GeneralError';
  errorCode: Scalars['String'];
  msg: Scalars['String'];
};

/** This error occurs if a provided UUID is not known to the server. */
export type InvalidIdError = Error & {
  __typename?: 'InvalidIdError';
  /**
   * Describes the kind of data referenced by the invalid UUID
   * (e.g. a document).
   */
  dataKind: DataKind;
  errorCode: Scalars['String'];
  /** The offending UUID. */
  invalidId: Scalars['UUID'];
  msg: Scalars['String'];
};

/**
 * Lecture to which an exam belongs.
 *
 * A lecture can have multiple aliases (to simplify searching for it)
 * and a comment that is shown publicly for this lecture.
 */
export type Lecture = {
  __typename?: 'Lecture';
  aliases: Array<Scalars['String']>;
  /**
   * Returns all document types for which a reward is currently available
   * for this lecture.
   */
  availableRewards: Array<DocumentType>;
  comment?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  faculty: Faculty;
  id: Scalars['LectureId'];
  validated: Scalars['Boolean'];
};

export type LectureInput = {
  comment?: InputMaybe<Scalars['String']>;
  facultyId: Scalars['FacultyId'];
  name: Scalars['String'];
};

export type LectureResult = GeneralError | InvalidIdError | Lecture | StringTooLargeError;

export type LoginResult = Credentials | GeneralError;

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Creates a new deposit. At least one associated lecture must be
   * provided. Optionally, the associated order and a comment can be
   * specified. Also, an according monetary transaction is recorded.
   *
   * Note that this endpoint is not intended to be used in regular
   * operation. The intention is to allow creating a deposit that was
   * missing from the original print request.
   *
   * Returns the new transaction or an according error.
   *
   * Possible errors:
   *   EMPTY_TAG, NO_LECTURE_PROVIDED, INVALID_ID, DUPLICATE_ID, STRING_TOO_LARGE
   */
  createDeposit: CreateDepositResult;
  /**
   * Creates a new examiner. The name may not be empty and the combination
   * of prename, name and institute must be unique.
   *
   * Returns the created examiner or an according error.
   *
   * Possible errors:
   *   EMPTY_NAME, STRING_TOO_LARGE, DUPLICATE_NAME
   */
  createExaminer: CreateExaminerResult;
  /**
   * Creates a new lecture. A valid faculty id must be provided. The name
   * may not be empty and must be different to already existing lectures.
   *
   * Returns the created lecture or an according error.
   *
   * Possible errors:
   *   EMPTY_NAME, STRING_TOO_LARGE, DUPLICATE_NAME, INVALID_ID
   */
  createLecture: LectureResult;
  /**
   * Creates a new order with the specified tag containing the documents
   * with the provided ids. The order must not be empty, i.e. at least one
   * document must be provided.
   *
   * Returns the created order or an according error.
   *
   * Possible errors:
   *   EMPTY_TAG, STRING_TOO_LARGE, NO_DOCUMENT_PROVIDED, INVALID_ID, DUPLICATE_ID
   */
  createOrder: CreateOrderResult;
  /**
   * Creates a new examiner that is not yet validated. The name may not
   * be empty and the combination of prename, name and institute must be
   * unique.
   *
   * Returns the created examiner or an according error.
   *
   * Note: This endpoint is more restricted, but can be used with less
   * permissions than "createExaminer".
   *
   * Possible errors:
   *   EMPTY_NAME, STRING_TOO_LARGE, DUPLICATE_NAME
   */
  createUnvalidatedExaminer: CreateExaminerResult;
  /**
   * Creates a new lecture that is not yet validated. A valid faculty id
   * must be provided. The name may not be empty and must be different
   * to already existing lectures.
   *
   * Returns the created lecture or an according error.
   *
   * Note: This endpoint is more restricted, but can be used with less
   * permissions than "createLecture".
   *
   * Possible errors:
   *   EMPTY_NAME, STRING_TOO_LARGE, DUPLICATE_NAME, INVALID_ID
   */
  createUnvalidatedLecture: LectureResult;
  /**
   * Creates a new document upload that is assigned to the specified
   * deposit. The document is initialized with the provided data and file.
   * In the data, at least one lecture and at least one examiner must be
   * provided. The file must be a valid PDF. Further, the server might
   * restrict which document types are allowed for uploads (see
   * config.documents).
   *
   * Returns the created upload or an according error.
   *
   * This endpoint only allows to specify a restricted subset of the
   * available attributes of a document, while the remainder is set by
   * the server as fitting for a newly created upload.
   *
   * Possible errors:
   *   NO_LECTURE_PROVIDED, NO_EXAMINER_PROVIDED, INVALID_ID, DUPLICATE_ID,
   *   FILE_TOO_LARGE, PDF_PROCESSING, INVALID_TYPE_FOR_UPLOAD,
   *   DEPOSIT_ALREADY_REFERENCED
   */
  createUploadForDeposit: UploadResult;
  /**
   * Creates a new document upload that uses the specified tag for
   * assigning the upload to a deposit. If no tag is provided, an anonymous
   * upload is created. The document is initialized with the provided data
   * and file. In the data, at least one lecture and at least one examiner
   * must be provided. The file must be a valid PDF. Further, the server
   * might restrict which document types are allowed for uploads (see
   * config.documents).
   *
   * Returns the created upload or an according error.
   *
   * This endpoint only allows to specify a restricted subset of the
   * available attributes of a document, while the remainder is set by
   * the server as fitting for a newly created upload.
   *
   * Possible errors:
   *   EMPTY_TAG, NO_LECTURE_PROVIDED, NO_EXAMINER_PROVIDED, INVALID_ID,
   *   DUPLICATE_ID, STRING_TOO_LARGE, FILE_TOO_LARGE, PDF_PROCESSING,
   *   INVALID_TYPE_FOR_UPLOAD
   */
  createUploadForTag: UploadWithTagResult;
  /**
   * Tries to authenticate the user by using the configured authentication
   * provider. If successful, a JSON Web Token (JWT) containing username,
   * display name and permissions is generated.
   *
   * Returns the credentials (JWT and user info) or an according error.
   *
   * Possible errors:
   *   INTERNAL_AUTHENTICATION, INVALID_CREDENTIALS
   */
  login: LoginResult;
  /**
   * Payout of a reward. A reward is always tied to an upload and available
   * only once for each upload (and only if permitted by the reward policy
   * of the server). Also creates an according transaction.
   *
   * If the state of the upload is REJECTED, the server will per default
   * return an error. This can be ignored by setting "force" to true.
   * Note that clients should only use this option after displaying an
   * explicit warning to the user.
   *
   * Returns the created transaction or an according error.
   *
   * Possible errors:
   *   INVALID_ID, REWARD_INVALID
   */
  payoutReward: ReturnDepositResult;
  /**
   * Prints the given list of documents. In addition, the endpoint allows to
   * specify deposits that are created (via the lectures of each deposit)
   * as well as a (positive) donation. To ensure that the price displayed by
   * the client is correct, the total price must be specified
   * (i.e., printing + deposits + donation) and an error is returned if the
   * price is incorrect. Clients can either calculate the price themselves
   * with the values in config.price or use the "price" endpoint.
   *
   * Depending on the configuration, the server per default prints a
   * frontpage before the documents are printed. The client can explicitly
   * request that no frontpage is printed using the according flag.
   *
   * The tag is used for the created deposits and possibly printed on the
   * frontpage. Further, a valid combination of a printer and an accounting
   * position must be specified (see config.printers).
   *
   * Note that it is not possible to print a document multiple times. At
   * least one document must be provided and a file must be available for
   * each of the documents.
   *
   * One transaction is created for the printing, one for each of the
   * deposits and one for the donation (if not zero). Returns a list of the
   * created transactions or an according error.
   *
   * Possible errors:
   *   EMPTY_TAG, NO_DOCUMENT_PROVIDED, NO_LECTURE_PROVIDED, INVALID_ID,
   *   DUPLICATE_ID, STRING_TOO_LARGE, ACCOUNTING_POSITION_NOT_AVAILABLE,
   *   INCORRECT_PRICE, FILE_DOES_NOT_EXIST, PRINTER_UNAVAILABLE
   */
  printDocuments: PrintResult;
  /**
   * Records an accounting correction, i.e. a correction of a previous
   * incorrect transaction. Accounting corrections only relate to printing
   * (not deposits or exams). Note that it should generally be preferred to
   * undo a transaction; accounting corections should only be used if this
   * is not possible.
   *
   * Returns the new transaction or an according error.
   *
   * Possible errors:
   *   INVALID_MONETARY_VALUE
   */
  recordAccountingCorrection: TransactionResult;
  /**
   * Records a donation. Both positive amount (revenue) and negative amount
   * (expenditure) are supported.
   *
   * Returns the new transaction or an according error.
   *
   * Possible errors:
   *   INVALID_MONETARY_VALUE
   */
  recordDonation: TransactionResult;
  /**
   * Payout of a deposit. That includes deleting the deposit as well as
   * recording an appropriate transaction for the specified accounting
   * position. If an upload is specified, it is updated to indicate that
   * the deposit was returned.
   *
   * This endpoint performs a number of sanity checks and returns an error
   * if any check fails:
   *  - If a deposit is directly referenced by an upload, it can only be
   *    returned in combination with the referencing upload and vice versa.
   *  - For each upload, a deposit can be returned only once.
   *  - Per default, an upload must be specified and the state of the
   *    upload may not be REJECTED.
   *
   * The last check can be ignored by setting "force" to true. However,
   * in order to avoid errors clients should only use this option after
   * displaying an explicit warning to the user.
   *
   * Returns the created transaction or an according error.
   *
   * Possible errors:
   *   INVALID_ID, DEPOSIT_RETURN_INVALID, UPLOAD_DEPOSIT_MISMATCH
   */
  returnDeposit: ReturnDepositResult;
  /**
   * Undo the transaction with the specified id.
   *
   * This has two effects:
   * First, a new transaction with the inversed monetary value is created,
   * such that the balance of the cashbox is restored.
   * Second, any state changes related to the transaction are undone (e.g.
   * a deposit that was returned by the transaction is restored).
   *
   * The new transaction is also undoable using this endpoint (and so on).
   * However, each transaction can be undone only once. It is possible that
   * undoing fails because the data to restore the previous state is no
   * longer available (e.g. the associated upload was deleted).
   *
   * Returns the new transaction or an according error.
   *
   * Possible errors:
   *   DOUBLE_UNDO, UNDO_TRANSACTION_FAILED
   */
  undoTransaction: TransactionResult;
  /**
   * Updates the data of the specified, already existing, deposit. The
   * data is subject to the same restrictions as if creating a new deposit.
   *
   * The lectures of the deposit are not preserved but fully replaced.
   *
   * Returns the updated deposit or an according error.
   *
   * Possible errors:
   *   EMPTY_TAG, NO_LECTURE_PROVIDED, INVALID_ID, DUPLICATE_ID, STRING_TOO_LARGE
   */
  updateDeposit: UpdateDepositResult;
  /**
   * Updates the data of the specified, already existing, examiner. The
   * data is subject to the same restrictions as if creating a new
   * examiner.
   *
   * Returns the updated examiner or an according error.
   *
   * Possible errors:
   *   EMPTY_NAME, STRING_TOO_LARGE, DUPLICATE_NAME, INVALID_ID
   */
  updateExaminer: UpdateExaminerResult;
  /**
   * Updates the data of the specified, already existing, lecture. The
   * data is subject to the same restrictions as if creating a new lecture.
   *
   * Returns the updated lecture or an according error.
   *
   * Possible errors:
   *   EMPTY_NAME, STRING_TOO_LARGE, DUPLICATE_NAME, INVALID_ID
   */
  updateLecture: LectureResult;
  /**
   * Updates the aliases of the specified, already existing, lecture. Per
   * default, the new aliases are added to the existing aliases.
   * Alternatively, the existing aliases can be removed. Aliases must
   * be different from each other and from already existing lectures.
   *
   * Returns the updated lecture or an according error.
   *
   * Possible errors:
   *   EMPTY_NAME, STRING_TOO_LARGE, DUPLICATE_NAME, INVALID_ID
   */
  updateLectureAliases: LectureResult;
  /**
   * Updates the documents of the specified, already existing, order. The
   * current documents are replaced with the provided list, which must
   * contain at least one document id.
   *
   * Returns the updated order or an according error.
   *
   * Possible errors:
   *   NO_DOCUMENT_PROVIDED, INVALID_ID, DUPLICATE_ID
   */
  updateOrderDocuments: UpdateOrderResult;
  /**
   * Updates the data and/or file of the specified, already existing,
   * upload. Both data and file may be null (and are not changed in this
   * case). Accordingly, clients should not upload a file if they only want
   * to change the data of the upload. Both the data and the file are
   * subject to same restrictions as if creating a new upload.
   *
   * This will always reset the state of the upload to PENDING. Further, the
   * update is rejected if the associated document is already published.
   *
   * Note: The endpoint is intended for users to update uploads created by
   * themselves. For general purpose document editing, "updateDocumentData"
   * should be used instead.
   *
   * Returns the updated upload or an according error.
   *
   * Possible errors:
   *   NO_LECTURE_PROVIDED, NO_EXAMINER_PROVIDED, INVALID_ID, DUPLICATE_ID,
   *   FILE_TOO_LARGE, PDF_PROCESSING, INVALID_TYPE_FOR_UPLOAD,
   *   UPLOAD_ALREADY_PUBLISHED
   */
  updateUploadData: UploadResult;
  /**
   * Reassigns the specified, already existing, upload by providing a new
   * associated deposit. Note that this is intended to be used only by the
   * creator of the upload, such that the associated deposit can (mostly)
   * be guaranteed to be correct.
   *
   * Returns the updated upload or an according error.
   *
   * Possible errors:
   *   INVALID_ID, DEPOSIT_ALREADY_REFERENCED
   */
  updateUploadDeposit: UpdateUploadDepositResult;
  /**
   * Reassigns the specified, already existing, upload by providing a new
   * tag. If the tag is null, the upload is set to anonymous.
   *
   * Returns the updated upload or an according error.
   *
   * Possible errors:
   *   EMPTY_TAG, INVALID_ID, STRING_TOO_LARGE
   */
  updateUploadTag: UpdateUploadTagResult;
  /**
   * Validates the specified, already existing, examiner. This is a no-op
   * if the examiner is already validated.
   *
   * Returns the examiner or an error if the examiner does not exist.
   *
   * Note: Validation can not be undone.
   *
   * Possible errors:
   *   INVALID_ID
   */
  validateExaminer: ValidateExaminer;
  /**
   * Validates the specified, already existing, lecture. This is a no-op
   * if the lecture is already validated.
   *
   * Returns the lecture or an error if the lecture does not exist.
   *
   * Note: Validation can not be undone.
   *
   * Possible errors:
   *   INVALID_ID
   */
  validateLecture: ValidateLecture;
};


export type MutationCreateDepositArgs = {
  accountingPositionId: Scalars['AccountingPositionId'];
  data: DepositInput;
};


export type MutationCreateExaminerArgs = {
  data: ExaminerInput;
  validated?: Scalars['Boolean'];
};


export type MutationCreateLectureArgs = {
  data: LectureInput;
  validated?: Scalars['Boolean'];
};


export type MutationCreateOrderArgs = {
  documents: Array<Scalars['DocumentId']>;
  tag?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUnvalidatedExaminerArgs = {
  institute?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  prename?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUnvalidatedLectureArgs = {
  facultyId: Scalars['FacultyId'];
  name: Scalars['String'];
};


export type MutationCreateUploadForDepositArgs = {
  data: RestrictedDocumentInput;
  depositId: Scalars['DepositId'];
  file: Scalars['Upload'];
};


export type MutationCreateUploadForTagArgs = {
  data: RestrictedDocumentInput;
  file: Scalars['Upload'];
  tag?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationPayoutRewardArgs = {
  accountingPositionId: Scalars['AccountingPositionId'];
  force?: Scalars['Boolean'];
  uploadId: Scalars['UploadId'];
};


export type MutationPrintDocumentsArgs = {
  accountingPositionId: Scalars['AccountingPositionId'];
  deposits: Array<Array<Scalars['LectureId']>>;
  documentList: Array<Scalars['DocumentId']>;
  donation?: Scalars['Money'];
  printFrontpage?: Scalars['Boolean'];
  printerId: Scalars['PrinterId'];
  tag: Scalars['String'];
  totalPrice: Scalars['Money'];
};


export type MutationRecordAccountingCorrectionArgs = {
  accountingPositionId: Scalars['AccountingPositionId'];
  amount: Scalars['Money'];
};


export type MutationRecordDonationArgs = {
  accountingPositionId: Scalars['AccountingPositionId'];
  amount: Scalars['Money'];
};


export type MutationReturnDepositArgs = {
  accountingPositionId: Scalars['AccountingPositionId'];
  depositId: Scalars['DepositId'];
  force?: Scalars['Boolean'];
  uploadId?: InputMaybe<Scalars['UploadId']>;
};


export type MutationUndoTransactionArgs = {
  transactionId: Scalars['TransactionId'];
};


export type MutationUpdateDepositArgs = {
  data: DepositInput;
  depositId: Scalars['DepositId'];
};


export type MutationUpdateExaminerArgs = {
  data: ExaminerInput;
  examinerId: Scalars['ExaminerId'];
};


export type MutationUpdateLectureArgs = {
  data: LectureInput;
  lectureId: Scalars['LectureId'];
};


export type MutationUpdateLectureAliasesArgs = {
  aliases: Array<Scalars['String']>;
  lectureId: Scalars['LectureId'];
  removeExisting?: Scalars['Boolean'];
};


export type MutationUpdateOrderDocumentsArgs = {
  documents: Array<Scalars['DocumentId']>;
  orderId: Scalars['OrderId'];
};


export type MutationUpdateUploadDataArgs = {
  data?: InputMaybe<RestrictedDocumentInput>;
  file?: InputMaybe<Scalars['Upload']>;
  uploadId: Scalars['UploadId'];
};


export type MutationUpdateUploadDepositArgs = {
  depositId: Scalars['DepositId'];
  uploadId: Scalars['UploadId'];
};


export type MutationUpdateUploadTagArgs = {
  tag?: InputMaybe<Scalars['String']>;
  uploadId: Scalars['UploadId'];
};


export type MutationValidateExaminerArgs = {
  examinerId: Scalars['ExaminerId'];
};


export type MutationValidateLectureArgs = {
  lectureId: Scalars['LectureId'];
};

/**
 * An oral exam.
 *
 * Usually, this is a transcript written from memory by a student.
 */
export type OralExam = Document & {
  __typename?: 'OralExam';
  date: Scalars['Date'];
  /** Whether the file is publicly downloadable without permissions. */
  downloadable: Scalars['Boolean'];
  examiners: Array<Examiner>;
  faculty: Faculty;
  /**
   * Associated PDF file (might not exist yet).
   *
   * The file is also None if the document is not downloadable and
   * the user doesn't have special permission to download it.
   */
  file?: Maybe<Scalars['Url']>;
  id: Scalars['DocumentId'];
  internalComment?: Maybe<Scalars['String']>;
  lastUpdated: Scalars['DateTime'];
  lectures: Array<Lecture>;
  /** Number of pages of associated file. */
  numPages?: Maybe<Scalars['Int']>;
  oralType: OralExamType;
  /**
   * If not public, the object is only accessible by
   * users with the necessary permissions.
   */
  public: Scalars['Boolean'];
  publicComment?: Maybe<Scalars['String']>;
  publishedOn?: Maybe<Scalars['Date']>;
  /** Rating for student-created documents. */
  rating: Rating;
  semester: Scalars['Semester'];
  type: DocumentType;
  /**
   * True if all associated lectures and examiners are validated. A
   * document must be validated before it can be published.
   */
  validated: Scalars['Boolean'];
};

/** An enumeration. */
export enum OralExamType {
  Exam = 'EXAM',
  /**
   * An oral exam that provides a last chance for passing an exam
   * that is otherwise written.
   */
  Reexam = 'REEXAM'
}

/**
 * An order consists of a set of documents selected by the user.
 *
 * The user enters a tag (identifier) for the order. Afterwards, an order
 * is paid by the user and then printed. This is represented by the state
 * of the order.
 */
export type Order = {
  __typename?: 'Order';
  created: Scalars['DateTime'];
  documents: Array<Document>;
  examiners: Array<Examiner>;
  id: Scalars['OrderId'];
  lectures: Array<Lecture>;
  numPages: Scalars['Int'];
  /** The current price for the order. */
  price: Scalars['Money'];
  state: OrderState;
  /** The identifier that is entered by the user. */
  tag?: Maybe<Scalars['String']>;
};


/**
 * An order consists of a set of documents selected by the user.
 *
 * The user enters a tag (identifier) for the order. Afterwards, an order
 * is paid by the user and then printed. This is represented by the state
 * of the order.
 */
export type OrderPriceArgs = {
  numOralExamDeposits?: Scalars['Int'];
};

export type OrderCursor = {
  __typename?: 'OrderCursor';
  cursor?: Maybe<Scalars['Cursor']>;
  results: Array<Order>;
  /** Number of available results (starting with the first result). */
  totalAvailable: Scalars['Int'];
};

/**
 * Defines a filter for orders. The fields have OR semantic, i.e. all
 * elements that satisfy any of the specified fields are returned.
 * At least one field must be present.
 */
export type OrderFilter = {
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Any order where one of its examiners is in this list. */
  examinerIds?: InputMaybe<Array<Scalars['ExaminerId']>>;
  /** Any order where one of its lectures is in this list. */
  lectureIds?: InputMaybe<Array<Scalars['LectureId']>>;
  state?: InputMaybe<Array<OrderState>>;
  /** Any order where the tag matches the given pattern. */
  tag?: InputMaybe<Scalars['String']>;
  /** Whether the tag is null. */
  tagIsPresent?: InputMaybe<Scalars['Boolean']>;
};

/** An enumeration. */
export enum OrderState {
  Paid = 'PAID',
  Pending = 'PENDING',
  Printed = 'PRINTED'
}

/** Set of available permissions for users. */
export enum Permission {
  AccessInternalDocumentData = 'ACCESS_INTERNAL_DOCUMENT_DATA',
  CreateData = 'CREATE_DATA',
  CreateDeposits = 'CREATE_DEPOSITS',
  CreateOrders = 'CREATE_ORDERS',
  CreateUnvalidatedData = 'CREATE_UNVALIDATED_DATA',
  CreateUploads = 'CREATE_UPLOADS',
  PayoutRewards = 'PAYOUT_REWARDS',
  PrintDocuments = 'PRINT_DOCUMENTS',
  QueryDeposits = 'QUERY_DEPOSITS',
  QueryDepositsById = 'QUERY_DEPOSITS_BY_ID',
  QueryDocuments = 'QUERY_DOCUMENTS',
  QueryDocumentsById = 'QUERY_DOCUMENTS_BY_ID',
  QueryNonPublicDocuments = 'QUERY_NON_PUBLIC_DOCUMENTS',
  QueryOrders = 'QUERY_ORDERS',
  QueryOrdersById = 'QUERY_ORDERS_BY_ID',
  QueryPrice = 'QUERY_PRICE',
  QueryRequests = 'QUERY_REQUESTS',
  QueryRequestsById = 'QUERY_REQUESTS_BY_ID',
  QueryUploads = 'QUERY_UPLOADS',
  QueryUploadsById = 'QUERY_UPLOADS_BY_ID',
  RecordTransactions = 'RECORD_TRANSACTIONS',
  ReturnDeposits = 'RETURN_DEPOSITS',
  UndoTransactions = 'UNDO_TRANSACTIONS',
  UpdateData = 'UPDATE_DATA',
  UpdateDeposits = 'UPDATE_DEPOSITS',
  UpdateOrders = 'UPDATE_ORDERS',
  UpdateUploads = 'UPDATE_UPLOADS',
  ValidateData = 'VALIDATE_DATA'
}

export type PriceConfig = {
  __typename?: 'PriceConfig';
  perDocument: Scalars['Money'];
  /** Price of deposit that is taken for transcripts of oral exams. */
  perOralExamDeposit: Scalars['Money'];
  perOrder: Scalars['Money'];
  perPage: Scalars['Money'];
  roundingMode: RoundingMode;
  /** We round to a multiple of this value. */
  roundingTarget: Scalars['Money'];
};

/** Returned by print endpoints if the provided price is wrong. */
export type PriceError = Error & {
  __typename?: 'PriceError';
  correctPrice: Scalars['Money'];
  errorCode: Scalars['String'];
  msg: Scalars['String'];
};

export type PrintResult = GeneralError | InvalidIdError | PriceError | StringTooLargeError | TransactionList;

export type Printer = {
  __typename?: 'Printer';
  /** Accounting positions that can be used with this printer. */
  accountingPositions: Array<AccountingPosition>;
  id: Scalars['PrinterId'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  config: Config;
  /**
   * Returns all deposits that satisfy every specified filter in the given
   * list. The returned deposits are sorted by time of creation
   * (newest first).
   *
   * The endpoint is paginated, i.e. it returns at most 100 results at once.
   * If there are more values available, the result contains a cursor object
   * that can be used to query subsequent values. The client can
   * additionally provide a number to further limit the number of returned
   * results.
   */
  deposits: DepositCursor;
  /**
   * Returns the deposits with the specified ids. If no deposit
   * with that id exists, the corresponding entry in the list is null.
   */
  depositsById: Array<Maybe<Deposit>>;
  /**
   * Returns all documents that satisfy every specified filter in the given
   * list. The returned documents are sorted by exam date (recent first).
   *
   * Filters that are specific to the type of the document (e.g.
   * writtenSolutionType) don't affect documents of another type.
   *
   * The endpoint is paginated, i.e. it returns at most 100 results at once.
   * If there are more values available, the result contains a cursor object
   * that can be used to query subsequent values. The client can
   * additionally provide a number to further limit the number of returned
   * results.
   *
   * Note that without special permissions, only public documents are
   * returned.
   */
  documents: DocumentCursor;
  /**
   * Returns the documents with the specified ids. If no document
   * with that id exists, the corresponding entry in the list is null.
   */
  documentsById: Array<Maybe<Document>>;
  /**
   * Returns all exam requests that satisfy every specified filter in the
   * given list. The returned exam requests are sorted by time of creation
   * (newest first).
   *
   * The endpoint is paginated, i.e. it returns at most 100 results at once.
   * If there are more values available, the result contains a cursor object
   * that can be used to query subsequent values. The client can
   * additionally provide a number to further limit the number of returned
   * results.
   */
  examRequests: ExamRequestCursor;
  /**
   * Returns the exam requests with the specified ids. If no request
   * with that id exists, the corresponding entry in the list is null.
   */
  examRequestsById: Array<Maybe<ExamRequest>>;
  /**
   * Returns a list of all available examiners. It is possible to filter
   * for examiners that are (not) validated. With null, no filter is
   * applied.
   */
  examiners: Array<Examiner>;
  /** Returns a list of all available faculties. */
  faculties: Array<Faculty>;
  /**
   * Returns a list of all available lectures. It is possible to filter for
   * lectures that are (not) validated. With null, no filter is applied.
   */
  lectures: Array<Lecture>;
  me: Actor;
  /**
   * Returns all orders that satisfy every specified filter in the given
   * list. The returned orders are sorted by time of creation
   * (newest first).
   *
   * The endpoint is paginated, i.e. it returns at most 100 results at once.
   * If there are more values available, the result contains a cursor object
   * that can be used to query subsequent values. The client can
   * additionally provide a number to further limit the number of returned
   * results.
   */
  orders: OrderCursor;
  /**
   * Returns the orders with the specified ids. If no order
   * with that id exists, the corresponding entry in the list is null.
   */
  ordersById: Array<Maybe<Order>>;
  /**
   * Calculates the price for printing the specified list of documents.
   * Also, a number of deposits can be added to the price.
   *
   * Returns the price or null, if one of the ids is invalid.
   */
  price?: Maybe<Scalars['Money']>;
  /**
   * Returns all uploads that satisfy every specified filter in the given
   * list. The returned uploads are sorted by time of creation
   * (newest first).
   *
   * The endpoint is paginated, i.e. it returns at most 100 results at once.
   * If there are more values available, the result contains a cursor object
   * that can be used to query subsequent values. The client can
   * additionally provide a number to further limit the number of returned
   * results.
   */
  uploads: UploadCursor;
  /**
   * Returns the uploads with the specified ids. If no upload
   * with that id exists, the corresponding entry in the list is null.
   */
  uploadsById: Array<Maybe<DocumentUpload>>;
};


export type QueryDepositsArgs = {
  count?: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  filters: Array<DepositFilter>;
};


export type QueryDepositsByIdArgs = {
  ids: Array<Scalars['DepositId']>;
};


export type QueryDocumentsArgs = {
  count?: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  filters: Array<DocumentFilter>;
};


export type QueryDocumentsByIdArgs = {
  ids: Array<Scalars['DocumentId']>;
};


export type QueryExamRequestsArgs = {
  count?: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  filters: Array<ExamRequestFilter>;
};


export type QueryExamRequestsByIdArgs = {
  ids: Array<Scalars['RequestId']>;
};


export type QueryExaminersArgs = {
  validated?: InputMaybe<Scalars['Boolean']>;
};


export type QueryLecturesArgs = {
  validated?: InputMaybe<Scalars['Boolean']>;
};


export type QueryOrdersArgs = {
  count?: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  filters: Array<OrderFilter>;
};


export type QueryOrdersByIdArgs = {
  ids: Array<Scalars['OrderId']>;
};


export type QueryPriceArgs = {
  documents: Array<Scalars['DocumentId']>;
  numOralExamDeposits?: Scalars['Int'];
};


export type QueryUploadsArgs = {
  count?: Scalars['Int'];
  cursor?: InputMaybe<Scalars['Cursor']>;
  filters: Array<UploadFilter>;
};


export type QueryUploadsByIdArgs = {
  ids: Array<Scalars['UploadId']>;
};

/**
 * A rating of a student-created document
 * (e.g. for a transcript of an oral exam).
 */
export enum Rating {
  /** Transcripts of oral exams with particularly high quality. */
  Excellent = 'EXCELLENT',
  /**
   * Unofficial solutions for written exams that could be improved,
   * or transcripts of oral exams with low quality.
   */
  NeedsImprovement = 'NEEDS_IMPROVEMENT',
  /** Default rating. */
  Neutral = 'NEUTRAL'
}

/** States from requesting to publishing a written exam. */
export enum RequestState {
  /** Exam is layouted and publicly available. */
  Done = 'DONE',
  /** Exam will or has taken place. */
  New = 'NEW',
  /** The examiner doesn't want to provide the exam. */
  Rejected = 'REJECTED',
  /** Document was requested from the examiner. */
  Requested = 'REQUESTED',
  /**
   * The exam was received, but it is not layouted yet.
   * The original might still be public anyway.
   */
  Todo = 'TODO'
}

/**
 * Input for creating documents with restricted permissions.
 * The writtenExamData field must be present if and only if the type is a
 * written exam.
 */
export type RestrictedDocumentInput = {
  date: Scalars['Date'];
  examinerIds: Array<Scalars['ExaminerId']>;
  lectureIds: Array<Scalars['LectureId']>;
  semester: Scalars['Semester'];
  type: DocumentType;
  writtenExamData?: InputMaybe<WrittenExamData>;
};

export type ReturnDepositResult = GeneralError | InvalidIdError | Transaction;

/**
 * Available Rounding Modes.
 * New modes might be added, so a client must handle the case, that it doesn't
 * know about a rounding mode.
 */
export enum RoundingMode {
  AwayFromZero = 'AWAY_FROM_ZERO',
  HalfAwayFromZero = 'HALF_AWAY_FROM_ZERO',
  TowardsZero = 'TOWARDS_ZERO'
}

/** An enumeration. */
export enum SolutionType {
  None = 'NONE',
  Official = 'OFFICIAL',
  Unofficial = 'UNOFFICIAL'
}

/** This error occurs if a provided string is longer than allowed. */
export type StringTooLargeError = Error & {
  __typename?: 'StringTooLargeError';
  errorCode: Scalars['String'];
  /** Maximum allowed number of chars for this input. */
  maximumNumChars: Scalars['Int'];
  msg: Scalars['String'];
};

/**
 * A monetary transaction recorded for accounting. Once recorded, a
 * transaction can not be modified. If a transaction needs to be undone,
 * this can be achieved via a new (cancellation) transaction.
 */
export type Transaction = {
  __typename?: 'Transaction';
  /** Tag of the order or deposit that is associated to the transaction. */
  associatedTag?: Maybe<Scalars['String']>;
  id: Scalars['TransactionId'];
  /**
   * If the transaction is deposit taken/returned, contains the lectures
   * associated to the deposit. This might be useful to distinguish
   * between multiple deposits associated to the same order.
   */
  lectures?: Maybe<Array<Lecture>>;
  timestamp: Scalars['DateTime'];
  transactionType: TransactionType;
  /**
   * The monetary value of the transaction. A positive sign represents
   * revenue, a negative sign represents expenditure.
   */
  value: Scalars['Money'];
};

/**
 * A list of transactions. Needed for endpoints that return either multiple
 * transaction or an error, as lists can not be used directly in GQL unions.
 */
export type TransactionList = {
  __typename?: 'TransactionList';
  transactions: Array<Transaction>;
};

export type TransactionResult = GeneralError | Transaction;

/**
 * Different categories a transaction can belong to. Determines e.g.
 * whether taxes are applied.
 */
export enum TransactionType {
  AccountingCorrection = 'ACCOUNTING_CORRECTION',
  DepositReturned = 'DEPOSIT_RETURNED',
  DepositTaken = 'DEPOSIT_TAKEN',
  Donation = 'DONATION',
  ExamPrinted = 'EXAM_PRINTED',
  Reward = 'REWARD'
}

export type UpdateDepositResult = Deposit | GeneralError | InvalidIdError | StringTooLargeError;

export type UpdateExaminerResult = Examiner | GeneralError | InvalidIdError | StringTooLargeError;

export type UpdateOrderResult = GeneralError | InvalidIdError | Order;

export type UpdateUploadDepositResult = DocumentUpload | GeneralError | InvalidIdError;

export type UpdateUploadTagResult = DocumentUpload | GeneralError | InvalidIdError | StringTooLargeError;

export type UploadCursor = {
  __typename?: 'UploadCursor';
  cursor?: Maybe<Scalars['Cursor']>;
  results: Array<DocumentUpload>;
  /** Number of available results (starting with the first result). */
  totalAvailable: Scalars['Int'];
};

/**
 * Defines a filter for uploads. The fields have OR semantic, i.e. all
 * elements that satisfy any of the specified fields are returned.
 * At least one field must be present.
 *
 * It is possible to filter by document data via the according field.
 */
export type UploadFilter = {
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  depositAvailable?: InputMaybe<Scalars['Boolean']>;
  /** Applies the filter to the associated document of the upload. */
  document?: InputMaybe<DocumentFilter>;
  rewardAvailable?: InputMaybe<Scalars['Boolean']>;
  state?: InputMaybe<Array<UploadState>>;
  /** Any upload where the tag matches the given pattern. */
  tag?: InputMaybe<Scalars['String']>;
  /** Whether the tag is null. */
  tagIsPresent?: InputMaybe<Scalars['Boolean']>;
};

export type UploadResult = DocumentUpload | FileTooLargeError | GeneralError | InvalidIdError;

/**
 * Used to purport whether deposit and/or reward can be paid out. Note that
 * this is orthogonal to whether an upload is published, i.e. an upload might
 * not be published even if approved.
 */
export enum UploadState {
  /** Upload was checked and the deposit (or reward) can be returned. */
  Approved = 'APPROVED',
  /** Document was uploaded by a student, but it is not checked yet. */
  Pending = 'PENDING',
  /** Upload was checked and the deposit should _not_ be returned. */
  Rejected = 'REJECTED'
}

export type UploadWithTagResult = DocumentUpload | FileTooLargeError | GeneralError | InvalidIdError | StringTooLargeError;

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  username: Scalars['String'];
};

export type ValidateExaminer = Examiner | InvalidIdError;

export type ValidateLecture = InvalidIdError | Lecture;

/**
 * An exam that is written by the students.
 *
 * There is not always an official solution of the exam available, which is
 * represented by the "solution" field.
 */
export type WrittenExam = Document & {
  __typename?: 'WrittenExam';
  date: Scalars['Date'];
  /** Whether the file is publicly downloadable without permissions. */
  downloadable: Scalars['Boolean'];
  examiners: Array<Examiner>;
  faculty: Faculty;
  /**
   * Associated PDF file (might not exist yet).
   *
   * The file is also None if the document is not downloadable and
   * the user doesn't have special permission to download it.
   */
  file?: Maybe<Scalars['Url']>;
  id: Scalars['DocumentId'];
  internalComment?: Maybe<Scalars['String']>;
  lastUpdated: Scalars['DateTime'];
  lectures: Array<Lecture>;
  /** Number of pages of associated file. */
  numPages?: Maybe<Scalars['Int']>;
  /**
   * If not public, the object is only accessible by
   * users with the necessary permissions.
   */
  public: Scalars['Boolean'];
  publicComment?: Maybe<Scalars['String']>;
  publishedOn?: Maybe<Scalars['Date']>;
  /** Rating for student-created documents. */
  rating: Rating;
  semester: Scalars['Semester'];
  solution: SolutionType;
  type: DocumentType;
  /**
   * True if all associated lectures and examiners are validated. A
   * document must be validated before it can be published.
   */
  validated: Scalars['Boolean'];
  writtenType: WrittenExamType;
};

/**
 * Provides input data that is specific to written exams
 * (in addition to general document data).
 */
export type WrittenExamData = {
  solutionType: SolutionType;
};

/** An enumeration. */
export enum WrittenExamType {
  Exam = 'EXAM',
  Mock = 'MOCK'
}

export type PrintDocumentsMutationVariables = Exact<{
  documentList: Array<Scalars['DocumentId']> | Scalars['DocumentId'];
  deposits: Array<Array<Scalars['LectureId']> | Scalars['LectureId']> | Array<Scalars['LectureId']> | Scalars['LectureId'];
  tag: Scalars['String'];
  totalPrice: Scalars['Money'];
  printerId: Scalars['PrinterId'];
  accountingPositionId: Scalars['AccountingPositionId'];
  donation: Scalars['Money'];
  printFrontpage: Scalars['Boolean'];
}>;


export type PrintDocumentsMutation = { __typename?: 'Mutation', printDocuments: { __typename: 'GeneralError', errorCode: string, msg: string } | { __typename: 'InvalidIdError', errorCode: string, msg: string } | { __typename: 'PriceError', errorCode: string, msg: string } | { __typename: 'StringTooLargeError', errorCode: string, msg: string } | { __typename: 'TransactionList', transactions: Array<{ __typename?: 'Transaction', id: string, value: number, associatedTag?: string | null, transactionType: TransactionType, timestamp: string, lectures?: Array<{ __typename?: 'Lecture', id: string, displayName: string }> | null }> } };

export type PriceQueryVariables = Exact<{
  documents: Array<Scalars['DocumentId']> | Scalars['DocumentId'];
  numOralExamDeposits: Scalars['Int'];
}>;


export type PriceQuery = { __typename?: 'Query', price?: number | null };

export type DocumentsQueryVariables = Exact<{
  filters: Array<DocumentFilter> | DocumentFilter;
}>;


export type DocumentsQuery = { __typename?: 'Query', documents: { __typename?: 'DocumentCursor', cursor?: unknown | null, totalAvailable: number, results: Array<{ __typename: 'OralExam', id: string, date: string, semester: string, public: boolean, publicComment?: string | null, publishedOn?: string | null, downloadable: boolean, rating: Rating, numPages?: number | null, examiners: Array<{ __typename?: 'Examiner', id: string, name: string, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> } | { __typename: 'WrittenExam', id: string, date: string, semester: string, public: boolean, publicComment?: string | null, publishedOn?: string | null, downloadable: boolean, rating: Rating, numPages?: number | null, examiners: Array<{ __typename?: 'Examiner', id: string, name: string, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> }> } };

export type CreateOrderMutationVariables = Exact<{
  tag?: InputMaybe<Scalars['String']>;
  documents: Array<Scalars['DocumentId']> | Scalars['DocumentId'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename: 'GeneralError', msg: string } | { __typename: 'InvalidIdError', msg: string } | { __typename: 'Order', id: string, tag?: string | null } | { __typename: 'StringTooLargeError', msg: string } };

export type SiteConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteConfigurationQuery = { __typename?: 'Query', config: { __typename?: 'Config', siteName: string, printers: Array<{ __typename?: 'Printer', id: string, name: string, accountingPositions: Array<{ __typename?: 'AccountingPosition', id: string, name: string }> }>, currency: { __typename?: 'CurrencyConfig', code: string, symbol: string, minorDigits: number } } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'Credentials', token: string, permissions: Array<Permission>, user: { __typename?: 'User', username: string, displayName: string } } | { __typename: 'GeneralError', msg: string } };

export type PermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PermissionsQuery = { __typename?: 'Query', me: { __typename?: 'Actor', permissions: Array<Permission> } };


export const PrintDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"printDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deposits"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LectureId"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Money"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"printerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrinterId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountingPositionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountingPositionId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"donation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Money"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"printFrontpage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"printDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentList"}}},{"kind":"Argument","name":{"kind":"Name","value":"deposits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deposits"}}},{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"printerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"printerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accountingPositionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountingPositionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"donation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"donation"}}},{"kind":"Argument","name":{"kind":"Name","value":"printFrontpage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"printFrontpage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"associatedTag"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PriceError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<PrintDocumentsMutation, PrintDocumentsMutationVariables>;
export const PriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"price"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documents"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numOralExamDeposits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documents"}}},{"kind":"Argument","name":{"kind":"Name","value":"numOralExamDeposits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numOralExamDeposits"}}}]}]}}]} as unknown as DocumentNode<PriceQuery, PriceQueryVariables>;
export const DocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"documents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentFilter"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"Field","name":{"kind":"Name","value":"publicComment"}},{"kind":"Field","name":{"kind":"Name","value":"publishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"downloadable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"numPages"}},{"kind":"Field","name":{"kind":"Name","value":"examiners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalAvailable"}}]}}]}}]} as unknown as DocumentNode<DocumentsQuery, DocumentsQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documents"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}},{"kind":"Argument","name":{"kind":"Name","value":"documents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const SiteConfigurationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"siteConfiguration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"config"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"printers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountingPositions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"minorDigits"}}]}}]}}]}}]} as unknown as DocumentNode<SiteConfigurationQuery, SiteConfigurationQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Credentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const PermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"}}]}}]}}]} as unknown as DocumentNode<PermissionsQuery, PermissionsQueryVariables>;