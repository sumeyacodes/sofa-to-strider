<h1 align = "center">Sofa to Strider</h1>

<p align = "center"><b>Overview</b>: <i>"After the past 13 weeks, as we’ve been sat inside, spring has now sprung and we wanted to make sure that we get outside as much as possible. Our app breaks down the barrier and ultimate excuses of not knowing when and where to go." </i></p>

  <img align = "center" src="/readme-images/sofa-to-strider-logo-and-title.PNG" alt="StS logo and title">

------------

## Deployment location

For ease of use, please visit our app on: https://sofa-to-strider.vercel.app/

<h4><u>Advisory:</u></h4> In order to get the optimal functionality of this app, please ensure your device's 'Location' option is enabled, then you should see the following prompt upon launch:  
  
  <img align = "center" src="/readme-images/location-permission.png" alt="location-request-prompt">

## Installation

To run this via the repo - Inside your VScode terminal, enter the following:

```bash
    npm i
    npm run dev
```
... and open the local http link provided.

------------

## Presentation Slides  

Please follow the following canva link: https://www.canva.com/design/DAGg9DRpKIU/4-uQgSAMVfflawEi4iwZrw/edit

## The Brief  

At the School of Code, our goal was to create anything we envisioned within the short timeframe of one week. This project encompassed everything we had learned, ensuring that we utilised only the necessary tools and techniques to solve the problem effectively.

## Documentation 

<h3><u>App Outline</u></h3>  
Our app tackles three barriers that prevent people getting out for a walk:

-  In the UK it can be hard to find a window of nice weather.    
-  People can’t think of where to go.   
-  Life and lethargy get in the way. Our app tells people WHEN to walk, WHERE to walk, and WHY to walk.    
   
Our WHEN solution uses a weather API to find the best one hour window on each of the next three days. Our WHERE solution pulls local green spaces from google and presents appealing photos which can be clicked on to get directions from where you are now. Our WHY solution offers pithy motivational reminders and busts excuses. The app is a progressive web app so for easy access from your phone that provides geo-relevant information.  

<h3><u>Mobile First</u></h3> 
With an focus for getting our users to venture into regular, refreshing walks into local perhaps unknown vistas or natural points of interest, naturally our app made sense to execute in a mobile first approach:  

  <img align ="center" src="/readme-images/where-to-go-screenshot-mobile.png" alt="Where-to-go-mobile-view">

----------------------------------

<h3><u>MVP</u> - Completed: 2025/03/05</h3>

- 'When' section, 3 Weather Windows (Dry Spell) from a fixed location 
- Functional API fetch calls to OpenWeather 
- Placeholder 'Where' section to show location intent (3 PH pictures)
- Basic Style Formatting

<h3><u>MS1</u> - Completed: 2025/03/06</h3>

- 'Where' section populated with 3 actual nearby 'parks' (from google places API)
- 'Why' section, which functions as a motivational prompt (randomly generated)
- Improved Styling, with a focus to ensure it's optimal on mobile
- Improved 'When' weather logic, to generate the best 3 weather windows within the next 48 hours
- Unit testing for weather logic

<h3><u>MS2</u> - Completed: 2025/03/06</h3>

- Route link on 'Where' card when clicked, takes the user to google maps
- Geolocation fallback functionality

## Future Milestones

<h3><u>MS3</u></h3>

- PH Text
- PH Text
- PH Text

## Authors

Created by Team Lash'n  
<i><b>aka:</b> @Lizwade, @Al-lamb, @Sumeyacodes, @Hannalysis & @Newmaldenite</i>