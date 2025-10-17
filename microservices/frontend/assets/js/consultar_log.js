async function fetchLogData() {
  const idNumberInput = document.getElementById("searchNumeroDocumento");
  const date = document.getElementById("datepicker").value;
  const action = document.getElementById("tipoAccion").value;
  const logResults = document.getElementById("logResults");
  logResults.innerHTML = ""; // Clear previous results
  let formattedDate = "";
  if (date) {
    const birthDate = date.split("T")[0];
    const dateParts = birthDate.split("-");
    formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    console.log(formattedDate);
  }

  // Validate the idNumberInput against the pattern \d{1,10}
  const idNumberPattern = /^\d{0,10}$/;
  if (!idNumberPattern.test(idNumberInput.value)) {
    alert("Document number ,ust be between 1 and 10 numbers");
    return;
  }

  const idNumber = idNumberInput.value;
  const url = new URL("http://localhost:8000/log/");
  const params = {};
  if (idNumber) params.idNumber = idNumber;
  if (formattedDate) {
    params.date = formattedDate;
  }
  if (action) params.action = action;
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.length === 0) {
        logResults.innerHTML =
          "<p>No logs were found with the provided filters</p>";
      } else {
        logResults.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Document number</th>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (log) => `
                <tr>
                  <td>${log.idNumber}</td>
                  <td>${log.action}</td>
                  <td>${formatDate(log.createdAt)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `;
      }
    } else if (response.status === 404) {
      throw new Error("The document number does not exist");
    } else if (response.status === 503) {
      throw new Error("log-ms is not available");
    } else if (response.status === 504) {
      throw new Error("The database is not available");
    } else {
      throw new Error("Unknown Error");
    }
  } catch (error) {
    if (error.message === "Failed to fetch") {
      alert("Error: api-gateway is not available");
    } else {
      alert("Error: " + error.message);
    }
  }
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const time = date.toLocaleTimeString(); // Esto mantiene la hora local
  return `${day}-${month}-${year} ${time}`;
}