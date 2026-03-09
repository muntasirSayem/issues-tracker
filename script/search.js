const input = document.getElementById("search");

input.addEventListener("input", () => {
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => {
            const allIssues = data.data;
            console.log(allIssues);
            const filterIssues = allIssues.filter((issue) =>
                issue.title.trim().toLowerCase().includes(searchValue));
            displayIssuesByStatus(filterIssues);
        });
})