/**
 * Representation of a Contact record returned from 
 * searching an external data source.
 */
public class HerokuContactResult {

    /** Salesforce record id (named sfid in Heroku Connect) */
    @AuraEnabled
    public String sfid {get;set;}

    @AuraEnabled
    public String firstname {get;set;}

    @AuraEnabled
    public String lastname {get;set;}
    
    /** Score of record, as dertermined by the external system */
    @AuraEnabled
    public String score {get;set;}

    @AuraEnabled
    public String nameUrl {get;set;}

    @AuraEnabled
    public String dynamicIcon {get;set;}
    
    /** JSON serialization helper */
    public static List<HerokuContactResult> parse(String json) {
        return (List<HerokuContactResult>) System.JSON.deserialize(json, List<HerokuContactResult>.class);
    }

}
