import React, {useMemo} from "react"
import {Modal} from "react-bootstrap";
import {Field, Form, FormSpy} from "react-final-form";
import {SelectOption} from "@/components/form/select-field";
import {DocumentFilter, Rating, DocumentType, RequestState, UploadState} from "@/model/generated/graphql";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import AdvancedFilterValue from "@/components/document-selection/document-filter/advanced-filter-value";

interface Props {
  show: boolean;
  hideModal: (filter?: DocumentFilter) => void;
}


type IgnoredKeys = "id" | "lectureIds" | "examinerIds"
type Keys = Exclude<keyof DocumentFilter, IgnoredKeys>
export type FieldSemantics =
  | { kind: "plain", pattern?: string }
  | { kind: "boolean" }
  | { kind: "date" }
  | { kind: "enum", options: SelectOption[] }
  | { kind: "semester" }

interface FilterSelectOption {
  label: string,
  value: string,
  semantics: FieldSemantics,
}

interface FormValues {
  type: FilterSelectOption,
  value?: any,
}

const semantics: { kind: Keys, semantics: FieldSemantics }[] = [
  {
    kind: "documentType",
    semantics: {
      kind: "enum",
      options: [{
        label: "Oral Exam",
        value: DocumentType.OralExam,
      }, {
        label: "Oral Re-Exam",
        value: DocumentType.OralReexam,
      }, {
        label: "Written Exam",
        value: DocumentType.WrittenExam,
      }, {
        label: "Written Mock",
        value: DocumentType.WrittenMock,
      }],
    },
  },
  {
    kind: "downloadable",
    semantics: {
      kind: "boolean",
    },
  },
  {
    kind: "examAfter",
    semantics: {
      kind: "date",
    },
  },
  {
    kind: "examBefore",
    semantics: {
      kind: "date",
    },
  },
  {
    kind: "faculty",
    semantics: {
      kind: "plain",
    },
  },
  {
    kind: "public",
    semantics: {
      kind: "boolean",
    },
  },
  {
    kind: "publishedAfter",
    semantics: {
      kind: "date",
    },
  },
  {
    kind: "publishedBefore",
    semantics: {
      kind: "date",
    },
  },
  {
    kind: "rating",
    semantics: {
      kind: "enum",
      options: [{
        label: "Excellent",
        value: Rating.Excellent,
      }, {
        label: "Needs Improvement",
        value: Rating.NeedsImprovement,
      }, {
        label: "Neutral",
        value: Rating.Neutral,
      }],
    },
  },
  {
    kind: "requestState",
    semantics: {
      kind: "enum",
      options: [{
        label: "Done",
        value: RequestState.Done,
      }, {
        label: "New",
        value: RequestState.New,
      }, {
        label: "Rejected",
        value: RequestState.Rejected,
      }, {
        label: "Requested",
        value: RequestState.Requested,
      }, {
        label: "Todo",
        value: RequestState.Todo,
      }],
    },
  },
  {
    kind: "semesterAfter",
    semantics: {
      kind: "semester"
    },
  },
  {
    kind: "semesterBefore",
    semantics: {
      kind: "semester"
    },
  },
  {
    kind: "uploadState",
    semantics: {
      kind: "enum",
      options: [{
        label: "Approved",
        value: UploadState.Approved,
      }, {
        label: "Pending",
        value: UploadState.Pending,
      }, {
        label: "Rejected",
        value: UploadState.Rejected
      }],
    },
  },
]

export const keyToLabel = (key: Keys): string => {
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

const AdvancedFilterModal = ({show, hideModal}: Props) => {
  const onSubmit = (values: FormValues) => {
    if (!values.value) {
      return
    }

    const filter: DocumentFilter = {}

    switch (values.type.value) {
      case "down":
    }

    let value: any;

    switch (values.type.semantics.kind) {
      case "plain":
      case "date":
        value = values.value
        break;
      case "enum":
      case "semester":
        value = values.value.value
        break
      case "boolean":
        value = values.value === "yes"
        break
      default:
        // @ts-ignore
        throw new Error(`Unknown field semantic kind: ${values.type.semantics.kind}`)
    }

    filter[values.type.value as keyof DocumentFilter] = value

    hideModal(filter)
  }

  const options: FilterSelectOption[] = useMemo(() => {
    return semantics.map(item => ({
      label: keyToLabel(item.kind),
      value: item.kind,
      semantics: item.semantics,
    }))
  }, [])

  const initialValues: FormValues = {
    type: options[0],
  }

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({handleSubmit, values }) => (
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
                  label="Variant"
                  options={options}
                />
                <AdvancedFilterValue name="value" semantics={values.type.semantics}/>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" className="btn btn-primary">Add</button>
            </Modal.Footer>
          </form>
        </Modal>
      )}
    />
  )
}

export default AdvancedFilterModal
