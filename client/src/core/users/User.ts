import { IUser } from "../../types/types";
import BaseUser from "./BaseUser";

export default class User extends BaseUser {
    private readonly _user: IUser

    constructor(user: IUser) {
        super(user);
        this._user = user
    }
}