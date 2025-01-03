import { Injectable, OnModuleInit } from '@nestjs/common';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { Database, verbose } from 'sqlite3';

@Injectable()
export class DatabaseService implements OnModuleInit {
	private db?: Database;

	async onModuleInit(): Promise<void> {
		await this.init();
	}

	async init(): Promise<void> {
		this.db = new (verbose().Database)(
			'database.sqlite',
			(err: Error | null) => {
				if (err) {
					console.error('Error opening database:', err.message);
				} else {
					console.log('Connected to SQLite database.');
					this.runMigrations();
				}
			}
		);
	}

	private runMigrations(): void {
		if (!this.db) {
			throw Error('DataBase Error');
		}

		const migrationsPath = join(__dirname, './migrations');
		const files = readdirSync(migrationsPath);

		files.forEach((file) => {
			const filePath = join(migrationsPath, file);
			const sql = readFileSync(filePath, 'utf8');
			this.db?.exec(sql, (err: Error | null) => {
				if (err) {
					console.error(
						`Error executing migration ${file}:`,
						err.message
					);
				} else {
					console.log(`Migration ${file} applied successfully.`);
				}
			});
		});
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
