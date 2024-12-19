document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.querySelector("#requestsTable tbody");

    try {
        const response = await fetch("request.json");
        const requests = await response.json();

        // Cek jika data kosong
        if (requests.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4">No requests found.</td></tr>`;
            return;
        }

        // Loop dan tambahkan data ke tabel
        requests.forEach((request, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${request.subdomain}</td>
                <td>${request.email}</td>
                <td>${request.status}</td>
                <td>
                    <button onclick="updateStatus(${index}, 'active')">Activate</button>
                    <button onclick="updateStatus(${index}, 'rejected')">Reject</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Failed to load requests:", error);
        tableBody.innerHTML = `<tr><td colspan="4">Failed to load requests.</td></tr>`;
    }
});
