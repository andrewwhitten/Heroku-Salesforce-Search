/**
 * Heroku search control
 *
 * Description: Provides 4 methods to query a Postgres database that
 * has syncronized Contacts from Salesforce (out of the box, not customized).
 * 
 * @author Andrew Whitten
 * @date  30th May 2022
 */
import { LightningElement } from 'lwc';
import basicSearch from '@salesforce/apex/herokuSearchClass.basicSearch';
import levenshteinSearch from '@salesforce/apex/HerokuSearchClass.levenshteinSearch';
import soundexSearch from '@salesforce/apex/HerokuSearchClass.soundexSearch';
import trigramsSearch from '@salesforce/apex/HerokuSearchClass.trigramsSearch';

// Display for search results without scores
const basicSearchColumns = [
    //{ label: 'Sfid', fieldName: 'sfid' }, // Not needed
    {
        label: 'Contact',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: 'LINK', 
        target: '_blank'},
        sortable: true
    },
    { label: 'First Name', fieldName: 'firstname' },
    { label: 'Last Name', fieldName: 'lastname' },
];

// Display for search results with scores
const scoreSearchColumns = [
    //{ label: 'Sfid', fieldName: 'sfid' }, // Not needed
    {
        fieldName: '',
        label: 'Match',
        cellAttributes: { iconName: { fieldName: 'dynamicIcon' } }
    },
    {
        label: 'Contact',
        fieldName: 'nameUrl',
        type: 'url',
        typeAttributes: {label: 'LINK', 
        target: '_blank'},
        sortable: true
    },
    { label: 'First Name', fieldName: 'firstname' },
    { label: 'Last Name', fieldName: 'lastname' },
    { label: 'Score', fieldName: 'score' },
];

export default class HerokuContactSearchControl extends LightningElement {

    searchName = '';

    basicsearchdata = [];
    basicsearchcolumns = basicSearchColumns;

    levenshteinsearchdata = [];
    scoreSearchColumns = scoreSearchColumns;

    soundexsearchdata = [];
    trigramssearchdata = [];

    // On search button click
    async handleClick(event) {

        try {

            // If valid input given
            if(this.searchName) {

                this.basicsearchdata = await basicSearch({name: this.searchName});

                this.levenshteinsearchdata = await levenshteinSearch({name: this.searchName});

                this.soundexsearchdata = await soundexSearch({name: this.searchName});

                this.trigramssearchdata = await trigramsSearch({name: this.searchName});           
            }

		} catch (error) {
			console.log(error);
		}
    }

    // When user types name criteria
    handleNameInputChange(event){

        this.searchName = event.target.value;
    }
}