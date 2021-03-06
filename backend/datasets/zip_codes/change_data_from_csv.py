'''
Includes a function to convert data from ./zip_codes_detailed.csv to prevent
non-ascii characters from messing up json creation
'''


def change_data_from_csv(zip_code_rows):
    '''
    Take in the data from ./zip_codes_detailed.csv file and change each row
    to prevent
    '''
    data_to_write_to_json = []

    for row in zip_code_rows:
        # Only need these values
        zip_code = row[0]
        city_name = row[3]
        state_name = row[6]
        county_name = row[7]

        # Can only read ascii
        try:
            zip_code.encode('utf-8')
            city_name.encode('utf-8')
            state_name.encode('utf-8')
            county_name.encode('utf-8')
        except Exception as exp:
            print('Did not add ' + str(zip_code) + ' in ' + str(city_name) +
                  ', ' + str(state_name) + ' in county ' + str(county_name))
            print(str(exp))

        else:

            # Only include if all values exist
            if zip_code and city_name and state_name and county_name:
                data_to_write_to_json.append(
                    [zip_code, city_name, state_name, county_name])

    return data_to_write_to_json
