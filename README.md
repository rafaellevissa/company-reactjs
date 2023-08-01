# REACTJS CHALLENGE

## TECHNOLOGIES
- React
- TypeScript
- Material UI (MUI)

## REQUIREMENTS
- NPM

## INSTALL

Once you have the project on your computer, you just need to install the dependencies with npm:

```
npm install 
```

After everything is installed, change the credencials at `.env` and run it with the folowing command:

```
npm start
```

### Install with Docker Compose

Alternatively, you can run the project with Docker. Make sure the `.env` file is correctly set up, and then build a Docker image using the following command:

```
docker compose build
```

Once the image is built, start the container:

```
docker compose up -d
```

That's all you need 🎉!

## RUNNING ON EC2 WITH SWARM AND DOCKERHUB IMAGES

The React app is currently running on an EC2 instance that is configured with Docker Swarm. The Docker images required for the app are stored in DockerHub.

You can access the running application on the following address:

```
http://54.197.74.184:3000/
```

To log in to the system, use the following credentials:

```
Username: admin@email.com
Password: 123Change@
```