import { Client } from 'pg'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  NODE_ENV,
  POSTGRES_SERVICE_NAME,
} = process.env

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const hostname =
      NODE_ENV == 'production' ? POSTGRES_SERVICE_NAME : 'localhost'
    const client = new Client({
      user: POSTGRES_USER,
      host: hostname,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
    })

    await client.connect()

    const res = await client.query('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
    client.end()

    return client
  } catch (e) {
    console.error(e)
  }

  return null
}
