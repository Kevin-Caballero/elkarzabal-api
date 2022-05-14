<p align="center">
  <img src="https://scontent.fbio2-1.fna.fbcdn.net/v/t31.18172-8/29351908_946620352160208_4762732608021438010_o.jpg?_nc_cat=105&ccb=1-5&_nc_sid=973b4a&_nc_ohc=Sm2VX6ejdxwAX8uMpE9&_nc_ht=scontent.fbio2-1.fna&oh=9a3e314b9759660681419ceb210a4d7e&oe=61AFDDA1" width="320" alt="Nest Logo" />
</p>


## Description

This API provides secure endpoints to manage the shipments of any business. 

It uses JWT to ensure request. To get one of this tokens you should have an account and be logged.

For more info run the app as explained bellow and [click here](http://localhost:3000/doc).

## Folder structure
```bash
.                   
├── elkarzabal-app/
├── elkarzabal-api/
└── docker-compose.yml
```

## Before start
Ensure you have environment files in the root of the api project

## Launching project

```bash
#1- Creating docker images:
docker-compose build

#2- Generating containers:
docker-compose up

#3- Seeding database (inside API container):
npm run seed:run


# Optional (inside API container)
# if you need to restart the db run the following command:
npm run schema:restart
```

## Stay in touch

- Backend dev - [Kevin Caballero](mailto:kcaballero@birt.eus) - [Github profile](https://github.com/Kevin-Caballero)
- Backend dev - [Sara Bozal](mailto:sbozal@birt.eus)
- Frontend dev - [Aitor Dominguez](mailto:adominguez@birt.eus)
- Frontend dev - [Ruben Cordero](mailto:rcordero@birt.eus)

