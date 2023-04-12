import { render, screen } from '@testing-library/react';
import Index from '../pages/index';

import '@testing-library/jest-dom';

describe('Index', () => {
    it('renders news Letter Text', () => {
        //@ts-ignore
        render(<Index />)

        const heading = screen.getAllByText("Sign up to stay updated!")

        expect(heading[0]).toBeInTheDocument()
    })
});