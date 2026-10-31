
const enquiryForm = document.getElementById("enquiry-form");

// Paste your deployed Google Apps Script Web App URL here.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbO57ZX_QhjGs7PRAoSqC1VweuPMMfdQetp7bHBn5kfW5JpjIOCpSu8Yc4OPLvWB_F/exec";

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("enquiry-name").value.trim();
    const phone = document.getElementById("enquiry-phone").value.trim();
    const interest = document.getElementById("enquiry-type").value;
    const message = document.getElementById("enquiry-message").value.trim();

    if (!name || !phone || !interest) {
      alert("Please complete all required fields.");
      return;
    }

    const whatsappMessage = [
      "Hello Thakur Estates, I would like to make an enquiry.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Interested in: ${interest}`,
      message ? `Message: ${message}` : ""
    ].filter(Boolean).join("\n");

    const whatsappURL =
      "https://wa.me/917776064111?text=" +
      encodeURIComponent(whatsappMessage);

    // Open WhatsApp immediately so the browser does not block it.
    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    // Send the enquiry to Google Sheets.
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("interest", interest);
    formData.append("message", message);

    if (GOOGLE_SCRIPT_URL.endsWith("/exec")) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
      }).catch(function (error) {
        console.error("Lead submission error:", error);
      });
    } else {
      alert("Google Sheets connection URL has not been configured.");
    }
  });
}
