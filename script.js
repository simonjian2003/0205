// 模擬從後端或原始資料轉換而來的 JSON 物件
const rawData = [
    { status: "使用中", start: "2026-01-22 08:32", end: "", name: "Hydroxychloroquine 200mg/Tab", dose: "1 Tab", mg: "200 mg", route: "PO", freq: "STAT", days: "1", total: "1 Tab", note: "", code: "THYD-CH3" },
    { status: "使用中", start: "2026-01-22 08:32", end: "", name: "Rosuvastatin 10mg/Tab", dose: "0.5 Tab", mg: "5 mg", route: "PO", freq: "STAT", days: "1", total: "1 Tab", note: "", code: "TROSUVA" },
    { status: "使用中", start: "2026-01-22 08:32", end: "", name: "Rabeprazole 20mg/Tab", dose: "1 Tab", mg: "20 mg", route: "PO", freq: "STAT", days: "1", total: "1 Tab", note: "", code: "TRABEPR" },
    { status: "使用中", start: "2026-01-22 08:32", end: "", name: "Clopidogrel 75mg/Tab", dose: "1 Tab", mg: "75 mg", route: "PO", freq: "STAT", days: "1", total: "1 Tab", note: "", code: "TCLOPID" },
    { status: "使用中", start: "2026-01-22 08:32", end: "", name: "Aspirin(腸溶微粒膠囊) 100mg/Cap", dose: "1 Cap", mg: "100 mg", route: "PO", freq: "STAT", days: "1", total: "1 Cap", note: "", code: "TASPI100" },
    { status: "已停用", start: "2026-01-21 08:25", end: "2026-01-22 08:30", name: "Rosuvastatin 10mg/Tab", dose: "0.5 Tab", mg: "5 mg", route: "PO", freq: "QDPC", days: "7", total: "2 Tab", note: "（for hyperlipidemia）", code: "TROSUVA" },
    { status: "已停用", start: "2026-01-19 14:29", end: "2026-01-20 08:48", name: "Sodium chloride 0.9% 500mL/Bot(永豐)", dose: "1 Bot", mg: "500 mL", route: "IVD", freq: "QD", days: "3", total: "1 Bot", note: "注射時段:00時至24時;流速:20mL/hr;", code: "INS500" },
    { status: "已停用", start: "2026-01-17 16:09", end: "2026-01-19 14:29", name: "Sodium chloride 0.9% 500mL/Bot(永豐)", dose: "2 Bot", mg: "1000 mL", route: "IVD", freq: "QD", days: "3", total: "4 Bot", note: "注射時段:00時至24時;流速:40mL/hr;", code: "INS500" },
    { status: "使用中", start: "2026-01-16 21:26", end: "", name: "Sodium chloride 0.9% 500mL/Bot(永豐)", dose: "1 Bot", mg: "500 mL", route: "IVD", freq: "STAT", days: "1", total: "1 Bot", note: "注射時段:00時至24時;流速:40mL/hr;", code: "INS500" },
    { status: "已停用", start: "2026-01-16 14:50", end: "2026-01-18 17:31", name: "Meclizine(福元廠)25mg/Tab", dose: "1 Tab", mg: "25 mg", route: "PO", freq: "QDPC", days: "5", total: "3 Tab", note: "", code: "TMECLIZ1" },
    { status: "已停用", start: "2026-01-16 14:48", end: "2026-01-22 08:30", name: "ALPrazolam 0.5mg/Tab", dose: "1 Tab", mg: "0.5 mg", route: "PO", freq: "HS", days: "14", total: "6 Tab", note: "", code: "TALPRAZ" },
    { status: "已停用", start: "2026-01-16 14:48", end: "2026-01-22 08:30", name: "Rabeprazole 20mg/Tab", dose: "1 Tab", mg: "20 mg", route: "PO", freq: "QDAC", days: "14", total: "6 Tab", note: "12/17 EGD", code: "TRABEPR" },
    { status: "已停用", start: "2026-01-16 14:48", end: "2026-01-22 08:30", name: "Aspirin(腸溶微粒膠囊) 100mg/Cap", dose: "1 Cap", mg: "100 mg", route: "PO", freq: "QDPC", days: "7", total: "6 Cap", note: "（stroke prevention）", code: "TASPI100" },
    { status: "已停用", start: "2026-01-16 08:52", end: "2026-01-16 09:25", name: "ALPrazolam 0.5mg/Tab", dose: "1 Tab", mg: "0.5 mg", route: "PO", freq: "HS", days: "14", total: "0 Tab", note: "", code: "TALPRAZ" },
    { status: "已停用", start: "2026-01-16 08:52", end: "2026-01-16 14:50", name: "Meclizine(福元廠)25mg/Tab", dose: "1 Tab", mg: "25 mg", route: "PO", freq: "QDPC", days: "2", total: "2 Tab", note: "", code: "TMECLIZ1" },
    { status: "使用中", start: "2026-01-15 21:12", end: "", name: "ALPrazolam 0.5mg/Tab", dose: "1 Tab", mg: "0.5 mg", route: "PO", freq: "EMG-d", days: "1", total: "1 Tab", note: "[緊急用藥]", code: "TALPRAZ" },
    { status: "使用中", start: "2026-01-15 16:37", end: "", name: "Sodium chloride 0.9% 500mL/Bot(永豐)", dose: "1 Bot", mg: "500 mL", route: "IVD", freq: "STAT", days: "1", total: "1 Bot", note: "注射時段:00時至24時;流速:40mL/hr;", code: "INS500" },
    { status: "已停用", start: "2026-01-15 15:20", end: "2026-01-16 14:48", name: "Esomeprazole(錠劑) 40mg/Tab", dose: "1 Tab", mg: "40 mg", route: "PO", freq: "QDAC", days: "7", total: "2 Tab", note: "12/17 EGD", code: "TESOMEP" },
    { status: "已停用", start: "2026-01-15 15:20", end: "2026-01-22 08:30", name: "Hydroxychloroquine 200mg/Tab", dose: "1 Tab", mg: "200 mg", route: "PO", freq: "QDPC", days: "14", total: "7 Tab", note: "OPD", code: "THYD-CH3" },
    { status: "已停用", start: "2026-01-15 15:20", end: "2026-01-22 08:30", name: "Clopidogrel 75mg/Tab", dose: "1 Tab", mg: "75 mg", route: "PO", freq: "QDPC", days: "14", total: "7 Tab", note: "OPD", code: "TCLOPID" },
    { status: "已停用", start: "2026-01-15 15:19", end: "2026-01-17 16:09", name: "Sodium chloride 0.9% 500mL/Bot(永豐)", dose: "2 Bot", mg: "1000 mL", route: "IVD", freq: "QD", days: "3", total: "6 Bot", note: "注射時段:00時至24時;流速:40mL/hr;", code: "INS500" },
    { status: "已停用", start: "2026-01-15 15:19", end: "2026-01-15 15:20", name: "Esomeprazole(錠劑) 40mg/Tab", dose: "1 Tab", mg: "40 mg", route: "PO", freq: "QDAC", days: "1", total: "1 Tab", note: "12/17 EGD", code: "TESOMEP" },
    { status: "已停用", start: "2026-01-15 15:19", end: "2026-01-15 15:20", name: "Clopidogrel 75mg/Tab", dose: "1 Tab", mg: "75 mg", route: "PO", freq: "QDPC", days: "14", total: "1 Tab", note: "", code: "TCLOPID" },
    { status: "已停用", start: "2026-01-15 15:19", end: "2026-01-15 15:20", name: "Hydroxychloroquine 200mg/Tab", dose: "1 Tab", mg: "200 mg", route: "PO", freq: "QDPC", days: "14", total: "1 Tab", note: "", code: "THYD-CH3" },
    { status: "已停用", start: "2026-01-15 15:19", end: "2026-01-21 08:25", name: "Rosuvastatin 10mg/Tab", dose: "0.5 Tab", mg: "5 mg", route: "PO", freq: "QDPC", days: "7", total: "6 Tab", note: "（for hyperlipidemia）", code: "TROSUVA" },
    { status: "已停用", start: "2026-01-15 15:19", end: "2026-01-16 14:48", name: "Aspirin(腸溶微粒膠囊) 100mg/Cap", dose: "1 Cap", mg: "100 mg", route: "PO", freq: "QDPC", days: "7", total: "2 Cap", note: "（stroke prevention）", code: "TASPI100" }
];


const listContainer = document.getElementById('medication-list');

function renderMedications(data) {
    const listContainer = document.getElementById('medication-list');
    listContainer.innerHTML = '';
    
    data.forEach(med => {
        const isActive = med.status === "使用中";
        const card = document.createElement('div');
        card.className = `med-card ${isActive ? 'status-active' : 'status-inactive'}`;

        card.innerHTML = `
            <div class="med-header">
                <span class="med-name">${med.name}</span>
                <span class="badge ${isActive ? 'bg-active' : 'bg-inactive'}">${med.status}</span>
            </div>
            <div class="time-range">
                🗓️ ${med.start} ${med.end ? '～ ' + med.end : '(持續使用中)'}
                <span style="margin-left: 10px; color: #999;">[藥碼: ${med.code}]</span>
            </div>
            <div class="med-grid">
                <div><strong>單次量:</strong> ${med.dose} (${med.mg})</div>
                <div><strong>途徑:</strong> ${med.route}</div>
                <div><strong>頻次:</strong> ${med.freq}</div>
                <div><strong>天數/總量:</strong> ${med.days}天 / ${med.total}</div>
            </div>
            ${med.note ? `<div class="note-box"><strong>醫囑備註:</strong> ${med.note}</div>` : ''}
        `;
        listContainer.appendChild(card);
    });
}
// 只顯示使用中的藥物
function showActiveOnly() {
    const activeMeds = rawData.filter(m => m.status === "使用中");
    renderMedications(activeMeds);
}

// 顯示所有藥物
function showAll() {
    renderMedications(rawData);
}

let currentStatus = '全部';
let searchQuery = '';

// 核心過濾功能
function filterData() {
    searchQuery = document.getElementById('searchInput').value.toLowerCase();
    
    const filtered = rawData.filter(med => {
        const matchesStatus = (currentStatus === '全部' || med.status === currentStatus);
        const matchesSearch = med.name.toLowerCase().includes(searchQuery) || 
                              med.code.toLowerCase().includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    renderMedications(filtered);
}

// 狀態切換功能
function filterStatus(status) {
    currentStatus = status;
    
    // 更新按鈕樣式
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    if(status === '全部') document.getElementById('btn-all').classList.add('active');
    if(status === '使用中') document.getElementById('btn-active').classList.add('active');
    if(status === '已停用') document.getElementById('btn-inactive').classList.add('active');

    filterData(); // 重新過濾並渲染
}

// 修改原本的 renderMedications 函數（保持不變，或確保它被正確調用）
// 初始化
renderMedications(rawData);

