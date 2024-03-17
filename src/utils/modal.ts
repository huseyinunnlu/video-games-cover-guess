import {IModalProps} from "../types/utils.ts";

export function showModal(detail:IModalProps) {
    window.dispatchEvent(new CustomEvent('GLOBAL-EVENT-SHOW-MODAL', {detail}))
}

export function hideModal() {
    window.dispatchEvent(new CustomEvent('GLOBAL-EVENT-HIDE-MODAL'))
}