// Email service configuration for contact form
export const sendEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    // Using EmailJS service - you'll need to set this up
    const serviceID = 'your_service_id';
    const templateID = 'your_template_id';
    const publicKey = 'your_public_key';
    
    // For now, we'll use a simple email client approach with better formatting
    const emailSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `New message from your portfolio contact form:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `---\n` +
      `Sent from: ${window.location.href}`
    );
    
    // Create mailto link
    const mailtoLink = `mailto:abhaysaklani706@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    return { success: true, message: 'Email client opened successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
};
