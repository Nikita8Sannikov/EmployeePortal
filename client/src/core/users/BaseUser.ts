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
        return this._baseUser.name
    }

    get name() {
        return this._baseUser.first_name + " " + this._baseUser.last_name
    }

    get first_name() {
        return this._baseUser.first_name
    }

    get last_name() {
        return this._baseUser.last_name
    }

    get isAdmin() {
        return this._baseUser.isAdmin
    }
    get role() {
        return this._baseUser.role
    }
    get description() {
        return this._baseUser.description
    }
    get email() {
        return this._baseUser.email
    }
    canEdit(id: string) {
        return this.isAdmin || id === this._baseUser._id
    }

    get soonDescription() {
        return this.description || "Описание скоро будет добавлено "
    }

    get profileTitleName() {
        return this.name.trim() ? this.name : this.regName
    }
}
