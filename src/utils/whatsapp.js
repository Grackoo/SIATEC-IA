// WhatsApp utilities for SIA TEC

const WHATSAPP_NUMBER = '527713951347';

/**
 * Opens WhatsApp with a pre-loaded customer support message
 */
export function openCustomerSupport() {
  const message = encodeURIComponent(
    '¡Hola! Me gustaría hablar con un técnico de SIA TEC. ¿Pueden ayudarme?'
  );
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank');
}

/**
 * Sends shopping cart order to WhatsApp
 * @param {Array} cartItems - Array of cart items
 * @param {number} total - Total amount
 */
export function sendOrderToWhatsApp(cartItems, total) {
  let message = '🛒 *Nuevo Pedido - SIA TEC*\n\n';
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    if (item.specs) {
      message += `   Especificaciones: ${item.specs}\n`;
    }
    if (item.condition) {
      message += `   Condición: ${item.condition}\n`;
    }
    message += `   Cantidad: ${item.quantity}\n`;
    message += `   Precio: $${item.price.toLocaleString('es-MX')}\n`;
    message += `   Subtotal: $${(item.price * item.quantity).toLocaleString('es-MX')}\n\n`;
  });
  
  message += `*Total: $${total.toLocaleString('es-MX')} MXN*\n\n`;
  message += 'Estoy interesado en completar esta compra. ¿Cuáles son los siguientes pasos?';
  
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

/**
 * Sends license order to WhatsApp
 * @param {Array} licenses - Array of license items
 */
export function sendLicenseOrderToWhatsApp(licenses) {
  let message = '🔑 *Solicitud de Licencias - SIA TEC*\n\n';
  
  licenses.forEach((license, index) => {
    message += `${index + 1}. *${license.name}*\n`;
    if (license.type) {
      message += `   Tipo: ${license.type}\n`;
    }
    message += `   Cantidad: ${license.quantity}\n`;
    message += `   Precio: $${license.price.toLocaleString('es-MX')}\n\n`;
  });
  
  const total = licenses.reduce((sum, lic) => sum + (lic.price * lic.quantity), 0);
  message += `*Total: $${total.toLocaleString('es-MX')} MXN*\n\n`;
  message += 'Deseo adquirir estas licencias. ¿Cuál es el proceso de activación?';
  
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

/**
 * Sends appointment request to WhatsApp
 * @param {Object} appointmentData - Appointment details
 */
export function sendAppointmentToWhatsApp(appointmentData) {
  const { name, phone, email, deviceType, problem, date, time, serviceType } = appointmentData;
  
  let message = '🔧 *Solicitud de Cita - Reparación*\n\n';
  message += `*Datos del Cliente:*\n`;
  message += `Nombre: ${name}\n`;
  message += `Teléfono: ${phone}\n`;
  if (email) {
    message += `Email: ${email}\n`;
  }
  message += `\n*Detalles del Servicio:*\n`;
  if (deviceType) {
    message += `Tipo de Equipo: ${deviceType}\n`;
  }
  if (serviceType) {
    message += `Servicio: ${serviceType}\n`;
  }
  message += `Problema: ${problem}\n`;
  message += `\n*Fecha y Hora Preferida:*\n`;
  message += `${date} a las ${time}\n\n`;
  message += '¿Pueden confirmar mi cita?';
  
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

/**
 * Formats currency to Mexican pesos
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
}
