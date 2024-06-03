import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { NextResponse } from "next/server";
interface QueryData {
  queryText: string;
  values: any;
}

export async function connection() {
  try {
    const connecting = await mysql.createConnection({
      host: process.env.DB_HOST,
      // port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });
    return connecting;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function query({ queryText, values }: QueryData) {
  try {
    const connecting = await mysql.createConnection({
      host: process.env.DB_HOST,
      // port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_DBNAME,
    });

    const [results, e] = await connecting.query<ResultSetHeader>(
      queryText,
      values
    );
    connecting.end();
    console.log("<<<< 23", e);
    const insertId = results.insertId;
    if (insertId) {
      console.log("<<<24 ", results.insertId);
      return results.insertId;
    } else {
      console.log("<<<24 ", results);
      return results;
    }

    // return NextResponse.json({ data, errorCode: "00" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    // throw Error(error);
    return NextResponse.json(
      { errorCode: "01", errorText: error },
      { status: 404 }
    );
  }
}
