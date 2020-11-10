import {app} from './app'
import {AddressInfo} from 'net'
const server = app.listen(7321, '0.0.0.0', () => {
    const {port, address} = server.address() as AddressInfo;
    console.log('Server listening on:','http://' + address + ':'+port);
});
