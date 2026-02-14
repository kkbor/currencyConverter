import { useState } from "react";
import LastTable from "./latest";
import ArchiveTable from "./archive";

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