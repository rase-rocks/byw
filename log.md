## Worklog

#### Deployment

To deploy run 
<pre>
npm run deploy
</pre>

#### Building

To build run:
<pre>npm run build</pre>

### Issues

#### Issue-18 - 09/03/21 - Update Privacy Policy

GitHub Issue #18 refers

The current privacy policy requires a slight alteration to match current contact details.

#### Issue-02 - 02/11/20 - Implement UI Content Language Translatable

GitHub Issue #16 refers

The current system assumes that the first language of a person seeking to use this service is English. This is not necessarily the case and therefore user facing text should be translatable into any language needed.

To support this all UI facing text content will be taken out of the component rendering the UI and moved to a central JSON file for the chosen language. To make language translation contributions easier for none devs, the translations themselves will be in the form of a CSV file with `key` `value` pairs and a short set of scripts to check the translation is correctly formatted and contains all the necessary elements and then convert to JSON for import into the `Text` system. Components rendering user facing text will then be passed a language in the form of App State and can then render the correct language.

A component to allow a user to select the UI language will also be needed along with Redux actions and reducer to support the new language state. An `enum` would be ideal for this piece of state, but since this is JavaScript a string (from an importable set of constants) will suffice. Components will therefore need to take care not to hard code language string state as this will be subject to change as new languages are added. New languages should be added without any alteration to UI rendering code.

The notable omission from this approach is the ability to properly localize (as opposed to just translate) the pages. In other words, right to left languages will be possible, but the UI will not shift orientation, just supply the correct translation. If this becomes an issue later down the road, the modular nature of the proposed implementation will allow the implementation of this. Another reason not to hard code language state as a string in components, as this is likely how the text direction of the language is to be represented.

#### Issue-01 - 11/03/20 - SEO Visibility Improvements

Now that the basic functionality of the site is implemented it is worth spending some time looking at search engine visibility. The website is currently simply a front end client to the database, which works well for the site and allows for great extensibility later (for native apps and so on). But, some refinements can be made to jump through the hoops search engines still require.