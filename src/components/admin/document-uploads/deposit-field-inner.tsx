import React from "react";
import {DepositSelectionQuery} from "@/model/generated/graphql";
import {Field} from "react-final-form";
import PriceTagValue from "@/components/document-selection/cart/price-tag-value";
import Money from "@/shared/money";

interface Props {
  name: string
  deposits: DepositSelectionQuery["deposits"]
}

const DepositFieldInner = ({name, deposits}: Props) => {
  return (
    <ul className="list-group">
      {deposits.results.map(deposit => (
        <li className="list-group-item" key={deposit.id}>
          <Field
            name={name}
            type="radio"
            value={deposit.id}
            render={({ input }) => (
              <>
                <input {...input} id={deposit.id} className="me-1"/>
                <label htmlFor={deposit.id}>
                  {deposit.tag}
                  <b> &middot; </b>
                  <PriceTagValue amount={new Money(deposit.value)} />{" "}
                  <span className="text-muted">
                  {new Date(deposit.created).toLocaleDateString()}
                  </span>
                </label>
              </>
            )}
          />
        </li>
      ))}
      {!deposits.results.length && (
        <li className="list-group-item disabled">
          No results found
        </li>
      )}
    </ul>
  )
}

export default DepositFieldInner
