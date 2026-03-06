 import {useSelector} from 'react-redux' // selektujemo zeljeni state dole u funkciju
 import { useDispatch } from 'react-redux' // definisemo promene 
 // uvek je useDispatch(unutra je funkcija koaj menja(state))
 import { ChangeName, setisActive } from '../src/redux/productSlice'
 // ovde importujemo sve actione iz productSlice koje cemo da koristimo 

function App() {

   const myName = useSelector((state) => state.product.myName) // ovo product je key iz store.js, znaci uvek je state.key.'naziv statea'
   const isActive = useSelector((state) => state.product.isActive)

    const dispatch = useDispatch(); // ovako definisemo dispatch samo 

    function setName() {
      dispatch(ChangeName("Aleksa")) // dispatch(zeljena akcija(promena tog state ))
      dispatch(setisActive(isActive))
    }

  return (
   <div className="container flex justify-center w-[50%] h-[50%] mx-auto">
     <button onClick={setName} className="py-[20px] px-[54px] bg-amber-400 justify-center">click here</button>
     <div>
        {!isActive ? <p>{myName}</p> : <p>prazno</p>}
     </div>
   </div>
  )
}

export default App
