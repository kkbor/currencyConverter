# currencyConverter
A simple web application that will allow users to convert currencies.

Figma design
https://www.figma.com/site/07DkvdCOWnYMWQ4BSf04qh/Przeliczanie-walut?node-id=0-1&t=XWvG4yZHTKjwElcU-1


Features
- Retrieving current exchange rates from the public API
- Cross-rate calculation (handling non-EUR base currency limitations)
- Selecting two currencies for conversion
- Entering an amount
- Displaying the converted value
- History of recent conversions
- Marking currencies as favorites
- Quick selection of favorite currencies
- Backend currency symbol cache
- Responsive design

Project Architecture

The project is divided into two modules:

    /backend   → Express + proxy API
    /frontend  → React + TypeScript (Vite)

The separation allows:
- hiding the API key
- managing cache on the server side
- improving security
- preparing the app for production deployment

Backend

Technologies:
- Node.js
- Express
- TypeScript
- node-fetch
- dotenv
- CORS

Responsibilities:
- Acts as a proxy to an external currency API,
- hides the API key (stored in .env),
- implements a simple in-memory currency symbol cache,

Frontend

Technologies:
- React
- TypeScript
- Vite
- Custom Hooks

Frontend structure:

    API/ → Backend Communication
    Components/ → UI Components
    Hooks/ → Application Logic (Custom Hooks)
    Pages/ → Pages
    Types/ → Type Definitions
    Utils/ → Helper Functions
    Styles/ → Styling

The following features were implemented:

- separation of logic from the UI layer (custom useCurrencyConverter hook)
- modular component structure
- storing history and favorites in localStorage
- state control using React hooks

Data Storage
- Conversion history is stored in localStorage
- Favorite currencies are stored in localStorage
- Currency symbols are cached in server-side memory to reduce latency and API consumption (volatile cache).

Installation and Running
    Requirements
        Node.js >= 18

    git clone https://github.com/kkbor/currencyConverter.git
    cd currencyConverter

    The application uses ExchangeRatesAPI for exchange rate data.
    To run the project locally:

        Register at: https://exchangeratesapi.io/

        Generate an API key.

        Create a .env file in the /backend directory:

        EXCHANGE_RATES_KEY=your_key_api

    Running the Project in development mode
    You can run the app in two ways:
        Option 1 – Run frontend and backend separately
        Backend:
            cd backend
            npm install
            npm run dev
        Frontend:
            cd frontend
            npm install
            npm run dev

    Option 2 – Run both from root directory (recommended)
        From the main project folder:
            npm install
            npm run dev
        This uses concurrently to start both frontend and backend at the same time.
    

    To build and run the production version:
        From the main project folder:
            npm run build
            npm run start



Possible Improvements
-Add TTL-based rate cache
-Add unit tests
-Add swap currency button
-Add Docker support
-Deploy to Render / Railway

Author
Katarzyna Borysiak

