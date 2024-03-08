import cv2
import numpy as np
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def process_image(image, brightness):
    # Convert image to grayscale
    grey_filter = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Invert colors
    invert = cv2.bitwise_not(grey_filter)

    # Apply Gaussian blur
    blur = cv2.GaussianBlur(invert, (7, 7), 0)

    # Invert blurred image
    inverted_blur = cv2.bitwise_not(blur)

    # Divide grayscale image by inverted blurred image
    
    sketch_filter = cv2.divide(grey_filter, inverted_blur, scale=256.0)

    # Apply brightness adjustment
    brightness_matrix = np.ones(sketch_filter.shape, dtype="uint8") * brightness
    adjusted_sketch = cv2.add(sketch_filter, brightness_matrix)

    return adjusted_sketch

@app.route('/api/process-image', methods=['POST'])
def process_image_route():
    try:
        # Get image file from request
        image_file = request.files['image']
        brightness = int(request.form.get('brightness', 0))
        
        # Read image file
        image_array = np.frombuffer(image_file.read(), dtype=np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        
        # Process the image
        processed_image = process_image(image, brightness)
        
        # Encode processed image to base64
        _, encoded_image = cv2.imencode('.png', processed_image)
        sketch_base64 = base64.b64encode(encoded_image).decode('utf-8')
        sketch_url = f'data:image/png;base64,{sketch_base64}'

        return jsonify({'sketchUrl': sketch_url}), 200
    except Exception as e:
        print('Error processing image:', e)
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
