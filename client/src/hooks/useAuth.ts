import { useContext } from "react"
import { MainCoreContext } from "../service/AppService"

function useAuth() {

    const mainCore = useContext(MainCoreContext)
    return mainCore.authController
}

export default useAuth;