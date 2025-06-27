Recipe Sharing App - Flask API

A RESTful API backend for a recipe sharing platform built with Flask, SQLAlchemy, and JWT authentication.

Features

📝 Recipe management (create, read, update, delete)
🔐 JWT authentication & protected routes
❤️ Favorite recipes system
🛒 Ingredient price tracking
🏪 Local market integration
🔍 Search & filtering capabilities
📊 Database relationships (1-to-many, many-to-many)

Tech Stack
Backend:
- Python 3.10+
- Flask
- Flask-SQLAlchemy (ORM)
- Flask-Migrate (database migrations)
- Flask-JWT-Extended (authentication)
- SQLite (development)

Frontend-Compatible:
- Designed for React/Vue/Angular frontends
- CORS enabled
- JSON API responses

Key Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/register` | POST | User registration | No |
| `/api/auth/login` | POST | User login | No |
| `/api/recipes` | GET | Get all recipes | No |
| `/api/recipes` | POST | Create new recipe | Yes |
| `/api/recipes/<id>/favorite` | POST | Toggle favorite | Yes |
| `/api/ingredients` | GET | List all ingredients | No |
| `/api/markets` | GET | List local markets | No |

Setup Instructions
Prerequisites

- Python 3.10+
- pip
- SQLite (included with Python)

Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:NevilleM23/Recipe_Sharing.git
   cd Recipe-Sharing

Create and activate virtual environment:
bash
python -m venv venv
source venv/bin/activate  # Linux/Mac

Install dependencies:
bash
pip install -r requirements.txt

Set up environment variables:
bash
cp .env.example .env
Edit .env with your configuration.

Initialize database
bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

Running the Server
bash
flask run
# or for development:
flask run --debug
The API will be available at http://localhost:5000

Database Schema
(https://dbdiagram.io/d/Recipe-App-6859b290f039ec6d368881db)

Key relationships:
Users → Recipes (One-to-Many)
Recipes ↔ Ingredients (Many-to-Many)
Users ↔ Favorites (Many-to-Many)

Environment Variables
Variable	Description	Example
SECRET_KEY	Flask secret key	your-secret-key
JWT_SECRET_KEY	JWT signing key	jwt-secret-key
DATABASE_URL	Database connection URL	sqlite:///instance/recipe_app.db

Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Project Link: https://github.com/NevilleM23/Recipe_Sharing