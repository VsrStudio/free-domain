document.getElementById("subdomainForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim().toLowerCase();
    const domain = document.getElementById("domain").value;
    const email = document.getElementById("email").value.trim();

    const fullSubdomain = `${username}.${domain}`;

    const responseMessage = document.getElementById("responseMessage");

    // Ambil data dari JSON
    const response = await fetch("request.json");
    const requests = await response.json();

    // Cek apakah subdomain sudah ada
    const isDuplicate = requests.some(req => req.subdomain === fullSubdomain);

    if (isDuplicate) {
        responseMessage.textContent = `The subdomain "${fullSubdomain}" is already taken.`;
        responseMessage.style.color = "red";
    } else {
        // Tambahkan data baru
        requests.push({ subdomain: fullSubdomain, email: email, status: "processing" });

        // Simpan kembali ke JSON
        await fetch("request.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requests)
        });

        responseMessage.textContent = `Your request for "${fullSubdomain}" is being processed.`;
        responseMessage.style.color = "green";
    }
});
