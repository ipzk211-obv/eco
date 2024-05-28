export const formatPrice = (amount: number) =>{
    return new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
    }).format(amount).replace('₴', 'грн');
}
