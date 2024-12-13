import { useContext } from "react"
import { MainCoreContext } from "../service/AppService"

function useUsers() {

    const mainCore = useContext(MainCoreContext)
    return mainCore.usersController
}

export default useUsers;