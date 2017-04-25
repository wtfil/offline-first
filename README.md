# offline-first
This is demo application for [KyivJS](http://kyivjs.org/) meetup. The goal is to show, how `service workers` could be useful for making offline first applications.

The app itself is a tiny react app which uses the `github` api. You can search for repositoris, put or remove stars and read the `readme` files.

## install
  
    npm install
 
you need to have `GITHUB_CLIENT` and `GITHUB_SECRET` variables set in you environment in order to use the github auth (but this is not necessary)

## start

    npm start
    
## demo

The app run on heroku ([https://offlinefirst.herokuapp.com/](https://offlinefirst.herokuapp.com/)). Try to turn on/off your wifi and see how it feels
