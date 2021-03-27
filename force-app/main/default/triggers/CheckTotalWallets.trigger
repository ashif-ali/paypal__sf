trigger CheckTotalWallets on Wallet__c(before insert) {
  for (Wallet__c w : Trigger.new) {
    Integer count = [SELECT COUNT() FROM Wallet__c];
    System.debug(count);
  }
}
