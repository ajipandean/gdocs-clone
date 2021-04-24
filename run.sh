# Install all node dependencies on root, ui and api project
yarn
cd ./ui && yarn
cd ../api && yarn

# Run the project
cd ../ && yarn start
