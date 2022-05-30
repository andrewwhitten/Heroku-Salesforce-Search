/**
 * Simple class to invoke web services hosted on Heroku
 */
public with sharing class HerokuSearchClass {

    /** Basic search */
    @AuraEnabled(cacheable=true)
    public static List<HerokuContactResult> basicSearch(String name) {

        return HerokuSearchClass.executeSearch(name, 'basicSearch');
    }

    /** Trigrams search */
    @AuraEnabled(cacheable=true)
    public static List<HerokuContactResult> trigramsSearch(String name) {

        return HerokuSearchClass.executeSearch(name, 'trigramsSearch');
    }

    /** Soundex Search */
    @AuraEnabled(cacheable=true)
    public static List<HerokuContactResult> soundexSearch(String name) {

        return HerokuSearchClass.executeSearch(name, 'soundexSearch');
    }

    /** Levenshtein Search */
    @AuraEnabled(cacheable=true)
    public static List<HerokuContactResult> levenshteinSearch(String name) {

        return HerokuSearchClass.executeSearch(name, 'levenshteinSearch');
    }

    /**
     * Build the JSON payload
     */
    static private String buildPayload(String name) {

        JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartObject();
        gen.writeStringField('name', name);
        gen.writeEndObject();

        String payload = gen.getAsString();

        return payload;
    }

    /**
     * Build the request to call the web service
     */
    static private HttpRequest buildRequest(String payload, String methodName) {

        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Heroku_Search' + '/' + methodName);
        req.setMethod('POST');
        req.setBody(payload);
        req.setHeader('Content-Type', 'application/json');
        req.setTimeout(10000); // timeout in milliseconds

        return req;
    }

    /** Run the query against the web service*/
    private static List<HerokuContactResult> executeSearch(String name, String methodName) {
    
        String payload = HerokuSearchClass.buildPayload(name);
    
        HttpRequest req = HerokuSearchClass.buildRequest(payload, methodName);
    
        Http http = new Http();
        HTTPResponse res = http.send(req);
    
        List<HerokuContactResult> results = HerokuContactResult.parse(res.getBody());

        // Add a URL to each record
        for(HerokuContactResult hcr : results) {

            hcr.nameUrl = '/' + hcr.sfid;

            if(hcr.score == '0' || hcr.score == '1')
            {
                hcr.dynamicIcon = 'action:new_task';
            }
            else {
                hcr.dynamicIcon = 'action:priority';
            }
        }
    
        return results;
    }
}
