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
  /** format: opaque string representation */
  AccountingPositionId: string;
  /** format: opaque */
  Cursor: unknown;
  /** Date (isoformat) */
  Date: string;
  /** Date with time (isoformat) */
  DateTime: string;
  /** format: opaque string representation */
  DepositId: string;
  /** format: opaque string representation */
  DocumentId: string;
  /** format: opaque string representation */
  ExaminerId: string;
  /** format: opaque string representation */
  FacultyId: string;
  /** format: opaque string representation */
  LectureId: string;
  /**
   * format: Int (signed)
   * unit: Thousandth of a minor currency unit
   */
  Money: number;
  /** format: opaque string representation */
  OrderId: string;
  /** format: opaque string representation */
  PrinterId: string;
  /** format: opaque string representation */
  RequestId: string;
  /** format: (WS|SS) ?(\d{2}|\d{4}) */
  Semester: string;
  /** format: opaque string representation */
  TransactionId: string;
  UUID: string;
  Upload: unknown;
  /** format: opaque string representation */
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

/** Note that it is possible here to use `... on Document`. */
export type CreateDocumentResult = FileTooLargeError | GeneralError | InvalidIdError | OralExam | WrittenExam;

export type CreateExamRequestResult = ExamRequest | FileTooLargeError | GeneralError | InvalidIdError;

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
  ExamRequest = 'EXAM_REQUEST',
  Faculty = 'FACULTY',
  Lecture = 'LECTURE',
  Order = 'ORDER',
  Printer = 'PRINTER',
  Upload = 'UPLOAD'
}

/** Note that it is possible here to use `... on Document`. */
export type DeleteDocumentResult = GeneralError | InvalidIdError | OralExam | WrittenExam;

export type DeleteExaminerResult = Examiner | GeneralError | InvalidIdError;

export type DeleteLectureResult = GeneralError | InvalidIdError | Lecture;

export type DeleteOrderResult = InvalidIdError | Order;

export type DeleteUploadResult = DocumentUpload | GeneralError | InvalidIdError;

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

export type DepositUpdateInput = {
  comment?: InputMaybe<StringUpdateInput>;
  lectureIds?: InputMaybe<Array<Scalars['LectureId']>>;
  tag?: InputMaybe<Scalars['String']>;
};

/**
 * Documents are the central data type of Squeak.
 *
 * A documents usually corresponds to an exam. An exam has an associated date,
 * semester, faculty, examiner(s) and lecture (in some cases, an exam can
 * even belong to multiple lectures). Apart from that, each document has
 * additional associated data (see the respective field documentation).
 *
 * Documents are associated to a file which must be a valid PDF file.
 * For public documents, it is required that a file is present and that all
 * examiners and lectures are validated.
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
  /**
   * Timestamp of last change to the associated file
   * (or the creation of the document, if no file exists).
   */
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

/**
 * Input for creating documents.
 * The writtenExamData field must be present if and only if the type is a
 * written exam.
 */
export type DocumentInput = {
  date: Scalars['Date'];
  downloadable: Scalars['Boolean'];
  examinerIds: Array<Scalars['ExaminerId']>;
  internalComment?: InputMaybe<Scalars['String']>;
  lectureIds: Array<Scalars['LectureId']>;
  public: Scalars['Boolean'];
  publicComment?: InputMaybe<Scalars['String']>;
  rating: Rating;
  semester: Scalars['Semester'];
  type: DocumentType;
  writtenExamData?: InputMaybe<WrittenExamData>;
};

/** Union of possible values of WrittenExamType and OralExamType. */
export enum DocumentType {
  OralExam = 'ORAL_EXAM',
  OralReexam = 'ORAL_REEXAM',
  WrittenExam = 'WRITTEN_EXAM',
  WrittenMock = 'WRITTEN_MOCK'
}

/**
 * Input for updating documents.
 * Values that are null are not updated. The writtenExamData field can be
 * used if and only if the type of the document is a written exam.
 */
export type DocumentUpdateInput = {
  date?: InputMaybe<Scalars['Date']>;
  downloadable?: InputMaybe<Scalars['Boolean']>;
  examinerIds?: InputMaybe<Array<Scalars['ExaminerId']>>;
  internalComment?: InputMaybe<StringUpdateInput>;
  lectureIds?: InputMaybe<Array<Scalars['LectureId']>>;
  public?: InputMaybe<Scalars['Boolean']>;
  publicComment?: InputMaybe<StringUpdateInput>;
  rating?: InputMaybe<Rating>;
  semester?: InputMaybe<Scalars['Semester']>;
  type?: InputMaybe<DocumentType>;
  writtenExamData?: InputMaybe<WrittenExamData>;
};

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
  /** Document types that are allowed for exam requests. */
  allowedExamRequestTypes: Array<DocumentType>;
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

/** Values that are null are not updated. */
export type ExaminerUpdateInput = {
  institute?: InputMaybe<StringUpdateInput>;
  name?: InputMaybe<Scalars['String']>;
  prename?: InputMaybe<StringUpdateInput>;
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

/** Values that are null are not updated. */
export type LectureUpdateInput = {
  comment?: InputMaybe<StringUpdateInput>;
  facultyId?: InputMaybe<Scalars['FacultyId']>;
  name?: InputMaybe<Scalars['String']>;
};

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
   * Creates a new document with the provided data and file (or no file).
   * In the data, at least one lecture and at least one examiner must be
   * provided. For public documents, the lectures and examiners must be
   * validated and a file must be present. The file must be a valid PDF.
   *
   * Returns the created document or an according error.
   *
   * Possible errors:
   *   NO_LECTURE_PROVIDED, NO_EXAMINER_PROVIDED, INVALID_ID, LECTURE_NOT_VALIDATED,
   *   EXAMINER_NOT_VALIDATED, DUPLICATE_ID, FILE_TOO_LARGE, PDF_PROCESSING,
   *   INVALID_DOCUMENT_DATA, NO_FILE_AVAILABLE
   */
  createDocument: CreateDocumentResult;
  /**
   * Creates a new exam request with the provided data and file (or no
   * file). In the data, at least one lecture and at least one examiner must
   * be provided. For public documents, the lectures and examiners must be
   * validated and a file must be present. The file must be a valid PDF.
   * Further, the server might restrict which document types are allowed for
   * exam requests (see config.documents).
   *
   * Returns the created exam request or an according error.
   *
   * Possible errors:
   *   NO_LECTURE_PROVIDED, NO_EXAMINER_PROVIDED, INVALID_ID, LECTURE_NOT_VALIDATED,
   *   EXAMINER_NOT_VALIDATED, DUPLICATE_ID, FILE_TOO_LARGE, PDF_PROCESSING,
   *   INVALID_DOCUMENT_DATA, NO_FILE_AVAILABLE, INVALID_TYPE_FOR_EXAM_REQUEST
   */
  createExamRequest: CreateExamRequestResult;
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
   *   INVALID_DOCUMENT_DATA, DEPOSIT_ALREADY_REFERENCED
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
   *   INVALID_TYPE_FOR_UPLOAD, INVALID_DOCUMENT_DATA
   */
  createUploadForTag: UploadWithTagResult;
  /**
   * Deletes the existing document with the specified id. If the document
   * is contained in one or multiple orders and `deleteFromOrders` is false,
   * the document is not deleted and an error is returned.
   *
   * If `deleteFromOrders` is true, the document is deleted and removed from
   * all orders. Orders that contain no other document are deleted.
   *
   * Returns the deleted document or an according error.
   *
   * Possible errors:
   *   INVALID_ID, DOCUMENT_STILL_REFERENCED
   */
  deleteDocument: DeleteDocumentResult;
  /**
   * Deletes the existing examiner with the specified id. If any document
   * references this examiner, the examiner is not deleted and an error is
   * returned.
   *
   * Returns the deleted examiner or an according error.
   *
   * Possible errors:
   *   INVALID_ID, EXAMINER_STILL_REFERENCED
   */
  deleteExaminer: DeleteExaminerResult;
  /**
   * Deletes the existing lecture with the specified id (including aliases).
   * If any document references this lecture, the lecture is not deleted
   * and an error is returned.
   *
   * Returns the deleted lecture or an according error.
   *
   * Possible errors:
   *   INVALID_ID, LECTURE_STILL_REFERENCED
   */
  deleteLecture: DeleteLectureResult;
  /**
   * Deletes the existing order with the specified id.
   *
   * Returns the deleted order or an according error.
   *
   * Possible errors:
   *   INVALID_ID
   */
  deleteOrder: DeleteOrderResult;
  /**
   * Deletes the existing upload with the specified id. If the upload
   * is contained in one or multiple orders it is not deleted and an error
   * is returned. Also, the upload is not deleted if the associated document
   * is already published.
   *
   * Note: The endpoint is intended for users to delete uploads created by
   * themselves. For other cases, "deleteDocument" should be used instead.
   *
   * Returns the deleted upload or an according error.
   *
   * Possible errors:
   *   INVALID_ID, DOCUMENT_STILL_REFERENCED, UPLOAD_ALREADY_PUBLISHED
   */
  deleteUpload: DeleteUploadResult;
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
   * Updates the data of the specified, already existing, document.
   * The data is subject to the same restrictions as if creating a new
   * document.
   *
   * Returns the updated document or an according error.
   *
   * Possible errors:
   *   NO_LECTURE_PROVIDED, NO_EXAMINER_PROVIDED, INVALID_ID, DUPLICATE_ID,
   *   INVALID_DOCUMENT_DATA, NO_FILE_AVAILABLE, LECTURE_NOT_VALIDATED,
   *   EXAMINER_NOT_VALIDATED
   */
  updateDocumentData: UpdateDocumentDataResult;
  /**
   * Updates or deletes (if the parameter is null) the file of the
   * specified, already existing, document. Files of public documents can
   * not be deleted.
   *
   * Returns the updated document or an according error.
   *
   * Possible errors:
   *   INVALID_ID, FILE_TOO_LARGE, PDF_PROCESSING, NO_FILE_AVAILABLE
   */
  updateDocumentFile: UpdateDocumentFileResult;
  /**
   * Updates the state of the specified, already existing, exam request.
   *
   * Returns the updated exam request or an according error.
   *
   * Possible errors:
   *   INVALID_ID
   */
  updateExamRequestState: CreateExamRequestResult;
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
   *   INVALID_DOCUMENT_DATA, UPLOAD_ALREADY_PUBLISHED
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
   * Updates data related to the state of the specified, already existing,
   * upload. Additionally, the endpoint allows to publish or unpublish the
   * associated document.
   *
   * Returns the updated upload or an according error.
   *
   * Possible errors:
   *   INVALID_ID, LECTURE_NOT_VALIDATED, EXAMINER_NOT_VALIDATED
   */
  updateUploadState: UpdateUploadStateResult;
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


export type MutationCreateDocumentArgs = {
  data: DocumentInput;
  file?: InputMaybe<Scalars['Upload']>;
};


export type MutationCreateExamRequestArgs = {
  data: DocumentInput;
  file?: InputMaybe<Scalars['Upload']>;
  state: RequestState;
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


export type MutationDeleteDocumentArgs = {
  deleteFromOrders?: Scalars['Boolean'];
  documentId: Scalars['DocumentId'];
};


export type MutationDeleteExaminerArgs = {
  examinerId: Scalars['ExaminerId'];
};


export type MutationDeleteLectureArgs = {
  lectureId: Scalars['LectureId'];
};


export type MutationDeleteOrderArgs = {
  orderId: Scalars['OrderId'];
};


export type MutationDeleteUploadArgs = {
  uploadId: Scalars['UploadId'];
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
  data: DepositUpdateInput;
  depositId: Scalars['DepositId'];
};


export type MutationUpdateDocumentDataArgs = {
  data: DocumentUpdateInput;
  documentId: Scalars['DocumentId'];
};


export type MutationUpdateDocumentFileArgs = {
  documentId: Scalars['DocumentId'];
  file?: InputMaybe<Scalars['Upload']>;
};


export type MutationUpdateExamRequestStateArgs = {
  requestId: Scalars['RequestId'];
  state: RequestState;
};


export type MutationUpdateExaminerArgs = {
  data: ExaminerUpdateInput;
  examinerId: Scalars['ExaminerId'];
};


export type MutationUpdateLectureArgs = {
  data: LectureUpdateInput;
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
  data?: InputMaybe<RestrictedDocumentUpdateInput>;
  file?: InputMaybe<Scalars['Upload']>;
  uploadId: Scalars['UploadId'];
};


export type MutationUpdateUploadDepositArgs = {
  depositId: Scalars['DepositId'];
  uploadId: Scalars['UploadId'];
};


export type MutationUpdateUploadStateArgs = {
  public?: InputMaybe<Scalars['Boolean']>;
  uploadId: Scalars['UploadId'];
  uploadInput: UploadStateInput;
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
  /**
   * Timestamp of last change to the associated file
   * (or the creation of the document, if no file exists).
   */
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
  CreateExamRequests = 'CREATE_EXAM_REQUESTS',
  CreateOrders = 'CREATE_ORDERS',
  CreateUnvalidatedData = 'CREATE_UNVALIDATED_DATA',
  CreateUploads = 'CREATE_UPLOADS',
  DeleteData = 'DELETE_DATA',
  DeleteOrders = 'DELETE_ORDERS',
  DeleteUploads = 'DELETE_UPLOADS',
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
  UpdateExamRequests = 'UPDATE_EXAM_REQUESTS',
  UpdateOrders = 'UPDATE_ORDERS',
  UpdateUploads = 'UPDATE_UPLOADS',
  ValidateData = 'VALIDATE_DATA',
  ValidateUploads = 'VALIDATE_UPLOADS'
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

/**
 * Input for updating documents with restricted permissions.
 * Values that are null are not updated. The writtenExamData field can be
 * used if and only if the type of the document is a written exam.
 */
export type RestrictedDocumentUpdateInput = {
  date?: InputMaybe<Scalars['Date']>;
  examinerIds?: InputMaybe<Array<Scalars['ExaminerId']>>;
  lectureIds?: InputMaybe<Array<Scalars['LectureId']>>;
  semester?: InputMaybe<Scalars['Semester']>;
  type?: InputMaybe<DocumentType>;
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
 * Input for either replacing or deleting an optional string. If `value` is
 * null, the string is deleted.
 */
export type StringUpdateInput = {
  value?: InputMaybe<Scalars['String']>;
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

/** Note that it is possible here to use `... on Document`. */
export type UpdateDocumentDataResult = GeneralError | InvalidIdError | OralExam | WrittenExam;

/** Note that it is possible here to use `... on Document`. */
export type UpdateDocumentFileResult = FileTooLargeError | GeneralError | InvalidIdError | OralExam | WrittenExam;

export type UpdateExaminerResult = Examiner | GeneralError | InvalidIdError | StringTooLargeError;

export type UpdateOrderResult = GeneralError | InvalidIdError | Order;

export type UpdateUploadDepositResult = DocumentUpload | GeneralError | InvalidIdError;

export type UpdateUploadStateResult = DocumentUpload | GeneralError | InvalidIdError;

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

/**
 * Input for updating data related to the state of an upload.
 * Values that are null are not updated.
 */
export type UploadStateInput = {
  depositAvailable?: InputMaybe<Scalars['Boolean']>;
  /**
   * Warning: Setting rewardAvailable to true might be ignored (i.e., the
   * reward might still not be available) depending on the reward policy of
   * the server.
   */
  rewardAvailable?: InputMaybe<Scalars['Boolean']>;
  state?: InputMaybe<UploadState>;
};

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
  /**
   * Timestamp of last change to the associated file
   * (or the creation of the document, if no file exists).
   */
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

export type DepositSelectionQueryVariables = Exact<{
  filters: Array<DepositFilter> | DepositFilter;
}>;


export type DepositSelectionQuery = { __typename?: 'Query', deposits: { __typename?: 'DepositCursor', results: Array<{ __typename?: 'Deposit', id: string, tag: string, created: string, value: number }> } };

export type UploadsQueryVariables = Exact<{
  filters: Array<UploadFilter> | UploadFilter;
}>;


export type UploadsQuery = { __typename?: 'Query', uploads: { __typename?: 'UploadCursor', results: Array<{ __typename?: 'DocumentUpload', id: string, tag?: string | null, state: UploadState, created: string, depositAvailable: boolean, rewardAvailable: boolean, deposit?: { __typename?: 'Deposit', id: string, tag: string, value: number, comment?: string | null } | null, document: { __typename?: 'OralExam', id: string, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> } | { __typename?: 'WrittenExam', id: string, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> } }> } };

export type UpdateUploadStateMutationMutationVariables = Exact<{
  uploadId: Scalars['UploadId'];
  uploadInput: UploadStateInput;
  public?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateUploadStateMutationMutation = { __typename?: 'Mutation', updateUploadState: { __typename?: 'DocumentUpload', id: string, state: UploadState, depositAvailable: boolean, rewardAvailable: boolean, document: { __typename?: 'OralExam', id: string, public: boolean } | { __typename?: 'WrittenExam', id: string, public: boolean } } | { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } };

export type ReturnDepositMutationVariables = Exact<{
  depositId: Scalars['DepositId'];
  uploadId: Scalars['UploadId'];
  accountingPositionId: Scalars['AccountingPositionId'];
  force: Scalars['Boolean'];
}>;


export type ReturnDepositMutation = { __typename?: 'Mutation', returnDeposit: { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'Transaction', id: string } };

export type PayoutRewardMutationVariables = Exact<{
  uploadId: Scalars['UploadId'];
  accountingPositionId: Scalars['AccountingPositionId'];
  force: Scalars['Boolean'];
}>;


export type PayoutRewardMutation = { __typename?: 'Mutation', payoutReward: { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'Transaction', id: string, value: number } };

export type UpdateDocumentFileMutationVariables = Exact<{
  documentId: Scalars['DocumentId'];
  file?: InputMaybe<Scalars['Upload']>;
}>;


export type UpdateDocumentFileMutation = { __typename?: 'Mutation', updateDocumentFile: { __typename?: 'FileTooLargeError', msg: string } | { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'OralExam', id: string, file?: string | null, downloadable: boolean } | { __typename?: 'WrittenExam', id: string, file?: string | null, downloadable: boolean } };

export type UpdateDocumentMutationVariables = Exact<{
  documentId: Scalars['DocumentId'];
  data: DocumentUpdateInput;
}>;


export type UpdateDocumentMutation = { __typename?: 'Mutation', updateDocumentData: { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'OralExam', id: string } | { __typename?: 'WrittenExam', id: string } };

export type EditDocumentMetaQueryVariables = Exact<{ [key: string]: never; }>;


export type EditDocumentMetaQuery = { __typename?: 'Query', lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }>, examiners: Array<{ __typename?: 'Examiner', id: string, displayName: string }> };

export type AdminDocumentsQueryVariables = Exact<{
  filters: Array<DocumentFilter> | DocumentFilter;
}>;


export type AdminDocumentsQuery = { __typename?: 'Query', documents: { __typename?: 'DocumentCursor', cursor?: unknown | null, totalAvailable: number, results: Array<{ __typename: 'OralExam', id: string, date: string, semester: string, public: boolean, publicComment?: string | null, internalComment?: string | null, publishedOn?: string | null, downloadable: boolean, rating: Rating, numPages?: number | null, validated: boolean, file?: string | null, examiners: Array<{ __typename?: 'Examiner', id: string, name: string, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> } | { __typename: 'WrittenExam', solution: SolutionType, id: string, date: string, semester: string, public: boolean, publicComment?: string | null, internalComment?: string | null, publishedOn?: string | null, downloadable: boolean, rating: Rating, numPages?: number | null, validated: boolean, file?: string | null, examiners: Array<{ __typename?: 'Examiner', id: string, name: string, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> }> } };

export type CreateExaminerMutationVariables = Exact<{
  data: ExaminerInput;
  validated: Scalars['Boolean'];
}>;


export type CreateExaminerMutation = { __typename?: 'Mutation', createExaminer: { __typename?: 'Examiner', id: string } | { __typename?: 'GeneralError', msg: string } | { __typename?: 'StringTooLargeError', msg: string } };

export type DeleteExaminerMutationVariables = Exact<{
  examinerId: Scalars['ExaminerId'];
}>;


export type DeleteExaminerMutation = { __typename?: 'Mutation', deleteExaminer: { __typename?: 'Examiner', id: string } | { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } };

export type UpdateExaminerMutationVariables = Exact<{
  examinerId: Scalars['ExaminerId'];
  data: ExaminerUpdateInput;
}>;


export type UpdateExaminerMutation = { __typename?: 'Mutation', updateExaminer: { __typename?: 'Examiner', id: string } | { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'StringTooLargeError', msg: string } };

export type ExaminersQueryVariables = Exact<{
  validated?: InputMaybe<Scalars['Boolean']>;
}>;


export type ExaminersQuery = { __typename?: 'Query', examiners: Array<{ __typename?: 'Examiner', id: string, name: string, validated: boolean, displayName: string, prename?: string | null, institute?: string | null }> };

export type ValidateExaminerMutationVariables = Exact<{
  examinerId: Scalars['ExaminerId'];
}>;


export type ValidateExaminerMutation = { __typename?: 'Mutation', validateExaminer: { __typename?: 'Examiner', id: string, validated: boolean } | { __typename?: 'InvalidIdError', msg: string } };

export type FacultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FacultiesQuery = { __typename?: 'Query', faculties: Array<{ __typename?: 'Faculty', id: string, displayName: string }> };

export type CreateLectureMutationVariables = Exact<{
  data: LectureInput;
  validated: Scalars['Boolean'];
}>;


export type CreateLectureMutation = { __typename?: 'Mutation', createLecture: { __typename: 'GeneralError', errorCode: string, msg: string } | { __typename: 'InvalidIdError', errorCode: string, msg: string } | { __typename: 'Lecture', id: string } | { __typename: 'StringTooLargeError', errorCode: string, msg: string } };

export type DeleteLectureMutationVariables = Exact<{
  lectureId: Scalars['LectureId'];
}>;


export type DeleteLectureMutation = { __typename?: 'Mutation', deleteLecture: { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'Lecture', id: string } };

export type UpdateLectureMutationVariables = Exact<{
  lectureId: Scalars['LectureId'];
  data: LectureUpdateInput;
}>;


export type UpdateLectureMutation = { __typename?: 'Mutation', updateLecture: { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'Lecture', id: string } | { __typename?: 'StringTooLargeError', msg: string } };

export type UpdateLectureAliasesMutationVariables = Exact<{
  lectureId: Scalars['LectureId'];
  aliases: Array<Scalars['String']> | Scalars['String'];
}>;


export type UpdateLectureAliasesMutation = { __typename?: 'Mutation', updateLectureAliases: { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'Lecture', id: string } | { __typename?: 'StringTooLargeError', msg: string } };

export type ValidateLectureMutationVariables = Exact<{
  lectureId: Scalars['LectureId'];
}>;


export type ValidateLectureMutation = { __typename?: 'Mutation', validateLecture: { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'Lecture', id: string, validated: boolean } };

export type LecturesQueryVariables = Exact<{
  validated?: InputMaybe<Scalars['Boolean']>;
}>;


export type LecturesQuery = { __typename?: 'Query', lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string, validated: boolean, aliases: Array<string>, comment?: string | null, availableRewards: Array<DocumentType>, faculty: { __typename?: 'Faculty', id: string, displayName: string } }>, faculties: Array<{ __typename?: 'Faculty', id: string, displayName: string }> };

export type CreateOrderMutationVariables = Exact<{
  tag?: InputMaybe<Scalars['String']>;
  documents: Array<Scalars['DocumentId']> | Scalars['DocumentId'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename: 'GeneralError', msg: string } | { __typename: 'InvalidIdError', msg: string } | { __typename: 'Order', id: string, tag?: string | null } | { __typename: 'StringTooLargeError', msg: string } };

export type PrintDocumentsMutationVariables = Exact<{
  documentList: Array<Scalars['DocumentId']> | Scalars['DocumentId'];
  deposits: Array<Array<Scalars['LectureId']> | Scalars['LectureId']> | Array<Scalars['LectureId']> | Scalars['LectureId'];
  tag: Scalars['String'];
  totalPrice: Scalars['Money'];
  printerId: Scalars['PrinterId'];
  accountingPositionId: Scalars['AccountingPositionId'];
  donation: Scalars['Money'];
  printFrontPage: Scalars['Boolean'];
}>;


export type PrintDocumentsMutation = { __typename?: 'Mutation', printDocuments: { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'PriceError', msg: string } | { __typename?: 'StringTooLargeError', msg: string } | { __typename?: 'TransactionList', transactions: Array<{ __typename?: 'Transaction', id: string, value: number, transactionType: TransactionType, associatedTag?: string | null }> } };

export type DocumentsByIdQueryVariables = Exact<{
  ids: Array<Scalars['DocumentId']> | Scalars['DocumentId'];
}>;


export type DocumentsByIdQuery = { __typename?: 'Query', documentsById: Array<{ __typename: 'OralExam', id: string, date: string, semester: string, public: boolean, publicComment?: string | null, publishedOn?: string | null, downloadable: boolean, rating: Rating, numPages?: number | null, examiners: Array<{ __typename?: 'Examiner', id: string, name: string, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> } | { __typename: 'WrittenExam', solution: SolutionType, id: string, date: string, semester: string, public: boolean, publicComment?: string | null, publishedOn?: string | null, downloadable: boolean, rating: Rating, numPages?: number | null, examiners: Array<{ __typename?: 'Examiner', id: string, name: string, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> } | null> };

export type OrdersQueryVariables = Exact<{
  filters: Array<OrderFilter> | OrderFilter;
}>;


export type OrdersQuery = { __typename?: 'Query', orders: { __typename?: 'OrderCursor', results: Array<{ __typename?: 'Order', id: string, tag?: string | null, state: OrderState, created: string, numPages: number, price: number, documents: Array<{ __typename?: 'OralExam', id: string } | { __typename?: 'WrittenExam', id: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }>, examiners: Array<{ __typename?: 'Examiner', id: string, displayName: string }> }> } };

export type PriceQueryVariables = Exact<{
  documents: Array<Scalars['DocumentId']> | Scalars['DocumentId'];
  numOralExamDeposits: Scalars['Int'];
}>;


export type PriceQuery = { __typename?: 'Query', price?: number | null };

export type FilterMetaQueryVariables = Exact<{
  validated?: InputMaybe<Scalars['Boolean']>;
}>;


export type FilterMetaQuery = { __typename?: 'Query', examiners: Array<{ __typename?: 'Examiner', id: string, name: string, validated: boolean, prename?: string | null, institute?: string | null, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string, validated: boolean, comment?: string | null, aliases: Array<string>, availableRewards: Array<DocumentType>, faculty: { __typename?: 'Faculty', id: string, displayName: string } }> };

export type DocumentsQueryVariables = Exact<{
  filters: Array<DocumentFilter> | DocumentFilter;
}>;


export type DocumentsQuery = { __typename?: 'Query', documents: { __typename?: 'DocumentCursor', cursor?: unknown | null, totalAvailable: number, results: Array<{ __typename: 'OralExam', id: string, date: string, semester: string, public: boolean, publicComment?: string | null, publishedOn?: string | null, downloadable: boolean, rating: Rating, numPages?: number | null, validated: boolean, examiners: Array<{ __typename?: 'Examiner', id: string, name: string, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> } | { __typename: 'WrittenExam', solution: SolutionType, id: string, date: string, semester: string, public: boolean, publicComment?: string | null, publishedOn?: string | null, downloadable: boolean, rating: Rating, numPages?: number | null, validated: boolean, examiners: Array<{ __typename?: 'Examiner', id: string, name: string, displayName: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }> }> } };

export type SiteConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteConfigurationQuery = { __typename?: 'Query', config: { __typename?: 'Config', siteName: string, printers: Array<{ __typename?: 'Printer', id: string, name: string, accountingPositions: Array<{ __typename?: 'AccountingPosition', id: string, name: string }> }>, currency: { __typename?: 'CurrencyConfig', code: string, symbol: string, minorDigits: number } } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'Credentials', token: string, permissions: Array<Permission>, user: { __typename?: 'User', username: string, displayName: string } } | { __typename: 'GeneralError', msg: string } };

export type CreateUploadForTagMutationVariables = Exact<{
  tag?: InputMaybe<Scalars['String']>;
  data: RestrictedDocumentInput;
  file: Scalars['Upload'];
}>;


export type CreateUploadForTagMutation = { __typename?: 'Mutation', createUploadForTag: { __typename?: 'DocumentUpload', id: string, rewardAvailable: boolean, tag?: string | null } | { __typename?: 'FileTooLargeError', msg: string } | { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'StringTooLargeError', msg: string } };

export type CreateUnvalidatedLectureMutationVariables = Exact<{
  name: Scalars['String'];
  facultyId: Scalars['FacultyId'];
}>;


export type CreateUnvalidatedLectureMutation = { __typename?: 'Mutation', createUnvalidatedLecture: { __typename?: 'GeneralError', msg: string } | { __typename?: 'InvalidIdError', msg: string } | { __typename?: 'Lecture', id: string } | { __typename?: 'StringTooLargeError', msg: string } };

export type CreateUnvalidatedExaminerMutationVariables = Exact<{
  name: Scalars['String'];
  prename?: InputMaybe<Scalars['String']>;
  institute?: InputMaybe<Scalars['String']>;
}>;


export type CreateUnvalidatedExaminerMutation = { __typename?: 'Mutation', createUnvalidatedExaminer: { __typename?: 'Examiner', id: string } | { __typename?: 'GeneralError', msg: string } | { __typename?: 'StringTooLargeError', msg: string } };

export type StudentSubmissionMetaQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentSubmissionMetaQuery = { __typename?: 'Query', lectures: Array<{ __typename?: 'Lecture', id: string, displayName: string }>, examiners: Array<{ __typename?: 'Examiner', id: string, displayName: string }>, faculties: Array<{ __typename?: 'Faculty', id: string, displayName: string }> };


export const DepositSelectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"depositSelection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DepositFilter"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deposits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"created"}}]}}]}}]}}]} as unknown as DocumentNode<DepositSelectionQuery, DepositSelectionQueryVariables>;
export const UploadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"uploads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFilter"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"deposit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"depositAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"rewardAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UploadsQuery, UploadsQueryVariables>;
export const UpdateUploadStateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUploadStateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploadInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadStateInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"public"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUploadState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uploadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"uploadInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploadInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"public"},"value":{"kind":"Variable","name":{"kind":"Name","value":"public"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentUpload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"depositAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"rewardAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"public"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUploadStateMutationMutation, UpdateUploadStateMutationMutationVariables>;
export const ReturnDepositDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"returnDeposit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"depositId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DepositId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountingPositionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountingPositionId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returnDeposit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"depositId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"depositId"}}},{"kind":"Argument","name":{"kind":"Name","value":"uploadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accountingPositionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountingPositionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<ReturnDepositMutation, ReturnDepositMutationVariables>;
export const PayoutRewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"payoutReward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uploadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountingPositionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountingPositionId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payoutReward"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uploadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uploadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accountingPositionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountingPositionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<PayoutRewardMutation, PayoutRewardMutationVariables>;
export const UpdateDocumentFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateDocumentFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocumentFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"downloadable"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FileTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentFileMutation, UpdateDocumentFileMutationVariables>;
export const UpdateDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocumentData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WrittenExam"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OralExam"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export const EditDocumentMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"editDocumentMeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"examiners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<EditDocumentMetaQuery, EditDocumentMetaQueryVariables>;
export const AdminDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentFilter"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"Field","name":{"kind":"Name","value":"publicComment"}},{"kind":"Field","name":{"kind":"Name","value":"internalComment"}},{"kind":"Field","name":{"kind":"Name","value":"publishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"downloadable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"numPages"}},{"kind":"Field","name":{"kind":"Name","value":"validated"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"examiners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WrittenExam"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"solution"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalAvailable"}}]}}]}}]} as unknown as DocumentNode<AdminDocumentsQuery, AdminDocumentsQueryVariables>;
export const CreateExaminerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createExaminer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExaminerInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validated"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExaminer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"validated"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validated"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Examiner"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<CreateExaminerMutation, CreateExaminerMutationVariables>;
export const DeleteExaminerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteExaminer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"examinerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExaminerId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExaminer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"examinerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"examinerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Examiner"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteExaminerMutation, DeleteExaminerMutationVariables>;
export const UpdateExaminerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateExaminer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"examinerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExaminerId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExaminerUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExaminer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"examinerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"examinerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Examiner"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateExaminerMutation, UpdateExaminerMutationVariables>;
export const ExaminersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"examiners"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validated"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"examiners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"validated"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validated"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"validated"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"prename"}},{"kind":"Field","name":{"kind":"Name","value":"institute"}}]}}]}}]} as unknown as DocumentNode<ExaminersQuery, ExaminersQueryVariables>;
export const ValidateExaminerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"validateExaminer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"examinerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExaminerId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateExaminer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"examinerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"examinerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Examiner"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validated"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateExaminerMutation, ValidateExaminerMutationVariables>;
export const FacultiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"faculties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"faculties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<FacultiesQuery, FacultiesQueryVariables>;
export const CreateLectureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createLecture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LectureInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validated"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLecture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"validated"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validated"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLectureMutation, CreateLectureMutationVariables>;
export const DeleteLectureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteLecture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LectureId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLecture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lectureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteLectureMutation, DeleteLectureMutationVariables>;
export const UpdateLectureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateLecture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LectureId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LectureUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLecture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lectureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateLectureMutation, UpdateLectureMutationVariables>;
export const UpdateLectureAliasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateLectureAliases"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LectureId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"aliases"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLectureAliases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lectureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}}},{"kind":"Argument","name":{"kind":"Name","value":"aliases"},"value":{"kind":"Variable","name":{"kind":"Name","value":"aliases"}}},{"kind":"Argument","name":{"kind":"Name","value":"removeExisting"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateLectureAliasesMutation, UpdateLectureAliasesMutationVariables>;
export const ValidateLectureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"validateLecture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LectureId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateLecture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lectureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"validated"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<ValidateLectureMutation, ValidateLectureMutationVariables>;
export const LecturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"lectures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validated"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lectures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"validated"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validated"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"validated"}},{"kind":"Field","name":{"kind":"Name","value":"aliases"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"faculty"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"availableRewards"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faculties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<LecturesQuery, LecturesQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documents"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}},{"kind":"Argument","name":{"kind":"Name","value":"documents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documents"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const PrintDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"printDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentList"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deposits"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LectureId"}}}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Money"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"printerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrinterId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountingPositionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountingPositionId"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"donation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Money"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"printFrontPage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"printDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentList"}}},{"kind":"Argument","name":{"kind":"Name","value":"deposits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deposits"}}},{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"printerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"printerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accountingPositionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountingPositionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"donation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"donation"}}},{"kind":"Argument","name":{"kind":"Name","value":"printFrontpage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"printFrontPage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"transactionType"}},{"kind":"Field","name":{"kind":"Name","value":"associatedTag"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PriceError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<PrintDocumentsMutation, PrintDocumentsMutationVariables>;
export const DocumentsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"documentsById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentsById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"Field","name":{"kind":"Name","value":"publicComment"}},{"kind":"Field","name":{"kind":"Name","value":"publishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"downloadable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"numPages"}},{"kind":"Field","name":{"kind":"Name","value":"examiners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WrittenExam"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"solution"}}]}}]}}]}}]} as unknown as DocumentNode<DocumentsByIdQuery, DocumentsByIdQueryVariables>;
export const OrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"orders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderFilter"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"numPages"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"documents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"examiners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrdersQuery, OrdersQueryVariables>;
export const PriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"price"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documents"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentId"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"numOralExamDeposits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documents"}}},{"kind":"Argument","name":{"kind":"Name","value":"numOralExamDeposits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"numOralExamDeposits"}}}]}]}}]} as unknown as DocumentNode<PriceQuery, PriceQueryVariables>;
export const FilterMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"filterMeta"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validated"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"examiners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"validated"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validated"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"validated"}},{"kind":"Field","name":{"kind":"Name","value":"prename"}},{"kind":"Field","name":{"kind":"Name","value":"institute"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"validated"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validated"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"validated"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"aliases"}},{"kind":"Field","name":{"kind":"Name","value":"faculty"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"availableRewards"}}]}}]}}]} as unknown as DocumentNode<FilterMetaQuery, FilterMetaQueryVariables>;
export const DocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"documents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentFilter"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"semester"}},{"kind":"Field","name":{"kind":"Name","value":"public"}},{"kind":"Field","name":{"kind":"Name","value":"publicComment"}},{"kind":"Field","name":{"kind":"Name","value":"publishedOn"}},{"kind":"Field","name":{"kind":"Name","value":"downloadable"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"numPages"}},{"kind":"Field","name":{"kind":"Name","value":"validated"}},{"kind":"Field","name":{"kind":"Name","value":"examiners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WrittenExam"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"solution"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"totalAvailable"}}]}}]}}]} as unknown as DocumentNode<DocumentsQuery, DocumentsQueryVariables>;
export const SiteConfigurationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"siteConfiguration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"config"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"printers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountingPositions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"minorDigits"}}]}}]}}]}}]} as unknown as DocumentNode<SiteConfigurationQuery, SiteConfigurationQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Credentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permissions"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUploadForTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUploadForTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RestrictedDocumentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUploadForTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentUpload"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewardAvailable"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FileTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUploadForTagMutation, CreateUploadForTagMutationVariables>;
export const CreateUnvalidatedLectureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUnvalidatedLecture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"facultyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FacultyId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUnvalidatedLecture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"facultyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"facultyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvalidIdError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUnvalidatedLectureMutation, CreateUnvalidatedLectureMutationVariables>;
export const CreateUnvalidatedExaminerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUnvalidatedExaminer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prename"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"institute"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUnvalidatedExaminer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"prename"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prename"}}},{"kind":"Argument","name":{"kind":"Name","value":"institute"},"value":{"kind":"Variable","name":{"kind":"Name","value":"institute"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Examiner"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StringTooLargeError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GeneralError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUnvalidatedExaminerMutation, CreateUnvalidatedExaminerMutationVariables>;
export const StudentSubmissionMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"studentSubmissionMeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"examiners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faculties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<StudentSubmissionMetaQuery, StudentSubmissionMetaQueryVariables>;