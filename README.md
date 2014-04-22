kite-healthcheck
================
After cloning this repo:
``` bash
cd kite-healthcheck
npm i
node ./kite-heathcheck.js -u wss://example.com
```
It will exit with 0 if it is successful or 1 in the case of an error.

# options
* `-u` the url of the kite to run the health-check against
* `-v` verbose mode (log info messages)
