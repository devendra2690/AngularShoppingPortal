import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UserFormValidator{

    domainName: string[] = ['gmail', 'yahoo', 'hotmail', 'majesco'];

    /**
     *
     * This is validator to validate email address entered by user.
     * It checks if email address has valid domain name entered or not.
     *
     * @param control
     */
     static emailAddressDomainName(control: AbstractControl): ValidationErrors|null {

        const emailAdddressValue: String = control.value;
        const domainNameStart: number = emailAdddressValue.indexOf('@');
        const domainvalue = emailAdddressValue.substr(domainNameStart, emailAdddressValue.length);

        if (domainvalue.indexOf('gmail') == -1 && domainvalue.indexOf('majesco') == -1 && domainvalue.indexOf('yahoo') == -1) {
            return {domainNameIncorrect: 'Email ID Domain Name is incorect. It should be gmail or yahoo.'};
        }else{
            return null;
        }
     }

}
