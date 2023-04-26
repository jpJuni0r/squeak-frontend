import React, {useMemo, useState} from "react"
import {gql} from "@/model/generated";
import {SelectOption} from "@/components/form/select-field";
import {Form} from "react-final-form";
import TextField from "@/components/form/text-field";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import {documentTypeOptions, semesterOptions} from "@/shared/enum-select-options";
import {StudentSubmissionMetaQuery} from "@/model/generated/graphql";
import FileField from "@/components/form/file-field";
import {ApolloError, useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";
import Link from "next/link";

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

interface FormValues {
  date?: string;
  semester?: SelectOption;
  type?: SelectOption;
  lectures: SelectOption[]
  examiners: SelectOption[]
  file?: unknown
  tag?: string;
}

interface Props {
  lectures: StudentSubmissionMetaQuery["lectures"]
  examiners: StudentSubmissionMetaQuery["examiners"]
}

const StudentSubmissionComponent = ({lectures, examiners}: Props) => {
  const [createUploadForTag] = useMutation(createUploadForTagMutation, {errorPolicy: "none"})
  const [rewardAvailable, setRewardAvailable] = useState<null | string>(null)

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await createUploadForTag({
        variables: {
          data: {
            date: values.date!,
            type: values.type!.value as any,
            semester: values.semester!.value,
            examinerIds: values.examiners.map(e => e.value),
            lectureIds: values.lectures.map(l => l.value),
          },
          // TODO: GraphQL schema is inconsistent with server
          tag: values.tag!,
          // TODO: Server has impartial file upload support:
          // 1. Missing library python-multipart: "AssertionError: The `python-multipart` library must be installed to
          //    use form parsing"
          // 2. mutation_impl/common.py insert_document_with_file(); the file parameter is a list of type
          //    starlette.datastructures.UploadFile instead of Upload
          // 3. Default config should set files::file-path to /tmp/, for example.
          file: values.file,
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
        render={({handleSubmit, submitting, submitError, submitSucceeded}) => (
          <form onSubmit={handleSubmit} className="vstack gap-3">
            {!submitSucceeded ? (
              <>
                <TextField type="date" name="date" label="Exam date" isRequired/>
                <SelectAutocompleteField name="semester" label="Semester" options={semesterOptions} isRequired/>
                <SelectAutocompleteField name="type" label="Exam type" options={documentTypeOptions} isRequired/>
                <SelectAutocompleteField name="lectures" label="Lectures" options={lectureOptions} isMulti isRequired/>
                <SelectAutocompleteField
                  name="examiners"
                  label="Examiners"
                  options={examinerOptions}
                  isMulti
                  isRequired
                />
                <FileField name="file" label="Protocol file"/>
                <TextField name="tag" label="Tag" isRequired/>
                {submitError &&
                    <div className="text-danger">{submitError}</div>
                }
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
