// convert buffer to image
function discountPercent(newPrice,oldPrice) {
    const percent = Math.ceil((newPrice * 100)/oldPrice);
    return percent;
 }
 
 export default discountPercent;