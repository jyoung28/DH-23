from flask_cors import CORS
import requests
from flask import Flask, flash, request, jsonify, make_response
from decouple import config
import io
import os
import json
from google.cloud import vision
from werkzeug.utils import secure_filename
import base64
from flask_cors import CORS

UPLOAD_FOLDER = 'Images'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
CORS(app)
app.json_encoder  
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


CORS(app, resources={r"/*": {"origins": "*"}})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/vis', methods=['POST'])
def just_read():
    # Get the image URI from the request headers
    image_uri = request.headers.get('Image-URI')
    print("_____________")
    print(request.headers.get('Image-URI'))
    print("_____________")
    
    if image_uri:
        # Process the image using the ReadLabel function
        result = ReadLabel(image_uri)  # Replace with your actual processing function
        # Return the results as JSON
        return jsonify({"result": result})
    else:
        return jsonify({"error": "Image-URI not provided in the request headers"})


# @app.route('/search', methods=['POST'])
# def searchCommand():
#     file = request.files.get('file', None)
#     print(file.filename)
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#         # print("saved")

#     query = []
#     query = ReadLabel(".\Images\my-photo.png")
#     labels = []
#     for label in query:
#         food = SearchCalorieNinja(label.description)
#         if (food == '{"items": []}'):
#             print("Empty")
#         else:
#             labels.append(json.loads(food))



#     return jsonify(labels)


def SearchCalorieNinja(query):
    calKey='Jw89erN2gfT0GGfENQqr4A==l45cwHcQSZs1kD77'
    api_url = 'https://api.calorieninjas.com/v1/nutrition?query='
    response = requests.get(api_url + query, headers={'X-Api-Key':calKey })
    if response.status_code == requests.codes.ok:
        # print(response.text)
        return(response.text)
    else:
        print("Error:", response.status_code, response.text)


def ReadLabel(image_uri):
    api_key = 'AIzaSyC80kUfA0WpiKxc8UtDy-CqqkBYDkK0xcg'  # Replace with your Google Cloud API Key
    api_url = f'https://vision.googleapis.com/v1/images:annotate?key={api_key}'
    image_uri = image_uri.replace('data:image/jpeg;base64,', '')
   #image_uri=
    request_body = {
        "requests": [
            {
                "image": {
                    "content": image_uri  # Use the base64 image data
                },
                #     "image": {
                #     "source": {
                #         "imageUri": image_uri
                #     }
                # },
                "features": [
                    {
                        "type": "LABEL_DETECTION",
                        "maxResults": 5
                    }
                ]
            }
        ]
    }


    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(api_url, data=json.dumps(request_body), headers=headers)

        if response.status_code == 200:
            data = response.json()
            if "responses" in data and data["responses"][0] and "labelAnnotations" in data["responses"][0]:
                label_annotations = data["responses"][0]["labelAnnotations"]
                labels = [annotation["description"] for annotation in label_annotations]
                return labels
            else:
                return 'No labels found in the image.'
        else:
            raise Exception(f'Failed to analyze image. Status code: {response.status_code}')
    except Exception as error:
        print('Error analyzing image:', error)
        raise error

    return labels


def ReadLabel2(path):
    # Instantiates a client
    client = vision.ImageAnnotatorClient()

    # The name of the image file to annotate
    file_name = os.path.abspath(path)

    # Loads the image into memory
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations

    # print('Labels:')
    # for label in labels:
    #     print(label.description)

    return labels