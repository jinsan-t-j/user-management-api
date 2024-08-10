#!/bin/bash

# Supported colors.
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

# Function to convert a string to snake case
to_snake_case() {
    local string="$1"

    # Convert to snake case
    snake_case_string=$(echo "${string}" | sed 's/\([a-z0-9]\)\([A-Z]\)/\1_\2/g')

    # Convert to lowercase
    snake_case_string=$(echo "${snake_case_string}" | tr '[:upper:]' '[:lower:]')

    echo "${snake_case_string}"
}

# Set the path of the migration template stored by checking the arg.
case "$1" in
    d)
        MIGRATION_TEMPLATE="./src/scripts/sequelize/templates/make-data-migration.template.stub"
        ;;
    *)
        MIGRATION_TEMPLATE="./src/scripts/sequelize/templates/make-migration.template.stub"
        ;;
esac

# Check if user provided a name for the migration.
while [ -z ${MIGRATION_NAME} ]; do
    unset MIGRATION_NAME
    echo -n -e "${GREEN}Enter the migration name: ${ENDCOLOR}"; read -r MIGRATION_NAME
done

# Check if the migration name is in snake case. if not convert to snake case.
if ! [[ "${MIGRATION_NAME}" =~ ^[a-z0-9_]+$ ]]; then
    MIGRATION_NAME="$(to_snake_case "${MIGRATION_NAME}")"
fi

# Define the path where migrations should be stored.
MIGRATION_PATH="./src/database/migrations"

# Check if migration file exists.
if [ $(find "${MIGRATION_PATH}" -name "*_${MIGRATION_NAME}.migration.ts" | wc -l) -gt 0 ]; then
    echo -e "${RED}The migration already exists.${ENDCOLOR}"
    exit 1
fi

# Check if the destination directory exists.
if [ ! -d "${MIGRATION_PATH}" ]; then
    echo -e "${RED}The destination folder path ${MIGRATION_PATH} does not exist.${ENDCOLOR}"
    echo -e "${GREEN}Creating migration destination folder ${MIGRATION_PATH}.${ENDCOLOR}"
    mkdir -p ${MIGRATION_PATH}
fi

# Check if the migration template exists.
if [ ! -f "${MIGRATION_TEMPLATE}" ] || [ ! -s ${MIGRATION_TEMPLATE} ]; then
    echo -e "${RED}The migration template ${MIGRATION_TEMPLATE} does not exist or empty.${ENDCOLOR}"
    exit 1
fi

# Create the migration file with timestamp
TIMESTAMP=$(date +"%Y_%m_%d_%H%M%S")
MIGRATION_FILE="${MIGRATION_PATH}/${TIMESTAMP}_${MIGRATION_NAME}.migration.ts"

# Create the migration file
cp ${MIGRATION_TEMPLATE} "${MIGRATION_FILE}"

# Provide feedback to the user
echo -e "${GREEN}Migration file created in ${MIGRATION_FILE}.${ENDCOLOR}"
