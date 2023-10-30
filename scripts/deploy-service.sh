#!/bin/bash

exitOnError() {
  if [ ! $? -eq 0 ]; then
    echo $1
    exit 1
  fi
}

WORKING_PATH=$HOME/code/humanapp/timesup/service
PWD=$(pwd)
SERVICE='timesup-service'

echo "Deploying service"

cd "$WORKING_PATH"
exitOnError "command failed: cd"

npm install --only=prod
exitOnError "command failed: npm install"

echo " #### Restarting service"
pm2 restart $SERVICE
