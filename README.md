# Amazon Reviews

how to start app:

first download the zip folder and extract.

then download the files test.csv and train.csv from this link : "https://www.kaggle.com/datasets/kritanjalijain/amazon-reviews?select=amazon_review_polarity_csv.tgz"

then you need to run both frontend and backend seperatly:
frontend commands:
cd amazon_rev
npm i
npm start

backend command(another terminal):
cd amazon_server
npm i
node --max-old-space-size=4096 Main.js
