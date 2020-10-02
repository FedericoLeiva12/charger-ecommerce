# Charger Ecommerce

Proyecto realizado en la cursada de la bootcamp Soy Henry, realizada en un equipo de 5 personas utilizando la metodologia Scrum.

## Tecnologias usadas

### Frontend
- React hooks
- Redux
- Material UI
- Axios

### Backend
- Nodejs
- Express
- Sequelize (PostgreSQL)
- Mailgun
- Passport

## ¿Como correr el proyecto?
- Crea una base de datos en PostgreSQL con un nombre a eleccion. En este ejemplo le pondremos "development". Se crea con el siguiente comando: `CREATE DATABASE development;`
- Crea un archivo dentro de la carpeta "api" llamado ".env" con el siguiente contenido:
`DB_NAME=development
DB_HOST=localhost
DB_PASSWORD=TuContraseña12345`
- Corre el comando npm install tanto en la carpeta "api" como en "client", y luego podras iniciar ambos utilizando "npm start" en cada una de las carpetas.
