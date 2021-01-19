# GitHubBrowser

## Setup

### Prerequisites

The app has been built using React Native CLI (having [react-native-template-typescript](https://github.com/react-native-community/react-native-template-typescript) as template), so in short make sure you follow the next steps:
1. [Node & Watchman](https://reactnative.dev/docs/environment-setup#node--watchman)
1. iOS setup: [XCode & Cocoapods](https://reactnative.dev/docs/environment-setup#xcode--cocoapods)
1. Android setup: Open [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) -> select Android as Target OS -> follow "Java Development Kit" and "Android development environment" steps
1. `npm install -g yarn` (if you don't have it and if you prefer to install dependencies and run React Native commands using yarn instead of npm)
1. Optional: `npm install -g npx` - use npx to run React Native commands if you prefer 

If you want to have a better grasp of React Native setup, follow the entire content of [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

### Clone repository

````
git clone https://github.com/sergiulucaci/GitHubBrowser
````

### Setup ENV

Create a file called `.env` that should look like:
```
API_BASE_URL=https://api.github.com
API_BASE_URL_ACCEPTED_VERSION=application/vnd.github.v3+json
API_ACCESS_TOKEN=
```

Change **API_BASE_URL** and **API_BASE_URL_ACCEPTED_VERSION** only if GitHub API changes.

**IMPORTANT**: for **API_ACCESS_TOKEN** you will have to generate a new token using: https://github.com/settings/tokens/new. Otherwise you will have a small limit of GitHub Api requests per minute.

### Install dependencies
Assuming you have the terminal opened at the root of project: 
```
yarn install
```

### Install pods
Assuming you have the terminal opened at the root of project:
```
cd ios && pod install
```

### Running GitHubBrowser

#### Start Metro

```
yarn react-native start
```


#### Start GitHubBrowser

```
yarn ios
```

or

```
yarn android
```
