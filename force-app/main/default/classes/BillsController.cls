public with sharing class BillsController {
    public BillsController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Bills__c> getBills(Id recordId){
        try {
            return [
            SELECT Name, Final_Payable_Amount__c, Pay_to__r.Name, Paid__c from Bills__c
            WHERE For_user__c = :recordId
            WITH SECURITY_ENFORCED
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}