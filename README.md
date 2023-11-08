This app uses sqlite no need for external db

# Prerequisite

Node

# Installing

git clone https://github.com/kingjnr4/crispy-spoon  
cd crispy-spoon  
yarn install  
copy contents of .env.example into .env  
yarn prisma migrate dev  
yarn dev to start the app

# Endpoints

## Auth

1. Register :- /api/v1/auth/register reqbody = {email:string,password:string,firstname:string,lastname:string,phone:string}
2. Login :- /api/v1/auth/login reqbody = {email:string,password:string}

## Transactions

1. Deposit :- /api/v1/transactions/deposit reqbody = {amount:number}
2. Withdraw :- /api/v1/transactions/withdraw reqbody = {amount:number}
3. Transfer :- /api/v1/transactions/transfer reqbody ={amount:number,account_number:string}
