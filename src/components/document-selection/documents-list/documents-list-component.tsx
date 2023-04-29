import React, {Dispatch, ReducerAction, useEffect} from "react";
import {DocumentsQuery} from "@/model/generated/graphql";
import DocumentAttributeIcons from "@/components/document-selection/documents-list/document-attribute-icons";
import CartButton from "@/components/document-selection/documents-list/cart-button";
import {DocumentSelectionState, documentsSelectionReducer} from "@/hooks/documents-selection";
import {doc} from "prettier";

interface Props {
  documents: DocumentsQuery["documents"],
  documentSelectionState: DocumentSelectionState<DocumentsQuery["documents"]["results"][0]>,
  documentSelectionDispatcher: Dispatch<ReducerAction<typeof documentsSelectionReducer>>
}

const DocumentsListComponent = ({documents, documentSelectionState: state, documentSelectionDispatcher}: Props) => {
  useEffect(() => {
    documentSelectionDispatcher({
      type: "set_documents_in_view",
      documents: documents.results,
    })
  }, [documents, documentSelectionDispatcher])

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
          <tr
            key={doc.id}
            onMouseEnter={() => documentSelectionDispatcher({type: "mouse_enter", row: index})}
            onMouseLeave={() => documentSelectionDispatcher({type: "mouse_leave", row: index})}
            onClick={() => documentSelectionDispatcher({ type: "click_row", row: index })}
            className={
              state.shiftDown && state.highlightedRows[0] <= index && state.highlightedRows[1] >= index
                ? "table-info"
                : ""}
          >
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
                documentSelectionState={state}
                documentSelectionDispatcher={documentSelectionDispatcher}
                row={index}
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
