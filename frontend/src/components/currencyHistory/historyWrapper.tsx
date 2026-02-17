import { useState } from "react";
import {LastTable} from "./latest";
import ArchiveTable from "./archive";
/**
 * Komponent pośredniczący (Wrapper) dla sekcji historii przeliczeń.
 * Zarządza wyświetlaniem skróconej listy ostatnich konwersji oraz
 * pełnoekranowej nakładki (overlay) z archiwalnymi danymi.
 */
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