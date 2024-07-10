This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
# add .env file
without .env file the server will not start
because the server require 2 variables
#**1** - the server require **MONGO_CONNECTION_URL** Which represents the database connection URL
#**2** the server required **COOKIES_SECRET_KEY** which represents the server key that will be used to sign the session id
#**3** (Optional) The server requests **ROOT_ADMIN_ACCOUNT_PHONE_NUMBER** which represents the administrator account phone number, when this phone number is logged in, it will take on the administrator role until the variable changes

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
