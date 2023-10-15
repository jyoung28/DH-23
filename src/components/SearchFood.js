import axios from "axios";

export default function runQuery(query) {
    const apiKey = 'Jw89erN2gfT0GGfENQqr4A==l45cwHcQSZs1kD77';

    axios.get('https://api.calorieninjas.com/v1/nutrition', {
        params: { query },
        headers: { 'X-Api-Key': apiKey },
        responseType: 'json'
    }).then((response) => {
        // Handle the response data here
        console.log('Response data:', response.data);
    }).catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
    });
}
