import express from "express";

// Routes Import
import usersRoutes from "../routes/userRoutes";
import transactionRoutes from "../routes/transactionsRoutes";

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/users", usersRoutes);
app.use("/transactions", transactionRoutes);

export default app;
