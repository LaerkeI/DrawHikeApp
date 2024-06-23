document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'nt-4zpOTz80hBGZmee2Tb1tD4D8F_yJe58PbK-s3Tzg';
    const url = `https://api.mapy.cz/v1/maptiles/basic/256/10/10/10?apikey=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Connected successfully to Mapy API :)');
        })
        .catch(error => {
            console.error('Error connecting to Mapy API:', error);
        });
});
