import React, {useMemo} from "react"
import {
  AdminDocumentsQuery,
  DocumentsQuery,
  DocumentType,
  DocumentUpdateInput,
  EditDocumentMetaQuery,
  Rating,
  SolutionType
} from "@/model/generated/graphql";
import {Form} from "react-final-form";
import {gql} from "@/model/generated";
import SelectField, {SelectOption} from "@/components/form/select-field";
import {
  documentTypeFromTypename,
  documentTypeOptions,
  ratingOptions,
  semesterOptions,
  solutionTypeOptions
} from "@/shared/enum-select-options";
import TextField from "@/components/form/text-field";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import CheckboxField from "@/components/form/checkbox-field";
import {useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";

interface Props {
  doc: AdminDocumentsQuery["documents"]["results"][0]
  lectures: EditDocumentMetaQuery["lectures"]
  examiners: EditDocumentMetaQuery["examiners"]
  refetchAndCloseModal: () => void
}

const updateDocumentMutation = gql(`
mutation updateDocument(
  $documentId: DocumentId!
  $data: DocumentUpdateInput!
) {
  updateDocumentData(
    documentId: $documentId
    data: $data
  ) {
    ... on Document {
      id
    }
    ... on WrittenExam {
      id
    }
    ... on OralExam {
      id
    }
    ... on InvalidIdError {
      msg
    }
    ... on GeneralError {
      msg
    }
    ... on Error {
      msg
    }
  }
}
`)

interface FormValues {
  type?: DocumentType
  date?: string
  semester: SelectOption
  publicComment?: string
  internalComment?: string
  public?: boolean
  downloadable?: boolean
  rating: Rating
  lectures: SelectOption[]
  examiners: SelectOption[]
  // only for type === DocumentType.WrittenExam || type === DocumentType.WrittenMock
  solutionType: SolutionType
}

const DocumentEditFormComponent = ({doc, lectures, examiners, refetchAndCloseModal}: Props) => {
  const [updateDocument] = useMutation(updateDocumentMutation)

  const onSubmit = async (values: FormValues) => {
    const data: DocumentUpdateInput = {
      type: values.type,
      date: values.date!,
      semester: values.semester.value,
      publicComment: {
        value: values.publicComment,
      },
      internalComment: {
        value: values.internalComment,
      },
      public: values.public || false,
      downloadable: values.downloadable || false,
      rating: values.rating,
      lectureIds: values.lectures.map(l => l.value),
      examinerIds: values.examiners.map(e => e.value),
    }
    if (data.type === DocumentType.WrittenExam || data.type === DocumentType.WrittenMock) {
      data.writtenExamData = {
        solutionType: values.solutionType,
      }
    }
    const response = await updateDocument({
      variables: {
        documentId: doc.id,
        data,
      }
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", "),
      }
    }

    if (response.data!.updateDocumentData.__typename === "GeneralError"
    || response.data!.updateDocumentData.__typename === "InvalidIdError"
    ) {
      return {
        [FORM_ERROR]: response.data!.updateDocumentData.msg
      }
    }

    if (response.data!.updateDocumentData!.__typename !== "WrittenExam" &&
      response.data!.updateDocumentData!.__typename !== "OralExam") {
      return {
        [FORM_ERROR]: `Got unknown document type in response: ${response.data!.updateDocumentData!.__typename}`
      }
    }

    // Everything is OK
    refetchAndCloseModal()
  }

  const initialValues = useMemo<Partial<FormValues>>(() => {
    return {
      type: documentTypeFromTypename(doc.__typename),
      date: doc.date,
      semester: {value: doc.semester, label: doc.semester},
      publicComment: doc.publicComment || undefined,
      internalComment: doc.internalComment || undefined,
      public: doc.public,
      downloadable: doc.downloadable,
      rating: doc.rating,
      lectures: doc.lectures.map(l => ({
        label: l.displayName,
        value: l.id,
      })),
      examiners: doc.examiners.map(e => ({
        label: e.displayName,
        value: e.id,
      })),
      solutionType: doc.__typename === "WrittenExam" ? doc.solution : SolutionType.None,
    }
  }, [doc])

  const lectureOptions = useMemo(() => {
    return lectures.map(l => ({
      label: l.displayName,
      value: l.id,
    }))
  }, [lectures])

  const examinerOptions = useMemo(() => {
    return examiners.map(e => ({
      label: e.displayName,
      value: e.id,
    }))
  }, [examiners])

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, submitError, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-body vstack gap-3">
            <SelectField name="type" label="Document type" options={documentTypeOptions}/>
            <TextField name="date" label="Date" type="date" />
            <SelectAutocompleteField name="semester" label="Semester" options={semesterOptions}/>
            <TextField name="publicComment" label="Public comment" />
            <TextField name="internalCommnt" label="Internal comment" />
            <CheckboxField name="public" label="Public" />
            <CheckboxField name="downloadbale" label="Downloadable" />
            <SelectField name="rating" label="Rating" options={ratingOptions}/>
            <SelectAutocompleteField name="lectures" label="Lectures" options={lectureOptions} isMulti/>
            <SelectAutocompleteField name="examiners" label="Examiners" options={examinerOptions} isMulti />
            {(values.type === DocumentType.WrittenExam || values.type === DocumentType.WrittenMock) && (
              <SelectField name="solutionType" label="Solution type" options={solutionTypeOptions} />
            )}

            {submitError && <div className="text-danger">{submitError}</div>}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              Submit
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default DocumentEditFormComponent
