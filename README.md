# CRM API Project

## Overview

This Customer Relationship Management (CRM) project is a web application designed to manage customer data, track interactions, and streamline various business processes. It offers a comprehensive set of features to handle customer information, employee assignments, and site management effectively. The CRM system is built using Node.js for the backend, with Express.js for routing and MongoDB for the database. The frontend utilizes React, Tailwind CSS, and Material UI for the user interface.

## Features

Dashboard

- **Site Dashboard**: View and manage all construction sites, including details such as site name, location, owner information, and assigned employees.
- **Employee Dashboard**: Overview of all employees categorized by their roles (supervisors, managers, workers, helpers) with detailed information and easy management.

Employee Management
- **Categorized Employees**: Employees are categorized into supervisors, managers, workers, and helpers, allowing for easy management and assignment.
- **Add/Update Employees**: Add new employees or update existing employee details through intuitive forms.
- **Search and Select**: Use search-enabled dropdowns to quickly find and select employees when assigning roles.

## Site Management

- **Site Information**: Manage detailed information about each site including name, location, owner, assigned employees, joining and ending dates, and site logo.
- **Add/Update Sites**: Easily add new sites or update existing site details through a user-friendly form.
Assign Employees: Assign supervisors, managers, workers, and helpers to sites with search-enabled selection fields.
Real-Time Data
- **API Integration**: The application integrates with backend APIs to fetch and update data in real-time, ensuring the latest information is always available.
- **Loader for Data Fetching**: Displays a loader while fetching data from the server, ensuring users are aware of ongoing processes.


## Technologies Used

Back-End
- **Axios**: A promise-based HTTP client for making API requests.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine, used for backend development.
- **Express.js**: A minimal and flexible Node.js web application framework.

Front-End [View]('https://github.com/smitkevadiya50/CRM')
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Material UI**: A popular React UI framework that provides pre-designed components.


## Base URL

```bash
http://127.0.0.1:3001
```


## Endpoints

### Employee Endpoints

#### Add Employee
- **URL:** `/employee`
- **Method:** `POST`
- **Role:** Adds a new employee to the CRM system.

#### Get All Employees
- **URL:** `/employee`
- **Method:** `GET`
- **Role:** Retrieves a list of all employees in the CRM system.

#### Get Employees by Category
- **URL:** `/employee/by-category`
- **Method:** `GET`
- **Role:** Retrieves employees categorized by their roles (supervisors, managers, workers, helpers).

#### Update Employee
- **URL:** `/employee/:id`
- **Method:** `PUT`
- **Role:** Updates the details of an existing employee identified by their ID.

#### Delete Employee
- **URL:** `/employee/:id`
- **Method:** `DELETE`
- **Role:** Deletes an employee from the CRM system identified by their ID.

### Site Endpoints

#### Add Site
- **URL:** `/site`
- **Method:** `POST`
- **Role:** Adds a new site to the CRM system.

#### Get All Sites
- **URL:** `/site`
- **Method:** `GET`
- **Role:** Retrieves a list of all sites in the CRM system.

#### Update Site
- **URL:** `/site/:id`
- **Method:** `PUT`
- **Role:** Updates the details of an existing site identified by their ID.

#### Delete Site
- **URL:** `/site/:id`
- **Method:** `DELETE`
- **Role:** Deletes a site from the CRM system identified by their ID.

### Category Endpoints

#### Add Category
- **URL:** `/category`
- **Method:** `POST`
- **Role:** Adds a new category to the CRM system.

#### Get All Categories
- **URL:** `/category`
- **Method:** `GET`
- **Role:** Retrieves a list of all categories in the CRM system.
