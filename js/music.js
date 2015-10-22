window.addEventListener('load', function() {
	console.log('event load?');

	Parse.initialize("cD8q8sYVMPJrG0RH9fZw0roir7DN5M6VeEuvERTU", "PGGzTijtgpOB8N5u2441olHIXnmQd3JG81pzXT40");
	var Music = Parse.Object.extend('Music');

	document.getElementById('save').onclick = saveData;
	document.getElementById('button').onclick = getData;



	function saveData() {
		var inputs = document.getElementsByTagName('input');
		var music = new Music();
		console.log(inputs);
		music.set('band', inputs[0].value);
		music.set('website', inputs[1].value);
		music.set('song', inputs[2].value);
		music.save();
		for (input in inputs) {
			inputs[input].value = '';
		}	
	}

	function getData() {
		console.log('Getting Data');
		document.getElementById('list').innerHTML = 'Getting Data...';
		var query = new Parse.Query(Music);
		query.notEqualTo('website', '');
		query.find({
			success: function(data) {
				console.log(data);
				buildList(data);
			}
		})
	}

	var buildList = function(data) {
		document.getElementById('list').innerHTML = '';
		for (dat in data) {
			addItem(data[dat]);
		}
	}

	var addItem = function(dat) {
		console.log(dat);
		var list = document.getElementById('list');
		var item = document.createElement('li');
		var remove = document.createElement('button');
		var link = document.createElement('a');
		link.href = 'https://www.youtube.com/results?search_query=';
		link.innerHTML = dat.get('band') + ' ' + dat.get('song')
		link.href+= link.innerHTML.replace(' ', '+');
		link.href+= '&page=&utm_source=opensearch';

		remove.classList.add('btn', 'btn-danger');
		remove.innerHTML = 'remove';
		remove.id = dat.id;
		remove.onclick = deleteItem;

		list.appendChild(link);
		item.appendChild(remove);
		list.appendChild(item);
	}

	function deleteItem() {
		console.log('herp da derp')
		var query = new Parse.Query(Music);
		query.get(this.id, {
			success: function(d) {
				d.destroy({
					success: getData
				});
			},
			error: function(d) {
				alert('Error, could not delete. ' + d);
			}
		});
	}

});