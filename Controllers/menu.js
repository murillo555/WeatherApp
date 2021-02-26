const colors = require('colors');
const inquirer = require('inquirer');
/*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                                   Menu Options                                          //
////////////////////////////////////////////////////////////////////////////////////////////
*/
const Menuopt = async() =>
{ 
    const questions = 
    [
    {
    type: 'list',
    name: 'option',
    message: 'Select an Option',
    choices: [
        {value:1, name:`${'1.'.green} Search Location`},
        {value:2, name:`${'2.'.green} History`},
        {value:0, name:`${'3.'.green} Finish`},
    ]
    }];

    console.clear
    console.log('========================'.green);
    console.log('Select an Option'.white);
    console.log('========================\n'.green);


    const {option} = await inquirer.prompt(questions);
    return option;
};
/*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                                  Menu Pause                                            //
////////////////////////////////////////////////////////////////////////////////////////////
*/
const pause = async() => inquirer.prompt([{type:'input', name:"Pause", message:`Press ${'Enter'.green} to continue: `}]); 
/*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                                  Read Users Input                                       //
////////////////////////////////////////////////////////////////////////////////////////////
*/
const ReadInput = async (message) =>

    {
     const question = 
        [{
            type: 'input', 
            name: 'desc',
            message,
    
            validate(value)
            {
                 if(value.length == 0) return 'Please type a value';
                 return true;
            }
        }
     ];
    const {desc} = await inquirer.prompt(question);
    return desc;  
};
/*
//////////////////////////////////////////////////////////////////////////////////////////////   
//                           List Locations obtained by search.location                    //
////////////////////////////////////////////////////////////////////////////////////////////
*/
const listLocations = async (locations = []) =>
{
    const choices= locations.map((locat,i)=>
    {
        let number = `${i+1}. `.green
        return {
            value:locat.id,
            name:`${number} ${locat.name}`
        }
    });

    choices.unshift({ 
        value:0,
        name: '0'.green + ' cancelar'
    })

    const question =[
        {
            type:'list',
            name:'id',
            message:'Select a Location: ',
            choices
        }
    ]
    const {id} = await inquirer.prompt(question);
    return id;
}
    

module.exports = 
{
    ReadInput,
    Menuopt,
    pause,
    listLocations
}