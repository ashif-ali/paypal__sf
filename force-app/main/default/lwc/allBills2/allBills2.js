import { LightningElement, api, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getBills from "@salesforce/apex/BillsController.getBills";
import { updateRecord } from "lightning/uiRecordApi";
import PAID from "@salesforce/schema/Bills__c.Paid__c";
import SUCCESSFULL from "@salesforce/schema/Bills__c.Successfull__c";
import FINAL_WALLET_BALANCE from "@salesforce/schema/Bills__c.Final_Wallet_Balance__c";
import ID_FIELD from "@salesforce/schema/Bills__c.Id";

const columns = [
  { label: "Name", fieldName: "Name" },
  {
    label: "Payable Amount",
    fieldName: "Final_Payable_Amount__c",
    type: "currency",
    cellAttributes: { alignment: "left" }
  },
  {
    label: "Pay To",
    fieldName: "Pay_To_Name__c",
    type: "text"
  },
  {
    label: "Available Balance",
    fieldName: "Available_wallet_balance__c",
    type: "currency",
    cellAttributes: { alignment: "left" }
  },
  {
    label: "Paid",
    fieldName: "Paid__c",
    type: "checkbox",
    cellAttributes: { alignment: "left" }
  },
  {
    type: "button",
    typeAttributes: {
      label: "Pay",
      name: "pay",
      title: "Pay",
      disabled: false,
      iconPosition: "left"
    }
  }
];

export default class AllBills2 extends LightningElement {
  @api
  recordId;

  @track
  billId;

  @track
  finalPayableAmount;

  @track
  walletBalance;

  @track
  paid;

  @track
  finalWalletBalance;

  @track
  datas;
  columns = columns;

  renderedCallback() {
    getBills({
      id: this.recordId
    })
      .then((bills) => {
        this.datas = bills;
        // console.log(bills);
        console.log(this.recordId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  callRowAction() {
    let el = this.template.querySelector("lightning-datatable");
    let selected = el.getSelectedRows();
    this.finalPayableAmount = selected[0].Final_Payable_Amount__c;
    this.walletBalance = selected[0].Available_wallet_balance__c;
    this.paid = selected[0].Paid__c;
    this.finalWalletBalance = selected[0].Final_Wallet_Balance__c;
    console.log(this.finalWalletBalance);

    console.log(selected);

    if (this.paid === true) {
      const evt = new ShowToastEvent({
        title: "Already Paid",
        message: "You have already paid this bill",
        variant: "info"
      });
      this.dispatchEvent(evt);
    }

    if (this.finalPayableAmount > this.walletBalance) {
      const evt = new ShowToastEvent({
        title: "error",
        message: "You dont have enough wallet balance",
        variant: "error"
      });
      this.dispatchEvent(evt);
    }

    if (this.paid === false && this.finalPayableAmount < this.walletBalance) {
      this.paid = true;
      const fields = {};
      fields[ID_FIELD.fieldApiName] = selected[0].Id;
      fields[PAID.fieldApiName] = this.paid;
      fields[SUCCESSFULL.fieldApiName] = true;
      fields[FINAL_WALLET_BALANCE.fieldApiName] =
        this.walletBalance - this.finalPayableAmount;
      console.log(this.paid);
      console.log(selected[0]);

      const recordInput = { fields };
      updateRecord(recordInput).then((record) => console.log(record));
    }
  }
}
