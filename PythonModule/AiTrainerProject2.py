import cv2
import numpy as np
import time
import PoseModule as pm

cap = cv2.VideoCapture(0)
detector = pm.poseDetector()

count = 0
dir = 0
pTime = 0

while True:
    success, img = cap.read()
    # img = cv2.imread("AI Train/1.jpg")
    img = cv2.resize(img, (1000, 720))
    img = detector.findPose(img, False)
    lmList = detector.findPosition(img, False)
    # print(lmList)

    key = cv2.waitKey(1)
    if key == ord('q'):
        break

    if len(lmList) != 0:
        # Right leg
        detector.findAngle(img, 23, 25, 27)
        # Left Arm
        angle = detector.findAngle(img, 24, 26, 28)
        per = np.interp(angle, (200, 260), (0, 100))
        bar = np.interp(angle, (200, 260), (650, 100))

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
    fps = 1 / (cTime - pTime)
    pTime = cTime
    # cv2.putText(img, str(int(fps)), (50, 100), cv2.FONT_HERSHEY_PLAIN, 5, (255, 0, 0), 5)

    cv2.imshow("Image", img)
    # cv2.waitKey(1)


    # cv2.imshow("Image", img)
    # cv2.waitKey(1)

cap.release()
cv2.destroyWindow()
