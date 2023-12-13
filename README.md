# Backend Challenge
This is a challenge to hire developers made by a well-known bank.

## 🎲 Installing and Running 
```
git clone https://github.com/ryder-dev/bank-backend-chalenge.git
```

### npm
```
npm install
```
Set up your database at ./prisma/schema.prisma, then run: 
```
npx prisma migrate dev --name create-users-table
```
Create the test users
```
npm run createUsers
```
Run the project
```
npm start
```

### Yarn
```
yarn
```
Set up your database at ./prisma/schema.prisma, then run: 
```
npx prisma migrate dev --name create-users-table
```
Create the test users
```
yarn createUsers
```
Run the project
```
yarn start
```

## Scripts

### npm
Runs the server
```
npm start
```
Create 4 users on the database
```
npm run createUsers
```
Run unit tests
```
npm run test
```
Build the project
```
npm run build
```

### Yarn

Runs the server
```
yarn start
```
Create 4 users on the database
```
yarn createUsers
```
Run unit tests
```
yarn test
```
Build the project
```
yarn build
```

## Endpoints
```
GET /transactions/get
  Display the transaction history

POST /transactions/create
  Create a transaction
  {
    "payer":  number, // payer ID
    "payee":  number, // payee ID
    "amount": number  // amount to be transfered
  }

POST /transactions/revert
  Reverse a transaction, remove the money from the payee, and return it to the payer
  {
    transactionId: number 
  }

POST /users/
  Get a user info using its ID
  {
    "userId": number
  }
  
```
