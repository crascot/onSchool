export default () => {
	console.log(`Loaded ENV: ${process.env.NODE_ENV}`);
	return {
		port: process.env.PORT || 3000,
		jwtSecret: process.env.JWT_SECRET,
		database_url: process.env.DATABASE_URL,
	};
};
