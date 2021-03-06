'''
Module to run tests on Python modules used to set up backend
'''
import sys
import os
import unittest
import mysql.connector
import requests

# pylint: disable=import-error, wrong-import-position, wrong-import-order
sys.path.insert(0, './datasets/python_utils')
import json_scraper as scraper
import json_utils as json_utils
import state_utils as state_utils
import mysql_utils as sql_utils


class TestPythonUtils(unittest.TestCase):
    '''
    Unit testing all Python utils used to set up backend
    '''

    def test_json_utils(self):
        '''
        Testing write_json_file and read_json_file by writing
        temp_dict to temp_test_file and reading file
        '''
        test_dict = {'test_key': 'test_val'}
        temp_test_file = './temp_json_test_file.json'

        # Write test_dict to temp_test_file
        json_utils.write_json_file(temp_test_file, test_dict)

        # Read temp_json_test_file.json to get dict
        dict_in_temp_test_file = json_utils.read_json_file(temp_test_file)

        # Make sure json reader returns original test_dict from file
        self.assertEqual(dict_in_temp_test_file, test_dict)

        # Clean up and delete temp test file
        os.remove(temp_test_file)

    def test_json_utils2(self):
        '''
        Testing write_json_file and read_json_file by writing
        empty dict to file
        '''
        test_dict = {}
        temp_test_file = './temp_json_test_file.json'

        # Write test_dict to temp_test_file
        json_utils.write_json_file(temp_test_file, test_dict)

        # Read temp_json_test_file.json to get dict
        dict_in_temp_test_file = json_utils.read_json_file(temp_test_file)

        # Make sure json reader returns original test_dict from file
        self.assertEqual(dict_in_temp_test_file, test_dict)

        # Clean up and delete temp test file
        os.remove(temp_test_file)

    def test_json_scraper(self):
        '''
        Testing restful api scraper to see if it returns expected value
        from the FightPoverty api
        '''
        # Will store response in temp file
        temp_test_file = './temp_test_file.json'

        # Sample request
        request = 'http://api.fightpoverty.online/api/county'

        # Scrape response into temp_test_file
        scraper.restful_api_scraper(request, temp_test_file)

        # Read response from temp_test_file
        response = json_utils.read_json_file(temp_test_file)

        # Make sure it returns value as expected
        self.assertEqual(response['num_results'], 291)

        # Clean up and delete temp test file
        os.remove(temp_test_file)

    def test_json_scraper2(self):
        '''
        Testing restful api scraper to see if it returns expected value
        from the FightPoverty api
        '''
        # Will store response in temp file
        temp_test_file = './temp_test_file.json'

        # Sample request
        request = 'http://api.fightpoverty.online/api/county?page=15'

        # Scrape response into temp_test_file
        scraper.restful_api_scraper(request, temp_test_file)

        # Read response from temp_test_file
        response = json_utils.read_json_file(temp_test_file)

        # Make sure it returns value as expected
        self.assertEqual(response['page'], 15)
        self.assertEqual(len(response['objects']), 9)

        # Clean up and delete temp test file
        os.remove(temp_test_file)

    def test_state_name_from_abbrev(self):
        '''
        Testing util that gets a state's name from its abbreviation
        '''
        texas = state_utils.get_state_name_from_abbrev('TX')
        self.assertEqual(texas, 'Texas')

        california = state_utils.get_state_name_from_abbrev('CA')
        self.assertEqual(california, 'California')

        puerto_rico = state_utils.get_state_name_from_abbrev('PR')
        self.assertEqual(puerto_rico, 'Puerto Rico Commonwealth')

    def test_state_name_from_abbrev2(self):
        '''
        Testing state name from abbrev returns empty when not found
        '''
        empty = state_utils.get_state_name_from_abbrev(
            'not a real abbreviation')
        self.assertEqual(empty, '')

    def test_state_name_from_num(self):
        '''
        Testing util that gets a state's name from its number
        '''
        alabama = state_utils.get_state_name_from_num('1')
        self.assertEqual(alabama, 'Alabama')

        new_jersey = state_utils.get_state_name_from_num('34')
        self.assertEqual(new_jersey, 'New Jersey')

        indiana = state_utils.get_state_name_from_num('18')
        self.assertEqual(indiana, 'Indiana')

    def test_state_name_from_num2(self):
        '''
        Testing state name from num returns empty when not found
        '''
        empty = state_utils.get_state_name_from_num('not a number')
        self.assertEqual(empty, '')

    def test_sql_utils(self):
        '''
        Testing utils used to interact with a sql database
        '''
        db_credentials = (
            'testdb',
            'root',
            'password',
            'fptestdbinstance.cydh8jzkegid.us-west-2.rds.amazonaws.com'
        )

        (cnx, cur) = sql_utils.connect_to_mysql_db(db_credentials)

        # Checks if connected properly
        self.assertTrue(isinstance(
            cnx, mysql.connector.connection.MySQLConnection
        ))

        self.assertTrue(isinstance(cur, mysql.connector.cursor.MySQLCursor))

    def test_flask_app(self):
        '''
        Testing flask app is returning expected value
        '''
        flaskless_app_server = 'http://api.fightpoverty.online/'
        resp = (requests.get(flaskless_app_server).content).decode('utf-8')

        self.assertEqual(resp, 'Welcome to the Fight Poverty API!')

    def test_searching(self):
        '''
        Testing flask restless is handling search terms properly
        '''
        flaskless_app_server = 'http://api.fightpoverty.online/'
        api = flaskless_app_server + 'api/city'
        city_names_matching = 'los'

        # Build filter query. '%25' is equivalent to '%'
        request_with_filtering = api + '?q={                    \
            "filters": [                                        \
                {                                               \
                    "name": "name",                             \
                    "op": "like",                               \
                    "val": "%25' + city_names_matching + '%25"  \
                }                                               \
            ]                                                   \
        }'

        resp = requests.get(request_with_filtering).json()

        city_name = resp['objects'][0]['name']

        self.assertEqual(city_name, 'Los Angeles')

    def test_filtering(self):
        '''
        Testing flask restless is properly filtering
        '''
        flaskless_app_server = 'http://api.fightpoverty.online/'
        api = flaskless_app_server + 'api/charity'
        fight_poverty_scores_above = 95

        request_with_filtering = api + '?q={                            \
            "filters": [                                                \
                {                                                       \
                    "name": "fight_poverty_score",                      \
                    "op": "ge",                                         \
                    "val": "' + str(fight_poverty_scores_above) + '"    \
                }                                                       \
            ]                                                           \
        }'

        resp = requests.get(request_with_filtering).json()

        charities = resp['objects']

        self.assertGreater(len(charities), 0)

        # Make sure scores greater than original value
        for charity in charities:
            self.assertGreaterEqual(
                charity['fight_poverty_score'], fight_poverty_scores_above)

    def test_sorting(self):
        '''
        Testing flask restless is properly sorting
        '''
        flaskless_app_server = 'http://api.fightpoverty.online/'
        api = flaskless_app_server + 'api/city'

        # Filter by name in ascending order (A-Z)
        request_with_sorting = api + '?q={     \
            "order_by": [                      \
                {                              \
                    "field": "name",           \
                    "direction": "asc"         \
                }                              \
            ]                                  \
        }'

        resp = requests.get(request_with_sorting).json()
        cities = resp['objects']

        # Make sure cities ordered by name in ascending order
        city_iter1 = iter(cities)
        city_iter2 = iter(cities)

        try:
            next(city_iter2)

            while True:
                city1 = next(city_iter1)
                city2 = next(city_iter2)

                # Make sure subsequent name is always >= preceding
                self.assertGreaterEqual(city2['name'], city1['name'])
        except StopIteration:
            pass

    def test_complex_search_filter_sort(self):
        '''
        Testing complex search filter sort query
        '''
        flaskless_app_server = 'http://api.fightpoverty.online/'
        api = flaskless_app_server + 'api/charity'
        charity_names_matching = 'l'
        fight_poverty_scores_above = 90

        # Search charities matching 'l', fight_poverty_scores above 90,
        # and sorted highest to lowest by fight_poverty_score
        request_with_search_filter_sort = api + '?q={                   \
            "filters": [                                                \
                {                                                       \
                    "name": "name",                                     \
                    "op": "like",                                       \
                    "val": "%25' + charity_names_matching + '%25"       \
                },                                                      \
                {                                                       \
                    "name": "fight_poverty_score",                      \
                    "op": "ge",                                         \
                    "val": "' + str(fight_poverty_scores_above) + '"    \
                }                                                       \
            ],                                                          \
            "order_by": [                                               \
                {                                                       \
                    "field": "fight_poverty_score",                     \
                    "direction": "desc"                                 \
                }                                                       \
            ]                                                           \
        }'

        resp = requests.get(request_with_search_filter_sort).json()
        charities = resp['objects']

        # Make sure charities ordered by fight_poverty_score in descending order
        charities_iter1 = iter(charities)
        charities_iter2 = iter(charities)

        try:
            next(charities_iter2)

            while True:
                charity1 = next(charities_iter1)
                charity2 = next(charities_iter2)

                # Make sure preceding score name is always >= subsequent
                self.assertGreaterEqual(
                    charity1['fight_poverty_score'], charity2['fight_poverty_score'])

                self.assertGreaterEqual(
                    charity1['fight_poverty_score'], fight_poverty_scores_above)

                # Make sure charity name contains letter (case-insensitive)
                self.assertTrue(
                    charity_names_matching in charity1['name'].lower())

        except StopIteration:
            pass

    def test_flask_table_relationships(self):
        '''
        Testing flask restless relationship api. In other words, when one
        table has a relationship to another, this test tests the api
        construction to query that relationship.
        '''
        flaskless_app_server = 'http://api.fightpoverty.online/'
        api = flaskless_app_server + 'api/charity'
        city_name = 'Los Angeles'

        # Find charities in city_name
        request_with_relationship = api + '?q={       \
            "filters": [                              \
                {                                     \
                    "name": "city",                   \
                    "op": "has",                      \
                    "val": {                          \
                        "name": "name",               \
                        "op": "eq",                   \
                        "val": "' + city_name + '"    \
                    }                                 \
                }                                     \
            ]                                         \
        }'

        resp = requests.get(request_with_relationship).json()

        charities = resp['objects']

        for charity in charities:
            city_name_response = charity['city']['name']
            self.assertEqual(city_name_response, city_name)


if __name__ == '__main__':
    unittest.main()
