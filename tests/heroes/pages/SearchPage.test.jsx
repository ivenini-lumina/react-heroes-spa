import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}) );

describe('Pruebas en <SearchPage />', () => { 

    beforeEach(() => {
        jest.clearAllMocks();
    });    

    test('Debe de mostrar la pagina con los valores por defecto', () => { 
        
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>   
        );               

        expect( container ).toMatchSnapshot();

    });

    test('Debe de mostrar a batman y el input con el valor del queryString', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>   
        );               

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/heroes/dc-batman.jpg');

        const noHeroDiv = screen.getByLabelText('no-hero-div');
        // expect(noHeroDiv.style._values).toEqual({display: 'none'});
        expect(noHeroDiv.style.display).toBe('none');

    });

    test('Debe de mostrar un error si no se encuentra el heroe batman123', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>   
        );               

        const noHeroDiv = screen.getByLabelText('no-hero-div');
        expect(noHeroDiv.style.display).toBe('');

    });

    test('Debe de llamar el navigate a la pantalla nueva', () => { 

        const inputValue = 'superman';

        // Opcion 1

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>   
        );               
        
        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: inputValue }} );

        const form = screen.getByRole('form');
        fireEvent.submit( form );

        // Opcion 2

        // render(
        //     <MemoryRouter initialEntries={[`/search?q=${inputValue}`]}>
        //         <SearchPage />
        //     </MemoryRouter>   
        // );               

        // const btnSubmit = screen.getByRole('button');
        // fireEvent.click(btnSubmit);        

        /*
            Asserts
        */

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);        
    });


});