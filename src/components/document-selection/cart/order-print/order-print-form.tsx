import React, {useContext, useMemo} from "react"
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {DocumentsQuery} from "@/model/generated/graphql";
import {Form} from "react-final-form";
import SelectField from "@/components/form/select-field";
import TextField from "@/components/form/text-field";
import {SiteConfigurationContext} from "@/context/site-configuration";
import SelectAccountingPositionField
  from "@/components/document-selection/cart/order-print/select-accounting-position-field";
import MoneyField from "@/components/form/money-field";
import Money from "@/shared/money";
import PriceTag from "@/components/document-selection/cart/price-tag";
import {FORM_ERROR} from "final-form";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
  closeModal: () => void
}

const printDocumentsMutation = gql(`
mutation printDocuments(
  $documentList: [DocumentId!]!
  $deposits: [[LectureId!]!]!,
  $tag: String!
  $totalPrice: Money!
  $printerId: PrinterId!
  $accountingPositionId: AccountingPositionId!
  $donation: Money!
  $printFrontPage: Boolean!
) {
  printDocuments(
    documentList: $documentList
    deposits: $deposits
    tag: $tag
    totalPrice: $totalPrice
    printerId: $printerId
    accountingPositionId: $accountingPositionId
    donation: $donation
    printFrontpage: $printFrontPage
  ) {
    ... on TransactionList {
      transactions {
        id
        value
        transactionType
        associatedTag
      }
    }
    ... on InvalidIdError {
      msg
    }
    ... on StringTooLargeError {
      msg
    }
    ... on PriceError {
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
  tag?: string
  printer?: string
  "accountingPositions": {
    [printerId: string]: string | undefined
  }
  donation?: string
  printFontPage?: boolean
  price?: string;
}

const OrderPrintButton = ({docs}: Props) => {
  const context = useContext(SiteConfigurationContext)
  const [print] = useMutation(printDocumentsMutation, {errorPolicy: "none"})

  const onSubmit = async (values: FormValues) => {
    const donation = Money.fromMajorUnit(parseFloat(values.donation?.replace(",", ".") || "0"))
    const response = await print({
      variables: {
        tag: values.tag!,
        printerId: values.printer!,
        accountingPositionId: values.accountingPositions[values.printer!]!,
        donation: donation.amount,
        deposits: docs.map(d => d.lectures.map(l => l.id)),
        documentList: docs.map(d => d.id),
        printFrontPage: values.printFontPage || false,
        totalPrice: 0,
      },
    });

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message)
      }
    } else if (response.data!.printDocuments.__typename === "InvalidIdError"
      || response.data!.printDocuments.__typename === "StringTooLargeError"
      || response.data!.printDocuments.__typename === "GeneralError"
      || response.data!.printDocuments.__typename === "PriceError"
    ) {
      return {
        [FORM_ERROR]: response.data!.printDocuments.msg
      }
    }

    if (response.data!.printDocuments.__typename !== "TransactionList") {
      return {
        [FORM_ERROR]: `An occurred: ${response.data!.printDocuments.__typename}`
      }
    }

    // TODO: Store transaction data
    console.log(response.data!.printDocuments.transactions)
  }

  const printerOptions = useMemo(() => {
    return context.printers.map(p => ({
      label: p.name,
      value: p.id,
    }))
  }, [context.printers])

  const initialValues = useMemo<Partial<FormValues>>(() => {
    const firstPrinter = context.printers[0];
    const values: Partial<FormValues> = {
      printFontPage: true,
    }

    if (firstPrinter) {
      values.printer = firstPrinter.id
    }

    const accountingPositions: FormValues["accountingPositions"] = {}

    for (const printer of context.printers) {
      const pos = printer.accountingPositions[0]
      accountingPositions[printer.id] = pos?.id
    }

    values.accountingPositions = accountingPositions

    return values
  }, [context.printers])

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, submitError, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-body vstack gap-3">
            <TextField name="tag" label="Tag" isRequired/>
            <SelectField name="printer" label="Printer" options={printerOptions} />
            <SelectAccountingPositionField
              name={`accountingPositions.${values.printer}`}
              label="Payment method"
              selectedPrinterId={values.printer}
            />
            <MoneyField name="donation" label="Donation" minorDigits={context.currency.minorDigits}/>
            {submitError && <div className="text-danger">{submitError}</div>}
            <div>
              The final amount due is{" "}
              <b>
                <PriceTag
                  docs={docs}
                  numOralExamDeposits={0}
                  resultFormFieldName="price"
                  donation={parseFloat(values.donation?.replace(",", ".") || "0")}
                />
              </b>.
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              Print
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default OrderPrintButton