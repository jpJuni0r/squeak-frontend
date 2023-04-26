import {SelectOption} from "@/components/form/select-field";
import {DocumentType, Rating, RequestState, UploadState} from "@/model/generated/graphql";

export const documentTypeOptions: SelectOption[] = [
  {
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
  }
]

export const ratingOptions: SelectOption[] = [
  {
    label: "Excellent",
    value: Rating.Excellent,
  }, {
    label: "Needs Improvement",
    value: Rating.NeedsImprovement,
  }, {
    label: "Neutral",
    value: Rating.Neutral,
  }
]

export const requestStateOptions: SelectOption[] = [
  {
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
  }
]

export const uploadStateOptions: SelectOption[] = [
  {
    label: "Approved",
    value: UploadState.Approved,
  }, {
    label: "Pending",
    value: UploadState.Pending,
  }, {
    label: "Rejected",
    value: UploadState.Rejected
  }
]


const minYear = 2015
const currentYear = new Date().getUTCFullYear()
const listOfYears = new Array(currentYear - minYear + 1).fill(null)
  .map((_, index) => minYear + index)

export const semesterOptions: SelectOption[] = listOfYears
  .map(year => [{
    label: `WS ${year}`,
    value: `WS ${year}`,
  }, {
    label: `SS ${year}`,
    value: `SS ${year}`,
  }])
  .flat()
  .reverse()
