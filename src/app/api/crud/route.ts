import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        // Parse JSON body
        const data = await req.json();
        
        const { EmployeeID, FirstName, LastName, Age, Department, JoiningDate, Salary } = data;

        console.log('Received Data:', { EmployeeID, FirstName, LastName, Age, Department, JoiningDate, Salary });

        // Connect to the database
        const pool = await connectToDatabase();
        if (!pool) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
        }

        // Insert data into the Employees table
        await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('FirstName', sql.NVarChar(1000), FirstName)
            .input('LastName', sql.NVarChar(255), LastName)
            .input('Age', sql.Int, Age)
            .input('Department', sql.NVarChar(1000), Department)
            .input('JoiningDate', sql.NVarChar(500), JoiningDate)
            .input('Salary', sql.NVarChar(255), Salary)
            .query(
                `INSERT INTO Employees 
                 (FirstName, LastName, Age, Department, Salary)
                 VALUES (@FirstName, @LastName, @Age, @Department, @Salary)`
            );

        // Return success response
        return NextResponse.json({ message: "Record Inserted Successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error during record insertion:", error);
        return NextResponse.json({ message: "Failed to insert record"}, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
      const { EmployeeID} = data;

      if (!EmployeeID) {
          return NextResponse.json({ error: 'EmployeeID is required' }, { status: 400 });
      }

      const pool = await connectToDatabase();
      if (!pool) {
          return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
      }

      await pool.request()
          .input('EmployeeID', sql.Int, EmployeeID)
          .query(`DELETE FROM Employees WHERE EmployeeID = @EmployeeID`);

      return NextResponse.json({ message: "Record Deleted Successfully" }, { status: 200 });
  } catch (error) {
      console.error("Error during record deletion:", error);
      return NextResponse.json({ message: "Failed to delete record" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
      const data = await req.json();
      const { EmployeeID, FirstName, LastName, Age, Department, JoiningDate, Salary } = data;

      if (!EmployeeID) {
          return NextResponse.json({ error: 'EmployeeID is required' }, { status: 400 });
      }

      const pool = await connectToDatabase();
      if (!pool) {
          return NextResponse.json({ error: 'Database connection failed' }, { status: 501 });
      }

      await pool.request()
          .input('EmployeeID', sql.Int, EmployeeID)
          .input('FirstName', sql.NVarChar(1000), FirstName)
          .input('LastName', sql.NVarChar(255), LastName)
          .input('Age', sql.Int, Age)
          .input('Department', sql.NVarChar(1000), Department)
          .input('JoiningDate', sql.NVarChar(500), JoiningDate)
          .input('Salary', sql.NVarChar(255), Salary)
          .query(
              `UPDATE Employees 
               SET FirstName = @FirstName,
                   LastName = @LastName,
                   Age = @Age,
                   Department = @Department,
                   Salary = @Salary
               WHERE EmployeeID = @EmployeeID`
          );

      return NextResponse.json({ message: "Record Updated Successfully" }, { status: 200 });
  } catch (error) {
      console.error("Error during record update:", error);
      return NextResponse.json({ message: "Failed to update record" }, { status: 500 });
  }
}


export async function GET() {
    try {
      const pool = await connectToDatabase();
      if (!pool) {
        throw new Error('Failed to connect to the database');
      }
  
      const result = await pool.request().query('SELECT * FROM Employees');
      return NextResponse.json(result.recordset);
    } catch (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
  }


