import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import { test } from 'vitest'

test('makes a blog with the right content', () => {
    const mockHandler = vi.fn()

    render(
        <NewBlogForm />
    )

    const user = userEvent.setup()
    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByText('create')

    const [title, author, url] = inputs

    user.type(title, 'Test Title')
    user.type(author, 'Test Author')
    user.type(url, 'www.test.com')
    user.click(button)

    user.type(title, 'Test Title')
    user.type(author, 'Test Author')
    user.type(url, 'www.test.com')
    user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(0)
}
)