# Movies_WebApp

## Prerequisites

1. Please make sure you have Docker Desktop installed https://www.docker.com/products/docker-desktop/

## Steps to run the application

1.  Open your terminal and navigate to the project directory:

        cd Movies_web

2.  Run the app using Docker Compose by running the following command:

        docker compose up --build

3.  By default, the frontend will be available at: http://localhost:3000

If something else is using port 3000, open the docker-compose.yaml file and change this line under the frontend service:

    ports:
        - "3000:3000"

    to

    ports:
        - "3001:3000"

Then access the app at http://localhost:3001

### Using the web application:

1. When the homepage loads, click the View All button (animated) to unlock the interface and enable scrolling.

2. Use the search bar to filter movies by name.

3. Use the Genres dropdown to filter by genres. Click a genre to add or remove it from the filter. Active filters are displayed below the dropdown.

4. Click on a movie's image or Learn More button to view its detailed page.

## Testing

### Unit Tests (via Jest)

To run Jest tests inside the Docker container, inside movies_web run the following command:

    docker compose exec frontend npm run test

This will run all unit tests and generate a coverage report.
