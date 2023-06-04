import { render, screen } from '@testing-library/react'
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en <PrivateRoute />', () => { 

    test('Debe de mostrar el children si esta autenticado', () => { 

        Storage.prototype.setItem = jest.fn();

        const rutaPrivadaText = 'Ruta Privada';
        const initialRoute = '/dc';

        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Juan Carlos',
            },
        };

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={[initialRoute]}>
                    <PrivateRoute>
                                <h1>{rutaPrivadaText}</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );       
               
        expect(screen.getByText(rutaPrivadaText)).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', initialRoute);
    });
    
});

