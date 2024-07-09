if (!process.env.MONGO_CONNECTION_URL) {
    console.log("");
    console.log("You Should Provide 'MONGO_CONNECTION_URL' variable in .env file".red);
    console.log("");
    process.exit(1);
}

if (!process.env.COOKIES_SECRET_KEY) {
    console.log("");
    console.log("You Should Provide 'COOKIES_SECRET_KEY' variable in .env file".red);
    console.log("");
    process.exit(1);
}

if (!process.env.ROOT_ADMIN_ACCOUNT_PHONE_NUMBER) {
    console.log("");
    console.log("To Enable Admin Account, provide the admin phone number in .env file".yellow);
    console.log("Provide it in 'ROOT_ADMIN_ACCOUNT_PHONE_NUMBER' variable".yellow);
    console.log("");
}