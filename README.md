# Heroku-Salesforce-Search

Salesforce has some good mechanisms for querying data, however limitations of the platform become apparent when you have:

* SOQL Query joins across multiple large objects
* SOQL Query joins across Objects with no direct Lookup relationships
* SOQL wildcard text matching queries over millions of records
* Advanced query functions that have no equivalent in SOQL or SOSL 

I have built a simple proof of concept on the free-tier of Salesforce's Heroku that will give you access to this functionality. I have defined three different methods of querying a Postgres database for Contacts


<img width="1440" alt="Screen Shot 2022-05-29 at 10 56 27 am" src="https://user-images.githubusercontent.com/41508645/170854844-922bc03e-92e6-4cfa-b925-1b02671a5b58.png">


* Heroku Signup: https://signup.heroku.com/
* Salesforce Signup: https://developer.salesforce.com/signup
