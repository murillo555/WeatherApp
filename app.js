const { Menuopt,ReadInput,pause,listLocations } = require("./Controllers/menu");
const Search = require("./Models/search");
require('dotenv').config(); 

const main = async () =>
{

const search = new Search();
let opt;
do {
    console.clear();
    opt = await Menuopt();

    switch (opt) {
        case    1:


            const SearchLocat= await ReadInput();

            const locations = await search.location(SearchLocat);
            console.clear();

            console.log('========================'.green);
            console.log('Locations Found'.white);
            console.log('========================\n'.green);
            const idlocationSelected = await listLocations(locations);
            console.clear();

            if(idlocationSelected ==0 )  continue;
        
            const locationSelectedById = locations.find(location =>location.id==idlocationSelected);


            console.log(locationSelectedById.name);
            search.addRecord(locationSelectedById.name);
            const weather = await search.Weather(locationSelectedById.lat,locationSelectedById.lng);
            console.log('========================'.green);
            console.log('Location Information'.white);
            console.log('========================\n'.green);
            console.log('Location: '.green,`${locationSelectedById.name}`.cyan);
            console.log('Lat: '.green, `${locationSelectedById.lat}`);
            console.log('Lng: '.green, `${locationSelectedById.lng}`);
            console.log('Weather: '.green,weather.desc);
            console.log('C°: '.green,weather.temp);
            console.log('Min C°: '.green,weather.min);
            console.log('Max C°: '.green,weather.max);
            break;
        case    2:
            console.clear();
            console.log('========================'.green);
            console.log('Search History'.white);
            console.log('========================\n'.green);
            search.RecordCorrectName.forEach((location,id)=>{
                number=`${id+1}`.green;
                console.log(number,' ',location.cyan)
            })
            console.log();
            break;
        case 0:
            console.log('opcion 3');
            break;
    
        default:
            break;
    }

    await pause();
    console.clear();


} while (opt != 0);
}

main();