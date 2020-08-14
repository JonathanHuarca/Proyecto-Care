export const config = {
  secrets: {
    jwt: 'mysecretkey'
  },
  database:'Care',
  dbUrl: process.env.MONGO_URL_ATLAS
}