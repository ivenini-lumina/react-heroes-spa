import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => { 

    const initialState = {};
    const initialUser = { id: 'ABC', name: 'Fernando Herrera'};

    test('Debe de retornar el estado por defecto', () => { 
        const action = { type: null, payload: null };
        const currentState = authReducer( initialState, action );

        expect(currentState).toBe(initialState);

    });

    test('Debe de hacer login', () => { 
        const loginAction = { type: types.login, payload: initialUser };
        const currentState = authReducer( initialState, loginAction );

        expect(currentState.logged).toBe(true);
        expect(currentState.user).toBe(initialUser);

    });

    test('Debe de hacer logout', () => { 

        const currentState = {
            logged: true,
            user: { id: '123', name: 'Juan' },
        };
        const logoutAction = { type: types.logout };

        const newState = authReducer( currentState, logoutAction );

        expect(newState).toEqual( { logged:false } );

    });


});