import cv2
import os

#if faces found: writes the edited image to the static folder and returns true
#otherwise returns false

ENV_PATH = os.path.abspath(os.path.dirname(__file__))

def findFaces(scaleFactor=1.2, minNeighbors=5, minSize=(30, 30)):
    imagePath = ENV_PATH + '/uploads/image.png'
    cascPath = ENV_PATH + "/haarcascade_frontalface_default.xml"

    # Create the haar cascade
    faceCascade = cv2.CascadeClassifier(cascPath)

    # Read the image
    image = cv2.imread(imagePath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=scaleFactor,
        minNeighbors=minNeighbors,
        minSize=minSize,
        flags = cv2.CASCADE_SCALE_IMAGE
    )

    # Draw a rectangle around the faces
    
    if len(faces) > 0:
        for (x, y, w, h) in faces:
            cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 4)
            cv2.imwrite(ENV_PATH + '/static/detect_face_app/result.png', image)
        return True
    return False