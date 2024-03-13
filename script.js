let apikey = 'TVDSCgpE0ubmhVnk8t4YTLlNc7aTW1TaXgg7FzrpEmDImzxp3Z6iAcS3';
let perpage = 15;
let currentpage = 1;
let searchterm = null;
let seemorebtn = document.querySelector('.seemore');
let searchbtn  = document.querySelector('.search-area button');
let cancle = document.getElementById('cancle')
let download = document.getElementById('download')

let downloadimg = (imageurl) => {
    fetch(imageurl)
    .then(response => response.blob())
    .then(file => {
     let a = document.createElement('a')
     a.href = URL.createObjectURL(file)
     a.download = new Date().getTime() 
     a.click() 
    })
    .catch(() => alert('failde to download'))
}

let showbox = (name, img) => {
    let lightbox = document.querySelector('.lightbox')
    lightbox.classList.add('show')
    lightbox.querySelector('img').src = img
    lightbox.querySelector('span').innerHTML = name
    download.setAttribute('data-img', img)
    document.body.style.overflow = 'hidden';
}

let hidelighbox = () =>{
    let lightbox = document.querySelector('.lightbox')
    lightbox.classList.remove('show')
    document.body.style.overflow = 'auto';
}

let createhtml = (images) => {
   let imagecontainer = document.querySelector('.images')
   imagecontainer.innerHTML += images.map(img => 

    ` <li class="card" onclick = "showbox('${img.photographer}', '${img.src.large2x}')">
    <img src="${img.src.large2x}" alt="img">
    <div class="details">
        <div class="photographer">
            <i class='bx bxs-camera'></i>
            <span>${img.photographer}</span>
        </div>
        <button onclick="downloadimg('${img.src.large2x}')"><i class='bx bx-download'></i></button>
    </div>
</li>`

    ).join('');
}

let loadeimages = () => {
    currentpage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`
    getimages(apiURL);
}


let getimages = (apiURL) => {
    seemorebtn.innerHTML = 'Loading...'
    seemorebtn.classList.add('disabled')
    fetch(apiURL, {
        headers: { Authorization: apikey}
    })
    .then(response => response.json())
    .then(result => {
     createhtml(result.photos)
     seemorebtn.innerHTML = 'See more';
     seemorebtn.classList.remove('diabled');
    })
    .catch(()=> alert('Failed to load image'))
}

let loadesearchimages = () => {
    let searchinput = document.querySelector('.search-area input').value;
    currentpage = 1;
    let imagecontainer = document.querySelector('.images')
    imagecontainer.innerHTML = ''
    getimages(`https://api.pexels.com/v1/search?query=${searchinput}&page=${currentpage}&per_page=${perpage}`)
    searchinput.value = '';
}



getimages(`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`);

seemorebtn.addEventListener('click', loadeimages)
searchbtn.addEventListener('click', loadesearchimages)
cancle.addEventListener('click', hidelighbox)
download.addEventListener('click', (e) => downloadimg(e.target.dataset.img));
