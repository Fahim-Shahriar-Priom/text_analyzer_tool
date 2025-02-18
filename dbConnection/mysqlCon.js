'user strict';
const logger = require("./../logger");
const mysql = require("mysql2");
require("dotenv").config();

const masterPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 100,
    timezone: '+06:00',
    pool: {
        max: 100,
        min: 10,
        acquire: 30000,
    },
});

const activeConnections = new Map();

// Track acquired connections
masterPool.on('acquire', (connection) => {
  activeConnections.set(connection.threadId, {
    acquiredAt: new Date(),
    queries: [],
  });
});

// Override query to log executed queries
masterPool.on('connection', (connection) => {
  const originalQuery = connection.query;
  connection.query = function (sql, params, callback) {
    const formattedQuery = mysql.format(sql, params);
    if (activeConnections.has(connection.threadId)) {
      activeConnections.get(connection.threadId).queries.push({
        query: formattedQuery,
        executedAt: new Date(),
      });
    }
    return originalQuery.apply(this, arguments);
  };
});

// Track released connections
masterPool.on('release', (connection) => {
  activeConnections.delete(connection.threadId);
});


//let intervalId;

// beforeAll(() => {
//   intervalId = setInterval(() => {
//     if (activeConnections.size > 0) {
//       console.warn("Unreleased connections detected:");
//       activeConnections.forEach((data, threadId) => {
//         console.warn(`Thread ${threadId}: ${data}`);
//       });
//     }
//   }, 5000);
// });

// afterAll(() => {
//   clearInterval(intervalId);
// });

const dbConnection = () => {
  return new Promise((resolve, reject) => {
      masterPool.getConnection((err, con) => {
          if (err) {
              reject(err);
              return;
          }

          resolve(con);

          // Ensure connection is released properly
          con.release();
      });
  });
};

// afterAll(async () => {
//   masterPool.end(); // Gracefully close MySQL pool
// });

const doQuery = (con, sql, args) => {
    return new Promise(function(resolve, reject) {
        const executedQuery = con.query(sql, args, function(err, result) {
            // console.log(executedQuery.sql);
            if(err) return reject(err)
            resolve(result)
        })
    })
}

const poolQuery = (sql, values) => new Promise((resolve, reject) => {
    const executedQuery = masterPool.query(sql, values, function(err, result) {
         //console.log(executedQuery.sql);
        if(err) return reject(err)
        resolve(result)
    })
});

const isConnectionEstablished = async () => { 
    try {
        const conn = await dbConnection();
        try {
            // console.log(conn);
            console.log('successfully connected to db for the host:', process.env.DB_HOST);
            logger.info('successfully connected to db for the host:', process.env.DB_HOST);
        } finally {
            conn.release();
        }
    } catch(err) {
        console.log('Connection to db was unsuccessful => ', err, 'for the host: ', process.env.DB_HOST);
        logger.info('Connection to db was unsuccessful => ', err, 'for the host: ', process.env.DB_HOST);
    }
};
isConnectionEstablished();

module.exports = {
    dbConnection,
    doQuery,
    poolQuery
}