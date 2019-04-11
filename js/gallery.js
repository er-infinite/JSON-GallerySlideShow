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

// Counter for the mImages array
var mCurrentIndex = 0;

function swapPhoto() {

  //if current index is less than the number of images in the array
  // do the following
  if (mCurrentIndex < mImages.length ){
    //select photo div, change image to corresponding index number
    $('#photo').attr('src', mImages[mCurrentIndex].imgPath);
    console.log(mCurrentIndex);
    //increase index number
    mCurrentIndex ++;
    //else if index reaches end of gallery, restart slide show to first image
  }else{
    mCurrentIndex = 0;
  }
}

//--- Part 2: XMLHttp Request & Creating JSON object ---

//Store location of JSON file in mURL
// const mURL = "images.json";

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

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
          //push gallery image properties (location, description, date, path) into mImages array
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
mRequest.open('GET', mUrl, true)
mRequest.send();


//--- Iterate through JSON object ---
// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

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

  //rotate moreIndicator and display details when clicked
  $('.moreIndicator').on('click', () =>{
    // $('.moreIndicator').addClass("rot270").hasClass("rot90");
    // $('.moreIndicator').removeClass("rot270").addClass("rot90");
  $('.moreIndicator').toggleClass('rot90 rot270');
  $("div.details").fadeToggle();
  console.log('mouse click');
  });

  $("#nextPhoto").on('click', ()=>{
    swapPhoto();
  })

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

function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {},
   tokens,
   re = /[?&]?([^=]+)=([^&]*)/g;
   while (tokens = re.exec(qs)) {
     params[decodeURIComponent(tokens[1])]
     = decodeURIComponent(tokens[2]);
   }
   return params;
 }

var $_GET = getQueryParams(document.location.search);
console.log($_GET["json"]); // would output "John"
