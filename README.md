# Shop-app-frontend
React application that connects to shop-app-backend
Includes dockerfile for easy testing, shop-app-backend includes docker compose to set up the whole environment with one command

## Features
* Register and login (login data as cookie, backend implements passport)
* Add item to cart
* Add same item +1 / Remove same item -1 / Remove item
* Clear cart
* Place order
* Order history
* All orders and order completion (Admin only)
* Automatic category sidebar, no need for configurations, code search for all categories from mongodb data

## Libraries used
* Material UI
* Redux
* Router
* Axios

# Todo
* Implement all features what backend has to offer, feedback for example