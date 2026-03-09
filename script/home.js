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

// loading spinner
const manageSpinner = (show, id = "issueContainer") => {
    let container = document.getElementById(id);
    const spinner = document.getElementById("spinner");

    if (show === true) {
        spinner.classList.remove("hidden");
        container.classList.add("hidden");
    } else {
        spinner.classList.add("hidden");
        container.classList.remove("hidden");
    }
};

// update count-------------->
const issueCount = document.getElementById("issueCount");

function updateCount(id) {
    const container = document.getElementById(id);
    issueCount.textContent = container.children.length;
}

async function allIssues() {
    activeButton(allBtn);

    manageSpinner(true, "issueContainer");

    document.getElementById('issueContainer').classList.remove('hidden');
    document.getElementById('openIssue').classList.add('hidden');
    document.getElementById('closedIssue').classList.add('hidden');

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();
    displayIssuesByStatus(json.data);

    updateCount("issueContainer");

    manageSpinner(false, "issueContainer");
}

async function showOpen() {
    activeButton(openBtn);

    manageSpinner(true, "openIssue");

    document.getElementById('issueContainer').classList.add('hidden');
    document.getElementById('openIssue').classList.remove('hidden');
    document.getElementById('closedIssue').classList.add('hidden');

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();
    displayIssuesByStatus(json.data, "open");
    updateCount("openIssue");

    manageSpinner(false, "openIssue");
}

async function showClosed() {
    activeButton(closedBtn);

    manageSpinner(true, "closedIssue");

    document.getElementById('issueContainer').classList.add('hidden');
    document.getElementById('openIssue').classList.add('hidden');
    document.getElementById('closedIssue').classList.remove('hidden');

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();
    displayIssuesByStatus(json.data, "closed");
    updateCount("closedIssue");

    manageSpinner(false, "closedIssue");
}


allIssues();


const displayIssuesByStatus = (issues, status = "all") => {
    // container
    const containerId = status === "open" ? "openIssue" : status === "closed" ? "closedIssue" : "issueContainer";
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    issues.forEach(issue => {
        if (status !== "all" && issue.status !== status) return;

        // label style
        let getLabelBg = (label) => label === "bug" ? "bg-[#FEECEC] border border-[#FECACA] text-[#EF4444] font-medium text-[0.75rem] py-1.5 px-2" :
            label === "good first issue" ? "bg-gray-100 border border-gray-300 text-gray-600 font-medium text-[0.75rem] py-1.5 px-2" :
                label === "enhancement" ? "bg-[#DEFCE8] border border-[#BBF7D0] text-[#00A96E] font-medium text-[0.75rem] py-1.5 px-2" :
                    label === "help wanted" ? "bg-[#FFF8DB] border border-[#FDE68A] text-[#D97706] font-medium text-[0.75rem] py-1.5 px-2" :
                        label === "documentation" ? "bg-blue-100 border border-blue-200 text-blue-600 font-medium text-[0.75rem] py-1.5 px-2" :
                            "bg-red-300";

        const label1Bg = issue.labels[0] ? getLabelBg(issue.labels[0]) : "";
        const label2Bg = issue.labels[1] ? getLabelBg(issue.labels[1]) : "";

        // create issue card 
        const issueCard = document.createElement("div");
        issueCard.innerHTML = `
        <div id="${issue.id}" onclick="loadIssueDetail(${issue.id})" class="bg-white rounded h-full ${issue.status === "open"
                ? "border-t-4 border-t-[#00A96E]"
                : "border-t-4 border-t-[#A855F7]"} shadow-[0_3px_6px_rgba(0,0,0,0.08)]">
            
                <div class="flex justify-end mt-4 mr-4">
                    <button class="h-6 w-20 text-[0.75rem] font-medium rounded-full 
                    ${issue.priority === 'high' ? 'bg-[#FEECEC] text-[#EF4444]' :
                issue.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' :
                    'bg-[#EEEFF2] text-[#9CA3AF]'}">
                    ${issue.priority.toUpperCase()}
                    </button>
                </div>
                <div class="space-y-3 p-4">
                    <h1 class="text-[0.875rem] font-semibold text-[#1F2937]">${issue.title}</h1>
                    <p class="text-[#64748B] text-[0.75rem]">${issue.description}</p>
                    ${issue.labels[0] ? `<button class="${label1Bg} p-1 rounded-full">${issue.labels[0].toUpperCase()}</button>` : ""}
                    ${issue.labels[1] ? `<button class="${label2Bg} p-1 rounded-full">${issue.labels[1].toUpperCase()}</button>` : ""}
                </div>
                <hr class="text-[#E4E4E7]">    
                <div class="space-y-3 p-4 text-[#64748B] text-[0.75rem]">
                    <p>#${issue.id} by ${issue.author}</p>
                    <p>${issue.createdAt}</p>
                </div>
            
        </div>`;

        container.appendChild(issueCard);
    });
}


// modal--------------->
const loadIssueDetail = async (id) => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const json = await res.json();
    displayIssueDetails(json.data.find(issue => issue.id === id));
};

const displayIssueDetails = (issue) => {

    // label style
    let getLabelBg = (label) => label === "bug" ? "bg-[#FEECEC] border border-[#FECACA] text-[#EF4444] font-medium text-[0.75rem] py-1.5 px-2" :
        label === "good first issue" ? "bg-gray-100 border border-gray-300 text-gray-600 font-medium text-[0.75rem] py-1.5 px-2" :
            label === "enhancement" ? "bg-[#DEFCE8] border border-[#BBF7D0] text-[#00A96E] font-medium text-[0.75rem] py-1.5 px-2" :
                label === "help wanted" ? "bg-[#FFF8DB] border border-[#FDE68A] text-[#D97706] font-medium text-[0.75rem] py-1.5 px-2" :
                    label === "documentation" ? "bg-blue-100 border border-blue-200 text-blue-600 font-medium text-[0.75rem] py-1.5 px-2" :
                        "bg-red-300";

    const label1Bg = issue.labels[0] ? getLabelBg(issue.labels[0]) : "";
    const label2Bg = issue.labels[1] ? getLabelBg(issue.labels[1]) : "";

    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <h1 class="text-[#1F2937] text-[1.5rem] font-bold mb-2">${issue.title}</h1>
                    <div class="flex gap-1 items-center mb-6">
                        <button class="text-white text-[0.75rem] font-medium ${issue.status === 'open'
            ? 'bg-[#00A96E]'
            : 'bg-[#A855F7]'} rounded-full w-15 h-6">${issue.status === 'open' ? 'Opened' : 'Closed'}</button>
                        <p class="text-[#64748B] text-[0.75rem]">● ${issue.status === 'open' ? 'Opened' : 'Closed'} by <span>${issue.author}</span> ● ${issue.createdAt}</p>
                    </div>
                    ${issue.labels[0] ? `<button
                        class="${label1Bg} p-1 rounded-full">${issue.labels[0].toUpperCase()}</button>` : ""}
                    ${issue.labels[1] ? `<button
                        class="${label2Bg} p-1 rounded-full">${issue.labels[1].toUpperCase()}</button>` : ""}
                    <p class="text-[#64748B] text-[1rem] my-6">${issue.description}</p>
                    <div class="bg-[#F8FAFC] grid grid-cols-2 p-4 rounded-lg">
                        <div>
                            <h4 class="text-[1rem] text-[#64748B]">Assignee:</h4>
                            <h4 class="text-[1rem] text-[#1F2937] font-semibold">${issue.author}</h4>
                        </div>
                        <div>
                            <h4 class="text-[1rem] text-[#64748B]">Priority:</h4>
                            <button class="h-6 w-20 text-[0.75rem] font-medium rounded-full 
                    ${issue.priority === 'high' ? 'bg-[#EF4444] text-white' :
            issue.priority === 'medium' ? 'bg-[#F59E0B] text-white' :
                'bg-[#9CA3AF] text-white'}">
                                ${issue.priority.toUpperCase()}
                            </button>
                        </div>
                    </div>
                    `;
    document.getElementById("issue_modal").showModal();
};