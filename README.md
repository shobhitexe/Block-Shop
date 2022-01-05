# Block-Shop
## Features
1. Purchase products
2. Submit reviews for products
3. Read untampered product reviews which are stored in the blockchain
4. Gain loyalty points for writing reviews 
5. Prevents review tampering by storing reviews in the blockchain 
6. Prevents spamming fake reviews as users can review each product only once after purchasing the product
## Tech Stack Used
1. FrontEnd 
* React used for building frontend of the webapp
* HTML used for structuring the webapp
* CSS used for styling the webapp
* Javascript used for bulding a dynamic webapp
3. BackEnd
* Python django framework for backend database and API calls
* Solidity used for writing smart contract for storing product reviews in the blockchain currently deployed on Rinkeby Test Network
## Project Components
1. Python Libraries
* asgiref==3.3.4
* Django==3.2
* django-cors-headers==3.7.0
* djangorestframework==3.12.4
* djangorestframework-simplejwt==4.6.0
* gunicorn==20.1.0
* Pillow==8.2.0
* PyJWT==2.0.1
* python-dotenv==0.19.2
* pytz==2021.1
* sqlparse==0.4.1
* whitenoise==5.3.0
2. Nodejs Packages 
* "@testing-library/jest-dom": "^5.11.10",
* "@testing-library/react": "^11.2.6",
* "@testing-library/user-event": "^12.8.3",
* "@truffle/hdwallet-provider": "^2.0.0",
* "axios": "^0.21.1",
* "dotenv": "^10.0.0",
* "ganache-cli": "^6.12.2",
* "jquery": "^3.6.0",
* "live-server": "^1.2.1",
* "react": "^17.0.2",
* "react-bootstrap": "^1.5.2",
* "react-dom": "^17.0.2",
* "react-paypal-button-v2": "^2.6.3",
* "react-redux": "^7.2.3",
* "react-router-bootstrap": "^0.25.0",
* "react-router-dom": "^5.2.0",
* "react-scripts": "4.0.3",
* "redux": "^4.0.5",
* "redux-devtools-extension": "^2.13.9",
* "redux-thunk": "^2.3.0",
* "truffle": "^5.3.2",
* "web-vitals": "^1.1.1",
* "web3": "^1.3.5"
3. UI Components
* Button 
* Carousel
* Form
* Icon
* Input Field
* Navigation Bar
## Installation
1. Instructions to visit web app
* visit link : https://blockshop-web.herokuapp.com/

2. Instructions to RUN the project locally
* Download the project folder
* Install necessary dependencies by typing `pip install -r requirements.txt` in command prompt in the folder containing requirements.txt file
* Install necessary dependencies by typing `npm install` in command prompt in the folder containing package.json file
* In the backend root directory of project, type `python manage.py runserver` in command prompt
* In the frontend root directory of project, type `npm start` in command prompt
* Visit the frontend link and explore the webapp
 
## Screenshots
### Landing Page
![land](https://user-images.githubusercontent.com/73059947/148222358-15ef78df-14b1-4287-82cf-47dbaa887d0f.png)



### Product Description and Review Section 
![product](https://user-images.githubusercontent.com/73059947/148222405-7ca1180d-bd89-4b9e-9d97-8056840dc47c.png)



### User Profile and Orders Section
![profile](https://user-images.githubusercontent.com/73059947/148222479-25b0d1e7-c860-4bdc-a073-03ef06f436c2.png)



### Order Payment and Review Writing Section
![payment](https://user-images.githubusercontent.com/73059947/148222560-4fa69fcd-7135-4276-b2a0-6927953d9074.png)



### User Cart Page
![cart](https://user-images.githubusercontent.com/73059947/148222829-004ada5f-12d6-40e4-9dc8-bd6a39b6369f.png)
