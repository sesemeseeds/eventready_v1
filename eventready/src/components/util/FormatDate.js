const FormatDate = (dateString, format) => {
    const date = new Date(dateString);
    let formattedDate = '';

    switch (format) {
        case 'MM/DD/YY':
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear() % 100;
            formattedDate = `${month}/${day}/${year}`;
            break;
        case 'YY/MM/DD':
            const yearYY = date.getFullYear() % 100;
            const monthYY = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
            const dayYY = (date.getDate() < 10 ? '0' : '') + date.getDate();
            formattedDate = `${yearYY}-${monthYY}-${dayYY}`;
            break;
        case 'YYYY/MM/DD':
            const yearYYYY = date.getFullYear();
            const monthYYYY = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
            const dayYYYY = (date.getDate() < 10 ? '0' : '') + date.getDate();
            formattedDate = `${yearYYYY}-${monthYYYY}-${dayYYYY}`;
            break;
        default:
            formattedDate = dateString;
            break;
    }

    return formattedDate;
};

export default FormatDate;