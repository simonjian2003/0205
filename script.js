// 確保網頁載入完成才執行
document.addEventListener('DOMContentLoaded', () => {
    // 1. 完整的資料陣列 (rawData)
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

    let currentStatus = '全部';

    // 2. 渲染函數
    const renderMedications = (data) => {
        const listContainer = document.getElementById('medication-list');
        if (!listContainer) return;
        listContainer.innerHTML = '';

        // --- 核心邏輯：依照藥碼 (code) 分組 ---
        const groupedData = data.reduce((acc, med) => {
            if (!acc[med.code]) {
                acc[med.code] = [];
            }
            acc[med.code].push(med);
            return acc;
        }, {});

        // 遍歷每個藥物組別
        Object.keys(groupedData).forEach(code => {
            const history = groupedData[code];
            const latest = history[0]; // 假設第一筆是最新的
            const isActive = history.some(m => m.status === "使用中");

            const card = document.createElement('div');
            card.className = `med-card ${isActive ? 'status-active' : 'status-inactive'}`;
            
            // 建立歷程 HTML
            let historyHtml = history.map(h => `
                <div class="history-item ${h.status === '使用中' ? 'text-active' : 'text-inactive'}">
                    <div class="history-date">📅 ${h.start} ${h.end ? '～ ' + h.end : '(持續中)'}</div>
                    <div class="med-grid">
                        <div><strong>用法:</strong> ${h.dose} (${h.mg})</div>
                        <div><strong>頻次:</strong> ${h.freq} (${h.route})</div>
                        <div><strong>天數:</strong> ${h.days}天</div>
                        <div><strong>狀態:</strong> ${h.status}</div>
                    </div>
                    ${h.note ? `<div class="note-box">💡 ${h.note}</div>` : ''}
                </div>
            `).join('<hr class="history-divider">');

            card.innerHTML = `
                <div class="med-header">
                    <span class="med-name">${latest.name}</span>
                    <span class="badge ${isActive ? 'bg-active' : 'bg-inactive'}">
                        ${isActive ? '使用中' : '已停用'}
                    </span>
                </div>
                <div class="med-code-label">藥碼: ${code}</div>
                <div class="history-container">
                    ${historyHtml}
                </div>
            `;
            listContainer.appendChild(card);
        });
    };

    // 3. 過濾功能（掛載到 window 以便 HTML 呼叫）
    window.filterData = () => {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filtered = rawData.filter(med => {
            const matchesStatus = (currentStatus === '全部' || med.status === currentStatus);
            const matchesSearch = med.name.toLowerCase().includes(query) || med.code.toLowerCase().includes(query);
            return matchesStatus && matchesSearch;
        });
        renderMedications(filtered);
    };

    window.filterStatus = (status) => {
        currentStatus = status;
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        const btnMap = {'全部': 'btn-all', '使用中': 'btn-active', '已停用': 'btn-inactive'};
        document.getElementById(btnMap[status]).classList.add('active');
        window.filterData();
    };

    // 初始化顯示
    renderMedications(rawData);
});
