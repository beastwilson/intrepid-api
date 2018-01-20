# intrepid-api

Intrepid API for their hackathons.

This controls a Tesla Model X car.

Check out `api/Command.js` for command names. You can also just pass a string.

## Usage:
```javascript
const { Client, Command } = require('intrepid-api');

const client = new Client('YOURAPIKEY');

client.action(Command.OPEN_DRIVER_DOORS)
    .then(() => { console.log('done!') })
    .catch(console.error);
```