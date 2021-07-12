class ImgRule{
    constructor( imgId, rId,position1x,position1y, position2x, position2y,position3x,position3y,numTxt)
    {
        this.imgId = imgId;
        this.rId = rId;
        this.position1x = position1x;
        this.position1y = position1y;
        this.position2x = position2x;
        this.position2y = position2y;
        this.position3x = position3x;
        this.position3y = position3y;
        this.numTxt = numTxt;
    }

    static form(json){
        const l = Object.assign(new ImgRule(), json);
        return l;
    }
}
export default ImgRule;