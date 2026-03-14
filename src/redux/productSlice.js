// Obicno folder nazovemo productSlice, jer koristimo Slice funkciju 
//# 1. stavka u reduxu je pravljenje globalnih stateova sa SLice

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    myName: "", // na primer state za neko prazno polje (nesto na klik)
    isActive: true, // isto neki jednostavan state za menjanje stanja na klik
    allProducts: [],  // na primer neki array, pa dodavanje/brisanje proizvoda
    cart: [],
    isLoading: false,
    isPassword: false
}

const productSlice = createSlice({ // obicno ime contanti za sam SLice damo po imenu file
    name: "product", // uvek ime 
    initialState,
    reducers: {
        ChangeName(state, action) { // funkcija koaj za argumente uzima sam state(myName u ovom slucaju) i (action-uvek, jer je to zapravo funkcija koja menja state (samo se zove action))
            state.myName = action.payload // uvek ide trenutni state = funkcija (oba argumenta iz zagrade) 
        },
        setisActive(state){
            state.isActive = !state.isActive
            // ovde smo dali samo onu obrnutu logiku 
            // da se na klik svaki put menja stanje od trenutnog 
            // zbog toga nam ovde ne treba action jer ga direktno ovako menjamo
        },
        setallProducts(state, action) {
            state.allProducts = action.payload // na primer push bas za dodavanje na array
        },
        setCart(state, action) {
            state.cart.push(action.payload)
        },
        setisLoading(state) {
            state.isLoading = !state.isLoading
            // ovo je za producte Loading
        },
        setisPassword(state) {
            state.isPassword = !state.isPassword
        }
    }
})

export const {ChangeName, setisActive, setallProducts, setCart, setisLoading, setisPassword} = productSlice.actions; // ovako exportujemo te nase reducere, i kazemo da je to zapravo ceo nas Slice.actions odnosno sve te promene statova koje smo definisali-taime smo exportovali sve stateove
export default productSlice.reducer; // klasican export reducer funkcije u config 

// ako dodajemo novi array i menjamo ceo state === state.'zeljeni array' = action.payload
// ako dodajemo nesto novo na vec postojeci array === state.'zeljeni array'.push(action.payload)