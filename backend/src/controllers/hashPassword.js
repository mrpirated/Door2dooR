import bcrypt from "bcrypt";
const hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};
export default hashPassword;
