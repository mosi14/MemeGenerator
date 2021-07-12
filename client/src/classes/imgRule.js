class ImgRule{
    constructor( imgId, rId,position1, position2,position3,numTxt)
    {
        this.imgId = imgId;
        this.rId = rId;
        this.position1 = position1;
        this.position2 = position2;
        this.position3 = position3;
        this.numTxt = numTxt;
    }

    static form(json){
        const l = Object.assign(new ImgRule(), json);
        return l;
    }
}
export default ImgRule;