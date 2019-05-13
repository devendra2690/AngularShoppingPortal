
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  
   let loginComponent : LoginComponent;

   beforeEach(() =>{

      loginComponent = new LoginComponent(null,null,null);
   });

   it("should have 2 element on form component",() =>{

      expect(loginComponent.loginForm.get('emailid')).toBeDefined();
      expect(loginComponent.loginForm.get('password')).toBeDefined();
    })

   it("should have emailid and password as required field",() =>{

      const emailid = loginComponent.loginForm.get('emailid');
      const password = loginComponent.loginForm.get('password');

      emailid.setValue('');
      password.setValue('');

      expect(loginComponent.loginForm.get('emailid').valid).toBeFalsy();
      expect(loginComponent.loginForm.get('password').valid).toBeFalsy();
    });


    it("should check for valid email Address",() =>{

      const emailID = loginComponent.loginForm.get('emailid');

      emailID.setValue("devendra.patil");

      expect(loginComponent.loginForm.get('emailid').valid).toBeFalsy();
      expect(loginComponent.loginForm.get('emailid').errors).not.toBeNull();
    });
});
