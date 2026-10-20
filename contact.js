"use strict";
document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  if (!name || message.length < 10) {
    document.getElementById("contact-status").textContent = "Please enter your name and a message of at least 10 characters.";
    return;
  }
  const subject = `TravelBloom enquiry from ${name}`;
  const body = `Name: ${name}\r\nReply email: ${email}\r\n\r\n${message}`;
  const link = `mailto:berdibekmejirbek08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById("contact-status").textContent = "Your email draft is ready. If your email app did not open, use the email address on this page to send your message.";
  window.location.href = link;
});
