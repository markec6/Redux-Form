import axios from "axios"

class productService{
    static getAllProducts = () => axios.get('https://dummyjson.com/products?limit=9')
    // ako zelimo da ogranicimo broj proizvoda - ?limit='broj' na kraj URL
}

export default productService 