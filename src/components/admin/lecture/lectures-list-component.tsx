import React from "react"
import {Faculty, Lecture} from "@/model/generated/graphql";
import AddLectureButton from "@/components/admin/lecture/add-lecture-button";
import EditLectureButton from "@/components/admin/lecture/edit-lecture-button";

interface Props {
  lectures: Lecture[]
  faculties: Faculty[]
  refresh: () => void;
}

const LecturesListComponent = ({lectures, faculties, refresh}: Props) => {
  return (
    <>
      <div>
        <AddLectureButton faculties={faculties} refresh={refresh} />
      </div>
      <ul className="list-group">
        {lectures.map(lecture => (
          <li className="list-group-item d-flex" key={lecture.id}>
            <div className="flex-grow-1">
              {lecture.displayName}
              {lecture.comment && (
                <small>
                  <b className="mx-1">&middot;</b>
                  <span>{lecture.comment}</span>
                </small>
              )}
            </div>
            <div>
              <EditLectureButton lecture={lecture} faculties={faculties} refresh={refresh} />
            </div>
          </li>
        ))}
        {!lectures.length && <li className="list-group-item disabled">
            There are no lectures.
        </li>}
      </ul>
    </>
  )
}

export default LecturesListComponent
