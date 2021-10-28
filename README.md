# Project Management API

Project Management API.

## **WARNING**

> *Before run the app copy **.env.example** file to **.env** and write all credentials to **.env***

## Development

```bash
# Development
$ npm run start

# Development hot reload
$ npm run start:dev
```

## Deployment Manually

### Requirements

```bash
# Install Node 14
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt-get install -y nodejs
# Install pm2 and nestjs worker globally
$ sudo npm i -g pm2@latest @nestjs/cli
```

### Deploy Commands

````bash
# Installation
$ npm install
# Build project
$ npm run build
# In the project root folder
$ pm2 start dist/main.js --name example-api
# Put to system start up
$ pm2 startup systemd
# Save config
$ pm2 save
````

--------------------------------------------------------------------------------------------------

## Deploy With Docker

### Requirements

````bash 
# Run this command to download the current stable release of Docker Compose:
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Apply executable permissions to the binary:
$ sudo chmod +x /usr/local/bin/docker-compose

# You can also create a symbolic link to /usr/bin or any other directory in your path.
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Test the installation.
$ docker-compose --version
````

### Deploy Commands

````bash
# In the project root folder
$ docker-compose up -d
````

