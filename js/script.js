document.getElementById("subdomainForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim().toLowerCase();
    const domain = document.getElementById("domain").value;
    const email = document.getElementById("email").value.trim();

    const fullSubdomain = `${username}.${domain}`;
    const responseMessage = document.getElementById("responseMessage");

    console.log("Submitting form with: ", fullSubdomain, email);

    try {
        const response = await fetch("server.php", { method: "GET" });
        const requests = await response.json();

        const isDuplicate = requests.some(req => req.subdomain === fullSubdomain);

        if (isDuplicate) {
            responseMessage.textContent = `The subdomain "${fullSubdomain}" is already taken.`;
            responseMessage.style.color = "red";
        } else {
            const requestData = { subdomain: fullSubdomain, email: email, status: "processing" };
            const postResponse = await fetch("server.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            if (postResponse.ok) {
                responseMessage.textContent = `Your request for "${fullSubdomain}" is being processed.`;
                responseMessage.style.color = "green";
            } else {
                responseMessage.textContent = "Failed to process your request. Please try again.";
                responseMessage.style.color = "red";
            }
        }
    } catch (error) {
        console.error("Error submitting the form:", error);
        responseMessage.textContent = "An error occurred. Please try again later.";
        responseMessage.style.color = "red";
    }
});
