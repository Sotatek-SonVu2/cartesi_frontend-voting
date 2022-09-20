# Frontend DApp Voting

This project demonstrates how to implement a frontend application to send inputs to a Cartesi Rollups DApp, both running locally and deployed on remote testnet networks.
It's implemented in Typescript and uses the [ethers](https://docs.ethers.io/v5/) library to communicate with the rollups smart contracts.

## Functions

Here are all the system functions available:

```shell
Connect/disconnect to MetaMask,
View campaigns/candidates list
Add, edit, and delete campaigns
Vote
Deposit CTSI tokens
View vote result
View campaign/candidate detail
View history
Notification
Withdraw
```

## Requirements

- node.js
- yarn
- MetaMask wallet

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

In the .env file, you will see the configurations for the 3 environments: `Host mode | Production mode | Testnet mode`. Please pay attention to match the mode you want to use in the application. 

In addition, you must also change the network on MetaMask to match each mode. [See details here](https://github.com/Sotatek-SonVu2/cartesi_frontend_voting#environments)

Then, run the application by executing the following command:

```shell
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Environments
This application can be executed in Host, Production and Tetsnet modes, as explained below.

As discussed above, this project demonstrates how to implement a frontend application to send inputs to a Cartesi Rollups DApp. The front-end and back-end parts of a Cartesi DApp communicate with each other through the Rollups framework. This is accomplished in practice by using a set of HTTP interfaces, which are specified in Cartesi's OpenAPI Interfaces repository. 
[See details here](https://github.com/cartesi/rollups-examples)

### Host mode
This mode is deployed on:

```shell
Network: Localhost 8545
Chain id: 31337
```

To run the backend for host mode, you can see the instructions [here](https://github.com/Sotatek-ManhNguyen3/cartesi_voting_system/tree/master_complex_version_0.9/voting#running-the-environment-in-host-mode)

### Production mode
This mode is deployed on:

```shell
Network: Localhost 8545
Chain id: 31337
```

To run the backend for production mode, you can see the instructions [here](https://github.com/Sotatek-ManhNguyen3/cartesi_voting_system/tree/master_complex_version_0.9/voting#running-the-environment-in-host-mode)

### Testnet mode
This mode is deployed on:

```shell
Network: Goerli Test Network
Chain id: 5
```

To run the backend for Testnet mode, you can see the instructions [here](https://github.com/Sotatek-ManhNguyen3/cartesi_voting_system/tree/master_complex_version_0.9/voting#running-the-environment-in-host-mode)

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

## Note
**Here are some things to keep in mind when you run the frontend application. It is some inconvenience that the application is having and it will be fixed in the next versions the future.**
- On the first run, when making 1 transaction via Metamask, you should reset your account on MetaMask. What you need to do: `open Metamask > Settings > Advanced > Reset Account`. And then send the transaction that you made earlier. This makes all your transactions faster.

