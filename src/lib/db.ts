import sql, { ConnectionPool } from 'mssql';



const config={
    user : process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    server : process.env.DB_SERVER || "",
    database: process.env.DB_NAME || "",
    options : {
        trustedConnection : true,
        encrypt: false,
        enableArithAbort : true,
        trustServerCertificate : false,
        port : 1433,
        connectionTimeout: 300000,
    },
  }
  let pool: ConnectionPool | null = null;
   
  const connectToDatabase = async () => {
    if (!pool) {
      try {
        pool = await new sql.ConnectionPool(config).connect();
      } catch (error) {
        console.error('Database connection failed: ', error);
        pool = null;
      }
    }
    return pool;
  };
   
  export { connectToDatabase };
   