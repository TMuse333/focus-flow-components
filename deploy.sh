#!/bin/bash

# Check if commit message is provided
if [ -z "$1" ]; then
  echo "You must provide a commit message."
  exit 1
fi

# Step 1: Remove dist directory
rm -rf dist

# Step 2: Build the project
npm run build

# Step 3: Add changes to git
git add .

# Step 4: Commit the changes with the provided message
git commit -m "$1"

# Step 5: Push changes to the remote repository
git push -u origin main

# Step 6: Bump the version
npm version patch

# Step 7: Publish the package
npm publish --access public

echo "Deployment complete!"
