
/*******************************************************************************************************************************/
/* Name: Google First Result Scraper                                                                                           */
/* Description: Scan file and returns first google result URl for each query in file.  Results in output file                  */
/* Version: 0.1                                                                                                                */
/* Developer: Maxime Ouellette                                                                                                 */
/*******************************************************************************************************************************/

var inputFile = "bloggers.txt";
var outputFile = "bloggers-url.txt";

var google = require('google')
var fs = require('fs');
var nextCounter = 0;
var j =0;
google.resultsPerPage = 1;


var listBloggers = fs.readFileSync(inputFile).toString().split('\n');

function scrapeTheG(rand, j)
{

  google(listBloggers[j], function (err, res){
    if (err) console.error(err)
   
    for (var i = 0; i < 1; ++i) {
      var link = res.links[i];
      //console.log(link.title + ' - ' + link.href)
      //console.log(link.description + "\n")

      fs.appendFile(outputFile, listBloggers[j] + "," + link.href + "\n", function(err) {
          if(err) {
              return console.log(err);
          }
      });

    }
   
    if (nextCounter < 0) {
      nextCounter += 1
      if (res.next) res.next()
    }
  })
}


// Starts and loops through file 
// Sleeps between 1-10 secs between each query                   
// Take first Google Result and keep "name,url"  in output file

(function loop() {
    
    var rand = Math.round(Math.random() * (10000 - 1000)) + 1000;
    console.log("Searching for " + listBloggers[j] + " in " + rand + "ms");

    setTimeout(function() {
            scrapeTheG(rand, j);
            
            j++;
            if (j < listBloggers.length)
            {
              loop();  
            }
            else
            {
              console.log("Finished!");
            }
            
    }, rand);
}());
