const url = "http://localhost:3002/";

fetch(url)
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log("System Health Check: PASS");
    console.log("Status:", response.status);
    console.log("Response:", data);
  })
  .catch((error) => {
    console.error("System Health Check: FAIL");
    console.error("Error:", error.message);
    process.exit(1);
  });