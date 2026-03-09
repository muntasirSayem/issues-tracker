const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

function activeButton(btn) {
    allBtn.classList.remove("text-white", "bg-[#4A00FF]");
    allBtn.classList.add("text-[#64748B]", "bg-white");

    openBtn.classList.remove("text-white", "bg-[#4A00FF]");
    openBtn.classList.add("text-[#64748B]", "bg-white");

    closedBtn.classList.remove("text-white", "bg-[#4A00FF]");
    closedBtn.classList.add("text-[#64748B]", "bg-white");

    btn.classList.remove("text-[#64748B]", "bg-white");
    btn.classList.add("text-white", "bg-[#4A00FF]");
}


// update count-------------->
const issueCount = document.getElementById("issueCount");

function updateCount(id) {
    const container = document.getElementById(id);
    issueCount.textContent = container.children.length;
}

async function allIssues() {
    activeButton(allBtn);

    document.getElementById('issueContainer').classList.remove('hidden');
    document.getElementById('openIssue').classList.add('hidden');
    document.getElementById('closedIssue').classList.add('hidden');

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();
    displayIssuesByStatus(json.data);

    updateCount("issueContainer");
}

async function showOpen() {
    activeButton(openBtn);

    document.getElementById('issueContainer').classList.add('hidden');
    document.getElementById('openIssue').classList.remove('hidden');
    document.getElementById('closedIssue').classList.add('hidden');

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();
    displayIssuesByStatus(json.data, "open");
    updateCount("openIssue");
}

async function showClosed() {
    activeButton(closedBtn);

    document.getElementById('issueContainer').classList.add('hidden');
    document.getElementById('openIssue').classList.add('hidden');
    document.getElementById('closedIssue').classList.remove('hidden');

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();
    displayIssuesByStatus(json.data, "closed");
    updateCount("closedIssue");
}


allIssues();
