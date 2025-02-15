import * as bcrypt from 'bcrypt';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { Database, verbose } from 'sqlite3';
import { RoleEnum } from 'TYPES/role-type';

const INITIAL_ROLES: { name: RoleEnum; description: string }[] = [
	{
		name: RoleEnum.ADMIN,
		description: 'Admin',
	},
	{
		name: RoleEnum.TEACHER,
		description: 'Teacher',
	},
	{
		name: RoleEnum.PARENT,
		description: 'Parent',
	},
	{
		name: RoleEnum.STUDENT,
		description: 'Student',
	},
	{
		name: RoleEnum.PRINCIPAL,
		description: 'Principal',
	},
];

@Injectable()
export class DatabaseService implements OnModuleInit {
	private db?: Database;

	async onModuleInit(): Promise<void> {
		await this.init();
	}

	async init(): Promise<void> {
		const dbPath = process.env.DATABASE_URL?.replace('sqlite://', '');

		if (!dbPath) {
			throw new Error('Database file not found');
		}

		this.db = new (verbose().Database)(dbPath, (err: Error | null) => {
			if (err) {
				console.error('Error opening database:', err.message);
			} else {
				console.log(`Connected to SQLite database: ${dbPath}`);

				this.db?.run(
					'PRAGMA foreign_keys = ON;',
					(err: Error | null) => {
						if (err) {
							console.error(
								'Error enabling foreign keys:',
								err.message
							);
						} else {
							console.log('Foreign keys are enabled.');
						}
					}
				);

				this.runMigrations();
			}
		});
	}

	private async runMigrations(): Promise<void> {
		if (!this.db) {
			throw Error('Database Error');
		}

		const migrationsPath = join(__dirname, './migrations');
		const files = readdirSync(migrationsPath);

		const migrationPromises = files.map((file) => {
			const filePath = join(migrationsPath, file);
			const sql = readFileSync(filePath, 'utf8');

			return new Promise<void>((resolve, reject) => {
				this.db?.exec(sql, (err: Error | null) => {
					if (err) {
						console.error(
							`Error executing migration ${file}:`,
							err.message
						);
						reject(err);
					} else {
						console.log(`Migration ${file} applied successfully.`);
						resolve();
					}
				});
			});
		});

		await Promise.all(migrationPromises);

		await this.initializeRoles();
		await this.initializeUsers();
	}

	private async initializeRoles(): Promise<void> {
		const query = 'SELECT COUNT(*) AS count FROM roles';
		const rows = await this.query(query);

		if (rows[0].count === 0) {
			for (const role of INITIAL_ROLES) {
				await this.run(
					'INSERT INTO roles (name, description) VALUES (?, ?)',
					[role.name, role.description]
				);
			}
			console.log('Initial roles added');
		}
	}

	private async initializeUsers(): Promise<void> {
		const query = 'SELECT COUNT(*) AS count FROM users';
		const rows = await this.query(query);

		if (rows[0].count === 0) {
			const roleQuery = 'SELECT id FROM roles WHERE name = ?';
			const roleRows = await this.query(roleQuery, [RoleEnum.ADMIN]);

			if (roleRows.length === 0) {
				throw new Error(`Role ${RoleEnum.ADMIN} not found`);
			}

			const adminRoleId = roleRows[0].id;

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash('adminpassword', salt);

			await this.run(
				'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
				['admin', 'admin@example.com', hashedPassword, adminRoleId]
			);

			const userRows = await this.query(
				'SELECT last_insert_rowid() AS user_id'
			);
			const userId = userRows[0].user_id;

			const createdAt = new Date().toISOString();
			const lastLogin = createdAt;
			const phone = '123-456-7890';

			await this.run(
				'INSERT INTO admin_details (created_at, last_login, phone, user_id) VALUES (?, ?, ?, ?)',
				[createdAt, lastLogin, phone, userId]
			);

			console.log('Initial admin user added with details');
		}
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
