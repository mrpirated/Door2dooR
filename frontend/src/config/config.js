// import dotenv from 'dotenv';
// dotenv.config();

// console.log(process.env);
const config = {
	baseUrl: "http://localhost:6874/api",
	position_stack_key: "b108873b531f412bee73c342a818d23e",
	token: "/token",
	company: "/company",
	client: "/client",
	admin: "/admin",
	login: "/login",
	signup: "/signup",
	addStation: "/addStation",
	CLIENT: "client",
	COMPANY: "company",
	ADMIN: "admin",
	token: "/token",
	bookRoute: "/bookRoute",
	trackRoute: "/trackRoute",
	pincodeurl:
		"http://api.positionstack.com/v1/forward?access_key=b108873b531f412bee73c342a818d23e&query=",
	findFastestRoute: "/findFastestRoute",
	pintocityurl: "https://api.postalpincode.in/pincode/",
};
export default config;
