Front End : React
.Net : C#
 
Task
As a Member I would like to have an ability to choose various options on the screen  So that I can view the monthly premiums calculated and displayed on the screen
Develop an UI which accepts the below data and return a monthly premium amount to be calculated.
1.	Name
2.	Age Next Birthday
3.	Date of Birth (mm/YYYY)
4.	Usual Occupation
5.	Death – Sum Insured.
 
The UI provides a below list of occupations
 Occupation
Occupation	Rating
Cleaner	Light Manual
Doctor	Professional
Author	White Collar
Farmer	Heavy Manual
Mechanic	Heavy Manual
Florist	Light Manual
Other	Heavy Manual

There is a factor associated with each rating as below,    
Occupation Rating
Rating	Factor
Professional	1.5
White Collar	2.25
Light Manual	11.50
Heavy Manual	31.75
 
1.	For any given individual the monthly premium is calculated using the below formula
Death Premium = (Death Cover amount * Occupation Rating Factor * Age) /1000 * 12
1.	All input fields are mandatory.
2.	Given all the input fields are specified, change in the occupation dropdown should trigger the premium calculation
 
Database Design
•	Additional requirement: Database table design for the above (diagram or representation only, no need of scripts)

Submission
1.	If you have any questions, please do not hesitate to contact me.
2.	The solution does not have to be feature complete but will serve as the basis for the selection.
3.	Add all assumptions and clarifications about solution to the README file
4.	Store your code in git repository (Ex: Github or BitBucket). We want to see the evolution of your solution through your commits, so commit early and often.
Please send us the link to where you have stored in.

