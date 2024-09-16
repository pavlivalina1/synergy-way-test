# Synergy-Way-Test React Project

This project is a React-based web application using Tailwind CSS and `react-mosaic-component`. It includes company information rendering with customizable windows.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project Locally](#running-the-project-locally)
- [Building and Running the Project with Docker](#building-and-running-the-project-with-docker)


## Prerequisites

Before running the project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

For Docker setup, you will need:

- [Docker](https://www.docker.com/)

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/synergy-way-test.git
    ```

2. Navigate to the project directory:
    ```bash
    cd synergy-way-test
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Running the Project Locally

To run the project locally:

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

3. The application should now be running.

## Building and Running the Project with Docker

If you prefer to run the project inside a Docker container, follow these steps:

1. Build the Docker image:
    ```bash
    docker build -t synergy-way-test .
    ```

2. Run the Docker container:
    ```bash
    docker run -p 3000:3000 synergy-way-test
    ```

3. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```


