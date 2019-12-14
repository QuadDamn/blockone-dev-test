
# Block.one Developer Test  
  
This repository is represents the finalized source code for the Node.js Developer Test for Block.one.  
  
## Developer Information  
  
### Prerequisites  
  
This project requires Node v12.13.1 or later.  
  
### Installation  
  
```  
$ git clone https://github.com/QuadDamn/blockone-dev-test.git  
$ cd blockone-dev-test  
$ npm install # This will handle the install for both the Node.js server packages and then the React packages in the `app` directory.
$ npm run dev # This will start both the Node.js API and the React frontend.
```  

You can view the application at http://localhost:3000 after completing the last step in the installation instructions.
  
### Running Test Suite  
  
In the project directory, run the following to kick of the Jest/Supertest tests:  
  
```sh  
npm test  
```  
  
  
## Project Thoughts  
  
### Submission Assumptions  

- While this was mainly a Node.js test, I made the assumption it would be alright to try to flex some basic React skills as well as the position that I am applying for is a full-stack role.  I did this in lieu of the Mustache templating.
- I was planning to modify the timestamp structure, but there were no requirements to clean that up, so I left it alone.  If I was planning to clean it up, I would use [Moment](https://momentjs.com) and translate it to `MM-DD-YYY HH:mm:ss` format.  I am not sure with how you do things at Block.one if those milliseconds are important, so I didn't want to hazard a guess!  
  
### Potential API Resource Improvements  
  
*Please note that this is nothing more than constructive criticism and I'd love to work with someone to shore up this documentation if brought onboard.*  
  
I found the API documentation for Nodeos to be lacking (that could be my lack of exposure to blockchain technology though, so take this with a grain of salt!).  Given that this documentation speaks to a more technical audience and might influence someone's initial impression of the product offering, I think more detailed documentation similar to the detail you would find with the [Stripe API documentation](https://stripe.com/docs/api) might bode well.  
  
Some of my recommendations to start would be:  
  
* The documentation for each endpoint could use a more detailed description.  As an example, the `push_transaction` and `send_transaction` endpoint have the same description and.  Why would I use one over the other?  What makes each of the endpoints unique?  
* In the `History` API, the deprecation warnings could benefit from a bit more emphasis so that it is clear that this endpoint has deprecated dependencies.  Could those warnings potentially be moved closer to the top of the documentation block for that endpoint?  
* Where the response output is (right-most column of the page), ensure that the output is consistent.  
   * The endpoints that seem to work in this regard have the `http://{host}:{port}` as part of the REST action instead of the `http://localhost:8000`.  
   * Some of the endpoints that do work still are missing a proper response for the status codes shown.  An example of this is the `get_actions` endpoint.  
   * The response schema field descriptors for the `get_info` endpoint were done well.  I feel like most other endpoints could use that same level of detail just to make it more clear what each field represents.