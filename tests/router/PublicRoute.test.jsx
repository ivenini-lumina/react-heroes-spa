import { render, screen } from '@testing-library/react'
import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('Pruebas en <PublicRoute />', () => { 
    test('Debe de mostrar el children si no esta autenticado', () => { 
        const contexto = {
            logged: false,
        };
        const childenText = "Ruta publica";

        render(
            <AuthContext.Provider value={ contexto }>
                <PublicRoute>
                    <h1>{childenText}</h1>
                </PublicRoute> 
            </AuthContext.Provider>
        );       

        expect(screen.getByText(childenText)).toBeTruthy();
    });

    test('Debe de navegar si esta autenticado', () => { 

        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123',
            },
        };
        const marvelText = "Ruta Marvel";

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute> 
                        } />
                        <Route path='marvel' element={<h1>{marvelText}</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );       
               
        expect(screen.getByText(marvelText)).toBeTruthy();
    });
    
});

