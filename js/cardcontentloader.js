document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardcontent-container');
    // Fetch the JSON data
    fetch('data/cardcontent.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(items => {
            items.forEach(item => {
                // Create the main card element
                const card = document.createElement('div');
                card.classList.add('cardcontent');

                // Create the card's inner HTML
                card.innerHTML = `
                    <a href = "./post.html?postid=${item.id}">
                    <img src="${item.imageUrl}" alt="${item.title}" class="cardcontent-image">
                    <div class="cardcontent-content">
                        <h2 class="cardcontent-title">${item.title}</h2>
                        <p class="cardcontent-description">${item.short_description}</p>
                    </div>
                    </a>
                `;

                // Append the card to the container
                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            cardContainer.innerHTML = '<p>Error loading items. Please try again later.</p>';
        });
});