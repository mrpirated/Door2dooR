import dotenv from "dotenv";
dotenv.config();

module.exports = {
	HOST_NAME: process.env.HOST_NAME,
	PORT: process.env.PORT,
	RDS_HOSTNAME: process.env.RDS_HOSTNAME,
	RDS_PORT: process.env.RDS_PORT,
	RDS_DB_NAME: process.env.RDS_DB_NAME,
	RDS_USERNAME: process.env.RDS_USERNAME,
	RDS_PASSWORD: process.env.RDS_PASSWORD,
	SALT_ROUNDS: process.env.SALT_ROUNDS,
	SECRET_KEY: process.env.SECRET_KEY,
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
	TWILIO_SERVICE_ID: process.env.TWILIO_SERVICE_ID,
	MAP_QUEST_API_KEY: process.env.MAP_QUEST_API_KEY,
};
