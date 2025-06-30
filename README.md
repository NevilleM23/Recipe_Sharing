# Recipe Sharing App 

**The Recipe Sharing App** is an all-in-one platform that combines recipe discovery  and grocery shopping assistance into a single application.

## Key Features 

###  Interactive Recipe Cards
- recipe presentations with photos
- Difficulty ratings & cooking times

### Smart Search & Filter
- Search by name or ingredients
- Filter by cost, difficulty, or cook time
- Personalized recommendations

###  User Accounts & Contributions
- Create accounts & save favorites
- Share your own recipes
- Upload photos & instructions

###  Ingredient Price Lookup
- Compare prices across local stores
- Interactive grocery store map
- Price history graphs

###  Recipe Organization
- Save and like recipes
- Create personal collections
- Access favorites across devices


## Getting Started 

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v14+)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/NevilleM23/Recipe_Sharing.git
cd Recipe_Sharing

# Set up backend
stay in project root
pipenv install
pipenv shell
# Edit .env with your credentials

# Set up frontend
cd client/client
npm install

# Create database and user (PostgreSQL commands)
sudo -u postgres psql -c "CREATE USER recipe_user WITH PASSWORD 'secure_password';"
sudo -u postgres psql -c "CREATE DATABASE recipe_app OWNER recipe_user;"
sudo -u postgres psql -d recipe_app -c "CREATE EXTENSION IF NOT EXISTS postgis;"


# Start backend
flask run

# In a new terminal, start frontend
cd client/client
npm start

Project Link: https://github.com/NevilleM23/Recipe_Sharing
