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

This also applies to the backend (by default port 4000), and for database (port 5433, already changed from default port 5432)

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

## Technologies required

- Component-based JS library such as Stencil / VueJS / Next / React (✅ Used Next.js)
- SCSS (✅)
- TypeScript(✅)
- Basic API layer to serve the provided movie library json (Node backend / PHP backend) (✅ Used Node)
- Automated tests (basic component level tests) (✅ Used Jest)
- Responsive design (✅)

- #### Extra Credit

- Dockerising your working solution (✅ Dockerised into 3 containers - frontend, backend and db)
- Serving the data from a database instead of the json file (✅ Used postgres db, loads json data on first build)
- Mobile-first (✅)
- Use Application State Management (Redux / VueX) (🚫 Redux would have been overkill for this simple application, however I have experience working with Redux on other projects)
- Integration level E2E tests (✅ Used Playwright)
