// oov ce biti js file gde ce se slika, ili neki file parsovati u string

export const FileParse = (file) => { // odmah pravimo contantu sa FileParse funkcijom
    // i za argument joj uvek damo taj kao jedan file
    return new Promise((resolve, reject) => { // a da bi parsovanje pocelo, potreba nam je Promise
        // new Promise uvek u sebi ima arrow funkciju sa (resolve, reject)
        let fileReader = new FileReader(); // pravimo novu istancu/ odnosno file reader(citac filova)

        fileReader.readAsDataURL(file); // koristimo metodu za citanje preko URL
        // i uvek prihvatimo nas file koji smo prolsedili gore 

        fileReader.onload = () => resolve(fileReader.result) 
        //ovde smo rekli da kada se slika ucita, vrati arrow funkciju
        // u arrow funkiji imamo resolve(prikaz) naseg rezultata od fileReadera

    })

}