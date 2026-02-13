import { useState } from "react";
import LastTable from "../components/currencyHistory/latest";
import ArchiveTable from "../components/currencyHistory/archive";

export const HistoryWrapper = () =>{
    const [showArchive, setShowArchive] = useState(false);
    return (
        <div className="historyWrapper">
            <LastTable onShowArchive={()=> setShowArchive(true)}/>
             <div className={`archiveOverlay ${showArchive ? "active" : ""}`}>
                <ArchiveTable onBack={() => setShowArchive(false)} />
            </div>
        </div>
    )
}