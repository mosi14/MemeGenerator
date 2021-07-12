class Meme{
    constructor(id, imgId, txtColor, title, text1, text2, text3, privacy, userId,username , name, txtFont, rId,position1x,position1y, position2x, position2y,position3x,position3y,numTxt)
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
        this.username = username;
        this.name = name
        this.txtFont = txtFont;
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
        const l = Object.assign(new Meme(), json);
        return l;
    }
}
export default Meme;