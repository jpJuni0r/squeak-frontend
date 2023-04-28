import React from "react";
import {DocumentsQuery} from "@/model/generated/graphql";
import DocumentAttributeIcons from "@/components/document-selection/documents-list/document-attribute-icons";
import CartButton from "@/components/document-selection/documents-list/cart-button";

interface Props {
  documents: DocumentsQuery["documents"],
  selectedDocuments: DocumentsQuery["documents"]["results"],
  setSelectedDocuments: (documents: DocumentsQuery["documents"]["results"]) => void,
}

const DocumentsListComponent = ({documents, selectedDocuments, setSelectedDocuments}: Props) => {
  return (
    <>
      <table className="table table-sm documents-table">
        <thead>
        <tr>
          <th className="text-end">#</th>
          <th/>
          <th>Lectures</th>
          <th>Examiners</th>
          <th>Semester</th>
          <th className="text-end">Pages</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {documents.results.map((doc, index) => (
          <tr key={doc.id}>
            <td className="text-end">{index + 1}</td>
            <td>
              <DocumentAttributeIcons document={doc}/>
            </td>
            <td>
              {doc.lectures.map(lecture => lecture.displayName).join(", ")}
            </td>
            <td>{doc.examiners.map(e => e.displayName).join(", ")}</td>
            <td>{doc.semester}</td>
            <td className="text-end">{doc.numPages}</td>
            <td>
              <CartButton
                doc={doc}
                selectedDocuments={selectedDocuments}
                setSelectedDocuments={setSelectedDocuments}
              />
            </td>
          </tr>
        ))}
        {!documents.results.length && (
          <tr>
            <td colSpan={7} className="text-muted text-center">
              No documents found.
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </>
  )
}

export default DocumentsListComponent
