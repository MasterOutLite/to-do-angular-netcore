import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AddToDoModalService{
    private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    isOpen$: Observable<boolean> = this.isOpenSubject.asObservable();

    openModal() {
        this.isOpenSubject.next(true);
    }

    closeModal() {
        this.isOpenSubject.next(false);
    }
}
