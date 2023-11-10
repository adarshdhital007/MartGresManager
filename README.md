# MartGresManager with PostGres and Angular 17

MartGresManager is a robust inventory management system that seamlessly integrates Node.js, Express, PostgreSQL, and Angular 17. The backend, built with Node.js and Express, utilizes PostgreSQL for data integrity and Sequelize for efficient database interactions. The frontend, powered by Angular, offers a dynamic user experience with server-side rendering and hydration.The project prioritizes security with bcrypt.js encryption for passwords and offers a comprehensive set of API endpoints for CRUD operations on products. Users can explore the diverse product range, manage orders, and benefit from persistent login states.


## The project is well-documented and you can explore below.

# Demo:

![video](https://github-production-user-asset-6210df.s3.amazonaws.com/90372904/282180687-a6728714-2589-4644-882a-b6f7406a4f30.gif)

## Overview

1. **Node.js:**
   Utilizing the versatile and efficient Node.js platform, our project benefits from its asynchronous, event-driven architecture, ensuring optimal performance and scalability for server-side applications.

2. **PostGres:**
   Leveraging the robust capabilities of PostgreSQL, our database management system, ensures data integrity, reliability, and advanced features, contributing to a secure and high-performing backend infrastructure.

3. **Sequelize:** Utilizing Sequelize streamlines database interactions by providing a powerful ORM (Object-Relational Mapping) for Node.js. This simplifies database queries, migrations, and ensures a consistent and structured approach to managing data, enhancing the overall efficiency and maintainability of our backend system.

4. **Angular CLI:**
   Employing the Angular CLI provides a streamlined and efficient development experience for building dynamic and responsive web applications, allowing for rapid prototyping and seamless integration of components.

5. **Express:**
   With Express, a minimalist and flexible Node.js web application framework, our project enjoys a robust set of features for developing scalable and maintainable server-side applications, simplifying the creation of APIs and handling of HTTP requests.

6. **pg:**
   Integrating the pg library allows seamless communication between our Node.js application and PostgreSQL database, facilitating efficient data retrieval, manipulation, and management, ensuring a smooth interaction between the backend and database.

7. **cors:**
   The cors package enables Cross-Origin Resource Sharing, enhancing security by controlling access to our server resources from different domains, ensuring a secure and controlled environment for client-server interactions.

8. **dotenv:**
   Employing dotenv aids in managing environment variables, enhancing security and configurability.

9. **Bootstrap 5**: Bootstrap 5 is a front-end framework, enhancing web development with responsive design, utility classes, and improved customization for modern websites.

# Backend

Our backend is built with Node.js and Express, using an efficient asynchronous, event-driven architecture. We rely on PostgreSQL as our database, ensuring data integrity and seamless communication through the pg library. We also use dotenv for managing environment variables, adding an extra layer of security to our server. In essence, the combination of Node.js, Express, and PostgreSQL forms a robust and high-performance system that operates seamlessly to ensure reliability.

## Backend Setup:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adarshdhital007/MartGresManager.git
   ```

2. **Install the dependencies:**

   ```bash
   cd MartGresManager
   cd backend
   npm install
   ```

3. **Create a `.env` file and add the following configuration variables:**

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=password
   DB_DATABASE=MartGresManager
   ```

4. **Start the PostgreSQL DB.**

5. **Start the backend server:**

   ```bash
   npm start
   ```

6. **If the backend setup is perfect, then you can see all products in the url:**
   http://localhost:8080/api/products

# Product Insertion into DB (Most Important)

**Without inserting any products, you won't be able to observe any changes or view products on the website. To do so, you need to insert at least one product. For example, you can use Postman and make a POST request to http://localhost:8080/api/products or use curl.**

If you try to run the site, without inserting a products or creating. Then there will be an empty page . (Remember That!)
For your convenience, a comprehensive list of sample products is available in the Products file,information for creating products. I have created the products in such a way you just need to POST or use `curl` .This file serves as a valuable resource for creating the structure and attributes of the products that can be seamlessly integrated into your frontend.
The sample products are given in the [products](products.json) file for details.


# Additional Features:

1. **Seamless Database Integration:**
   Integrates effortlessly with a database using Sequelize for reliable storage and management of product information.

2. **Secure Cross-Origin Requests with CORS:**
   Prioritizes security by implementing Cross-Origin Resource Sharing (CORS) to control and restrict access to the API.

3. **Robust Product CRUD Operations:**
   Provides powerful Create, Read, Update, and Delete (CRUD) operations for efficient management of product data.

4. **Detailed Product Model:**
   Captures comprehensive product details, including name, cost, quantity, image URL, description, and features, ensuring thorough information storage.

5. **Dynamic Port Configuration:**
   Adapts to different environments with dynamic port configuration, allowing easy deployment and customization using the `PORT` environment variable.

6. **Clear and Concise Routing:**
   Defines clear and concise routes for different functionalities, making it easy to navigate and interact with the inventory management system.

## Usage:

The following API endpoints are available:

- `/products`: Get all products
- `/products/:id`: Get a product by ID
- `/products/create`: Create a new product
- `/products/update/:id`: Update a product
- `/products/delete/:id`: Delete a product

### Example:

1. **Get all products:**

   ```bash
   curl http://localhost:8080/api/products
   ```

2. **Get a product by ID:**

   ```bash
   curl http://localhost:8080/api/products/1
   ```

3. **Create a new product:**

   ```bash
   curl -X POST http://localhost:8080/api/products/create -H "Content-Type: application/json" -d '{
    "name": "Product 100",
   "description": "This is the new created product",
   "price": 200,
   "features": [
     "New Feature 1",
     "New Feature 2"
   ]
   }
   }'
   ```

4. **Update a product:**

   ```bash
   curl -X PUT http://localhost:8080/api/products/1 \
   -H "Content-Type: application/json" \
   -d '{
   "name": "Product 1 (updated)",
   "description": "This is the updated first product",
   "price": 200,
   "features": [
     "New Feature 1",
     "New Feature 2"
   ]
   }
   '
   ```

5. **Delete a product:**

   ```bash
   curl -X DELETE http://localhost:8080/api/products/1
   ```

6. **Get all products:**

   ```bash
   curl http://localhost:8080/api/products
   ```

7. **Get a product by ID:**

   ```bash
   curl http://localhost:8080/api/products/1
   ```

8. **Create a new product:**

   ```bash
   curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{
     "name": "Product 1 (updated)",
   "description": "This is the updated first product",
   "price": 200,
   "features": [
     "New Feature 1",
     "New Feature 2"
   ]
   }'
   ```

9. **Update a product:**

   ```bash
   curl -X PUT http://localhost:8080/api/products/1 -H "Content-Type: application/json" -d '{
     "name": "Product 1 (updated)",
   "description": "This is the updated first product",
   "price": 200,
   "features": [
     "New Feature 1",
     "New Feature 2"
   ]
   }'
   ```

10. **Delete a product:**

    ```bash
    curl -X DELETE http://localhost:8080/api/products/12
    ```

# Frontend

Our Angular frontend, powered by server-side rendering (SSR) and hydration, fetches real-time product data from our robust backend API, ensuring a dynamic user experience. Angular's 17 reactive programming enables instantaneous updates to the product data. With a modular design and SSR, we optimize initial page load times, providing users with a seamless and responsive interface to explore our diverse range of products.

# Additional Features:

1. **Protects Routes with Authentication Guard:**

   Utilizes an authentication guard (AuthGuard) to secure routes, ensuring that only authenticated users can access specific parts of the application. The guard redirects     unauthenticated users to the login page.

2. **Implements a Responsive Design:**
   Ensures that the application is responsive and works seamlessly across various devices and screen sizes.

3. **Integration with Reactive Forms:**
   Utilizes Angular Reactive Forms for form handling, providing a more dynamic and responsive user experience.

4. **Incorporates HTTP Interceptor for Token Handling:**
   Implements an HTTP Interceptor to handle authentication tokens, ensuring that the user remains authenticated throughout their session.

5. **Integration with RxJS for Reactive Programming:**
   Uses RxJS for reactive programming, enabling the application to handle asynchronous operations effectively.

6. **Implements Route Resolvers for Data Fetching:**
   Utilizes route resolvers to fetch necessary data before navigating to a route, ensuring that the required data is available when a component is rendered.

7. **Account-Specific Order History:**
   Users can conveniently review their entire order history, providing a personalized and efficient way to track past purchases.

8. **Encrypted Account Information Storage:**
   Prioritizes the security of user data by incorporating encryption mechanisms for storing account-related information, ensuring confidentiality and privacy.

9. **Persistent Login State:**  
   Enhances user experience with a persistent login state using localStorage. After a successful login, the user's authentication token is securely stored, ensuring continued access to personalized content even after page refreshes.

## Initial Setup:

**For concise details, you should first completely observe the services folder in depth.**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adarshdhital007/MartGresManager.git
   ```

2. **Install the dependencies:**

   ```bash
   cd MartGresManager
   cd frontend
   npm install
   ```

3. **Serve the frontend:**

   ```bash
   ng serve
   ```

## Server Setup

**Navigate to frontend/services directory**

**app.js :** This Node.js server, built with Express, manages user registration, authentication, and order storage using PostgreSQL. It employs JWT tokens for secure communication. The server exposes endpoints for user registration, login, order history retrieval, and saving purchase receipts. CORS is enabled for all routes, and the server runs on port 3000. The PostgreSQL database includes tables for users and purchase receipts. Passwords are hashed using bcrypt. The '/protected' route requires a valid JWT token for access. The '/save-receipt' endpoint saves purchase receipts, '/register' registers users, and '/login' handles user authentication. The server exemplifies a secure and functional backend setup.

3. **Run the main server**

   ```bash
   node app.js
   ```

## Test the project

Once you've successfully configured all components, navigate to http://localhost:4200. From there, explore the products page where you can effortlessly add items to your cart and proceed to checkout. Your checkout details will seamlessly and automatically be stored in the database for a smooth and efficient user experience.

## Security ?

My system makes it easy for you to log in smoothly without any errors. When you sign up, it checks for duplicate usernames to keep your information correct. This careful process ensures that your details are stored accurately, creating a reliable and user-friendly platform.

For extra security, I use bcrypt.js when you sign up. This encryption method is like a secret code that makes it hard for attackers to figure out your password. It's a smart way to keep sensitive information, especially passwords, safe. This not only follows good practices but also shows that I'm serious about keeping things secure. Using bcrypt.js means I prioritize protecting your data, setting a high standard for security and making sure you feel confident that your personal information is safe and private.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
