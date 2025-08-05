import { Client } from "pg";
import prompts from "prompts";

async function main() {
  const response = await prompts([
    {
      initial: "localhost",
      message: "Postgres host:",
      name: "host",
      type: "text",
    },
    {
      initial: 5432,
      message: "Postgres port:",
      name: "port",
      type: "number",
    },
    {
      initial: "postgres",
      message: "Admin (superuser) DB username:",
      name: "adminUser",
      type: "text",
    },
    {
      message: "Admin DB password:",
      name: "adminPassword",
      type: "password",
    },
    {
      message: "Database name to grant access on:",
      name: "dbName",
      type: "text",
    },
    {
      message: "Password for new user `app_user`:",
      name: "userPassword",
      type: "password",
    },
  ]);

  const { adminPassword, adminUser, dbName, host, port, userPassword } =
    response as {
      adminPassword: string;
      adminUser: string;
      dbName: string;
      host: string;
      port: number;
      userPassword: string;
    };

  // connect as superuser
  const client = new Client({
    database: "postgres", // connect to a default DB to run CREATE USER
    host,
    password: adminPassword,
    port,
    user: adminUser,
  });

  await client.connect();

  // run the setup DDL
  const sql = `
    CREATE USER app_user WITH
      PASSWORD '${userPassword}'
      NOSUPERUSER
      NOCREATEDB
      NOCREATEROLE
      NOREPLICATION
      INHERIT
      LOGIN;

    GRANT CONNECT ON DATABASE ${dbName} TO app_user;

    GRANT USAGE ON SCHEMA public TO app_user;

    GRANT SELECT, INSERT, UPDATE, DELETE
      ON ALL TABLES IN SCHEMA public
      TO app_user;

    ALTER DEFAULT PRIVILEGES
      IN SCHEMA public
      GRANT SELECT, INSERT, UPDATE, DELETE
      ON TABLES
      TO app_user;

    GRANT USAGE, SELECT
      ON ALL SEQUENCES IN SCHEMA public
      TO app_user;

    ALTER DEFAULT PRIVILEGES
      IN SCHEMA public
      GRANT USAGE, SELECT
      ON SEQUENCES
      TO app_user;
  `;

  await client.query(sql);
  await client.end();

  // URL-encode the password so special chars are safe
  const encodedPwd = encodeURIComponent(userPassword);
  const connectionString = `postgresql://app_user:${encodedPwd}@${host}:${port}/${dbName}`;

  console.log("\n✅  User `app_user` created successfully.");
  console.log("🔗  Connection string:\n");
  console.log(connectionString);
}

main().catch((err) => {
  console.error("❌  Error:", err);
  process.exit(1);
});
