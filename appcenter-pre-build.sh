#!/usr/bin/env bash

# run yarn lint

yarn lint

# run yarn tests

yarn test

APP_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

ENV_WHITELIST=${ENV_WHITELIST:-"^RN_"}
printf "Creating an .env file with the following whitelist:\n"
printf "%s\n" $ENV_WHITELIST
set | egrep -e $ENV_WHITELIST | sed 's/^RN_//g' > .env
echo "APP_VERSION="${APP_VERSION} >> .env
printf "\n.env created with contents:\n\n"
cat .env

# Run a fastlane lane to change app id, display name, icon, etc
bundle install
brew install graphicsmagick
bundle exec fastlane prep_release_type