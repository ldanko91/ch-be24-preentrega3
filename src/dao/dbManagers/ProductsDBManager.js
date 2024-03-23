import productsModel from '../../models/products.js'

export default class ProductsDBManager {
    constructor(){
        console.log('Conectado a Products de MongoDB')
    }

    getProducts = async (queryData) => {
        const { pageq, limitq, filterByq, sortByq, sortOrderq } = queryData 
        if (filterByq != null) {
            const formattedFilter = filterByq.replace(/(\w+):/g, '"$1":').replace(/'/g, '');
            const filter = JSON.parse(`{${formattedFilter}}`);

            let productos = await productsModel.paginate(filter, { page: pageq, limit: limitq, lean: true, sort: ([[sortByq, sortOrderq]]) })
            return productos
        }
        else {
            let productos = await productsModel.paginate({}, { page: pageq, limit: limitq, lean: true, sort: ([[sortByq, sortOrderq]]) })
            return productos
        }
    }

    getAll = async () => {
        let productos = await productsModel.find()
        return productos
    }

    getProductByCode = async(getCode)=>{
        let productos = await productsModel.find({code:getCode}).lean();
        return productos
    }

    addProduct = async (newProd) =>{
        let upload = await productsModel.create(newProd);
        return upload
    }

    updateProductByCode = async (updCode,updProd) =>{
        let update = await productsModel.updateOne({code:updCode},updProd);
        return update
    }

    deleteProductByCode = async (delCode) =>{
        let deleteOne = await productsModel.updateOne({ code: delCode }, { status: false });
        return deleteOne
    }

}
