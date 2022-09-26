const apiKey = 'DEMO_KEY';
//WITH NASA API PICTURE OF THE DAY
const APIPOD = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

//WITH NASA API MARS PICTURES

// set the date to the last
let datePictureMars = new Date();
datePictureMars.setDate(datePictureMars.getDate() - 2);

// convert  date into api earth_date requirement
function formatDate(date) {
	let d = new Date(date),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();
	return [ year, month, day ].join('-');
}
let currentDateForAPi = formatDate(datePictureMars);

//APIURL
const APIMARSPERSEVERANCEPHOTOS = `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?earth_date=${currentDateForAPi}&page=1&api_key=${apiKey}`;

//function to make the promise
const fetchData = async (Apiurl) => {
	const response = await fetch(Apiurl);
	const data = await response.json();
	// console.log(data);
	return data;
};

// function to make the container of nasa API picture of the day
(async () => {
	try {
		const callingThecontentContainer = document.getElementById('contentContainerPOD');
		const images = await fetchData(APIPOD);
		let view = `
		<img src="${images.url}" class="card-img-top nasa-image-style" alt="...">
		<div class="card-body nasa-card-body-styles">
		<h2 class="card-title card--principal-title__font-style">${images.title.toUpperCase()}</h2>
		<p class="card-text text-center card__text--font-style" >${images.explanation}</p>
		</div>
		
		`;
		callingThecontentContainer.innerHTML = view;
	} catch (error) {
		const callingTheErrorTrigger = document.getElementById('errorTrigger');
		let errorView = `
		<div class="card carderror__container" style="width: 18rem;">
		<img src="../img/error_image.jpg" class="card-img-top" alt="...">
		<div class="card-body">
		<h5 class="card-title"> SOMETHING IS WRONG</h5>
		<p class="card-text">Please try to refresh the page.</p>
		<a href="#" class="btn btn-primary">Go somewhere</a>
		</div>
		</div>
		`;
		callingTheErrorTrigger.innerHTML = errorView;
		console.error(error);
	}
})();

// function to make the container of nasa API mars pictures
(async () => {
	try {
		const callingThecontentContainer = document.getElementById('contentContainerMarsRoverPhotos');
		const data = await fetchData(APIMARSPERSEVERANCEPHOTOS);
		const dataPhoto = data.photos;
		dataPhoto.forEach((picture) => {
			let view = `
			<div class="card card_container-mars__width" >
			<img src="${picture.img_src}" class="card-img-top" alt="...">
			<div class="card-body card-mars-picture-information__body-card__background-color">
			<p class="card-text text-center card-mars-picture-information__picture-description--fontweight-style">This picture was taken in ${picture.earth_date} by the  rover perseverance with the camera called ${picture
				.camera.name}</p>
				</div>
				</div>
				`;
				callingThecontentContainer.innerHTML += view;
			});
		} catch (error) {
			const callingTheErrorTrigger = document.getElementById('errorTrigger');
			let errorView = `
			<div class="card carderror__container" style="width: 18rem;">
			<img src="../img/error_image.jpg" class="card-img-top" alt="...">
			<div class="card-body">
			<h5 class="card-title"> SOMETHING IS WRONG ${error}</h5>
			<p class="card-text">Please try to refresh the page.</p>
			<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
			</div>
			`;
			callingTheErrorTrigger.innerHTML = errorView;
			console.error(error);
		}
	})();
	
	
	// Button mail toggler
	let buttonToggler = false;
	const clickMailEvent = () => {
		const bringingTheContainerOfEmail = document.getElementById('iFClickInMail');
		if (!buttonToggler) {
		let view = `
		<p class="text-center" style="margin-bottom: 1em;">Press the button again, if you want to vanish the text below.</p>
		<h2 class="text-center mail__effect--style" REFL-TEXT>miguelalejovaron@hotmail.com</h2>

		`;
		bringingTheContainerOfEmail.innerHTML = view;
		buttonToggler = true;
	} else {
		let view = ``;
		bringingTheContainerOfEmail.innerHTML = view;
		buttonToggler = false;
	}
};




















