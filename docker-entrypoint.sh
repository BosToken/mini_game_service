set -e

echo "Waiting for MongoDB to be ready..."
until mongo --host mongo --eval 'db.isMaster()' | grep '"ismaster" : true' > /dev/null 2>&1
do
  echo "MongoDB is not ready yet. Waiting..."
  sleep 1
done

echo "MongoDB is ready. Running startup commands..."

npm install
npx prisma db push
node prisma/seeders/seed.js
npx nodemon index.js