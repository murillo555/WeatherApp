const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

class Search{

    record = [];    
    dbPath = './DB/database.json';

    constructor()
    {
     
        this.readDB()

    }
    /*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                          Capitilaze Correct Record Name                                 //
////////////////////////////////////////////////////////////////////////////////////////////
*/
    get RecordCorrectName()
    {

        return this.record.map(location=>
            {
                let word = location.split(' ');
                word = word.map(p=>p[0].toUpperCase() + p.substring(1));

                return word.join(' ');
            })
    }
    /*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                           Params for Mapbox Instance                                    //
////////////////////////////////////////////////////////////////////////////////////////////
*/

    get paramsLocationMapbox()
    {
        return {
        'access_token': process.env.MAPBOX_KEY, 
        'limit': 5,
        'language':'en,es'}
    }
    /*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                           Params for Weather Instance                                    //
////////////////////////////////////////////////////////////////////////////////////////////
*/
    get paramsWeatherMapbox()
    {
        return {
            appid:'e7f7adb3a45d72ad3452c599a8ecd611',
            units:'metric'
                    }
    }

        /*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                           Get the location data                                         //
////////////////////////////////////////////////////////////////////////////////////////////
*/
    async location(location='')
    {
        try {
            const intance = axios.create(
                {
                   
                    baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ location }.json`,
                    params:this.paramsLocationMapbox
                        
                    });
            const answ = await intance.get();
        
              
            return answ.data.features.map(locat =>
                ({ 
                    id:locat.id,
                    name:locat.place_name,
                    lng:locat.center[0],              
                    lat:locat.center[1]
                }));
        } catch (error) {
            console.log('');
            return [];
        }

        
       
    }
/*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                           Get the Weather data                                          //
////////////////////////////////////////////////////////////////////////////////////////////
*/
    async Weather(lat,lon)
    {
        try {
            const intance = axios.create(
                {
                    baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                    params:{...this.paramsWeatherMapbox, lat, lon}
                    });

            const answweather = await intance.get();
          
           const {main,weather} = answweather.data;
             
                return{
                    desc:weather[0].description,
                    temp:main.temp,
                    min:main.temp_min,
                    max:main.temp_max  
                }
            
        } catch (error) {
       
            return [];
        }
    }

/*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                           add data to record                                            //
////////////////////////////////////////////////////////////////////////////////////////////
*/
    addRecord(location="")
    {
        
        if(this.record.includes(location.toLocaleLowerCase())) 
        {
            return;
        }
        this.record.push(location.toLocaleLowerCase());
        //save DB
        this.saveDB();

    }
/*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                           Save in Data Base                                         //
////////////////////////////////////////////////////////////////////////////////////////////
*/
    saveDB(){
        const payload={
            record:this.record
        };
        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }
    /*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                          Read the Data Base                                             //
////////////////////////////////////////////////////////////////////////////////////////////
*/
    readDB()
    {
        if(!fs.existsSync(this.dbPath)){return null;}

        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'}); 
        const data = JSON.parse(info);
        this.record = data.record;
    }

}


module.exports = Search;