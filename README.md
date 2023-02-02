# DevCoin 🏛️💰💱

https://dev-coin.web.app/

A fullstack JS crypto exchange app for the web.

### Backend Repository

https://github.com/JRobuschi/DEVCOIN

### Used technologies

| Tool            | Used to                                                                     |
| --------------- | --------------------------------------------------------------------------- |
| ✅ React   | Creating the UI with state based components   |
| ✅ Vite  | Bootstraping the project in the most modern and efficient way   |
| ✅ TailwindCSS   | Style the components based on utility-first classes      |
| ✅ Firebase       | Upload and retrieve profile pictures              |
| ✅ Axios     | HTTP requests  |
| ✅ Browser Image Compression   | Compressing images before uploading                                          |
| ✅ Chart.JS      | Display cryptocurrencies data inside a chart                                                          |
| ✅ Moment.JS         | Date formatting                                                      |
| ✅ ReactRouterDom       | Routing and navigating the app |
| ✅ react-toastify          | Display toasts notifications to provide user feedback       |
| ✅ socket.IO | Stablishing and mantaingin a conneciton to a web socket for real time notifications   |

### Features

- Creating and verifing an account.
- Buying and selling cryptocurrencies.
- Transfering crypto among users.
- Light/Dark mode
- Personalize user data (change name/lastName/profilePicture/password)


### Global State Management

In order to manage global state without adding any extra dependencies, the app makes use of the ContextAPI.
First, the App component (the higher level one) fetchs all the necessary data and sets several states:

![Screenshot_5](https://user-images.githubusercontent.com/102425176/216169921-62dec5f8-fbad-4608-a1da-72486357aaf7.png)

Then, two objects are created holding these states: sessionData and coinsData, the first one keeps the user session data, such as the username, the unique hexacode used for sending transactions and so. The second one holds all data related to the current prices of different cryptos (provided by coinGECKO) and the unique wallet of the logged user. The objects are passed as values of the context Providers.
![Screenshot_6](https://user-images.githubusercontent.com/102425176/216168385-d5406d71-f20a-4dcb-bed3-46eb52ccdc52.png)

In order to make use of the context, we took advantage of the destructuring syntax of javascript.


![Screenshot_7](https://user-images.githubusercontent.com/102425176/216168761-9135682b-5c2e-4cdc-b0a2-9e5d4edd5bb2.png)

### Buying and Selling 

In order to buy and sell cryptocurrencies, the user has many links to the detail page of each coin.
![buycrip1](https://user-images.githubusercontent.com/102425176/216432281-d282f2ec-c46d-4cf4-aa8a-bde16d5c6c1b.png)

There, the user can see all the latest data about the coin, buy and selll.

![buu2](https://user-images.githubusercontent.com/102425176/216432345-24ee709f-8644-431a-ae73-b5cb4335e7d0.png)

###Deposit and Transactions

There's a view dedicated to hold the deposit of fiat money to the user's account and the transferences data (sending one and showing transferences history) and the current balance of the user's wallet.

![wallet1](https://user-images.githubusercontent.com/102425176/216433337-ae301f16-7687-4ebb-8d4c-4d74181b79bc.png)

Once you enter a valid value, the Deposit component lets you enter USD to your account.

![wallet2](https://user-images.githubusercontent.com/102425176/216433429-98939d19-eff7-4886-b507-de534eaa8c6e.png)

The transfer button activates once the user loads all the necesary data

![wallet3](https://user-images.githubusercontent.com/102425176/216433502-1cfbeb08-c32d-4bc2-9ae4-a62e2893df55.png)

The user can view his/her last 5 movements as sent or received transactions, and has the option to view all movements.







### Styling and Responsiveness

The app's design system is based on TailwindCSS, it's fully responsive and should render properly on all devices.



### Contact Us
<img src="https://camo.githubusercontent.com/7e1a1a039c75a7c4d2a91d7f97bf0a1c2adcf7cb49b7dbbfc02963a4f9fdaca4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b6564696e2d2532333030373742352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" alt="Linkedin" data-canonical-src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;">
<a href="https://www.linkedin.com/in/juan-cruz-robuschi/"><u>Robuschi Juan Cruz<u><a><br>
<a href="https://www.linkedin.com/in/victor-maximiliano-herrera/"><u>Herrera Victor Maximiliano<u>
</a><br>
<a href="https://www.linkedin.com/in/lautaro-rocha/"><u>Rocha Lautaro<u></a><br>
<a href="https://www.linkedin.com/in/lucaspereyradev/"><u>Pereyra Lucas<u></a><br>
<a href="https://www.linkedin.com/in/leonardo-sebastian-gauto-30a185216/"><u>Gauto Leonardo Sebastian<u> </a><br>
<a href="https://www.linkedin.com/in/gonzalo-ordo%C3%B1ez-8aa9b2177/"><u>Ordoñez Gonzalo<u></a><br>
