from app import create_app

app = create_app() 

print(f"Database URL: {app.config['SQLALCHEMY_DATABASE_URI']}")

if __name__ == '__main__':
    app.run(debug=True)