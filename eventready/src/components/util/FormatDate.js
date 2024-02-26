const FormatDate = (dateString, format) => {
    const date = new Date(dateString);
    let formattedDate = '';

    switch (format) {
        case 'MM/DD/YY':
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear() % 100;
            formattedDate = `${month}/${day}/${year}`;
            break;
        // Add other date formats as needed
        default:
            formattedDate = dateString;
            break;
    }

    return formattedDate;
};

export default FormatDate;
