import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./productSlice"
// # 2. stavka reduxa je konfiguracija samih nasih reducera

const store = configureStore({ // isto za sam configure dajemo ime constante kao ime file, zato je obicno ime store, zato sto je u funkcija configureStore
    reducer: { // ovde smo za reducer naveli ime iz Slice file (product) kao key i value ceo reducer iz SLice koliko god da sadrzi stateova
        product: productReducer
    }
});

export default store;