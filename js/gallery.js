// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded
	//from the JSON string
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

//--- LOADING JSON FILE ---

//Create new XMLHTTPRequest object
const mRequest = new XMLHttpRequest();

//load XMLHTTPRequest object
mRequest.onload = function(){

  //check if request is OK
  if(this.status === 200){
    //try to parse response object
    try{
      //xhr.responseText is parsed to create into a javascript object
      const resObj = JSON.parse(this.responseText);
      console.log(resObj);
    }catch (e){
      console.warn('Error in the JSON. Could not parse');
    }

    // console.log(this.responseText)
  }else{
    console.warn('Request not successful');
  }

};

//setup request and get a response
mRequest.open('GET', 'images.json')
mRequest.send();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {

	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

});

window.addEventListener('load', function() {

	console.log('window loaded');

}, false);

//Photo object is created with the following properties: location, description, date, and source
function GalleryImage(imgLocation, imgInfo, imgDate, imgURL) {
  this.imgLocation = imgLocation;
  this.imgDescription = imgInfo;
  this.imgDate = imgDate;
  this.imgURL = imgURL;

}




//Create a JSON object that contains the retrieved JSON3 string (in this case, a list of photo URLsand related metadata).
