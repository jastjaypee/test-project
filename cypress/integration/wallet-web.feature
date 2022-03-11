Feature: Log in page load

    Background:
        Given browser is at Onewallet website

    Scenario: Login validation for invalid credentials
        When user clicks login button with fields empty
        Then validation messages appears

    Scenario: Login validation for incorrect credentials
        When user Login with wrong username or password
        Then an error message pops up "Invalid Username or Password"

    Scenario: Login successfully
        When user enters correct username and password
        Then user Login successfully and redirects to default page

    