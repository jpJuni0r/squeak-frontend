import React, {useMemo} from "react"
import {Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {
  DocumentFilter,
  DocumentType,
  Faculty,
  Rating,
  RequestState,
  SolutionType,
  UploadState
} from "@/model/generated/graphql";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import {SelectOption} from "@/components/form/select-field";
import {
  documentTypeOptions,
  ratingOptions,
  requestStateOptions,
  semesterOptions,
  solutionTypeOptions,
  uploadStateOptions
} from "@/shared/enum-select-options";
import TextField from "@/components/form/text-field";
import CheckboxField from "@/components/form/checkbox-field";

interface Props {
  show: boolean;
  faculties: Faculty[],
  hideModal: (filter?: DocumentFilter) => void;
}

interface FilterSelectOption {
  label: string,
  value: string,
}

interface FormValues {
  type: FilterSelectOption,
  faculty: SelectOption,
  examBefore: string,
  examAfter: string,
  semesterBefore: SelectOption,
  semesterAfter: SelectOption,
  publishedBefore: string,
  publishedAfter: string,
  rating: SelectOption[],
  documentType: SelectOption[],
  public?: boolean,
  downloadable?: boolean
  writtenSolutionType: SelectOption[],
  uploadState: SelectOption[],
  requestState: SelectOption[],
}

export const keyToLabel = (key: keyof DocumentFilter): string => {
  switch (key) {
    case "documentType":
      return "Document type"
    case "downloadable":
      return "Downloadable"
    case "examAfter":
      return "Exam after";
    case "examBefore":
      return "Exam before";
    case "faculty":
      return "Faculty";
    case "public":
      return "Public";
    case "publishedAfter":
      return "Published after";
    case "publishedBefore":
      return "Published before";
    case "rating":
      return "Rating";
    case "requestState":
      return "Request State";
    case "semesterAfter":
      return "Semester after";
    case "semesterBefore":
      return "Semester before";
    case "uploadState":
      return "Upload state";
    case "writtenSolutionType":
      return "Written solution type";
    default:
      return key;
  }
}

const AdvancedFilterModal = ({show, faculties, hideModal}: Props) => {
  const onSubmit = (values: FormValues) => {
    const filter: DocumentFilter = {}

    switch (values.type.value) {
      case "faculty":
        filter.faculty = values.faculty.value
        break;
      case "examBefore":
        filter.examBefore = values.examBefore!
        break;
      case "examAfter":
        filter.examAfter = values.examAfter!
        break;
      case "semesterBefore":
        filter.semesterBefore = values.semesterBefore.value
        break;
      case "semesterAfter":
        filter.semesterAfter = values.semesterAfter.value
        break;
      case "publishedBefore":
        filter.publishedBefore = values.publishedBefore!
        break;
      case "publishedAfter":
        filter.publishedAfter = values.publishedAfter!
        break;
      case "rating":
        filter.rating = values.rating.map(o => o.value as Rating)
        break;
      case "documentType":
        filter.documentType = values.documentType.map(o => o.value as DocumentType)
        break;
      case "public":
        filter.public = values.public || false
        break;
      case "downloadable":
        filter.downloadable = values.downloadable
        break;
      case "writtenSolutionType":
        filter.writtenSolutionType = values.writtenSolutionType.map(o => o.value as SolutionType)
        break;
      case "uploadState":
        filter.uploadState = values.uploadState.map(o => o.value as UploadState)
        break;
      case "requestState":
        filter.requestState = values.requestState.map(o => o.value as RequestState)
        break;
    }

    hideModal(filter)
  }

  const typeOptions: FilterSelectOption[] = useMemo(() => {
    const keys: (keyof DocumentFilter)[] = [
      "faculty",
      "examBefore",
      "examAfter",
      "semesterBefore",
      "semesterAfter",
      "publishedBefore",
      "publishedAfter",
      "rating",
      "documentType",
      "public",
      "downloadable",
      "writtenSolutionType",
      "uploadState",
      "requestState",
    ]

    return keys.map(key => ({
      label: keyToLabel(key),
      value: key,
    }))
  }, [])
  console.log(faculties)

  const facultyOptions = useMemo(() =>
    (faculties || []).map(f => ({label: f.displayName, value: f.id})),
    [faculties])

  const initialValues: Partial<FormValues> = useMemo(() => ({
    faculty: facultyOptions[0],
    type: typeOptions[0],
    semesterBefore: semesterOptions[0],
    semesterAfter: semesterOptions[0],
    rating: [],
    documentType: [],
    writtenSolutionType: [],
    uploadState: [],
    requestState: [],
  }), [facultyOptions, typeOptions])

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({handleSubmit, values}) => (
        <Modal show={show} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Add advanced filter
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="vstack gap-3">
                <SelectAutocompleteField
                  name="type"
                  label="Type"
                  options={typeOptions}
                  isRequired
                />
                {values.type.value === "faculty" && (
                  <SelectAutocompleteField name="faculty" label="Faculty" options={facultyOptions} isRequired/>
                )}
                {values.type.value === "examBefore" && (
                  <TextField type="date" name="examBefore" label="Exam before" isRequired/>
                )}
                {values.type.value === "examAfter" && (
                  <TextField type="date" name="examAfter" label="Exam after" isRequired/>
                )}
                {values.type.value === "semesterBefore" && (
                  <SelectAutocompleteField name="semesterBefore" label="Semester before" options={semesterOptions}
                                           isRequired/>
                )}
                {values.type.value === "semesterAfter" && (
                  <SelectAutocompleteField name="semesterAfter" label="Semester after" options={semesterOptions}
                                           isRequired/>
                )}
                {values.type.value === "publishedBefore" && (
                  <TextField type="date" name="publishedBefore" label="Published before" isRequired/>
                )}
                {values.type.value === "publishedAfter" && (
                  <TextField type="date" name="publishedAfter" label="Published after" isRequired/>
                )}
                {values.type.value === "rating" && (
                  <SelectAutocompleteField name="rating" label="Rating" options={ratingOptions} isMulti isRequired/>
                )}
                {values.type.value === "documentType" && (
                  <SelectAutocompleteField name="documentType" label="Document type" options={documentTypeOptions}
                                           isMulti isRequired/>
                )}
                {values.type.value === "public" && (
                  <CheckboxField name="public" label="Public"/>
                )}
                {values.type.value === "downloadable" && (
                  <CheckboxField name="downloadable" label="Downloadable"/>
                )}
                {values.type.value === "writtenSolutionType" && (
                  <SelectAutocompleteField name="writtenSolutionType" label="Written solution type"
                                           options={solutionTypeOptions} isMulti isRequired/>
                )}
                {values.type.value === "uploadState" && (
                  <SelectAutocompleteField name="uploadState" label="Upload state" options={uploadStateOptions} isMulti
                                           isRequired/>
                )}
                {values.type.value === "requestState" && (
                  <SelectAutocompleteField name="requestState" label="Request state" options={requestStateOptions}
                                           isMulti isRequired/>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" className="btn btn-primary">Submit</button>
            </Modal.Footer>
          </form>
        </Modal>
      )}
    />
  )
}

export default AdvancedFilterModal
