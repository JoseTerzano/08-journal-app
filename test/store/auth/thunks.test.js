import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuth, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startlogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingCredentials', async () => {

        // const valor = checkingCredentials()
        // console.log('valor👉', valor);
        await checkingAuth()(dispatch); // Porque el thunk es Async / El segundo argumento es el valor de retorno

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {

        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue(loginData);// Hago que esa funcion me devuelva el loginData

        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout con un errorMessage', async () => {

        const loginData = { ok: false, errorMessage: 'Error' };
        await singInWithGoogle.mockResolvedValue(loginData);// Hago que esa funcion me devuelva el loginData

        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login( loginData ));

    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout', async () => {

        const loginData = {  ok: false, errorMessage: 'Error' };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout( loginData.errorMessage ));

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login( loginData ));

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y logout', async () => {

        const loginData = { ok: false, errorMessage: 'Error' };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout( loginData.errorMessage ));
        
    });

    test('startlogout debe de llamar logoutFirebase, clearNotesLogout y logout', async() => {

        await startlogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith(clearNotesLogout());
        expect( dispatch ).toHaveBeenCalledWith(logout());

    });

})