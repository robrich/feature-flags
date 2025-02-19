Feature Flags
=============

This repository is the code demos for the Feature Flags: Separate Deployment and Release talk: https://robrich.org/slides/feature-flags/

This includes .NET and Node.js servers showing various feature-flag data stores:

1. Config file
2. Database
3. Database with user-specific overrides
4. Various Feature Flag vendors:
   - [Launch Darkly](https://launchdarkly.com/)
   - [Harness.io](https://www.harness.io/)
   - [Azure App Configuration](https://learn.microsoft.com/en-us/azure/azure-app-configuration/manage-feature-flags)

Usage
-----

In each chapter, the usage is the same.  Start the chosen server, then optionally start the React client.


### Run the server

#### .NET

1. Open the `*.sln` file in Visual Studio

2. Right-click on the project -> Manage User Secrets

3. Set the secret to match appsettings.json with the service's API key

4. Start the app

5. Browse to https://localhost:7000/swagger


#### Node.js

1. Open a terminal in the same folder as `package.json`.

2. `npm install`

3. If it exists, copy `.env-example` to `env`.

4. Adjust the `.env` file to taste, adding the service's API key

5. `npm run build && npm start`


### Run the client: React

1. Open a terminal in the `client-app` folder.

2. `npm install`

3. Modify `.env` to point to your chosen server: `dotnet` or `node.js`.

4. `npm run build && npm run dev`

5. Browse to https://localhost:4000


License
-------

MIT, Copyright Richardson & Sons, LLC
