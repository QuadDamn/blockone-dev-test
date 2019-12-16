
# Block.one Developer Test  
  
This repository represents the finalized source code for the Node.js Developer Test for Block.one.  
  
## Developer Information  
  
### Prerequisites  
  
This project requires Node v12.13.1 or later.
  
### Installation  
  
```  
$ git clone https://github.com/QuadDamn/blockone-dev-test.git  
$ cd blockone-dev-test  
$ npm install # This will handle the install for both the Node.js server dependencies in the root directory and then the React dependencies in the `app` directory.
$ npm run dev # This will start both the Node.js API and the React frontend.
```  

You can view the application at http://localhost:3000 after completing the last step in the installation instructions.
  
### Running Test Suites
  
In the root of the project directory, run the following:
  
```sh  
npm test # This will run the Node API / functional tests.
cd app && npm test # This will run the React unit tests.
```  