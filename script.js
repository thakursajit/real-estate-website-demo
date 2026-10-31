
const enquiryForm = document.getElementById("enquiry-form");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("enquiry-name").value.trim();
    const phone = document.getElementById("enquiry-phone").value.trim();
    const interest = document.getElementById("enquiry-type").value;
    const message = document.getElementById("enquiry-message").value.trim();

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

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}
