
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'iKRT2Qrq3M6DfOZP4NUn97BAnwntTJ6bB086XbmG';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const apodTitle = document.getElementById('apod-title');
    const apodImage = document.getElementById('apod-image');
    const apodDate = document.getElementById('apod-date');
    const apodExplanation = document.getElementById('apod-explanation');
    const apodCopyright = document.getElementById('apod-copyright');

    async function fetchAPOD() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data); 
            apodTitle.textContent = data.title;
            apodDate.textContent = data.date;
            apodExplanation.textContent = data.explanation;
            if(data.media_type==="image"){
            apodImage.src = data.hdurl || data.url; 
            apodImage.alt = data.title;
            apodImage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching the APOD:', error);
            apodTitle.textContent = 'Failed to load Astronomy Picture of the Day';
            apodExplanation.textContent = 'Please check your internet connection or API key, and try again later.';
            apodImage.style.display = 'none'; 
            apodDate.textContent = '';
            apodCopyright.textContent = '';
        }
    }

    fetchAPOD(); 
});