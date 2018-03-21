var fs = require('fs');
var argv = require('yargs')
        .option('i', {
            alias: 'find',
            demandOption: false,
            describe: 'Intput the items of array(Comma Seperated)',
            type: 'string'
        })
        .option('f',{
            alias: 'items',
            demandOption: false,
            describe: 'Input Number to find',
            type: 'number'
        }).help().argv;

          
var square = (arr) => {
    var sq =[];
    for (var i = 0, len = arr.length; i < len; i++) {
        sq.push(arr[i] * arr[i]);
    }
    return sq;
};

if(argv.i){
    var array = new Array();
    array = argv.i.split(",");
    for(var i = 0, len = array.length; i < len; i++){
        if(isNaN(array[i])){
           console.log('Check Your Input Array');
           process.exit(1);
        }
    }
    fs.writeFile('data.txt', array , (err) => {
                if (err) throw err;
  });
}else{
    try{
        var file = fs.readFileSync('data.txt');
        var array = JSON.parse("[" + file + "]");
    }catch(e){
        var array=[];
    }
}
    if(!array.length>0){
        console.log("Re-Run the program with array Items (ex: node app.js -i 10,12....)");
        process.exit(1);
    }

console.log("");
console.log("---------------------------");

if(argv.f){
    var position = array.indexOf(argv.f);
    if(position===-1){
        console.log("Item Not Found in Array");
    }else
    {
        console.log(`Position of your Element is: ${position + 1}`)
    }
}
console.log(`Available Array : ${array}`);

console.log(`Square of your Array elements : ${ square(array) }`);
console.log("---------------------------");