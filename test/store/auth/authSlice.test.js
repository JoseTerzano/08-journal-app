import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice()', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {

        // console.log('authSlice👉', authSlice);

        const state = authSlice.reducer(initialState, {});
        // console.log('state👉', state);

        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);

    });

    test('debe de realizar la autenticacion', () => {

        // console.log( login( demoUser ) );
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state.status).toBe('authenticated');

    });

    test('debe de realizar el logout sin argumentos ', () => {

        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout y mostrar el mensaje de error', () => {

        const errorMessage = 'Credenenciales Incorrectas';

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage
        });
    });

    test('debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('Checking');

    });

})