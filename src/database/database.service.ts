import { Injectable, OnModuleInit } from "@nestjs/common";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { Database, verbose } from "sqlite3";

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db?: Database;

  async onModuleInit(): Promise<void> {
    await this.init();
  }

  async init(): Promise<void> {
    const dbPath = process.env.DATABASE_URL;
    console.log("Resolved DB path:", dbPath);

    if (!dbPath) {
      throw new Error("Database file not found");
    }

    this.db = new (verbose().Database)(dbPath, (err: Error | null) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log(`Connected to SQLite database: ${dbPath}`);

        this.db?.run("PRAGMA foreign_keys = ON;", (err: Error | null) => {
          if (err) {
            console.error("Error enabling foreign keys:", err.message);
          } else {
            console.log("Foreign keys are enabled.");
          }
        });

        this.runMigrations();
      }
    });
  }

  private async runMigrations(): Promise<void> {
    if (!this.db) {
      throw Error("Database Error");
    }

    const migrationsPath = join(__dirname, "./migrations");
    const files = readdirSync(migrationsPath);

    const migrationPromises = files.map(file => {
      const filePath = join(migrationsPath, file);
      const sql = readFileSync(filePath, "utf8");

      return new Promise<void>((resolve, reject) => {
        this.db?.exec(sql, (err: Error | null) => {
          if (err) {
            console.error(`Error executing migration ${file}:`, err.message);
            reject(err);
          } else {
            console.log(`Migration ${file} applied successfully.`);
            resolve();
          }
        });
      });
    });

    await Promise.all(migrationPromises);
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db?.all(sql, params, (err: Error | null, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async run(sql: string, params: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db?.run(sql, params, (err: Error | null) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
