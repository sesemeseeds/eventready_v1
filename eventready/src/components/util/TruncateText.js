export const TruncateText = ({text, maxLength}) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};

export const TruncateHTML = (html, maxLength) => {
    html = html.replace(/<\/p>\s*<p>/g, '');

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    let truncatedContent = '';
    let charCount = 0;
    for (const child of tempDiv.childNodes) {
        const textContent = child.textContent.trim();
        if (charCount + textContent.length <= maxLength) {
            truncatedContent += child.outerHTML;
            charCount += textContent.length;
        } else {
            const remainingLength = maxLength - charCount;
            truncatedContent += textContent.substring(0, remainingLength);
            break;
        }
    }
    if (!truncatedContent.trim() || truncatedContent === html.trim()) {
        return html;
    }
    if (truncatedContent.length < html.length) {
        truncatedContent += '...';
    }
    return truncatedContent;
};
