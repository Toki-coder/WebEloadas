// Alaposztály: Egy egyszerű színes téglalap
class GrafikusElem {
    constructor(x, y, szelesseg, magassag, szin) {

        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
        this.div.style.width = szelesseg + "px";
        
        // Itt állítjuk be az automatikus magasságot
        this.div.style.minHeight = magassag + "px"; 
        this.div.style.height = "auto";            
        this.div.style.overflow = "hidden";        
        
        this.div.style.backgroundColor = szin;
        this.div.style.border = "2px solid black";
        this.div.style.padding = "10px";
        this.div.style.boxSizing = "border-box";
        this.div.style.fontFamily = "Arial";
        
        document.body.appendChild(this.div);

        this.div.style.zIndex = "1";
    }

    mozgat(x, y) {
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
    }

    meretez(w, h) {
        this.div.style.width = w + "px";
        this.div.style.minHeight = h + "px";
    }

    szinvaltas(szin) {
        this.div.style.backgroundColor = szin;
    }

mozgat(x, y) {
    // Ha az Y kisebb, mint 250 (a vezérlőpult alja), akkor nem engedjük feljebb
    let biztonsagosY = y < 250 ? 250 : y; 
    
    this.div.style.left = x + "px";
    this.div.style.top = biztonsagosY + "px";
}

}

// Származtatott osztály: Kártya képpel
class InfoKartya extends GrafikusElem {
    constructor(x, y, szelesseg, magassag, szin, cim, szoveg, kepUrl) {
        super(x, y, szelesseg, magassag, szin);
        
        // Cím
        this.cimElem = document.createElement("h3");
        this.cimElem.innerHTML = cim;
        this.cimElem.style.margin = "0 0 5px 0";
        this.div.appendChild(this.cimElem);

        
        this.kepElem = document.createElement("img");
        this.kepElem.src = kepUrl; 
        this.kepElem.style.display = "block";
        this.kepElem.style.width = "100%";
        this.kepElem.style.height = "auto";
        this.kepElem.style.marginTop = "10px";
        this.kepElem.style.marginBottom = "10px";
        this.kepElem.style.borderRadius = "5px";
        this.div.appendChild(this.kepElem);
        
        // Szöveg
        this.szovegElem = document.createElement("p");
        this.szovegElem.innerHTML = szoveg;
        this.szovegElem.style.margin = "0";
        this.div.appendChild(this.szovegElem);
    }
}

