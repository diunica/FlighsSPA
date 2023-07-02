import { FormGroup } from '@angular/forms';

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class GenericValidator {

    // Provide the set of valid validation messages
    // Stucture:
    // controlName1: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // },
    // controlName2: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // }
    private validationMessages: { [key: string]: { [key: string]: string } } = {};

    constructor(validationMessagesInput: { [key: string]: { [key: string]: string } }) {
        this.validationMessages = validationMessagesInput;
    }

    setValidationMessages(validationMessagesInput: { [key: string]: { [key: string]: string } }) {
        this.validationMessages = validationMessagesInput;
    }

    // Processes each control within a FormGroup
    // And returns a set of validation messages to display
    // Structure
    // controlName1: 'Validation Message.',
    // controlName2: 'Validation Message.'
    processMessages(container: FormGroup, flatMode: any = true, ctrlValMessages?: any): { [key: string]: string } {
        if (flatMode || ctrlValMessages === undefined) {
            ctrlValMessages = this.validationMessages;
        }
        const messages = {};
        for (const controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                const c = container.controls[controlKey];
                // If it is a FormGroup, process its child controls.
                if (c instanceof FormGroup) {
                    let childMessages = {};
                    const ctrlMessages = this.processMessages(c, flatMode, ctrlValMessages[controlKey]);
                    if (flatMode) {
                        childMessages = ctrlMessages;
                    } else if (ctrlMessages && Object.entries(ctrlMessages).length > 0) {
                        childMessages[controlKey] = ctrlMessages;
                    }
                    Object.assign(messages, childMessages);
                } else if (ctrlValMessages[controlKey]) {
                    // Only validate if there are validation messages for the control
                    if ((c.dirty || c.touched) && c.errors) {
                        // if (c.errors) {
                        messages[controlKey] = '';
                        Object.keys(c.errors).forEach(messageKey => {
                            if (ctrlValMessages[controlKey][messageKey]) {
                                messages[controlKey] += ctrlValMessages[controlKey][messageKey] + '\n';
                            }
                        });
                    }
                }
            }
        }
        return messages;
    }

    getErrorCount(container: FormGroup): number {
        let errorCount = 0;
        for (const controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                if (container.controls[controlKey].errors) {
                    errorCount += Object.keys(container.controls[controlKey].errors).length;
                }
            }
        }
        return errorCount;
    }
}
