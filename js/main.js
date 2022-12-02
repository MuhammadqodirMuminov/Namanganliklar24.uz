const addPostbtn = document.querySelector(".add-post");
const cardParent = document.querySelector(".article");
const rowDiv = document.querySelector(".row");
const elModal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const elForm = document.querySelector(".form");
const elCencelbtn = document.querySelector(".cencel");
const modalTwo = document.querySelector(".modal2");
const modalThree = document.querySelector(".modal3");

const elInpurTitle = document.querySelector(".input-title");
const elInpurSubtitle = document.querySelector(".input-subtitle");
const elInputImg = document.querySelector(".input-image");
const elIputTime = document.querySelector(".input-time");
const elIputDate = document.querySelector(".input-date");
const elCreatePost = document.querySelector(".submit");
const deletePost = document.querySelector(".del");
const editPost = document.querySelector(".edit");
const updatePost = document.querySelector(".update");
const deletebtn = document.querySelector(".delbtn");

// opening modal

addPostbtn.addEventListener("click", function () {
	if (posts.length <= 3) {
		elModal.style.top = "0";
		elModal.classList.toggle("modal-active");
	} else {
		elModal.classList.toggle("modal-active");
	}
});

// closing input modal

closeBtn.addEventListener("click", function (e) {
	e.preventDefault();
	elModal.classList.remove("modal-active");
});

// creating post

function addPost(items) {
	cardParent.textContent = "";
	for (let i = 0; i < items.length; i++) {
		const element = items[i];
		const postDiv = document.createElement("div");

		postDiv.className = "row";
		postDiv.innerHTML = `
                                <img data-id="${element.id}" style = " border-radius: 5px; "
                                    src="${element.image}"
                                    alt="sputnik"
                                    width="252px"
                                    height="143px" />
                                <div class="article-right">
                                    <h4 data-id="${element.id}" style = " text-align: start; " class="article-title texts">
                                        ${element.title}
                                    </h4>
                                    <p data-id="${element.id}" style = " text-align: start; " class="article-subtitle">
                                        ${element.subtitle}
                                    </p>
                                    <div class="time-icon">
                                        <img src="./images/time-icon.png" alt="taymer" />
                                        <p class="time-value">${element.time} / ${element.date}</p>
                                        <button class="del" data-id="${element.id}"> <img src="./images/trash.svg" alt="del" />del</button>
                                        <button  class="edit" data-id="${element.id}"><img src="./images/pencil.svg" alt="del" />edit</button>
                                    </div>
                                </div>
                           
                            `;

		cardParent.appendChild(postDiv);
	}
}

// post created

addPost(posts);

// editing posts

updatePost.addEventListener("click", function (evt) {
	evt.preventDefault();
	let dataId = document
		.querySelector(`input[id="thisid"]`)
		.getAttribute("data-id");

	let img = document.querySelector(`input[id="updateimage"]`).value;
	console.log(img);
	let title = document.querySelector(`input[id="updatetitle"]`).value;
	let subtitle = document.querySelector(`input[id="updatesubtitle"]`).value;

	const elements = [
		document.querySelector(`h4[data-id="${dataId}"]`),
		document.querySelector(`p[data-id="${dataId}"]`),
		document.querySelector(`img[data-id="${dataId}"]`),
	];
	elements[0].innerHTML = title;
	elements[1].innerHTML = subtitle;
	elements[2].setAttribute("src", img);
	modalThree.classList.remove("modal-active");
});

// users posts created

elForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const title = elInpurTitle.value;
	const subtitle = elInpurSubtitle.value;
	const image = elInputImg.value;
	const time = elIputTime.value;
	const eldate = elIputDate.value;
	const date = eldate.split("-").join(".");

	const thePost = {
		id: posts.length,
		title: title,
		subtitle: subtitle,
		image: image,
		time: time,
		date: date,
	};

	posts.push(thePost);

	addPost(posts);
	console.log(thePost);
});

// delete bot warning

function showModal() {
	modalTwo.classList.add("modal-two");
}

//  delete post

cardParent.addEventListener("click", function (evt) {
	const elem = evt.target;

	if (elem.matches(".del")) {
		showModal();
		const id = elem.dataset.id;
		deletebtn.addEventListener("click", function () {
			const filteredArray = posts.filter((item) => {
				if (item.id != id) {
					return elem;
				}
			});
			posts = filteredArray;
			addPost(filteredArray);
			modalTwo.classList.remove("modal-two");
		});
	}
});

//  update modal  window opening

cardParent.addEventListener("click", function (evt) {
	evt.preventDefault();
	const elem = evt.target;

	if (elem.matches(".edit")) {
		const dataId = evt.target.attributes["data-id"].value;

		const elements = document.querySelector(`input[id="thisid"]`);
		elements.setAttribute("data-id", dataId);
		modalThree.classList.add("modal-active");
	}
});

// cencel btn

elCencelbtn.addEventListener("click", function () {
	modalTwo.classList.remove("modal-two");
});
