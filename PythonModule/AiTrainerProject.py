import cv2
import numpy as np
import time
import PoseModule as pm
# import speech_recognition as sr

# Initializing the voice recognizer
# recognizer = sr.Recognizer()

cap = cv2.VideoCapture(0)
detector = pm.poseDetector()
count = 0
dir = 0
pTime = 0

while True:
    success, img = cap.read()
    img = cv2.resize(img, (900, 700))
    # img = cv2.imread("AiTrainer/test.jpg")
    img = detector.findPose(img, False)
    lmList = detector.findPosition(img, False)
    # print(lmList)

    key = cv2.waitKey(1)
    if key == ord('q'):
        break

    if len(lmList) != 0:
        # Right Arm
        detector.findAngle(img, 12, 14, 16)
        # Left Arm
        angle = detector.findAngle(img, 11, 13, 15)
        per = np.interp(angle, (210, 310), (0, 100))
        bar = np.interp(angle, (220, 310), (650, 100))
        # print(angle, per)

        # Check for the dumbbell curls
        color = (0, 255, 0)
        if per == 100:
            color = (0, 0, 255)
            if dir == 0:
                count += 0.5
                dir = 1
        if per == 0:
            color = (0, 0, 255)
            if dir == 1:
                count += 0.5
                dir = 0
        print(count)

        # Draw Bar
        cv2.rectangle(img, (50, 100), (85, 600), color, 3)
        cv2.rectangle(img, (50, int(bar)), (85, 600), color, cv2.FILLED)
        cv2.putText(img, f'{int(per)} %', (40, 75), cv2.FONT_HERSHEY_PLAIN, 4, color, 4)

        # Draw curl Count
        cv2.rectangle(img, (0, 550), (250, 720), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, str(int(count)), (45, 670), cv2.FONT_HERSHEY_PLAIN, 10, (255, 0, 0), 10)

    cTime = time.time()
    fps = 1/(cTime-pTime)
    pTime = cTime
    # cv2.putText(img, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5, (255, 0, 0), 5)

    cv2.imshow("Image", img)
    # cv2.waitKey(1)

    # Use voice recognition to exit the program
    # with sr.Microphone() as source:
    #     print("Listening for exit command...")
    #     audio = recognizer.listen(source)
    #
    #     try:
    #         command = recognizer.recognize_google(audio).lower()
    #         if "exit" in command:
    #             break
    #     except sr.UnknownValueError:
    #         pass
    #     except sr.RequestError:
    #         print("Could not request results; check your internet connection.")

cap.release()
cv2.destroyWindow()