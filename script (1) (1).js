$(document).ready(function() {
  // Handle form submission
  $("#tutoring-form").submit(function(e) {
    e.preventDefault();

    // Retrieve form data
    var studentName = $("#student-name").val();
    var birthDate = $("#birth-date").val();
    var level = $("#level").val();
    var selectedSubjects = $("input[name='subjects']:checked").map(function() {
      return $(this).attr("id");
    }).get();
    var email = $("#email").val();

    // Construct the receipt email body
    var receipt = "Thank you for your tutoring order!\n\n";
    receipt += "Student Name: " + studentName + "\n";
    receipt += "Birth Date: " + birthDate + "\n";
    receipt += "Level of Tutoring: " + level + "\n";
    receipt += "Selected Subjects:\n";
    selectedSubjects.forEach(function(subject) {
      receipt += "- " + subject.charAt(0).toUpperCase() + subject.slice(1) + "\n";
    });
    receipt += "Total Price: $" + $("#total-price").text().substring(1) + "\n\n";
    receipt += "We will contact you shortly to schedule the tutoring sessions.";

    // Send the receipt email using EmailJS
    var templateParams = {
      to_email: email,
      from_name: "Your Name",
      message: receipt
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function(response) {
        // Display success message
        alert("Receipt sent successfully!\nPlease check your email.");

        // Reset the form
        $("#tutoring-form")[0].reset();
        $("#total-price").text("Total Price: $0");
      }, function(error) {
        // Display error message
        alert("Failed to send receipt.\nPlease try again later.");
      });
  });
});
