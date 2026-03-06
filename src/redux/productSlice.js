// Obicno folder nazovemo productSlice, jer koristimo Slice funkciju 
//# 1. stavka u reduxu je pravljenje globalnih stateova sa SLice

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    myName: "", // na primer state za neko prazno polje (nesto na klik)
    isActive: true, // isto neki jednostavan state za menjanje stanja na klik
    buys: []  // na primer neki array, pa dodavanje/brisanje podataka unutra 
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
        addBuys(state, action) {
            state.buys.push(action.payload) // na primer push bas za dodavanje na array
        }
    }
})

export const {ChangeName, setisActive} = productSlice.actions; // ovako exportujemo te nase reducere, i kazemo da je to zapravo ceo nas Slice.actions odnosno sve te promene statova koje smo definisali-taime smo exportovali sve stateove
export default productSlice.reducer; // klasican export za config