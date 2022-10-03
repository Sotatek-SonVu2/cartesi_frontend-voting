# Build reactjs app with production mode
yarn pre-build
yarn build

# Mode to build folder
cd build

# Clone index.html into 200.html
cp index.html 200.html

# Start deploy via Surge
# The command means deploy current folder to domain cartesi-voting.surge.sh
surge . cartesi-voting.surge.sh
