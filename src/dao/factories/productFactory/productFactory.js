import { environment } from '../../../config/environment.config.js'
import ProductsDBManager from '../../dbManagers/ProductsDBManager.js'
import ProductManager from '../../fileManagers/ProductManager.js';
console.log(environment)

let FactoryProductManager;

switch (environment) {
    case 'dev':
        FactoryProductManager = ProductsDBManager;
        break

    case 'prod':
        FactoryProductManager = ProductManager;
        break

    default:
        FactoryProductManager = ProductsDBManager;
        break
}

export default FactoryProductManager