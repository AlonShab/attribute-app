## Better Weather

This is a demo project for attribute, this project was build with next using CSR

## How to run the app

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
(port number cannot be changed without changing the code, the server will prevent any other origin).

## Next steps
Of course there is a lot to add to the app in order to make it prod ready, listed below are some improvement for the app given more time to implement them.  

## Security
1. Convert HTTP to HTTPS - provide a more secure and communication protocol to prevent MIM attacks data sniffing and more.
2. Using refresh and authorization tokens, if more security is needed add a logging that will result in a refresh token cookie and an short timespan access token that actually let app users make requests. 
after logging in the client side will get a new access token using the refresh token cookie every 10-15 minutes.  
3. Add CSP file - we should tightly control what network requests and assets the client can request from external vendors (getting fonts, monitoring and logging services, accessing CDN, etc...)
4. Using a schema library - adding a library like zod to make sure the data remain valid on transfers.

## App architecture
1. Add an app wide error boundary - Wrap app in a class component that will handle errors at app level (using methods getDerivedStateFromError, ComponentDidCatch) and adding an error context to monitor error check them against known errors and registering them to a log service
2. Adding styles theme - Adding a centralized theme to the app that every component can get and keep code DRY.
3. Adding config file for deploying in different environments, right now for instance the handler is hardcoded checking to allow only localhost, there should be env variables using config files for easy deployment to dev, staging, prod.
4. Moving middlewares to separate functions and wrapping handlers in high order functions that use the middlewares instead of calling them directly from the handler
5. Debouncing and throttling requests - for performance we can prevent many requests if we debounce many requests that come at once and throttle requests (lets say 300ms) and prevent malicious actors from abusing API.
6. Adding responsive design - applying mobile-first styling that will use media queries to also support desktops, mobiles are the default as they are the vast majority of user devices.
7. Adding const files - error messages files for client & server and so on.. 
8. Optional - limit date-range - if product department approves we can limit (1 month, 1 year, 10 years, etc) the date range in order to insure max performance 
9. Optional - Adding session monitoring - aside from using regular logging I'd like to add a session replay ability using DataDog for instance which will provided a lot of utility when monitoring, finding and fixing bugs. also while there are other logging more dedicated to app usage tracking like mix panel we can use it to see how much traffic is in the app in any given time