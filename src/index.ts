import {app} from './app'
import {AddressInfo} from 'net'
const server = app.listen(7321, '127.0.0.1', () => {
    const {port, address} = server.address() as AddressInfo;
    console.log('Server listening on:','http://' + address + ':'+port);
});
