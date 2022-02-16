let suitPlayer;

//Statement if else ini untuk memberi background abu-abu ke pilihan player
//Juga mencatat log pilihan player ke terminal
//Sekaligus memberi nilai pada variabel suitPlayer untuk fungsi suitHasilSuit
function suitPilihanPlayer(suitCheckPlayer){

    if(suitCheckPlayer == 0){
        document.getElementById("suitBackgroundBatuPlayer").style.backgroundColor = "#C4C4C4";
        document.getElementById("suitBackgroundKertasPlayer").style.background = "none";
        document.getElementById("suitBackgroundGuntingPlayer").style.background = "none";
        console.log("Batu");
        suitPlayer = 0;
    } else if(suitCheckPlayer == 1){
        document.getElementById("suitBackgroundBatuPlayer").style.background = "none";
        document.getElementById("suitBackgroundKertasPlayer").style.backgroundColor = "#C4C4C4";
        document.getElementById("suitBackgroundGuntingPlayer").style.background = "none";
        console.log("Kertas");
        suitPlayer = 1;
    } else {
        document.getElementById("suitBackgroundBatuPlayer").style.background = "none";
        document.getElementById("suitBackgroundKertasPlayer").style.background = "none";
        document.getElementById("suitBackgroundGuntingPlayer").style.backgroundColor = "#C4C4C4";
        console.log("Gunting");
        suitPlayer = 2;
    }
    suitPilihanCOM()
    suitHasilSuit()
}

// Fungsi ini digunakan untuk membuat komputer melakukan pilihan acak
// Background abu-abu juga ditambahkan pada pilihan komputer agar player dapat melihatnya
function suitPilihanCOM(){
    suitCOM = Math.floor(Math.random() * 3);
    if(suitCOM == 0){
        document.getElementById("suitBackgroundBatuCOM").style.backgroundColor = "#C4C4C4";
        document.getElementById("suitBackgroundKertasCOM").style.background = "none";
        document.getElementById("suitBackgroundGuntingCOM").style.background = "none";
    } else if(suitCOM == 1){
        document.getElementById("suitBackgroundBatuCOM").style.background = "none";
        document.getElementById("suitBackgroundKertasCOM").style.backgroundColor = "#C4C4C4";
        document.getElementById("suitBackgroundGuntingCOM").style.background = "none";
    } else {
        document.getElementById("suitBackgroundBatuCOM").style.background = "none";
        document.getElementById("suitBackgroundKertasCOM").style.background = "none";
        document.getElementById("suitBackgroundGuntingCOM").style.backgroundColor = "#C4C4C4";
    }
}

// Fungsi ini bertujuan untuk mengadu pilihan player dan komputer
// Variabel suitPlayer yang didefiniskan di atas dan diberikan nilai integer pada fungsi suitPilihanPlayer
// Akan digunakan di sini, di mana nilai integer akan mempermudah perbandingan
// Karena nilai pilihan player (suitPlayer) dan pilihan komputer (suitCOM) disamakan
// Fungsi ini juga merubah tulisan VS di antara barisan tangan suit dengan kotak dan tulisan hasil suit
function suitHasilSuit(){

    if(suitPlayer == suitCOM){
        document.getElementById("suitDisplayHasil").style.display = "none";
        document.getElementById("suitDisplayPlayerWin").style.display = "none";
        document.getElementById("suitDisplayCOMWin").style.display = "none";
        document.getElementById("suitDisplayDraw").style.display = "flex";
        document.getElementById("suitIDPembatasKotakObjek").style.paddingTop = "250px";
        document.getElementById("suitReset").style.paddingTop = "125px";
        console.log("Seri guys, coba lagi deh");
    }
    else if((suitPlayer == 0 && suitCOM == 1)||
            (suitPlayer == 1 && suitCOM == 2)||
            (suitPlayer == 2 && suitCOM == 0)){
        document.getElementById("suitDisplayHasil").style.display = "none";
        document.getElementById("suitDisplayPlayerWin").style.display = "none";
        document.getElementById("suitDisplayCOMWin").style.display = "flex";
        document.getElementById("suitDisplayDraw").style.display = "none";
        document.getElementById("suitIDPembatasKotakObjek").style.paddingTop = "250px";
        document.getElementById("suitReset").style.paddingTop = "125px";
        console.log("Kalah nih, udahan aja yuk");
    }
    else{
        document.getElementById("suitDisplayHasil").style.display = "none";
        document.getElementById("suitDisplayPlayerWin").style.display = "flex";
        document.getElementById("suitDisplayCOMWin").style.display = "none";
        document.getElementById("suitDisplayDraw").style.display = "none";
        document.getElementById("suitIDPembatasKotakObjek").style.paddingTop = "250px";
        document.getElementById("suitReset").style.paddingTop = "125px";
        console.log("Menang bro, mantapp");
    }
}

function suitKembaliKeAwal(){
    document.getElementById("suitBackgroundBatuPlayer").style.background = "none";
    document.getElementById("suitBackgroundKertasPlayer").style.background = "none";
    document.getElementById("suitBackgroundGuntingPlayer").style.background = "none";
    document.getElementById("suitBackgroundBatuCOM").style.background = "none";
    document.getElementById("suitBackgroundKertasCOM").style.background = "none";
    document.getElementById("suitBackgroundGuntingCOM").style.background = "none";
    document.getElementById("suitDisplayHasil").style.display = "block";
    document.getElementById("suitDisplayPlayerWin").style.display = "none";
    document.getElementById("suitDisplayCOMWin").style.display = "none";
    document.getElementById("suitDisplayDraw").style.display = "none";
    document.getElementById("suitIDPembatasKotakObjek").style.paddingTop = "175px";
    document.getElementById("suitReset").style.paddingTop = "25px";
}

//inheritance
//encapsulation
//abstraction
//polymorphism

class Human {
    constructor(isStart, valuePlayer, valueCOM){
        this.isStart = isStart
        this.valuePlayer = valuePlayer
        this.valueCOM = valueCOM
    }

    //apa yang bisa dilakukan game ini

    gameStart(){
        document.getElementById('startgame').addEventListener('click', () => {
        //akan memulai game
            this.isStart = true

            //listen pilihan player
            console.log(this.isStart)
            alert('Game start', this.isStart)
        })
    }

    pilihanPlayer(){
        //belum dimulai gamenya
        if(this.isStart == false){
            alert('Klik Tombol Start')
        } else {
            //listen pilihan
            // . -> class
            // # -> id
            // a, div -> tag
            let pilihanPlayer = document.getElementById('pilihanUser').querySelectorAll('#pilihanUser div')
            console.log(typeof pilihanPlayer)
            console.log(pilihanPlayer.length)

            //map -> es6 buat loop array
            //[div, div, div]
            for(let index = 0; index < pilihanPlayer.length; index++){
                pilihanPlayer[index].addEventListener('click', () =>{
                    if(!this.valuePlayer){
                        this.valuePlayer = index
                    }

                    if(this.isStart == true && !this.valuePlayer){
                        this.styling
                    }
                })
            }
        }
    }
    randomValue(){
        let randomAngka = Math.floor(Math.random() * 3)
        return randomAngka
    }

    cekHasil(user, comp){

        let hasilcek = ''
        if (user == comp){
            hasilcek = 'seri'
        } else {
            hasilcek = 'Player 1 menang'
        }

    }

    stylingHasil(hasil){
        document.getElementById('hasil').innerHTML = hasil
    }

    reset(){

    }

    styling(element){

        console.log(element)
        element.style.background = 'black'
    }

    stylingcomp(index){
        let elementCOM = document.querySelectorAll('#pilihanCOM div')
    }
}