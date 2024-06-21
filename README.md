# CRM API Project

## Overview

This Customer Relationship Management (CRM) project is a web application designed to manage customer data, track interactions, and streamline various business processes. It offers a comprehensive set of features to handle customer information, employee assignments, employee attendance and site management effectively. The CRM system is built using Node.js for the backend, with Express.js for routing and MongoDB for the database. The frontend utilizes React, Tailwind CSS, and Material UI for the user interface.

## Technologies Used

Back-End
- **Axios**: A promise-based HTTP client for making API requests.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine, used for backend development.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database used for storing and managing the application's data.

Front-End [View](https://github.com/smitkevadiya50/CRM)
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

### Attendance Endpoints

#### Add Attendance
- **URL:** `/attendance/start`
- **URL:** `/attendance/end`
- **Method:** `POST`
- **Role:** Make an attendance of the employee for Start time and end time in the CRM system.