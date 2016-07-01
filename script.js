var video_list = document.querySelector('ul.references');
var lightbox = document.querySelector('.lightbox');
var lightboxIFrame = lightbox.querySelector('iframe');

function init() {
	gapi.client.setApiKey('AIzaSyDWefrjR9n3ewOYRwBw6QtbJM3lxNu2fEs');
	gapi.client.load('youtube', 'v3', function() {

		var request = gapi.client.youtube.playlistItems.list({
	    	part: 'snippet',
	    	playlistId: 'PLJELNfll_7iBNi0BBZXQTwpkiyiQR1wqO',
	    	maxResults: 50
	  	});

		request.execute(function(response) {
			for (var i = 0; i < response.items.length; i++) {
				var item = document.createElement("li");
				var anchor = document.createElement("a");
				anchor.setAttribute('href', 'https://www.youtube.com/watch?v=' + response.items[i].snippet.resourceId.videoId);
				anchor.setAttribute('data_resourceId', response.items[i].snippet.resourceId.videoId);
			   	var title = document.createElement("h3");
			   	title.appendChild(document.createTextNode(response.items[i].snippet.title));
				title.setAttribute('title', response.items[i].snippet.title);
			   	var image = document.createElement("img");
			   	image.setAttribute('src', response.items[i].snippet.thumbnails.default.url); 
			   	var description = document.createElement("p");
				description.classList.add('prewrap');
			   	description.appendChild(document.createTextNode(response.items[i].snippet.description));
			   	anchor.appendChild(image);
			   	anchor.appendChild(title);
			   	anchor.appendChild(description);
			   	item.appendChild(anchor)
				video_list.appendChild(item);
				//console.log(response.items[i].snippet);
		   }

			var videoLinks = video_list.querySelectorAll('a');
			   for (var i = 0; i < videoLinks.length; i++) {
				videoLinks[i].addEventListener('click', function(event) {
					lightboxIFrame.setAttribute('src', 'https://www.youtube.com/embed/' + this.getAttribute('data_resourceId') + '?rel=0&showinfo=0&autoplay=1&modestbranding=1&theme=light');
					lightbox.classList.remove('hidden');
				  	event.preventDefault();
			    });
			}   
			video_list.classList.remove('loading');
		});
	});
}
function focusHash() {
	if (document.location.hash) {
		// todo: move to correct position
		document.querySelector(document.location.hash).scrollIntoView();
	}	
}
focusHash();

window.addEventListener('resize', function(event) {
	focusHash();
});

function closeLightbox() {
	lightboxIFrame.setAttribute('src', 'about:blank');
	lightbox.classList.add('hidden');
}
