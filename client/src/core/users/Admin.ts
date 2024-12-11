import { IUser } from "../../types/types";
import BaseUser from "./BaseUser";

export default class Admin extends BaseUser {
    private readonly _user: IUser

    constructor(user: IUser) {
        super(user);
        this._user = user
    }

    get isAdmin() {
        return this._user.isAdmin
    }
}