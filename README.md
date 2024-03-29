# solo-project-diary-server-

## Setting up

1. Copy `.env.example` and name it `.env`
2. Create a postgres database and add its URL into the `DATABASE_URL` environment variable, keeping `?schema=prisma` on the end
    - Postgres db URLs are in the format: `postgres://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE_NAME]`
    - Note that prisma doesn't store data in the public schema, so set the  search path to prisma in your db client. For PSQL client
    - use `\dn` to show available schemas
    - use SQL to set the search path to the correct schema: `SET search_path to prisma;`
    - `\dt` will then show available tables (once migrations have been run)
3. If using a cloud database provider:
    - Create another database and run `create schema shadow` on it
    - Add its URL into the `SHADOW_DATABASE_URL` env var, keeping `?schema=shadow` on the end
4. `npm ci` to install dependencies
5. `npx prisma migrate reset` to apply migrations to your db
6. `npm run dev` to run the app


Note: Find orginal urls above on elephantSQL

# Talking to the server
You can talk to the server using [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) or any other API platform for developers to design, build, test and iterate the APIs within this application.


# View ERD
- You can click onto the file in the "assets" folder, which will have a screenshot of an ERD that was created during the process in the early development stages of the project.
