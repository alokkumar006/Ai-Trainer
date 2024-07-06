# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Run the application
CMD ["node", "app.js"]
