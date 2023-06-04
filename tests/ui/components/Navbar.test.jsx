import { fireEvent, render, screen } from '@testing-library/react'
import { Navbar } from '../../../src/ui/components/Navbar';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}) );

describe('Pruebas en <Navbar />', () => { 

    const logoutMock = jest.fn();

    const userName = 'Strider';
    const userObj = {
        name: userName,
        id: 'ABC123',
    }

    const contextValue = {
        logged: true,
        user: userObj,
        logout: logoutMock,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });    
    
    test('Debe de mostrar el nombre del usuario logeado', () => { 

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />                
                </MemoryRouter>
            </AuthContext.Provider>
        );       

        expect(screen.getByText(userName)).toBeTruthy();
        
    });

    test('Debe de llamar al logout y navigate cuando hace clic en el boton', () => { 

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />                
                </MemoryRouter>
            </AuthContext.Provider>
        );       

        fireEvent.click(screen.getByRole("button"));

        expect(logoutMock).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {
            replace: true,
        });
    });


});