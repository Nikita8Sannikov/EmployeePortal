import { IUser } from "../../types/types";
// import { eventBus } from "../EventBus";

export default class BaseUser {
    // private _loggedInUser: IUser | null = null;
    constructor(private readonly _baseUser: IUser) {
        // eventBus.on('loggedInUser', (user: IUser) => {
        //     this._loggedInUser = user;
        //     console.log('User profile loaded:', this.loggedInUser);
        // })
    }

    // get loggedInUser() {
    //     return this._loggedInUser;
    // }

    get id() {
        return this._baseUser._id
    }

    get avatar() {
        return this._baseUser.avatar
    }

    get regName() {
        // return this.name || this._baseUser.name
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
