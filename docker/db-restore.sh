docker run --rm --network ebag-twitter --link docker_ebag-twitter-db_1:mongo -v $(PWD)/mongo_backup/tumblr_ebag:/backup/tumblr_ebag mongo \
 bash -c 'mongorestore -d twitter_ebag /backup/tumblr_ebag --host mongo:27017; \
 mongorestore --collection photomodels -d twitter_ebag /backup/tumblr_ebag/photomodels.bson --host mongo:27017; \
 echo "db.photomodels.updateMany({}, {\$set: {status: \"new\", modified_date: Math.round(Date.now() / 1000) }})" | mongo twitter_ebag --host mongo:27017
 '