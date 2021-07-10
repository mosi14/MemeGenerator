class Meme{
    constructor(id, imgId, txtColor, title, text1, text2, text3, privacy, userId, txtFont, rId,position1, position2,position3,numTxt)
    {
        this.id = id;
        this.imgId = imgId;
        this.txtColor = txtColor;
        this.title = title;
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.privacy = privacy;
        this.userId = userId;
        this.txtFont = txtFont;
        this.rId = rId;
        this.position1 = position1;
        this.position2 = position2;
        this.position3 = position3;
        this.numTxt = numTxt;
    }

    static form(json){
        const l = Object.assign(new Meme(), json);
        return l;
    }
}
export default Meme;