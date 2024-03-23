import { environment } from '../../../config/environment.config.js'
import CartsDBManager from '../../dbManagers/CartsDBManager.js';
import CartManager from '../../fileManagers/CartManager.js';

let FactoryCartManager;

switch (environment) {
    case 'dev':
        FactoryCartManager = CartsDBManager;
        break

    case 'prod':
        FactoryCartManager = CartManager;
        break

    default:
        FactoryCartManager = CartsDBManager;
        break
}

export default FactoryCartManager