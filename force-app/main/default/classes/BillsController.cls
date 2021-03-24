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
          Paid__c
        FROM Bills__c
        WHERE For_user__c = :id
        WITH SECURITY_ENFORCED
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
