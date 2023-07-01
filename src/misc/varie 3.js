export const replaceString = (url) => {
    return String(url).replace(/&amp;/g, '&');
};

export const wordShortener = (str, expanded) => { 
    if(!expanded) {
        let shortened = str.slice(0,300);
       return shortened + '...'
    } else {
        return str
    }
  }