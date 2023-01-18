import mysql from "mysql"

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "MS.1810duoc2000",
    database: "EcommerceTech"
})