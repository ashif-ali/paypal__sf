public class PayToController {
  @InvocableMethod
  public static void getWalletDetails() {
    Bills__c billDetails = [
      SELECT Pay_To__c, Final_Payable_Amount__c, Successfull__c
      FROM Bills__C
      WHERE Paid__c = TRUE AND Successfull__c = FALSE
    ];
    System.debug(billDetails);
    Id payToId = billDetails.Pay_To__c;
    Decimal finalPayableAmount = billDetails.Final_Payable_Amount__c;
    System.debug(finalPayableAmount);

    Wallet__c getWalletDetails = [
      SELECT Balance__c
      FROM Wallet__c
      WHERE User__c = :payToId
    ];
    //System.debug(getWalletDetails.Balance__c);
    Decimal balance = getWalletDetails.Balance__c;
    System.debug(balance);
    getWalletDetails.Balance__c = balance + finalPayableAmount;
    update getWalletDetails;
    billDetails.Successfull__c = true;
    update billDetails;
  }
}
