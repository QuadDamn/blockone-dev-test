
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
  
### Running Test Suite  
  
In the project directory, run the following to kick off the Jest/Supertest tests:  
  
```sh  
npm test  
```  
  
### Submission Assumptions  

- Given the instructions for the exercise, I used Node.js for the backend and React for the frontend.  I noticed that the bonus task said to use Mustache, so I assumed it would be alright to just implement the same thing in React and still use the `markdown-it` package.
- I am getting around a 4-6 load time on the API request to grab the latest 10 blocks.  I took some of the block IDs and did a Postman request for just one block at a time and most of the requests were coming back within 1-2 seconds.  I was thinking it was my code originally that was the issue, but it looks like it is just the response time from the Nodeos API.  Is this to be expected?
- My original thought was that you wanted me to count the number of transactions per block.  Then I took a closer look and saw that each transaction has a transaction object which has one or more actions associated with it.  So, I assumed that those are the actions that you wanted and you wanted me to total the count of those per transaction per block.  So, that is what I did.
- I was planning to modify the timestamp structure, but there were no requirements to clean that up, so I left it alone.  If I was planning to clean it up, I would use [Moment](https://momentjs.com) and translate it to `MM-DD-YYY HH:mm:ss` format.  I am not sure with how you do things at Block.one if those milliseconds are important, so I didn't want to hazard a guess!  