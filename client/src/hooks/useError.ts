import { useContext } from "react"
import { MainCoreContext } from "../service/AppService"

function useError() {
    const mainCore = useContext(MainCoreContext)
    return mainCore.catchErrors();
}

export default useError;