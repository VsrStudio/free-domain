document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.querySelector("#requestsTable tbody");

    try {
        const response = await fetch("server.php", { method: "GET" });
        const requests = await response.json();

        if (requests.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4">No requests found.</td></tr>`;
            return;
        }

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

function updateStatus(index, newStatus) {
    fetch("server.php", {
        method: "GET"
    })
    .then(response => response.json())
    .then(requests => {
        requests[index].status = newStatus;
        return fetch("server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requests)
        });
    })
    .then(() => {
        alert("Status updated successfully.");
        location.reload();
    })
    .catch(err => console.error("Error updating status:", err));
}
