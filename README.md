Finance Track Capstone


My final capstone project for a web development Client-side scripting is a personal finance tracking web application.  This is a crud application where you can add based on income and expense transactions, edit and also delete.  

 How the application works

•	User can add income and expense transactions with a title, amount, category, date, note (optional) and tax (optional).
•	User can view all transactions in a list with search, filters, and sorting fields.
•	User can filter by category (Food, Rent, Salary, etc.), type (Income/Expense) and Sort by date or amount
•	User can view its transaction full details by clicking on it.
•	User can edit or delete any transaction
•	All data is saved in your browser, so nothing is lost on refresh

Tech used

•	React 19 (functional components)
•	React Router v6 with HashRouter (for GitHub Pages compatibility)
•	Context API + custom hooks for shared state
•	localStorage for data persistence
•	Bootstrap 5 for styling
•	Vite as the build tool

How to run locally

git clone https://github.com/HassanTaiwo185/Finance-track-capstone.git 
cd Finance-track-capstone
npm install
npm run dev

Then open http://localhost:5173  in your browser.

Pages and routes
Route	What you see
/	Home / landing page
/list	All transactions with search, filter, and sort
/item/:id	Full detail view of one transaction
/New	Form to add a new transaction
/edit/:id	Form to edit an existing transaction
/*	404 not found page

Data saved per transaction

o	id — unique identifier (auto-generated)
o	title — what the transaction was for
o	type — income or expense
o	amount — in CAD
o	Tax — in CAD
o	category — e.g. Food, Rent, Salary
o	date — when it happened
o	note — optional extra detail

Storage

All transactions are saved in the browser using localStorage.
Key used: `finance_transactions`

Live site

https://HassanTaiwo185.github.io/Finance-track-capstone/ 

## Repo

https://github.com/HassanTaiwo185/Finance-track-capstone 

