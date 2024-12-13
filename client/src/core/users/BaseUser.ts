import { IUser } from "../../types/types";

export default class BaseUser {
    constructor(private readonly _baseUser: IUser) {

    }

    get id() {
        return this._baseUser._id
    }

    get avatar() {
        return this._baseUser.avatar
    }

    get regName() {
        return this.name || this._baseUser.name
    }

    get name() {
        return this._baseUser.first_name + " " + this._baseUser.last_name
    }
}
