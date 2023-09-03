import { Button  } from "@mui/material"

export default function CategoryItem({item, onCategorySort })
{
    const handleButtonClick = () => {
        // Call the parent component's handleCategorySort function with the 'item' as an argument
        onCategorySort(item);
    };
    return (
        <Button variant="outlined" onClick={handleButtonClick}>{item}</Button>
    )
}