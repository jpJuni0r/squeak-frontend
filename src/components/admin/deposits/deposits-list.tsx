import React from "react";
import {DepositsQuery} from "@/model/generated/graphql";
import PriceTagValue from "@/components/document-selection/cart/price-tag-value";
import Money from "@/shared/money";
import EditDepositButton from "@/components/admin/deposits/edit-deposit-button";

interface Props {
  deposits: DepositsQuery["deposits"]["results"]
  lectures: DepositsQuery["lectures"],
}

const DepositsList = ({deposits, lectures}: Props) => {
  return (
    <ul className="list-group">
      {deposits.map(deposit => (
        <li className="list-group-item d-inline-flex" key={deposit.id}>
          <span className="flex-grow-1">
            {deposit.tag}
              <b> &middot; </b>
            <PriceTagValue amount={new Money(deposit.value)}/>
            <span className="text-muted ms-1">
              {deposit.lectures.map(l => l.displayName).join(", ")}{" "}
              {`(${new Date(deposit.created).toLocaleDateString()})`}
            </span>
            {deposit.comment && (
              <em className="text-muted ms-1">{deposit.comment}</em>
            )}
          </span>
          <span>
            <EditDepositButton deposit={deposit} lectures={lectures}/>
          </span>
        </li>
      ))}
      {deposits.length === 0 && (
        <li className="list-group-item disabled">
          No deposits found
        </li>
      )}
    </ul>
  )
}

export default DepositsList
