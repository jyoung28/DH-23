async function fetchLabelsFromImage(imageBase64) {
  const fetch = await import('node-fetch'); // Import node-fetch dynamically
  const apiKey = 'AIzaSyC80kUfA0WpiKxc8UtDy-CqqkBYDkK0xcg'; // Replace with your Google Cloud API Key

  const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const requestBody = {
    requests: [
      {
        image: {
          content: imageBase64, // Use the image data URI
        },
        features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
      },
    ],
  };

  try {
    const response = await fetch.default(apiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.responses && data.responses[0] && data.responses[0].labelAnnotations) {
        const labelAnnotations = data.responses[0].labelAnnotations;
        const labels = labelAnnotations.map(annotation => annotation.description);
        return labels;
      } else {
        return 'No labels found in the image.';
      }
    } else {
      throw new Error(`Failed to analyze image. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

// Usage
// const imageUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wCEAA...'; // Replace with your image data URI
// fetchLabelsFromImage(imageUrl)
//   .then((result) => {
//     console.log('Labels:\n', result.join(', '));
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

export default fetchLabelsFromImage;
