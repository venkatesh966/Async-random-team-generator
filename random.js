var fs = require('fs');
var randomization = require('shuffle-array');
var math=require('math');
var wri= fs.createWriteStream("out.txt");
const readline = require('readline');
var randomization = require('shuffle-array');
var path = "C:\\ran\\rand.json";//giving path where required json file located//
fs.readFile(path, 'utf8', function (err,teamdata) {
  if (err) throw err;
  console.log(teamdata);

var parsed = JSON.parse(teamdata);
var teamdata1=[];
for(var x in parsed.members){
teamdata1.push(parsed.members[x]);//passing values into the array teamdata


}
randomization(teamdata1);//randomizing the values of teamdata
console.log(teamdata1);
const rl = readline.createInterface({
    input: process.stdin,                      //for taking input value
    output: process.stdout
  });
  console.log('enter the team size and it should be less than ');
  console.log(teamdata1.length);
  
  rl.question('enter size of team ', (n) => {
    console.log(`the size  of each team: ${n}`);
  
    rl.close();

    if(n>teamdata1.length)
    {
      console.log('team size exceeded');
    }
  
    else
    {
      if(teamdata1.length%n==0)
      {
          console.log("teams can be divided into equal parts");
      }
      else{
          console.log("teams cant be divided into equal parts but we can divide into un equal parts");
      }
    }
    var noteams=math.floor(teamdata1.length/n);
    var lsize=math.floor(n/1);//for operations on variable n storing into other variable
    console.log(lsize);
    console.log(noteams);
    var teamnumber=1;
    for(var i=0;i<noteams;i++)
    {
        wri.write("\n\n");
        wri.write("team"+teamnumber+":"+"\n\n");//this line  is for writing to the file
        teamnumber++;
        var k=math.floor(i*lsize);
        var m=math.floor(lsize+i*lsize);//for reducing time for program calculating outside of loop
        for(var j=k; j< m; j++)
        {
            wri.write(JSON.stringify(teamdata1[j])+"\n");//this line  is for writing to the file
        }      
    }
    if ( teamdata1.length%lsize!=0)
    {
    wri.write("\n\n");//this line  is for writing to the file
    wri.write("team"+teamnumber+":"+"\n\n");
    }
    
    for(;j<teamdata1.length;j++)
    {
        wri.write(JSON.stringify(teamdata1[j])+"\n");//this line  is for writing to the file
        //converting into string format
    }
  });
  //JUST DISPLAYING THE RESULTS IN BROWSER//
  var http = require('http');//http module importing
  
  http.createServer(function(req, res){        //callback function
    res.writeHead(200, {'Content-type':'text/plain'});
  
    res.write('Browser display');
    fs.readFile('out.txt', 'utf8', function (err,data) {
        if (err) throw err;
        console.log(data);
    res.end(data);//passing text 
    });
  
  }).listen(7000);//this is the port number
  
});