# Heroku-Salesforce-Search

Salesforce has some good mechanisms for querying data, however limitations of the platform become apparent when you have:

* SOQL Query joins across multiple large objects
* SOQL Query joins across Objects with no direct Lookup relationships
* SOQL wildcard text matching queries over millions of records
* Advanced query functions that have no equivalent in SOQL or SOSL 

I have built a simple proof of concept on the free-tier of Salesforce's Heroku that will give you access to this functionality. For this example I have defined three different methods of querying a Postgres database for Contacts

<img width="1440" alt="Screen Shot 2022-05-29 at 10 56 27 am" src="https://user-images.githubusercontent.com/41508645/170854844-922bc03e-92e6-4cfa-b925-1b02671a5b58.png">

To build this you will need Heroku and Salesforce (both free signups), and your architecture will look something like this:

![1_jjEb2uUS7lM8hzyGNCC18g](https://user-images.githubusercontent.com/41508645/170855283-1ce34107-ae9c-4645-864c-007bc805fd8a.png)

# Prerequisites

All environments for the demonstration is available for a free trial:

* Heroku Signup: https://signup.heroku.com/
* Salesforce Signup: https://developer.salesforce.com/signup

All tools are free as well:

* Visual Studio Code: https://code.visualstudio.com/
* Salesforce SFDX: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.get_started_sfdx
* Heroku NodeJS SDK: https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true
* Postman (or any other REST testing tool: https://www.postman.com/downloads/

# Steps Overview

**This Proof of Concept is not intended for Production systems, or systems that hold Production data.** There is no security setup in this code and configuration.

# Step 1: Create the Heroku Connect Service

In Heroku, create a free Postgres Database and Heroku Connect instance:

<img width="778" alt="Screen Shot 2022-05-30 at 12 39 04 pm" src="https://user-images.githubusercontent.com/41508645/170907249-da591195-ecc2-4ffe-a5b0-55c2de1ad81a.png">

Setup the Contact object mapping fields between your trial org. For this simple example I have just chosen the following fields:

* CreatedDate
* Id
* IsDeleted
* Name
* SystemModstamp
* FirstName
* LastName

# Step 2: Setting up the Postgres database

Heroku Connect should have done this for you in the previous step. All that is left to do is ensure the 'fuzzy search' extension is enabled afterwards:

'''CREATE EXTENSION pg_trgm;'''

Note that setting up Heroku Connect will define the Postgres schema for you, with no additional configuration needed.

I havn't covered indexes in this proof of concept since the queries won't benefit from them with the limited number of records possible in a Salesforce Developer sandbox, however you can define you own Views and Indexes afterwards. In a system with millions of records you will likely benefit from an indexing strategy.

# Step 3: Create some Contacts

Load up some Contacts into Salesforce with first names and last names. I downloaded a list of artists from Kaggle : https://www.kaggle.com/datasets/momanyc/museum-collection and uploaded them into Salesforce with the Salesforce Data Import Wizard.

# Step 4: Setup the Heroku App

Setup your App with the instructions defined here: https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true

Install the following dependencies with the npm install command:

* npm install compression
* npm install dotenv
* npm install express
* npm install helmet
* npm install pg

You can them put in the code defined in the Heroku directory of my respositiory.

Then set up a Config Var called 'ON_HEROKU' and set the value as 1. This is to tell the App that it is deployed to Heroku rather than running locally on the developer machine.

<img width="1077" alt="Screen Shot 2022-05-30 at 1 12 01 pm" src="https://user-images.githubusercontent.com/41508645/170910512-c427ba43-ef04-4a74-a996-686701a4102e.png">

# Step 5: Test the Heroku App

At this point it is worth making sure that the service is running correctly, so you can try out Postman (or similar REST testing tool) against it. Ensure there is no authorization (for this demo) and send a raw JSON payload in the body against it: 

<img width="1312" alt="Screen Shot 2022-05-30 at 1 41 05 pm" src="https://user-images.githubusercontent.com/41508645/170913253-a57052f8-1f26-454f-b930-80633df6db66.png">

You will have four services to try out:

* https://your-own-deployed-search-this-is-not-real.herokuapp.com/levenshteinSearch
* https://your-own-deployed-search-this-is-not-real.herokuapp.com/trigramsSearch
* https://your-own-deployed-search-this-is-not-real.herokuapp.com/soundexSearch
* https://your-own-deployed-search-this-is-not-real.herokuapp.com/basicSearch

(You can skip this part, but then you won't be sure if it is working if it doesn't working in Salesforce)

# Step 6: Deploy the Salesforce App

In the Salesforce directory of my respository is a simple LWC Control, Apex Class and Named Credental to deploy against your Salesforce org. 

Add the Control to any Lightning page, and fix the URL of the named credential to your Heroku service. You should be good to try out the searching as a Salesforce user now!
