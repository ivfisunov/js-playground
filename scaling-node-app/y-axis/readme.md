# **Y-axis node app scaling** 
There are two microservices for clients and admins and one for orchestration all of them.

`pm2 start ./y-axis/client-ms.js -i 4`

`pm2 start ./y-axis/admin-ms.js -i 2`

`pm2 start ./y-axis/api.js -i 1`

localhost:3000 - get all data from DB

localhost:3000/admin - get all data from DB

localhost:3000/admin/add?car=bmw&model=m3 - add new data to DB

