import React from "react"
import {AdminDocumentsQuery} from "@/model/generated/graphql";
import DocumentAttributeIcons from "@/components/document-selection/documents-list/document-attribute-icons";
import DocumentEditButton from "@/components/admin/documents/documents-list/document-edit-button";
import DocumentEditAttachmentButton
  from "@/components/admin/documents/documents-list/document-edit-attachment-button";

interface Props {
  documents: AdminDocumentsQuery["documents"],
  refetch: () => void;
}

const DocumentsListComponents = ({documents, refetch}: Props) => {
  return (
    <>
      <table className="table table-sm">
        <thead>
        <tr>
          <th/>
          <th>Lectures</th>
          <th>Examiners</th>
          <th>Semester</th>
          <th>Pages</th>
          <th>Published</th>
          <th>Comment</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {documents.results.map(doc => (
          <tr key={doc.id}>
            <td>
              <DocumentAttributeIcons document={doc} unvalidated={!doc.validated}/>
            </td>
            <td>
              {doc.lectures.map(lecture => lecture.displayName).join(", ")}
            </td>
            <td>{doc.examiners.map(e => e.displayName).join(", ")}</td>
            <td>{doc.semester}</td>
            <td className="text-end">{doc.numPages}</td>
            <td>
              {doc.publishedOn}
            </td>
            <td>
              {doc.publicComment}
            </td>
            <td>
              <div className="hstack gap-1 justify-content-end">
                <DocumentEditAttachmentButton doc={doc} refetch={refetch} />
                <DocumentEditButton doc={doc} refetch={refetch} />
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default DocumentsListComponents
