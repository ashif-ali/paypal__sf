import { LightningElement, api, track } from "lwc";
import getBills from "@salesforce/apex/BillsController.getBills";

const columns = [
  { label: "Name", fieldName: "Name" },
  {
    label: "Payable Amount",
    fieldName: "Final_Payable_Amount__c",
    type: "currency"
  },
  {
    label: "Pay To",
    fieldName: "Pay_To__c"
  },
  {
    label: "Available Balance",
    fieldName: "Available_wallet_balance__c"
  }
];

export default class AllBills2 extends LightningElement {
  @api
  recordId;

  @track
  billId;

  datas;
  columns = columns;

  renderedCallback() {
    getBills({
      id: this.recordId
    })
      .then((bills) => {
        // console.log(bills);
        // this.billId = bills[0].Pay_to__r

        this.datas = bills;
        console.log(bills);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
