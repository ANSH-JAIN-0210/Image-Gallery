const imageInput = document.getElementById('imageInput');
const uploadBtn = document.getElementById('uploadBtn');
const gallery = document.getElementById('img-gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

document.addEventListener('DOMContentLoaded', loadImagesFromLocalStorage);

uploadBtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            gallery.appendChild(imgElement);
            saveImageToLocalStorage(e.target.result);
            imgElement.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = imgElement.src;
            });
        }
        reader.readAsDataURL(file);
    }
});

function saveImageToLocalStorage(imageSrc) {
    let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
    images.push(imageSrc);
    localStorage.setItem('galleryImages', JSON.stringify(images));
}

function loadImagesFromLocalStorage() {
    let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
    images.forEach(imageSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        gallery.appendChild(imgElement);
        imgElement.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = imgElement.src;
        });
    });
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});
