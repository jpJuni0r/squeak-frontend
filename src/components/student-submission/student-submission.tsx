import React from "react";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import StudentSubmissionComponent from "@/components/student-submission/student-submission-component";

const studentSubmissionMetaQuery = gql(`
query studentSubmissionMeta {
  lectures {
    id
    displayName
  }
  examiners {
    id
    displayName
  }
  faculties {
    id
    displayName
  }
}
`)

const StudentSubmission = () => {
  const { data, loading, error} = useQuery(studentSubmissionMetaQuery)


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-2">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-danger">{error.message}</div>
          ) : (
            <StudentSubmissionComponent
              examiners={data!.examiners}
              lectures={data!.lectures}
              faculties={data!.faculties}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentSubmission
