import React, { useEffect } from 'react'
import productService from '../services/productService'
import { useDispatch, useSelector } from 'react-redux'
import { setallProducts, setCart, setisLoading} from '../redux/productSlice'

function ShowProducts() {
    const allProducts = useSelector((state) => state.product.allProducts)
    const isLoading = useSelector((state) => state.product.isLoading)
    const cart = useSelector((state) => state.product.cart)
    const dispatch = useDispatch()

    useEffect(() => {
    productService.getAllProducts()
        .then((res) => {
            console.log(res.data.products)
            dispatch(setallProducts(res.data.products)) // ubacujemo elemente u allProducts state
            dispatch(setisLoading(false))
        })
        .catch((err) => console.log(err))
}, [])

function AddtoCart(card) { // ovde prihvatamo argument iz onClicka
    // console.log(card)
    dispatch(setCart(card)) // dodajemo tu karticu klikom u cart state 
}

  return (
    <div className=' flex flex-col md:flex-row flex-wrap justify-between gap-[32px]'>
        {!isLoading ? (allProducts?.map((card, index) => {
            return <div className='w-[30%] flex-none' key={index}>
                        <img className='w-[100%] object-cover' src={card.thumbnail}></img>
                        <div className='flex justify-between'>
                            <p>{card.title}</p>
                            <p>${card.price}</p>
                        </div>
                        <button onClick={() => AddtoCart(card)} className='py-[10px] px-[24px] bg-blue-400'>Add to cart</button>
                </div> // ovde funkciji AddtoCart prosedjuemo card kao argument
        })) : <h2>Loading...</h2>}
    </div>
  )
}

export default ShowProducts