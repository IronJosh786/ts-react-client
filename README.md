# React Frontend Boilerplate

This is a starter project for building a React.js frontend with libraries like TanStack Query, React Router DOM, Zod and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [License](#license)

## Features

- **API Data Fetching**: TanStack Query for efficient server state management.
- **Authentication**: Global 401 handling and token refresh mechanism to keep users authenticated.
- **React Router**: Client-side routing with React Router DOM.
- **Form Validation**: Zod for type-safe schema validation.
- **Private Routes**: Protected routes accessible only to authenticated users.
- **UI Components**: Styled using Tailwind CSS and ShadCN.

## Technologies Used

- **Vite**: Fast bundling and development server.
- **React**: Frontend library for building UI components.
- **React Router DOM**: Routing library for navigation.
- **Zod**: Validation library for data schema validation.
- **TanStack Query**: Data fetching and caching for server state.
- **ShadCN and Tailwind CSS**: Styling and component libraries for responsive design.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/IronJosh786/ts-react-client.git
   cd ts-react-client
   ```

2. **Environment Variables**:

   Create a `.env` file in the root directory with the following keys:

   ```bash
   VITE_BASE_URL=http://localhost:3000/api   # Backend API base URL
   ```

3. **Install dependencies**:

   ```bash
     npm i
   ```

4. **Run the server**:

   ```bash
     npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
