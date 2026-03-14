 import {useSelector} from 'react-redux' // selektujemo zeljeni state dole u funkciju
 import { useDispatch } from 'react-redux' // definisemo promene 
 // uvek je useDispatch(unutra je funkcija koaj menja(state))
 import { ChangeName, setisActive } from '../src/redux/productSlice'
import { Outlet } from 'react-router-dom'
 // ovde importujemo sve actione iz productSlice koje cemo da koristimo 

 import Navigation from './components/Navigation'

function App() {

   const myName = useSelector((state) => state.product.myName) // ovo product je key iz store.js, znaci uvek je state.key.'naziv statea'
   const isActive = useSelector((state) => state.product.isActive)

    const dispatch = useDispatch(); // ovako definisemo dispatch samo 

    function setName() {
      dispatch(ChangeName("Luka")) // dispatch(zeljena akcija(promena tog state ))
      dispatch(setisActive(isActive))
    }

    const cart = useSelector((state) => state.product.cart) // selektovanje cart [] statea

  return (
   <div className="container mx-auto">
    <Navigation/>
      <div className='flex justify-between'>
        <button onClick={setName} className="py-[20px] px-[54px] bg-amber-400 justify-center">click here</button>
        <div>
            {isActive ? <p>{myName}</p> : <p>prazno</p>}
        </div>
        <span>{cart.length}</span>
     </div>
      <Outlet/>
   </div>
  )
}
// <span>{cart.length}</span> - cart state length duzina state (logika za korpu)
export default App
