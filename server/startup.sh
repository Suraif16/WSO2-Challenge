

# Install dependencies
composer install -vvv --no-scripts --no-interaction 

# #Create the database "Angular"
# echo "Create the database Angular"
# php bin/console doctrine:database:create --no-interaction
 
# Run migrations
php bin/console doctrine:migrations:migrate --no-interaction

# Load fixtures
php bin/console doctrine:fixtures:load --no-interaction

# Create a file
touch /tmp/server-setup-done