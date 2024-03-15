const FormatDate = (dateString, format) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    let formattedDate = '';

    switch (format) {
        case 'MM/DD/YY':
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear() % 100;
            formattedDate = `${month}/${day}/${year}`;
            break;
        case 'MM/DD/YYYY':
            const monthYYYY_1 = (date.getMonth() + 1).toString().padStart(2, '0');
            const dayYYYY_1 = date.getDate().toString().padStart(2, '0');
            const yearYYYY_1 = date.getFullYear();
            formattedDate = `${monthYYYY_1}/${dayYYYY_1}/${yearYYYY_1}`;
            break;
        case 'YY/MM/DD':
            const yearYY = date.getFullYear() % 100;
            const monthYY = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
            const dayYY = (date.getDate() < 10 ? '0' : '') + date.getDate();
            formattedDate = `${yearYY}-${monthYY}-${dayYY}`;
            break;
        case 'YYYY/MM/DD':
            const yearYYYY_2 = date.getFullYear();
            const monthYYYY_2 = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
            const dayYYYY_2 = (date.getDate() < 10 ? '0' : '') + date.getDate();
            formattedDate = `${yearYYYY_2}-${monthYYYY_2}-${dayYYYY_2}`;
            break;
        default:
            formattedDate = dateString;
            break;
    }

    return formattedDate;
};

export default FormatDate;