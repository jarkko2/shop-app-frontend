export default function ShopItem(item){
    const shopItem = item.item
    return(
        <div key={shopItem._id}>
            <span className="item-text">
                {shopItem.name} | {shopItem.price}€
            </span>
        </div>
    );

}