## React-Reusable-Employee-SPA
This is a employee management CRUD Application, where user can create, remove, update and display the employee details. User need to login in application first. 

## functionalities:
1. Signup page with following fields
    a. Name
    b. Email
    c. Password (One Character / One Numeric / One special Character / Min Length 8)
    d. Role
    e. Save 
    f. Close
On success redirect to Login Page
2. Login Page
    1. Email
    2. Password (With Proper Validation Messages)
    3. Login
After login Goto Employee page
3. Employee page
    Employe Page contains Following data
    1. Create Employee Button
        1. On click open a Popup Create Employee Popup
        2. This popup contains following fields (All are mandatory to fill- Show error message if user do not fill and click on save)
            1. Name : Alphabetical only - (Use Custom Filter)
            2. Employee Code: AlphaNumeric - (Use Custom Filter)
            3. Email : Email validation
            4. D.O.B: Calendar
            5. D.O.J: Calendar
            6. Salary : Float with three (3) decimal points
            7. Role
            8. Gender: Radio Button - Male/Female
            9. Save Button : (On success:Close popup and Refresh list)
            10. Close Button
    2. A Table With all employee list with following headings
        1. Name
        2. Employee Code
        3. Email
        4. D.O.B (DD/MM/YYYY)
        5. D.O.J (DD/MM/YYYY)
        6. Salary (With Currency Filter with two Decimal points)
        7. Role: (use API:- 1 for role listing ): Dropdown
        8. Gender: Radio Button - Male/Female
        9. Action (View icon, Edit icon, Delete Icon)
            1. View Icon Click: Open Create Employee Popup with all fields disabled and Close button.
            2. Edit Click : Open Create Employee Popup with all fields enabled and pre-filled with respective data.
                1. On Update Close popup and Refresh employee list :
                2. On Cancel Close popup
            3. Delete Click : Confirmation Popup
                1. On Success delete Employee and Close confirmation popup and Refresh employee list :
                2. On Cancel Close confirmation popup
            4. Print Pdf Icon: Create a PDF with Employee details
                1. (react-pdfmake Or any other in which you are comfortable)
4. Email Page
    This page contains Following Fields
    1. Create Email Button
        1. On click open Create Email Popup
        2. This popup contains following fields
            1. Email : Email validation
            2. Save
            3. Close
    2. Show a table with following fields
        1. Serial No.
        2. Email Address
        3. Action (Edit and Delete Icon)
            1. Edit click : Open Create Email Popup with Update Button and pre filled data.
            2. Delete open confirmation popup
                1. On Success Delete the record
                2. On Cancel Close the popup


## Dependencies included in Project
1. react
2. react-dom
3. react-router
4. react-router-dom
5. react-bootstrap
6. @react-pdf/renderer

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
