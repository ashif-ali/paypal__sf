public with sharing class BillsController {
  public BillsController() {
  }

  @AuraEnabled(cacheable=true)
  public static List<Bills__c> getBills(Id id) {
    try {
      return [
        SELECT
          Name,
          Final_Payable_Amount__c,
          Available_wallet_balance__c,
          Pay_to__r.Name,
          Paid__c,
          Pay_To_Name__c,
          Final_Wallet_Balance__c
        FROM Bills__c
        WHERE For_user__c = :id
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static void updateBillRecords(Id id) {
    try {
      Bills__c b = [SELECT Paid__c FROM Bills__c WHERE For_user__c = :id];
      b.Paid__c = true;
      update b;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
