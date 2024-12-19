document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.querySelector("#requestsTable tbody");

    const response = await fetch("request.json");
    const requests = await response.json();

    // Tampilkan data
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
});

// Update status
async function updateStatus(index, newStatus) {
    const response = await fetch("request.json");
    const requests = await response.json();

    requests[index].status = newStatus;

    await fetch("request.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requests)
    });

    location.reload();
}
