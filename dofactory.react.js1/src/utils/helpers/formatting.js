


export const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Change this to your desired currency code
        minimumFractionDigits: 0
    });

    return formatter.format(value);
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad with leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}/${day}/${year}`;
}

export const formatPercent = (value) => {

    if (value > 0 && value < 101) {
        return value + "%";
    } else {
        return "0%";
    }
}
