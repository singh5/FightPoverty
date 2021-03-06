# Data Sources

### [Charity Navigator](https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397)

First requested a key from the Charity Navigator website. After receiving a key, used `./python_utils/json_scraper.py` to scrape data from the Charity Navigator api. See `./charities/README.md` for exact queries used.


### [US Census](https://www.census.gov/developers/)

Used `./python_utils/json_scraper.py` to scrape data from various census surveys. See the following readme files for exact queries used:

`./cities/README.md`

`./counties/README.md`

`./states/README.md`

`./Zip Codes/README.md`


### [United States Zip Codes](https://www.unitedstateszipcodes.org/zip-code-database/)

Downloaded csv file from the United States Zip Codes website for free. Then used `./python_utils/csv_to_json.py` to convert the downloaded csv into the json file `./zip_codes/zip_codes_detailed.json`. This dataset will enable us to link all scraped zip codes, cities, states, and counties.
