document.getElementById("subdomainForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Menghentikan form untuk melakukan reload

    const username = document.getElementById("username").value.trim().toLowerCase();
    const domain = document.getElementById("domain").value;
    const email = document.getElementById("email").value.trim();

    const fullSubdomain = `${username}.${domain}`;

    const responseMessage = document.getElementById("responseMessage");

    // Cek data dengan PHP
    const response = await fetch("server.php", { method: "GET" });
    const requests = await response.json();

    const isDuplicate = requests.some(req => req.subdomain === fullSubdomain);

    if (isDuplicate) {
        responseMessage.textContent = `The subdomain "${fullSubdomain}" is already taken.`;
        responseMessage.style.color = "red";
    } else {
        // Kirim data baru ke PHP
        const requestData = { subdomain: fullSubdomain, email: email, status: "processing" };
        await fetch("server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        responseMessage.textContent = `Your request for "${fullSubdomain}" is being processed.`;
        responseMessage.style.color = "green";
    }
});
