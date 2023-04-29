import React, {useMemo, useState} from "react"
import {Form} from "react-final-form";
import {FORM_ERROR} from "final-form";
import {ApolloError, useMutation} from "@apollo/client";
import Link from "next/link";
import TextField from "@/components/form/text-field";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import {documentTypeOptions, semesterOptions} from "@/shared/enum-select-options";
import {StudentSubmissionMetaQuery} from "@/model/generated/graphql";
import FileField from "@/components/form/file-field";
import SelectCreatableField from "@/components/form/select-creatable-field";
import {gql} from "@/model/generated";
import {SelectOption} from "@/components/form/select-field";

const createUploadForTagMutation = gql(`
mutation createUploadForTag(
  $tag: String
  $data: RestrictedDocumentInput!
  $file: Upload!
) {
  createUploadForTag(
    tag: $tag
    data: $data
    file: $file
  ) {
    ... on DocumentUpload {
      id
      rewardAvailable
      tag
    }
    ... on InvalidIdError {
      msg
    }
    ... on FileTooLargeError {
      msg
    }
    ... on StringTooLargeError {
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

const createUnvalidatedLectureMutation = gql(`
mutation createUnvalidatedLecture(
  $name: String!
  $facultyId: FacultyId!
) {
  createUnvalidatedLecture(
    name: $name
    facultyId: $facultyId
  ) {
    ... on Lecture {
      id
    }
    ... on InvalidIdError {
      msg
    }
    ... on GeneralError {
      msg
    }
    ... on StringTooLargeError {
      msg
    }
    ... on Error {
      msg
    }
  }
}
`)

const createUnvalidatedExaminerMutation = gql(`
mutation createUnvalidatedExaminer(
  $name: String!
  $prename: String
  $institute: String
) {
  createUnvalidatedExaminer(
    name: $name
    prename: $prename
    institute: $institute
  ) {
    ... on Examiner {
      id
    }
    ... on StringTooLargeError {
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
  date?: string;
  semester?: SelectOption;
  type?: SelectOption;
  lectures: SelectOption[]
  // This value is set if the user chooses to create one (or more)
  // lectures. Each lecture will be created under this faculty.
  newLectureFaculty?: SelectOption;
  examiners: SelectOption[]
  file?: FileList
  tag?: string;
}

interface Props {
  lectures: StudentSubmissionMetaQuery["lectures"]
  examiners: StudentSubmissionMetaQuery["examiners"]
  faculties: StudentSubmissionMetaQuery["faculties"]
}

const StudentSubmissionComponent = ({lectures, examiners, faculties}: Props) => {
  const [createUploadForTag] = useMutation(createUploadForTagMutation, {errorPolicy: "none"})
  const [createUnvalidatedLecture] = useMutation(createUnvalidatedLectureMutation, {errorPolicy: "none"})
  const [createUnvalidatedExaminer] = useMutation(createUnvalidatedExaminerMutation, {errorPolicy: "none"})
  const [rewardAvailable, setRewardAvailable] = useState<null | string>(null)

  const onSubmit = async (values: FormValues) => {
    try {
      const createdLectureIds: string[] = []
      const createdExaminerIds: string[] = []
      for (const lectureOption of values.lectures) {
        if (lectureOption.__isNew__) {
          const response = await createUnvalidatedLecture({
            variables: {
              name: lectureOption.value,
              facultyId: values.newLectureFaculty!.value,
            }
          })
          if (response.errors) {
            return {
              [FORM_ERROR]: response.errors.map(e => e.message).join(", "),
            }
          } else if (
            response.data!.createUnvalidatedLecture.__typename === "StringTooLargeError"
            || response.data!.createUnvalidatedLecture.__typename === "InvalidIdError"
            || response.data!.createUnvalidatedLecture.__typename === "GeneralError"
          ) {
            return {
              [FORM_ERROR]: response.data!.createUnvalidatedLecture.msg,
            }
          } else if (response.data!.createUnvalidatedLecture.__typename !== "Lecture") {
            return {
              [FORM_ERROR]: "Received an unknown error type",
            }
          }

          createdLectureIds.push(response.data!.createUnvalidatedLecture.id)
        }
      }

      for (const examinerOption of values.examiners) {
        if (examinerOption.__isNew__) {
          const parts = examinerOption.value.split(" ")
          const prename = parts
            .filter((_, index) => index < parts.length - 1)
            .join(" ") || null
          const name = parts[parts.length - 1]

          const response = await createUnvalidatedExaminer({
            variables: {
              name,
              prename,
              institute: null,
            }
          })

          if (response.errors) {
            return {
              [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
            }
          } else if (
            response.data!.createUnvalidatedExaminer.__typename === "StringTooLargeError"
            || response.data!.createUnvalidatedExaminer.__typename === "GeneralError"
          ) {
            return {
              [FORM_ERROR]: response.data!.createUnvalidatedExaminer.msg
            }
          } else if (response.data!.createUnvalidatedExaminer.__typename !== "Examiner") {
            return {
              [FORM_ERROR]: "Received an unknown error type"
            }
          }
          createdExaminerIds.push(response.data!.createUnvalidatedExaminer.id)
        }
      }

      let newLectureIdsConsumed = 0
      let newExaminerIdsConsumed = 0

      const response = await createUploadForTag({
        variables: {
          data: {
            date: values.date!,
            type: values.type!.value as any,
            semester: values.semester!.value,
            lectureIds: values.lectures.map(lecture => {
              if (!lecture.__isNew__) {
                return lecture.value
              } else {
                return createdLectureIds[newLectureIdsConsumed++]
              }
            }),
            examinerIds: values.examiners
              .map(examiner => {
                if (!examiner.__isNew__) {
                  return examiner.value
                } else {
                  return createdExaminerIds[newExaminerIdsConsumed++]
                }
              }),
          },
          // TODO: GraphQL schema is inconsistent with server
          tag: values.tag!,
          // TODO: Server has impartial file upload support:
          // 1. Missing library python-multipart: "AssertionError: The `python-multipart` library must be installed to
          //    use form parsing"
          // 2. mutation_impl/common.py insert_document_with_file(); the file parameter is a list of type
          //    starlette.datastructures.UploadFile instead of Upload
          // 3. Default config should set files::file-path to /tmp/, for example.
          file: values.file![0],
        }
      })

      if (response.errors) {
        return {
          [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
        }
      }
      if (response.data!.createUploadForTag.__typename === "StringTooLargeError"
        || response.data!.createUploadForTag.__typename === "GeneralError"
        || response.data!.createUploadForTag.__typename === "FileTooLargeError"
        || response.data!.createUploadForTag.__typename === "InvalidIdError"
      ) {
        return {
          [FORM_ERROR]: response.data!.createUploadForTag.msg
        }
      }

      if (response.data!.createUploadForTag.__typename !== "DocumentUpload") {
        return {
          [FORM_ERROR]: `An unknown error occurred: ${response.data!.createUploadForTag.__typename}`
        }
      }

      if (response.data!.createUploadForTag.rewardAvailable && response.data!.createUploadForTag.tag) {
        setRewardAvailable(response.data!.createUploadForTag.tag)
      }

      // everything is OK
      return null
    } catch (e) {
      if (e instanceof ApolloError) {
        // Also catch promise rejections for createUploadForTag create file uploads
        // are somewhat unstable
        return {
          [FORM_ERROR]: e.message
        }
      } else {
        return {
          [FORM_ERROR]: String(e)
        }
      }
    }
  }

  const lectureOptions: SelectOption[] = useMemo(() =>
      lectures.map(l => ({label: l.displayName, value: l.id})),
    [lectures]
  )

  const facultyOptions: SelectOption[] = useMemo(() =>
      faculties.map(f => ({label: f.displayName, value: f.id})),
    [faculties]
  )

  const examinerOptions: SelectOption[] = useMemo(() =>
      examiners.map(e => ({label: e.displayName, value: e.id})),
    [examiners]
  )

  const initialValues = useMemo<Partial<FormValues>>(() => ({
    lectures: [],
    examiners: [],
    type: documentTypeOptions[0],
  }), [])

  return (
    <div className="container">
      <Form<FormValues>
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({handleSubmit, submitting, submitError, submitSucceeded, values}) => (
          <form onSubmit={handleSubmit} className="vstack gap-3">
            {!submitSucceeded ? (
              <>
                <TextField type="date" name="date" label="Exam date" isRequired/>
                <SelectAutocompleteField name="semester" label="Semester" options={semesterOptions} isRequired/>
                <SelectAutocompleteField name="type" label="Exam type" options={documentTypeOptions} isRequired/>
                <SelectCreatableField
                  name="lectures"
                  label="Lectures"
                  options={lectureOptions}
                  isRequired
                />
                {values.lectures.some(l => l.__isNew__) && (
                  <SelectAutocompleteField
                    name="newLectureFaculty"
                    label="Faculty of the new lecture"
                    options={facultyOptions}
                    isRequired
                  />
                )}
                <SelectCreatableField
                  name="examiners"
                  label="Examiners"
                  options={examinerOptions}
                  isRequired
                />
                <FileField name="file" label="Protocol file"/>
                <TextField name="tag" label="Tag" isRequired/>
                {submitError &&
                    <div className="text-danger">{submitError}</div>
                }
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  Submit
                </button>
              </>
            ) : (
              <div>
                <h1>Submission successful</h1>
                <p>
                  Thank you for your submission!
                  {rewardAvailable && (
                    <span>
                    You are additionally eligible for a reward at the Fachschafts
                    office by naming your tag <b>{rewardAvailable}</b>
                  </span>
                  )}
                </p>
                <p>
                  You can go back to the <Link href="/">document selection</Link>.
                </p>
              </div>
            )}
          </form>
        )
        }
      />
    </div>
  )
}

export default StudentSubmissionComponent
