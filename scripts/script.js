
const catagoryButtonContainer = document.getElementById("catagoryButtonWrapper");
const sortByViewButton = document.getElementById("sortByViewButton");


const CatagoryButtonsUrl = 'https://openapi.programming-hero.com/api/videos/categories'
const InitialAllDataApiUrl = 'https://openapi.programming-hero.com/api/videos/category/${id}'


fetch(CatagoryButtonsUrl)
    .then((res) => res.json())
    .then((data) => {
        const CatagoryArray = data.data;
        CatagoryArray.forEach(element => {
            const elem = document.createElement("button");
            elem.innerText = element.category;
            elem.classList = ("px-5 py-1 text-lg font-base bg-gray-300 rounded-lg")
            elem.setAttribute("id", `${element.category_id}`)
            elem.setAttribute("onclick", `getIdFunc(${element.category_id})`)
            catagoryButtonContainer.appendChild(elem)
        });
    })


function getIdFunc(id) {
    InitialApiAllDataGet(id)
}


function convertSecondsToTime(sec) {
    const hours = Math.floor(sec / 3600);
    const remainingSeconds = sec % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    return { hours: hours, minutes: minutes, }
}


function InitialApiAllDataGet(id = 1000) {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        .then((data) => SendReadyData(data.data))
}


const SendReadyData = (data) => {

    // ------------------------- sorting function code-------------------------
    sortByViewButton.addEventListener("click", function () {
        data = data.sort(function(a,b){
            return parseFloat(b.others.views) - parseFloat(a.others.views)
        })
        SendReadyData(data)
    })
    // ------------------------- sorting function code-------------------------

    const CardWrapper = document.getElementById("cardWrapper");
    CardWrapper.innerHTML = ""
    if (data.length > 0) {
        CardWrapper.classList.add("grid-cols-4");
        data.forEach((one) => {
            const elem = document.createElement("div");
            elem.classList = ("bg-base-100 ");
            elem.innerHTML = `
            <div class="p-2 bg-cover bg-center bg-no-repeat h-52 rounded-xl flex justify-end items-end"
                            style="background-image: url(${one.thumbnail});">
                            ${one.others.posted_date && `<span class="bg-zinc-700 text-white px-3 py-1 rounded-md">3hrs 56 min ago</span>`}
                        </div>
                        <div class="flex mt-5">
                            <div>
                                <img class="w-10 h-10 rounded-full object-cover bg-red-500"
                                    src=${one.authors[0].profile_picture} alt="">
                            </div>
                            <div class="ml-3">
                                <h1 class="text-lg font-bold mb-2 leading-5">${one.title}</h1>
                                <div class="flex items-center space-x-2 mb-1">
                                    <p class="text-[14px] text-gray-500">${one.authors[0].profile_name}</p>
                                    ${one.authors[0].verified && `<img src="./BlueMark.png" alt="">`}
                                </div>
                                <span class="text-[14px] text-gray-500">${one.others.views} views</span>
                            </div>
                        </div>
            `
            CardWrapper.appendChild(elem)
        })
    } else {
        CardWrapper.classList.remove("grid-cols-4");
        CardWrapper.innerHTML = `<div class="container w-full flex flex-col justify-center items-center my-40">
        <img class="w-40" src="./Icon.png" alt="">
        <h1 class="font-bold text-3xl my-5">Oops!! There is no content here</h1>
    </div>`
    }

}
InitialApiAllDataGet()