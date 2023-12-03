# backups-back
A NodeJS back-end to recover backups.

## Project Structure
 - `index.js`: The main entry point of the application.
 - `config.js`: Contains configuration files for the application.
 - `authorization`
   - `controllers`: Controller files for authentication endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the authentication routes.
 - `main`
   - `controllers`: Controller files for general endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the general routes.

## Usage

To start the service, run the following command:
```shell
npm start
```