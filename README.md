
## Setup Instructions

Follow these steps to get the application running locally:

### 1. Clone the Repository

Clone the repository to your local machine.

```bash
git clone https://github.com/Vinny-vinny/newsApp.git
cd newsApp


### 2. Build the Docker Containers

docker-compose build

### 4. Start the Containers
docker-compose up -d

### 6. Migrate the Database (Backend)

docker-compose exec backend php artisan migrate

### 7. Run scheduled command to get news from NewsApi
php artisan fetch:news
