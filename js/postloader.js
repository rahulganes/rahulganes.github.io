const urlParams = new URLSearchParams(window.location.search);
const postIdValue = urlParams.get('postid');

document.addEventListener('DOMContentLoaded', () => {
    const postcontainer = document.getElementById("postcontainer");

    if (!postcontainer) {
        console.error("Error: 'postcontainer' element not found in the DOM.");
        return;
    }

    fetch('data/cardcontent.json') // Assumes 'cardcontent.json' holds your content data
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(items => {
            const targetIdNum = parseInt(postIdValue, 10);

            const foundItem = items.find(item => item.id === targetIdNum);

            if (foundItem) {
                const postElement = document.createElement('div');
                postElement.classList.add('article-content-card'); // Main container for the article

                // --- NEW STRUCTURE FOR IMAGE AND CAPTION ---
                postElement.innerHTML = `
                    <div class="main-article-title">
                        <h2>${foundItem.title}</h2>
                    </div>
                    <div class="image-with-caption-block">
                        <div class="image-wrapper">
                            <img style="width:100%; height:auto; " src="${foundItem.imageUrl}" alt="${foundItem.title}">
                        </div>
                        <p class="image-caption">${foundItem.description}</p>
                    </div>

                `;
                // --- END NEW STRUCTURE ---

                postcontainer.appendChild(postElement);
            } else {
                postcontainer.innerHTML = '<p>Sorry, no content found for this ID.</p>';
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            postcontainer.innerHTML = '<p>Error loading content. Please try again later.</p>';
        });
});