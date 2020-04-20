
var ourRequest = new XMLHttpRequest();
var clickCounter = 0;

var ourButton = document.getElementById('get-details');
var ourDiv = document.getElementById('results');

ourButton.addEventListener('click', function(){
	ourRequest.open('GET', 'https://raw.githubusercontent.com/khadijah15/khadijah15.github.io/master/BigMusic.json');

	ourRequest.onload = function(){

		if (ourRequest.status >=200 && ourRequest.status<400){
			var ourData= JSON.parse(ourRequest.responseText);
			renderHtml(ourData);	
		}
		else {
			console.log('We connected to the server but it returned an error');
		}

	};

	ourRequest.onerror = function(){
		console.log('Connection Error');
	};


	ourRequest.send();

	clickCounter++;

	if (clickCounter >= 1){
		ourButton.setAttribute('disabled', 'disabled');
	}
});


function renderHtml(data){
	var htmlString = '';
	var death_year, left_office;

	htmlString += '<table><tr> <th>Artist</th> <th>Venue</th> <th>Date</th> <th>City</th> <th>State</th><th>Show Time</th> <th>Price</th> </tr>';

	for (i=0;i< data.length;i++){
		if(data[i].death_year == null){
			death_year = ' - ';
		}
		else {
			death_year = data[i].death_year;
		}

		if(data[i].left_office == null){
			left_office = ' - ';
		}
		else {
			left_office = data[i].left_office;
		}
		htmlString += '<tr>';
		htmlString += '<td>'+ data[i].artist + '</td>';
		htmlString += '<td>'+ data[i].venue + '</td>';
		htmlString += '<td>'+ data[i].date + '</td>';
		htmlString += '<td>'+ data[i].city + '</td>';
		htmlString += '<td>'+ data[i].state + '</td>';
		htmlString += '<td>'+ data[i].show_time + '</td>';
		htmlString += '<td>'+ data[i].price + '</td>';
		
	}

	htmlString += '</table>';
	ourDiv.insertAdjacentHTML('beforebegin', htmlString);
}



