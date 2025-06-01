import * as path from 'path';

export function normalizeDatabasePath(databaseUrl: string): string {
	if (databaseUrl.startsWith('sqlite:///')) {
		const dbPath = databaseUrl.replace('sqlite://', '');
		return path.resolve('/', dbPath);
	}

	throw new Error('Unsupported DATABASE_URL format');
}
