function formatCurrency(number) {
    return (number / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function formatMoney(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    value = formatCurrency(value);
    e.target.value = value;
}

function formatCPF(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11)
        value = value.slice(0, 11);

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    e.target.value = value;
}

function formatPhone(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value.length > 11)
        value = value.slice(0, 11);

    if (value.length == 10)
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2' + (value.length > 6 ? '-$3' : '$3'));
    else if (value.length > 7)
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2' + (value.length > 6 ? '-$3' : '$3'));
    else if (value.length > 2)
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else if (value.length > 0)
        value = value.replace(/^(\d{0,2})/, '($1');

    e.target.value = value;
}

// ---

function formatStrCPF(value) {
    if (value.length > 11)
        value = value.slice(0, 11);

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return value;
}

function formatStrPhone(value) {
    value = value.replace(/\D/g, '');

    if (value.length > 11)
        value = value.slice(0, 11);

    if (value.length > 7)
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2' + (value.length > 6 ? '-$3' : '$3'));
    else if (value.length > 2)
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else if (value.length > 0)
        value = value.replace(/^(\d{0,2})/, '($1');

    return value;
}

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++)
        hash = str.charCodeAt(i) + ((hash << 5) - hash);

    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;

    const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex((r + 255) % 256)}${toHex((g + 255) % 256)}${toHex((b + 255) % 256)}`;
}

function getContrastingColor(color) {
    let r, g, b;

    // Check if the color is in hex format
    if (color.startsWith('#')) {
        // Remove the '#' and parse the hex color
        const hex = color.slice(1);
        
        // Convert hex to RGB
        if (hex.length === 3) {
            // Handle shorthand hex (e.g., #abc)
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            // Handle full hex (e.g., #aabbcc)
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        } else {
            // Invalid hex format
            return 'rgb(0, 0, 0)';
        }
    } else {
        // Handle RGB format if the color is not in hex
        const rgbValues = color.replace(/[^\d,]/g, '').split(',');
        if (rgbValues.length !== 3) return 'rgb(0, 0, 0)';

        r = parseInt(rgbValues[0], 10);
        g = parseInt(rgbValues[1], 10);
        b = parseInt(rgbValues[2], 10);
    }

    // Calculate luminance (perceived brightness)
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    // Return black for light colors and white for dark colors
    return luminance > 128 ? '#000' : '#fff';
}

// ---

function dateToUnix(date_str) {
    const date = new Date(date_str);
    date.setHours(date.getHours() + 3); // Para ajustar o fuso horário (GMT-03:00)

    return date.getTime();
}

function unixToDate(date) {
    return new Date(date).toISOString().split("T")[0];
}

function unixToDateTime(date) {
    return new Date(date).toISOString().split("T")[0];
}

function formatPaymentMethod(method) {
    switch (method) {
        case "cash": return "Dinheiro";
        case "card": return "Cartão";
        case "pix": return "Pix";
        case "billed": return "Faturado";

        case "chargeback": return "Estorno";

        default:
            console.error(`Método de pagamento desconhecido: ${method}`);
            break;
    }
}

function unixToDateTime(epoch) {
    const date = new Date(epoch);

    // Obtém os componentes da data
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function currencyToFloat(str) {
    return parseFloat(str.replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
        .trim());
}

// ---

async function getUser() {
    return (await sendGet('user')).user;
}

async function getHotelName() {
    return (await sendGet('name')).name;
}

async function getCash() {
    return (await sendGet('cash')).cash;
}

async function getCashOpeningTime() {
    return (await sendGet('cash-opening-time')).time;
}

async function getPayments() {
    return (await sendGet('payments')).payments;
}

async function getRooms() {
    return (await sendGet('rooms')).rooms;
}

async function getRoomDebt(number) {
    return (await sendGet(`debt/${number}`)).debt;
}

async function getCheckOutHour() {
    return await sendGet('check-out-hour');
}
async function getRoom(number) {
    const token = localStorage.getItem("token") || "";
    try {
        const response = await axios.get(`http://${API_URL}/api/name`, {
            params: { number },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data.name;
    } catch (e) {
        console.error(JSON.parse(e.request.responseText).message);
    }
}

// ---

async function reserve(number, guests, price, check_out) {
    price = currencyToFloat(price);
    check_out = check_out ? dateToUnix(check_out) : -1;

    guests = guests.map(guest => ({
        name: guest.name,
        cpf: guest.cpf.replace(/\D/g, ''),
        phone: guest.phone.replace(/\D/g, '')
    }));

    return sendPost('reserve', { number, guests, price, check_out });
}

async function editReservation(number, guests, price, check_out) {
    price = currencyToFloat(price);
    check_out = check_out ? dateToUnix(check_out) : -1;

    guests = guests.map(guest => ({
        name: guest.name,
        cpf: guest.cpf.replace(/\D/g, ''),
        phone: guest.phone.replace(/\D/g, '')
    }));
    
    return sendPost('edit-reservation', { number, guests, price, check_out });
}

async function changeCheckOut(number, check_out) {
    check_out = check_out ? dateToUnix(check_out) : -1;
    return sendPost('change-check-out', { number, check_out });
}

async function cancel(number) {
    return sendPost('cancel', { number });
}

async function checkIn(number) {
    return sendPost('checkin', { number });
}

async function checkOut(number, chargeback_mode) {
    return sendPost('checkout', { number, chargeback_mode });
}

async function pay(number, amount, method) {
    amount = currencyToFloat(amount);
    return sendPost('pay', { number, amount, method });
}

async function closeCash() {
    return sendPost('close-cash');
}

