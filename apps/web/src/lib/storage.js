export function getAssets() {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("ipr_assets") || "[]");
    }
    
    export function saveAssets(data) {
    localStorage.setItem("ipr_assets", JSON.stringify(data));
    }
    
    export function addAsset(asset) {
    const assets = getAssets();
    assets.push(asset);
    saveAssets(assets);
    }
    
    export function deleteAssetById(id) {
    const assets = getAssets().filter(a => a.id !== id);
    saveAssets(assets);
    }
    
    export function addActivity(text) {
    const activity = JSON.parse(localStorage.getItem("ipr_activity") || "[]");
    activity.unshift({
    id: Date.now(),
    text,
    time: new Date().toLocaleString(),
    });
    localStorage.setItem("ipr_activity", JSON.stringify(activity));
    }
    
    export function getActivity() {
    return JSON.parse(localStorage.getItem("ipr_activity") || "[]");
    }
    
    export function addNotification(text) {
    const noti = JSON.parse(localStorage.getItem("ipr_notifications") || "[]");
    noti.unshift({ id: Date.now(), text });
    localStorage.setItem("ipr_notifications", JSON.stringify(noti));
    }
    
    export function getNotifications() {
    return JSON.parse(localStorage.getItem("ipr_notifications") || "[]");
    }
    