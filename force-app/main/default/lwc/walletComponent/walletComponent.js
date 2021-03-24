import { api, LightningElement, track, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import {updateRecord} from "lightning/uiRecordApi";

import ID_FIELD from "@salesforce/schema/Wallet__c.Id";
import WALLET_BALANCE from "@salesforce/schema/Wallet__c.Balance__c";

const fields = [WALLET_BALANCE];



export default class WalletComponent extends LightningElement {

    @api
    recordId;

    

    currentBalance;
    updatedBalance;
    value="";

    @wire(getRecord, {recordId: "$recordId", fields: fields})
    walletRecord({error, data}) {
        if(data) {
            this.currentBalance = data.fields.Balance__c.value;
            
        } else if(error){
            console.log(error);
        }
    }

    handleChange(event) {
        if(event.target.name === "amount") {
            this.updatedBalance = event.target.value;
        }
        
    }

    handleClick() {
        this.value = "";
        const fields = {};
        console.log(ID_FIELD);
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[WALLET_BALANCE.fieldApiName] = +this.updatedBalance + +this.currentBalance;

        const recordInput = {
            fields: fields
        };

        updateRecord(recordInput).then((record) => console.log(record));
        
    }

}