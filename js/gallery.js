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

//--- Part 2: XMLHttp Request & Creating JSON object ---

//Store location of JSON file in mURL
const mURL = "images.json";

//Create new XMLHTTPRequest object
const mRequest = new XMLHttpRequest();

//load XMLHTTPRequest object
mRequest.onreadystatechange = function(){

  //check if request is OK
  if(mRequest.readyState == 4 && mRequest.status == 200){
    //try to parse response object
    try{
      //xhr.responseText is parsed to create into a javascript object
      mJson = JSON.parse(mRequest.responseText);
      console.log(mJson);

      //For each item in mJson, Loop through and push each GalleryImage element into mImages array
      for(var i = 0; i < mJson.images.length; i++){

          mImages.push(new GalleryImage (mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date, mJson.images[i].imgPath));

      }
      console.log("MJSON LENGTH: " + mJson.images.length);
      // mImages.push(new GalleryImage mJson);
      console.table(mImages);

    }catch (err){
      console.log(err.message);
    }
  }
};


//setup request and get a response
mRequest.open('GET', mURL, true)
mRequest.send();

// //Create new XMLHTTPRequest object
// const mRequest = new XMLHttpRequest();
//
// //load XMLHTTPRequest object
// mRequest.onload = function(){
//
//   //check if request is OK
//   if(this.status === 200){
//     //try to parse response object
//     try{
//       //xhr.responseText is parsed to create into a javascript object
//       const resObj = JSON.parse(this.responseText);
//       console.log(resObj);
//
//     }catch (e){
//       console.warn('Error in the JSON. Could not parse');
//     }
//
//     // console.log(this.responseText)
//   }else{
//     console.warn('Request not successful');
//   }
// };
//
//
// //setup request and get a response
// mRequest.open('GET', 'images.json')
// mRequest.send();

// function loadImages(){
//   const request = new XMLHttpRequest();
//
//   request.open('GET', 'images.json');
//   request.onload = () => {
//
//     try{
//       const mJson = JSON.parse(request.responseText)
//       populateRankings(mJson);
//     }catch (e){
//       console.warn('Error in the JSON. Could not parse')
//     }
//   };
//
//   request.send();
// }
//
// function populateRankings(json){
//   console.log(json);
// }
//
// loadImages();
//

//--- Iterate through JSON object ---
// Array holding GalleryImage objects (see below).
var mImages = [];


var img = new Image();
//log quantity of images in document
console.log('After: ' + document.images.length);

// img.src = 'url';

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
  this.description = imgInfo;
  this.date = imgDate;
  this.imgPath = imgURL;

}
