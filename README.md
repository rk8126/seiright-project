# seiright-project

# Note
    Please add the env variables

# Functionality
    1. Take a webpage as the input and it has to check the content in the page against a compliance policy.
    2. Return the findings (non-compliant results) in the response.

# API Endpoint: /webpage/check-compliance
    Functionality:
    HTTP Method: GET

    Input Parameters (Query Params):
        webpageUrl (String): The URL of the webpage we wish to assess for compliance.
    Output:
        Upon successful response, return content that against a compliance policy in the data.
        In case of errors, return an error message with an appropriate HTTP status code.

    Return Response:
        If the entire process is successful, return content that against a compliance policy in the data.
        If any errors occur at any step, return an error message with an appropriate HTTP status code (e.g., 400 Bad Request or 500 Internal Server Error).