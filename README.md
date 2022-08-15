# Frontend Voting DDAPP

This project demonstrates how to implement a frontend application to send inputs to a Cartesi Rollups DApp, both running locally and deployed on remote testnet networks.
It's implemented in Typescript and uses the [ethers](https://docs.ethers.io/v5/) library to communicate with the rollups smart contracts.

## Requirements

- node.js
- yarn

## Building

To build the frontend application, first clone the repository as follows:

```shell
git clone https://github.com/Sotatek-SonVu2/cartesi_frontend_voting.git
```

Then, build the application by executing the following commands:

```shell
yarn
yarn pre-build
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Running
Before running the application, remember to configure the environment file for the project by performing the following steps:

```shell
create .env file
copy the contents of the file env-sample
paste in the .env file and save
```

Then, run the application by executing the following command:

```shell
yarn start
```

## Testing

```shell
yarn test
```

Launches the test runner in the interactive watch mode.

## Ejecting

```shell
yarn eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

