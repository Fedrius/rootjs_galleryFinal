$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg'
];

var pictureNames = [
    'landscape-1',
    'landscape-10',
    'landscape-11',
    'landscape-13',
    'landscape-15',
    'landscape-17',
    'landscape-18',
    'landscape-19',
    'landscape-2',
    'landscape-3',
    'landscape-8',
    'landscape-9',
    'pexels-photo-132037',
    'pretty'
];

function initiateApp(){
	makeGallery(pictures);
	addModalCloseHandler();
	// Allows sorting images and reorders array
    $("#gallery").sortable({
        stop: function sortEventHandler(event, ui){
            var sortedArray = [];
            var grabList = $(this).children();
            for (var i = 0; i < grabList.length; i++){
                var imageGrab = $(grabList[i]).attr('style');
                var sliceOne = imageGrab.lastIndexOf('images');
                var sliceTwo = imageGrab.lastIndexOf('"');
                var slicedImage = imageGrab.slice(sliceOne,sliceTwo);
                sortedArray.push(slicedImage);
            }
            pictures = sortedArray;
            localStorage.clear(); //clears storage
            populateStorage(); //then makes a new one for the new sort
        },
    }).disableSelection();
}

function makeGallery(imageArray) {
    for (var galleryIndex = 0; galleryIndex < imageArray.length; galleryIndex++) {
        var createdPicture = $('<figure>').addClass('imageGallery col-xs-12 col-sm-6 col-md-4').css('background-image', 'url(' + imageArray[galleryIndex] + ')');
        createdPicture.click(displayImage);
        var figCaption = $('<figcaption>').text(pictureNames[galleryIndex]);
        createdPicture.append(figCaption);
        $('#gallery').append(createdPicture);
    }
    populateStorage();
}

function addModalCloseHandler() {
        $('img').click(function(){
        $('#galleryModal').modal('hide');
    });
}

function displayImage() {
    var clickedImage = $(this).css('background-image');
    var firstSlice = clickedImage.lastIndexOf('images');
    var secondSlice = clickedImage.lastIndexOf('"');
    var thirdSlice = clickedImage.lastIndexOf('.');
    var fourthSlice = clickedImage.lastIndexOf('/');
    fourthSlice++;
    var modalImg = clickedImage.slice(firstSlice, secondSlice);
    var modalTitle = clickedImage.slice(fourthSlice, thirdSlice);
    $('.modal-title').text(modalTitle);
    $('img').attr('src', modalImg);
    $("#galleryModal").modal('show');
}

//function for storing the array in local storage
function populateStorage() {
    for(var i = 0; i < pictures.length; i++){
        var slice1 = pictures[i].lastIndexOf('/');
        slice1++;
        var slice2 = pictures[i].lastIndexOf('.');
        localStorage.setItem(pictures[i].slice(slice1, slice2), pictures[i]); //setItem(name, value)
    }
}




