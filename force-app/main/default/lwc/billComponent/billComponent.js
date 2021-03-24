import { api, LightningElement, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import {updateRecord} from "lightning/uiRecordApi";

import ID_FIELD from "@salesforce/schema/Bills__c.Id";
import PAY_TO from "@salesforce/schema/Bills__c.Pay_To__c";
import FINAL_PAYABLE_AMOUNT from "@salesforce/schema/Bills__c.Final_Payable_Amount__c"
import AVAILABLE_BALANCE from "@salesforce/schema/Wallet__c.Balance__c";

const fields = [PAY_TO, FINAL_PAYABLE_AMOUNT, AVAILABLE_BALANCE];

export default class BillComponent extends LightningElement {

    @api
    recordId;

    payToRecordId;
    finalPayableAmount;
    availableBalance;

    @wire(getRecord, {recordId: "$recordId", fields: fields})
    getval({error, data}){
        if(data) {
            // this.payToRecordId = data.fields.Pay_To__c;
            this.finalPayableAmount = data.fields.Final_Payable_Amount__c.value;
            this.availableBalance = data.fields.Available_wallet_balance__c.value;
            console.log(this.payToRecordId);
            console.log(this.finalPayableAmount);
            console.log(this.availableBalance);
        } else if(error) {
            console.log(error);
        }
    }

    handleClick() {
        
        const fields = {};
        console.log(ID_FIELD);
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[AVAILABLE_BALANCE.fieldApiName] = +this.availableBalance - +this.finalPayableAmount;

        const recordInput = {
            fields: fields
        };

        updateRecord(recordInput).then((record) => console.log(record));
        
    }
}