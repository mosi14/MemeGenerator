class Meme {
    constructor(id, imgId, txtColor, title, text1, text2, text3, privacy, userId, txtFont) {
        if (id) {
            this.id = id;
        }

        this.imgId = imgId;
        this.txtColor = txtColor;
        this.title = title;
        this.text1 = text1;
        this.text2 = text2;
        this.text3 = text3;
        this.privacy = privacy;
        this.userId = userId;
        this.txtFont = txtFont;
    }

    /**
     * Construct a Meme from a plain object
     * @param {{}} json 
     * @return {Rent} the newly created Meme object
     */
    static from(json) {
        const r = Object.assign(new Meme(), json);
        return r;
    }

}

export default Meme;