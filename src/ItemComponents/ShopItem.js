export default function ShopItem({itemName, details}){
    return(
        <div>
            <span className="item-text">
                {itemName} | x {details.count} | ${details.totalPrice.toFixed(2)}
            </span>
        </div>
    );

}