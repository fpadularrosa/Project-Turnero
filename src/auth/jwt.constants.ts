require('dotenv').config();
const jwtConstants = { secret:process.env.SECRET_SESSION };

export default jwtConstants;