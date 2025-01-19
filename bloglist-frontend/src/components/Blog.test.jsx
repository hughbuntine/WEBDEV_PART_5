import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'www.test.com',
        likes: 0,
        user: {
            name: 'Test User'
        }
    }

    render(
        <Blog blog={blog} />
    )

    expect(screen.getByText('Component testing is done with react-testing-library Test Author')).toBeDefined()
    expect(screen.getByText('www.test.com')).toBeDefined()
    expect(screen.getByText('likes 0')).toBeDefined()
    expect(screen.getByText('Test User')).toBeDefined()
}

)

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'www.test.com',
        likes: 0,
        user: {
            name: 'Test User'
        }
    }

    const mockHandler = vi.fn()

    render(
        <Blog blog={blog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(0)
}
)