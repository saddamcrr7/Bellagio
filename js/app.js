var url = `http://www.belgiumny.com/api/DeveloperAPI?stock=&APIKEY=E9BF0C81-67DE-7030-E56F-52FFB78322BC`

var request = new XMLHttpRequest();

request.open('GET', url)


request.onload = function () {
    var data = JSON.parse(this.response)
    console.log(data.Stock);
    var items = data.Stock

    
    items.forEach(item => {
        console.log(item);
    });
    
}

request.send();