class Dato{
    constructor(descripcion,valor){
        this._descripcion = descripcion; // Private property to hold the description
        this._valor = valor; // Private property to hold the value
    }
    
    get descripcion(){
        return this._descripcion;
    }
    set descripcion(descripcion){
        this._descripcion = descripcion;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor = valor;
    }
}