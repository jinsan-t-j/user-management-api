#!/bin/bash

# Supported colors.
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

# Check if user provided a name for the seeder.
unset SEEDER_NAME
while [ -z ${SEEDER_NAME} ]; do
    echo -n -e "${GREEN}Enter the seeder name: ${ENDCOLOR}"; read -r SEEDER_NAME
done

# Define the path where seeders should be stored.
SEEDER_PATH="./src/database/seeders"

# Check if the destination directory exists.
if [ ! -d "${SEEDER_PATH}" ]; then
    echo -e "${RED}The destination folder path ${SEEDER_PATH} does not exist.${ENDCOLOR}"
    echo -e "${GREEN}Creating seeder destination folder ${SEEDER_PATH}.${ENDCOLOR}"
    mkdir -p ${SEEDER_PATH}
fi

# The path of the seeder template.
SEEDER_TEMPLATE="./src/scripts/sequelize/templates/make-seeder.template.stub"

# Check if the seeder template exists.
if [ ! -f "${SEEDER_TEMPLATE}" ] || [ ! -s ${SEEDER_TEMPLATE} ]; then
    echo -e "${RED}The seeder template ${SEEDER_TEMPLATE} does not exist or empty.${ENDCOLOR}"
    exit 1
fi

# Create the seeder file with timestamp
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
SEEDER_FILE="${SEEDER_PATH}/${TIMESTAMP}-${SEEDER_NAME}.ts"

# Create the seeder file
cp ${SEEDER_TEMPLATE} "${SEEDER_FILE}"

# Provide feedback to the user
echo -e "${GREEN}Migration file created in ${SEEDER_FILE}.${ENDCOLOR}"
