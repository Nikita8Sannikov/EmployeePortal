import { useContext } from "react"
import { MainCoreContext } from "../service/AppService"

function useError() {

    const mainCore = useContext(MainCoreContext)
    return (error: string, fetchPromise: Promise<Response>) => {
        return mainCore.catchErrors(error, fetchPromise);
    };
}

export default useError;